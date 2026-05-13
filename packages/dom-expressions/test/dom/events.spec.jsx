/**
 * @jest-environment jsdom
 */
import * as r from "../../src/client";
import { createRoot, createSignal, flush } from "@solidjs/signals";

describe("Test Synthetic event bubbling", () => {
  const Elements = {
    el1: null,
    el2: null,
    el3: null
  };
  let eventTarget = null,
    count = 0,
    stopPropagation = false;
  function handleClick(data, e) {
    expect(e.currentTarget).toBe(Elements[`el${data}`]);
    expect(e.target).toBe(eventTarget);
    if (stopPropagation) e.stopPropagation();
    count++;
  }

  document.body.innerHTML = "";
  createRoot(() =>
    document.body.appendChild(
      <div ref={Elements.el1} onClick={[handleClick, 1]}>
        <div ref={Elements.el2} onClick={[handleClick, 2]}>
          <div ref={Elements.el3} onClick={[handleClick, 3]} />
        </div>
      </div>
    )
  );

  test("Fire top level event", () => {
    eventTarget = Elements.el1;
    count = 0;
    var event = new MouseEvent("click", { bubbles: true });
    eventTarget.dispatchEvent(event);
    expect(count).toBe(1);
  });

  test("Fire 2nd level event", () => {
    eventTarget = Elements.el2;
    count = 0;
    var event = new MouseEvent("click", { bubbles: true });
    eventTarget.dispatchEvent(event);
    expect(count).toBe(2);
  });

  test("Fire 3rd level event", () => {
    eventTarget = Elements.el3;
    count = 0;
    var event = new MouseEvent("click", { bubbles: true });
    eventTarget.dispatchEvent(event);
    expect(count).toBe(3);
  });

  test("Fire 3rd level event and stop propagation", () => {
    eventTarget = Elements.el3;
    count = 0;
    stopPropagation = true;
    var event = new MouseEvent("click", { bubbles: true });
    eventTarget.dispatchEvent(event);
    expect(count).toBe(1);
  });

  test("clear events", () => {
    r.clearDelegatedEvents();
    eventTarget = Elements.el1;
    count = 0;
    stopPropagation = false;
    var event = new MouseEvent("click", { bubbles: true });
    eventTarget.dispatchEvent(event);
    expect(count).toBe(0);
  });

  test("clearDelegatedEvents on a fresh document is a no-op", () => {
    // Targets with no prior delegation take the `if (document[$$EVENTS])`
    // false branch without touching addEventListener state.
    const alt = document.implementation.createHTMLDocument("alt");
    expect(() => r.clearDelegatedEvents(alt)).not.toThrow();
  });
});

describe("native event listeners via ref callbacks", () => {
  const on = (type, handler, options) => el => el.addEventListener(type, handler, options);

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("wires a plain function listener", () => {
    let el, dispose;
    let calls = 0;

    createRoot(d => {
      dispose = d;
      document.body.appendChild(<div ref={[node => (el = node), on("click", () => calls++)]} />);
    });

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(calls).toBe(1);
    dispose();
  });

  it("passes capture listeners through native event ordering", () => {
    let child, dispose;
    const order = [];

    createRoot(d => {
      dispose = d;
      document.body.appendChild(
        <section ref={on("click", () => order.push("parent"), { capture: true })}>
          <button ref={[node => (child = node), on("click", () => order.push("child"))]} />
        </section>
      );
    });

    child.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(order).toEqual(["parent", "child"]);
    dispose();
  });

  it("forwards addEventListener options such as passive and once", () => {
    let el, dispose;
    const events = [];
    const original = HTMLDivElement.prototype.addEventListener;
    const recorded = [];
    HTMLDivElement.prototype.addEventListener = function (type, listener, options) {
      recorded.push({ type, options });
      return original.call(this, type, listener, options);
    };

    try {
      createRoot(d => {
        dispose = d;
        document.body.appendChild(
          <div
            ref={[
              node => (el = node),
              on("click", e => events.push(e.type), { passive: true, once: true })
            ]}
          />
        );
      });

      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      expect(events).toEqual(["click"]);
      expect(recorded.find(r => r.type === "click").options).toMatchObject({
        passive: true,
        once: true
      });
    } finally {
      HTMLDivElement.prototype.addEventListener = original;
      dispose();
    }
  });

  it("composes multiple native listeners with array refs", () => {
    let el, dispose;
    const order = [];

    createRoot(d => {
      dispose = d;
      document.body.appendChild(
        <button
          ref={[
            node => (el = node),
            on("click", () => order.push("capture"), { capture: true }),
            on("click", () => order.push("bubble"))
          ]}
        />
      );
    });

    el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    expect(order).toEqual(["capture", "bubble"]);
    dispose();
  });
});

// Exercises the branches of eventHandler that the core delegation tests
// don't reach:
//   - composedPath `_$host` portal re-target branch
//   - legacy fallback `walkUpTree()` when composedPath is absent
describe("eventHandler shadow/portal branches", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("portal-mounted child bubbles to its logical parent via _$host", () => {
    const calls = [];
    let logicalParent, portalChild, dispose;

    // Logical parent lives in a different part of the tree from the portal
    // child; _$host chains the two so eventHandler's composedPath scan
    // hands off to walkUpTree at the logical parent.
    createRoot(d => {
      dispose = d;
      document.body.appendChild(
        <section
          ref={logicalParent}
          onClick={e => calls.push(["logical", e.currentTarget.tagName])}
        />
      );
      document.body.appendChild(
        <aside>
          <button
            ref={portalChild}
            onClick={e => calls.push(["portal", e.currentTarget.tagName])}
          />
        </aside>
      );
    });
    // The JSX compiler's module-level delegateEvents(["click"]) may have
    // been cleared by earlier tests in this file.
    r.delegateEvents(["click"]);
    portalChild._$host = logicalParent;

    portalChild.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));

    expect(calls).toEqual([
      ["portal", "BUTTON"],
      ["logical", "SECTION"]
    ]);

    dispose();
  });

  it("walks up the tree when the event has no composedPath (legacy browser fallback)", () => {
    const calls = [];
    let outer, inner, dispose;

    createRoot(d => {
      dispose = d;
      document.body.appendChild(
        <div ref={outer} onClick={e => calls.push(["outer", e.currentTarget.tagName])}>
          <div ref={inner} onClick={e => calls.push(["inner", e.currentTarget.tagName])} />
        </div>
      );
    });
    r.delegateEvents(["click"]);

    // Strip composedPath so eventHandler falls back to walkUpTree.
    const event = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(event, "composedPath", { value: undefined });
    inner.dispatchEvent(event);

    expect(calls).toEqual([
      ["inner", "DIV"],
      ["outer", "DIV"]
    ]);

    dispose();
  });

  // Once walkUpTree bubbles past every host (via _$host pointing at
  // document itself), the closure-local `node` becomes undefined. The
  // currentTarget getter's `node || document` fallback must surface
  // document rather than undefined.
  it("currentTarget falls back to document after bubbling past the root", () => {
    let portalChild, dispose;
    createRoot(d => {
      dispose = d;
      document.body.appendChild(<button ref={portalChild} onClick={() => {}} />);
    });
    r.delegateEvents(["click"]);
    // _$host points at document → walkUpTree tries to step to
    // document.parentNode/host/_$host, all of which are null.
    portalChild._$host = document;

    const event = new MouseEvent("click", { bubbles: true, composed: true });
    portalChild.dispatchEvent(event);
    // After dispatch the walker's node is undefined, so the getter's
    // fallback takes over.
    expect(event.currentTarget).toBe(document);

    delete portalChild._$host;
    dispose();
    document.body.innerHTML = "";
  });
});

describe("r.assign direct usage", () => {
  // Exported assign() handles ref props itself when skipRef is false —
  // spread() skips them, so this branch is only reachable via direct calls.
  it("runs function refs when called with skipRef=false", () => {
    const node = document.createElement("div");
    const seen = [];
    let dispose;
    createRoot(d => {
      dispose = d;
      r.assign(node, { ref: el => seen.push(el) }, true, {}, false);
    });
    expect(seen).toEqual([node]);
    dispose();
  });

  it("passes children through to insertExpression when skipChildren=false", () => {
    const node = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = "hi";
    r.assign(node, { children: span, class: "wrap" }, false, {});
    expect(node.className).toBe("wrap");
    expect(node.firstChild).toBe(span);
  });

  it("treats null props as an empty object", () => {
    const node = document.createElement("div");
    // `props || (props = {})` must cope with explicit null.
    expect(() => r.assign(node, null, true, {})).not.toThrow();
  });

  it("defaults prevProps to {} when the 4th arg is omitted", () => {
    const node = document.createElement("div");
    // Only 3 args → prevProps default kicks in.
    expect(() => r.assign(node, { class: "alpha" }, true)).not.toThrow();
    expect(node.className).toBe("alpha");
  });

  it("skips the children key when clearing props between renders", () => {
    const node = document.createElement("div");
    const prevProps = {};
    const span = document.createElement("span");
    r.assign(node, { children: span, class: "one" }, false, prevProps);
    expect(node.firstChild).toBe(span);
    expect(node.className).toBe("one");

    // Second call omits class and children. The cleanup loop walks
    // prevProps and hits the `prop === "children"` continue branch.
    r.assign(node, {}, false, prevProps);
    expect(node.hasAttribute("class")).toBe(false);
  });

  it("routes SELECT value through the DOMWithState property branch", () => {
    // Create a <select> with option children first so that the value
    // assignment can match one of the options.
    const select = document.createElement("select");
    ["alpha", "beta", "gamma"].forEach(v => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });

    r.assign(select, { value: "beta" }, true, {});
    // SELECT value is set via a queueMicrotask, so wait a microtask.
    return Promise.resolve().then(() => {
      expect(select.value).toBe("beta");
    });
  });
});

// JSX onEvent compiles down to r.addEventListener for the non-default
// branches (delegated+array, delegated+plain, non-delegated array+data).
describe("JSX event wiring variants", () => {
  it("onClick={[handler, data]} stores $$click and $$clickData for delegation", () => {
    const handler = jest.fn();
    const data = { id: 42 };
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div onClick={[handler, data]} />;
    });
    expect(node.$$click).toBe(handler);
    expect(node.$$clickData).toBe(data);
    dispose();
  });

  it("onClick={handler} stores $$click without data", () => {
    const handler = jest.fn();
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div onClick={handler} />;
    });
    expect(node.$$click).toBe(handler);
    expect(node.$$clickData).toBeUndefined();
    dispose();
  });

  it("onMouseEnter={[handler, data]} forwards data via a native listener", () => {
    const received = [];
    const handler = (d, e) => received.push([d, e.type]);
    const data = "payload";
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div onMouseEnter={[handler, data]} />;
    });
    node.dispatchEvent(new Event("mouseenter"));
    expect(received).toEqual([["payload", "mouseenter"]]);
    dispose();
  });
});

// Spread-driven non-delegated event paths only flow through assignProp when
// a spread changes across renders (direct JSX props short-circuit in the compiler).
describe("spread event handling", () => {
  it("non-delegated onMouseEnter from a reactive spread swaps listeners on update", () => {
    const firstCalls = [];
    const secondCalls = [];
    const h1 = e => firstCalls.push(e.type);
    const h2 = e => secondCalls.push(e.type);
    const [props, setProps] = createSignal({ onMouseEnter: h1 });

    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...props()} />;
    });

    node.dispatchEvent(new Event("mouseenter"));
    expect(firstCalls).toHaveLength(1);

    setProps({ onMouseEnter: h2 });
    flush();
    node.dispatchEvent(new Event("mouseenter"));
    expect(firstCalls).toHaveLength(1);
    expect(secondCalls).toHaveLength(1);
    dispose();
  });

  it("non-delegated onMouseEnter swaps an array prev handler for a plain one", () => {
    const firstCalls = [];
    const secondCalls = [];
    const firstHandler = function (d, e) {
      firstCalls.push([d, e.type]);
    };
    const secondHandler = e => secondCalls.push(e.type);
    const [props, setProps] = createSignal({
      onMouseEnter: [firstHandler, "p1"]
    });

    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...props()} />;
    });

    node.dispatchEvent(new Event("mouseenter"));
    expect(firstCalls).toEqual([["p1", "mouseenter"]]);

    setProps({ onMouseEnter: secondHandler });
    flush();
    node.dispatchEvent(new Event("mouseenter"));
    expect(firstCalls).toHaveLength(1);
    expect(secondCalls).toEqual(["mouseenter"]);
    dispose();
  });

  // Direct JSX `onClick={[h, d]}` compiles to `$$click = h; $$clickData = d`;
  // only the spread path routes through assignProp → addEventListener, which
  // is where the delegated + array branch of addEventListener actually runs.
  it("onClick={[handler, data]} via spread sets $$click and $$clickData for delegation", () => {
    const handler = jest.fn();
    const data = { id: 7 };
    const [props, setProps] = createSignal({ onClick: [handler, data] });

    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...props()} />;
    });
    expect(node.$$click).toBe(handler);
    expect(node.$$clickData).toBe(data);

    // Update the data through the spread to prove the array branch runs
    // again, not just on first render.
    const newData = { id: 8 };
    setProps({ onClick: [handler, newData] });
    flush();
    expect(node.$$clickData).toBe(newData);
    dispose();
  });
});

// `prop:name` in a spread strips the namespace and assigns the value to
// the corresponding DOM property (not an attribute).
describe("spread prop: namespace", () => {
  it("sets a DOM property via prop:name", () => {
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...{ "prop:textContent": "hello" }} />;
    });
    expect(node.textContent).toBe("hello");
    // textContent is a property, not an attribute.
    expect(node.hasAttribute("textContent")).toBe(false);
    dispose();
  });

  it("updates a DOM property via prop:name across renders", () => {
    const [props, setProps] = createSignal({ "prop:title": "first" });
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...props()} />;
    });
    expect(node.title).toBe("first");

    setProps({ "prop:title": "second" });
    flush();
    expect(node.title).toBe("second");
    dispose();
  });

  it("assigns arbitrary JS values via prop:name (not attribute-serialized)", () => {
    const payload = { answer: 42 };
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...{ "prop:customData": payload }} />;
    });
    // Property carries the object reference directly.
    expect(node.customData).toBe(payload);
    expect(node.hasAttribute("customData")).toBe(false);
    dispose();
  });

  // Unknown namespaces in spread fall through to setAttribute (no NS
  // lookup), exercising the `hasNamespace && Namespaces[prefix]` false
  // branch in assignProp.
  it("unknown namespace prefix via spread falls through to setAttribute", () => {
    let node, dispose;
    createRoot(d => {
      dispose = d;
      node = <div {...{ "fake:attr": "v" }} />;
    });
    // setAttribute preserves the whole "fake:attr" name in attribute form.
    expect(node.getAttribute("fake:attr")).toBe("v");
    dispose();
  });
});
