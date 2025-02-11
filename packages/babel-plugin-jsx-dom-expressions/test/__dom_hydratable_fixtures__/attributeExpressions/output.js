import { template as _$template } from "r-dom";
import { delegateEvents as _$delegateEvents } from "r-dom";
import { setBoolAttribute as _$setBoolAttribute } from "r-dom";
import { getNextMarker as _$getNextMarker } from "r-dom";
import { insert as _$insert } from "r-dom";
import { memo as _$memo } from "r-dom";
import { addEventListener as _$addEventListener } from "r-dom";
import { style as _$style } from "r-dom";
import { setAttribute as _$setAttribute } from "r-dom";
import { effect as _$effect } from "r-dom";
import { setProperty as _$setProperty } from "r-dom";
import { getNextElement as _$getNextElement } from "r-dom";
import { runHydrationEvents as _$runHydrationEvents } from "r-dom";
import { className as _$className } from "r-dom";
import { use as _$use } from "r-dom";
import { spread as _$spread } from "r-dom";
import { mergeProps as _$mergeProps } from "r-dom";
var _tmpl$ = /*#__PURE__*/ _$template(`<div id=main><h1 id=my-h1><a href=/>Welcome`),
  _tmpl$2 = /*#__PURE__*/ _$template(`<div><div></div><div> </div><div>`),
  _tmpl$3 = /*#__PURE__*/ _$template(`<div foo>`),
  _tmpl$4 = /*#__PURE__*/ _$template(`<div>`),
  _tmpl$5 = /*#__PURE__*/ _$template(`<div class=a className=b>`),
  _tmpl$6 = /*#__PURE__*/ _$template(`<input type=checkbox checked>`),
  _tmpl$7 = /*#__PURE__*/ _$template(`<input type=checkbox>`),
  _tmpl$8 = /*#__PURE__*/ _$template(`<div class="\`a">\`$\``),
  _tmpl$9 = /*#__PURE__*/ _$template(`<button type=button>Write`),
  _tmpl$10 = /*#__PURE__*/ _$template(`<button class="a b c">Hi`),
  _tmpl$11 = /*#__PURE__*/ _$template(`<div><input readonly><input>`),
  _tmpl$12 = /*#__PURE__*/ _$template(`<div data="&quot;hi&quot;"data2="&quot;">`),
  _tmpl$13 = /*#__PURE__*/ _$template(`<a>`),
  _tmpl$14 = /*#__PURE__*/ _$template(`<div><!$><!/><a>`),
  _tmpl$15 = /*#__PURE__*/ _$template(`<div start=Hi>Hi`),
  _tmpl$16 = /*#__PURE__*/ _$template(`<label><span>Input is <!$><!/></span><input><div>`),
  _tmpl$17 = /*#__PURE__*/ _$template(
    `<div class="class1 class2 class3 class4 class5 class6"style="color:red;background-color:blue !important;border:1px solid black;font-size:12px;"random="random1 random2\n    random3 random4">`
  ),
  _tmpl$18 = /*#__PURE__*/ _$template(`<button>`),
  _tmpl$19 = /*#__PURE__*/ _$template(`<input value=10>`),
  _tmpl$20 = /*#__PURE__*/ _$template(`<select><option>Red</option><option>Blue`),
  _tmpl$21 = /*#__PURE__*/ _$template(`<div>empty string`),
  _tmpl$22 = /*#__PURE__*/ _$template(`<div>js empty`),
  _tmpl$23 = /*#__PURE__*/ _$template(`<div quack>hola`),
  _tmpl$24 = /*#__PURE__*/ _$template(`<div quack>"hola js"`),
  _tmpl$25 = /*#__PURE__*/ _$template(`<div quack>true`),
  _tmpl$26 = /*#__PURE__*/ _$template(`<div>false`),
  _tmpl$27 = /*#__PURE__*/ _$template(`<div quack>1`),
  _tmpl$28 = /*#__PURE__*/ _$template(`<div>0`),
  _tmpl$29 = /*#__PURE__*/ _$template(`<div quack>"1"`),
  _tmpl$30 = /*#__PURE__*/ _$template(`<div>"0"`),
  _tmpl$31 = /*#__PURE__*/ _$template(`<div>undefined`),
  _tmpl$32 = /*#__PURE__*/ _$template(`<div>null`),
  _tmpl$33 = /*#__PURE__*/ _$template(`<div>boolTest()`),
  _tmpl$34 = /*#__PURE__*/ _$template(`<div>boolTest`),
  _tmpl$35 = /*#__PURE__*/ _$template(`<div>boolTestBinding`),
  _tmpl$36 = /*#__PURE__*/ _$template(`<div>boolTestObjBinding.value`),
  _tmpl$37 = /*#__PURE__*/ _$template(`<div>fn`),
  _tmpl$38 = /*#__PURE__*/ _$template(`<div before quack>should have space before`),
  _tmpl$39 = /*#__PURE__*/ _$template(`<div before quack after>should have space before/after`),
  _tmpl$40 = /*#__PURE__*/ _$template(`<div quack after>should have space before/after`),
  _tmpl$41 = /*#__PURE__*/ _$template(`<img src>`),
  _tmpl$42 = /*#__PURE__*/ _$template(`<div><img src>`),
  _tmpl$43 = /*#__PURE__*/ _$template(`<img src loading=lazy>`, true, false, false),
  _tmpl$44 = /*#__PURE__*/ _$template(`<div><img src loading=lazy>`, true, false, false),
  _tmpl$45 = /*#__PURE__*/ _$template(`<iframe src>`),
  _tmpl$46 = /*#__PURE__*/ _$template(`<div><iframe src>`),
  _tmpl$47 = /*#__PURE__*/ _$template(`<iframe src loading=lazy>`, true, false, false),
  _tmpl$48 = /*#__PURE__*/ _$template(`<div><iframe src loading=lazy>`, true, false, false),
  _tmpl$49 = /*#__PURE__*/ _$template(`<div title="<u>data</u>">`),
  _tmpl$50 = /*#__PURE__*/ _$template(`<div true truestr=true truestrjs=true>`),
  _tmpl$51 = /*#__PURE__*/ _$template(`<div falsestr=false falsestrjs=false>`),
  _tmpl$52 = /*#__PURE__*/ _$template(`<div a b c d f=0 g h l>`);
import * as styles from "./styles.module.css";
import { binding } from "somewhere";
function refFn() {}
const refConst = null;
const selected = true;
let id = "my-h1";
let link;
const template = (() => {
  var _el$ = _$getNextElement(_tmpl$),
    _el$2 = _el$.firstChild,
    _el$3 = _el$2.firstChild;
  _$spread(
    _el$,
    _$mergeProps(results, {
      class: {
        selected: unknown
      },
      style: {
        color
      }
    }),
    false,
    true
  );
  _$spread(
    _el$2,
    _$mergeProps(results, {
      foo: "",
      disabled: true,
      get title() {
        return welcoming();
      },
      get style() {
        return {
          "background-color": color(),
          "margin-right": "40px"
        };
      },
      get ["class"]() {
        return [
          "base",
          {
            dynamic: dynamic(),
            selected
          }
        ];
      }
    }),
    false,
    true
  );
  var _ref$ = link;
  typeof _ref$ === "function" ? _$use(_ref$, _el$3) : (link = _el$3);
  _$className(_el$3, {
    "ccc ddd": true
  });
  _$runHydrationEvents();
  return _el$;
})();
const template2 = (() => {
  var _el$4 = _$getNextElement(_tmpl$2),
    _el$5 = _el$4.firstChild,
    _el$6 = _el$5.nextSibling,
    _el$7 = _el$6.firstChild,
    _el$8 = _el$6.nextSibling;
  _$spread(
    _el$4,
    _$mergeProps(() => getProps("test")),
    false,
    true
  );
  _$setProperty(_el$5, "textContent", rowId);
  _$setProperty(_el$8, "innerHTML", "<div/>");
  _$effect(
    () => row.label,
    _v$ => _$setProperty(_el$7, "data", _v$)
  );
  _$runHydrationEvents();
  return _el$4;
})();
const template3 = (() => {
  var _el$9 = _$getNextElement(_tmpl$3);
  _$setAttribute(_el$9, "id", state.id);
  state.color != null
    ? _el$9.style.setProperty("background-color", state.color)
    : _el$9.style.removeProperty("background-color");
  _$setProperty(_el$9, "textContent", state.content);
  _$effect(
    () => state.name,
    _v$ => _$setAttribute(_el$9, "name", _v$)
  );
  return _el$9;
})();
const template4 = (() => {
  var _el$10 = _$getNextElement(_tmpl$4);
  _$className(_el$10, {
    "ccc:ddd": true
  });
  _$effect(
    () => state.class,
    _v$ => _$setAttribute(_el$10, "className", _v$)
  );
  return _el$10;
})();
const template5 = _$getNextElement(_tmpl$5);
const template6 = (() => {
  var _el$12 = _$getNextElement(_tmpl$4);
  _$setProperty(_el$12, "textContent", "Hi");
  _$effect(someStyle, (_v$, _$p) => _$style(_el$12, _v$, _$p));
  return _el$12;
})();
let undefVar;
const template7 = (() => {
  var _el$13 = _$getNextElement(_tmpl$4);
  _el$13.classList.toggle("other-class", !!undefVar);
  _el$13.classList.toggle("other-class2", !!undefVar);
  _$effect(
    () => ({
      e: {
        "background-color": color(),
        "margin-right": "40px",
        ...props.style
      },
      t: props.top,
      a: !!props.active
    }),
    ({ e, t, a }, _p$) => {
      _$style(_el$13, e, _p$.e);
      t !== _p$.t &&
        (t != null
          ? _el$13.style.setProperty("padding-top", t)
          : _el$13.style.removeProperty("padding-top"));
      a !== _p$.a && _el$13.classList.toggle("my-class", a);
    },
    {
      e: undefined,
      t: undefined,
      a: undefined
    }
  );
  return _el$13;
})();
let refTarget;
const template8 = (() => {
  var _el$14 = _$getNextElement(_tmpl$4);
  var _ref$2 = refTarget;
  typeof _ref$2 === "function" ? _$use(_ref$2, _el$14) : (refTarget = _el$14);
  return _el$14;
})();
const template9 = (() => {
  var _el$15 = _$getNextElement(_tmpl$4);
  _$use(e => console.log(e), _el$15);
  return _el$15;
})();
const template10 = (() => {
  var _el$16 = _$getNextElement(_tmpl$4);
  var _ref$3 = refFactory();
  typeof _ref$3 === "function" && _$use(_ref$3, _el$16);
  return _el$16;
})();
const template11 = (() => {
  var _el$17 = _$getNextElement(_tmpl$4);
  _$use(zero, _el$17, () => 0);
  _$use(another, _el$17, () => thing);
  _$use(something, _el$17, () => true);
  return _el$17;
})();
const template12 = (() => {
  var _el$18 = _$getNextElement(_tmpl$4);
  _el$18.htmlFor = thing;
  _el$18.number = 123;
  _$setAttribute(_el$18, "onclick", "console.log('hi')");
  return _el$18;
})();
const template13 = _$getNextElement(_tmpl$6);
const template14 = (() => {
  var _el$20 = _$getNextElement(_tmpl$7);
  _$effect(
    () => state.visible,
    _v$ => _$setProperty(_el$20, "checked", _v$)
  );
  return _el$20;
})();
const template15 = _$getNextElement(_tmpl$8);
const template16 = (() => {
  var _el$22 = _$getNextElement(_tmpl$9);
  _$className(_el$22, [
    "static",
    {
      hi: "k"
    }
  ]);
  return _el$22;
})();
const template17 = (() => {
  var _el$23 = _$getNextElement(_tmpl$10);
  _$addEventListener(_el$23, "click", increment, true);
  _$runHydrationEvents();
  return _el$23;
})();
const template18 = (() => {
  var _el$24 = _$getNextElement(_tmpl$4);
  _$spread(
    _el$24,
    _$mergeProps(() => ({
      get [key()]() {
        return props.value;
      }
    })),
    false,
    false
  );
  _$runHydrationEvents();
  return _el$24;
})();
const template19 = (() => {
  var _el$25 = _$getNextElement(_tmpl$4);
  _$className(_el$25, [
    {
      "bg-red-500": true
    },
    "flex flex-col"
  ]);
  return _el$25;
})();
const template20 = (() => {
  var _el$26 = _$getNextElement(_tmpl$11),
    _el$27 = _el$26.firstChild,
    _el$28 = _el$27.nextSibling;
  _$addEventListener(_el$27, "input", doSomething, true);
  _$addEventListener(_el$28, "input", doSomethingElse, true);
  _$setProperty(_el$28, "readonly", value);
  _$effect(
    () => ({
      e: min(),
      t: max(),
      a: min(),
      o: max()
    }),
    ({ e, t, a, o }, _p$) => {
      e !== _p$.e && _$setAttribute(_el$27, "min", e);
      t !== _p$.t && _$setAttribute(_el$27, "max", t);
      a !== _p$.a && _$setAttribute(_el$28, "min", a);
      o !== _p$.o && _$setAttribute(_el$28, "max", o);
    },
    {
      e: undefined,
      t: undefined,
      a: undefined,
      o: undefined
    }
  );
  _$effect(s, _v$ => _$setProperty(_el$27, "value", _v$));
  _$effect(s2, _v$ => _$setProperty(_el$28, "checked", _v$));
  _$runHydrationEvents();
  return _el$26;
})();
const template21 = (() => {
  var _el$29 = _$getNextElement(_tmpl$4);
  _$effect(
    () => ({
      a: "static",
      ...rest
    }),
    (_v$, _$p) => _$style(_el$29, _v$, _$p)
  );
  return _el$29;
})();
const template22 = _$getNextElement(_tmpl$12);
const template23 = (() => {
  var _el$31 = _$getNextElement(_tmpl$4);
  _$insert(_el$31, () => "t" in test && "true");
  _$effect(
    () => "t" in test,
    _v$ => _$setProperty(_el$31, "disabled", _v$)
  );
  return _el$31;
})();
const template24 = (() => {
  var _el$32 = _$getNextElement(_tmpl$13);
  _$spread(
    _el$32,
    _$mergeProps(props, {
      something: ""
    }),
    false,
    false
  );
  _$runHydrationEvents();
  return _el$32;
})();
const template25 = (() => {
  var _el$33 = _$getNextElement(_tmpl$14),
    _el$35 = _el$33.firstChild,
    [_el$36, _co$] = _$getNextMarker(_el$35.nextSibling),
    _el$34 = _el$36.nextSibling;
  _$insert(_el$33, () => props.children, _el$36, _co$);
  _$spread(
    _el$34,
    _$mergeProps(props, {
      something: ""
    }),
    false,
    false
  );
  _$runHydrationEvents();
  return _el$33;
})();
const template26 = (() => {
  var _el$37 = _$getNextElement(_tmpl$15);
  _$setAttribute(_el$37, "middle", middle);
  _$spread(_el$37, spread, false, true);
  _$runHydrationEvents();
  return _el$37;
})();
const template27 = (() => {
  var _el$38 = _$getNextElement(_tmpl$15);
  _$spread(
    _el$38,
    _$mergeProps(
      first,
      {
        middle: middle
      },
      second
    ),
    false,
    true
  );
  _$runHydrationEvents();
  return _el$38;
})();
const template28 = (() => {
  var _el$39 = _$getNextElement(_tmpl$16),
    _el$40 = _el$39.firstChild,
    _el$41 = _el$40.firstChild,
    _el$42 = _el$41.nextSibling,
    [_el$43, _co$2] = _$getNextMarker(_el$42.nextSibling),
    _el$44 = _el$40.nextSibling,
    _el$45 = _el$44.nextSibling;
  _$spread(_el$39, _$mergeProps(api), false, true);
  _$spread(_el$40, _$mergeProps(api), false, true);
  _$insert(_el$40, () => (api() ? "checked" : "unchecked"), _el$43, _co$2);
  _$spread(_el$44, _$mergeProps(api), false, false);
  _$spread(_el$45, _$mergeProps(api), false, false);
  _$runHydrationEvents();
  return _el$39;
})();
const template29 = (() => {
  var _el$46 = _$getNextElement(_tmpl$4);
  _$setAttribute(_el$46, "attribute", !!someValue);
  _$insert(_el$46, !!someValue);
  return _el$46;
})();
const template30 = _$getNextElement(_tmpl$17);
const template31 = (() => {
  var _el$48 = _$getNextElement(_tmpl$4);
  _$effect(
    () => getStore.itemProperties.color,
    _v$ =>
      _v$ != null
        ? _el$48.style.setProperty("background-color", _v$)
        : _el$48.style.removeProperty("background-color")
  );
  return _el$48;
})();
const template32 = (() => {
  var _el$49 = _$getNextElement(_tmpl$4);
  _el$49.style.removeProperty("background-color");
  return _el$49;
})();
const template33 = [
  (() => {
    var _el$50 = _$getNextElement(_tmpl$18);
    _$effect(
      () => styles.button,
      (_v$, _$p) => _$className(_el$50, _v$, false, _$p)
    );
    return _el$50;
  })(),
  (() => {
    var _el$51 = _$getNextElement(_tmpl$18);
    _$effect(
      () => styles["foo--bar"],
      (_v$, _$p) => _$className(_el$51, _v$, false, _$p)
    );
    return _el$51;
  })(),
  (() => {
    var _el$52 = _$getNextElement(_tmpl$18);
    _$effect(
      () => styles.foo.bar,
      (_v$, _$p) => _$className(_el$52, _v$, false, _$p)
    );
    return _el$52;
  })(),
  (() => {
    var _el$53 = _$getNextElement(_tmpl$18);
    _$effect(
      () => styles[foo()],
      (_v$, _$p) => _$className(_el$53, _v$, false, _$p)
    );
    return _el$53;
  })()
];
const template34 = (() => {
  var _el$54 = _$getNextElement(_tmpl$4);
  _$use(zero, _el$54, () => 0);
  _$use(something, _el$54, () => true);
  _$spread(_el$54, somethingElse, false, false);
  _$runHydrationEvents();
  return _el$54;
})();
const template35 = (() => {
  var _el$55 = _$getNextElement(_tmpl$4);
  var _ref$4 = a().b.c;
  typeof _ref$4 === "function" ? _$use(_ref$4, _el$55) : (a().b.c = _el$55);
  return _el$55;
})();
const template36 = (() => {
  var _el$56 = _$getNextElement(_tmpl$4);
  var _ref$5 = a().b?.c;
  typeof _ref$5 === "function" && _$use(_ref$5, _el$56);
  return _el$56;
})();
const template37 = (() => {
  var _el$57 = _$getNextElement(_tmpl$4);
  var _ref$6 = a() ? b : c;
  typeof _ref$6 === "function" && _$use(_ref$6, _el$57);
  return _el$57;
})();
const template38 = (() => {
  var _el$58 = _$getNextElement(_tmpl$4);
  var _ref$7 = a() ?? b;
  typeof _ref$7 === "function" && _$use(_ref$7, _el$58);
  return _el$58;
})();
const template39 = _$getNextElement(_tmpl$19);
const template40 = (() => {
  var _el$60 = _$getNextElement(_tmpl$4);
  _$effect(a, _v$ =>
    _v$ != null ? _el$60.style.setProperty("color", _v$) : _el$60.style.removeProperty("color")
  );
  return _el$60;
})();
const template41 = (() => {
  var _el$61 = _$getNextElement(_tmpl$20),
    _el$62 = _el$61.firstChild,
    _el$63 = _el$62.nextSibling;
  _$effect(
    () => Color.Red,
    _v$ => _$setProperty(_el$62, "value", _v$)
  );
  _$effect(
    () => Color.Blue,
    _v$ => _$setProperty(_el$63, "value", _v$)
  );
  _$effect(
    () => state.color,
    _v$ => _$setProperty(_el$61, "value", _v$)
  );
  return _el$61;
})();

// bool:
function boolTest() {
  return true;
}
const boolTestBinding = false;
const boolTestObjBinding = {
  value: false
};
const template42 = _$getNextElement(_tmpl$21);
const template43 = _$getNextElement(_tmpl$22);
const template44 = _$getNextElement(_tmpl$23);
const template45 = _$getNextElement(_tmpl$24);
const template46 = _$getNextElement(_tmpl$25);
const template47 = _$getNextElement(_tmpl$26);
const template48 = _$getNextElement(_tmpl$27);
const template49 = _$getNextElement(_tmpl$28);
const template50 = _$getNextElement(_tmpl$29);
const template51 = _$getNextElement(_tmpl$30);
const template52 = _$getNextElement(_tmpl$31);
const template53 = _$getNextElement(_tmpl$32);
const template54 = (() => {
  var _el$76 = _$getNextElement(_tmpl$33);
  _$effect(boolTest, _v$ => _$setBoolAttribute(_el$76, "quack", _v$));
  return _el$76;
})();
const template55 = (() => {
  var _el$77 = _$getNextElement(_tmpl$34);
  _$setBoolAttribute(_el$77, "quack", boolTest);
  return _el$77;
})();
const template56 = (() => {
  var _el$78 = _$getNextElement(_tmpl$35);
  _$setBoolAttribute(_el$78, "quack", boolTestBinding);
  return _el$78;
})();
const template57 = (() => {
  var _el$79 = _$getNextElement(_tmpl$36);
  _$effect(
    () => boolTestObjBinding.value,
    _v$ => _$setBoolAttribute(_el$79, "quack", _v$)
  );
  return _el$79;
})();
const template58 = (() => {
  var _el$80 = _$getNextElement(_tmpl$37);
  _$setBoolAttribute(_el$80, "quack", () => false);
  return _el$80;
})();
const template59 = _$getNextElement(_tmpl$38);
const template60 = _$getNextElement(_tmpl$39);
const template61 = _$getNextElement(_tmpl$40);
// this crash it for some reason- */ const template62 = <div bool:quack>really empty</div>;

const template63 = _$getNextElement(_tmpl$41);
const template64 = _$getNextElement(_tmpl$42);
const template65 = _$getNextElement(_tmpl$43);
const template66 = _$getNextElement(_tmpl$44);
const template67 = _$getNextElement(_tmpl$45);
const template68 = _$getNextElement(_tmpl$46);
const template69 = _$getNextElement(_tmpl$47);
const template70 = _$getNextElement(_tmpl$48);
const template71 = _$getNextElement(_tmpl$49);
const template72 = (() => {
  var _el$93 = _$getNextElement(_tmpl$4);
  _$use(binding, _el$93);
  return _el$93;
})();
const template73 = (() => {
  var _el$94 = _$getNextElement(_tmpl$4);
  var _ref$8 = binding.prop;
  typeof _ref$8 === "function" ? _$use(_ref$8, _el$94) : (binding.prop = _el$94);
  return _el$94;
})();
const template74 = (() => {
  var _el$95 = _$getNextElement(_tmpl$4);
  var _ref$9 = refFn;
  typeof _ref$9 === "function" ? _$use(_ref$9, _el$95) : (refFn = _el$95);
  return _el$95;
})();
const template75 = (() => {
  var _el$96 = _$getNextElement(_tmpl$4);
  _$use(refConst, _el$96);
  return _el$96;
})();
const template76 = (() => {
  var _el$97 = _$getNextElement(_tmpl$4);
  var _ref$10 = refUnknown;
  typeof _ref$10 === "function" ? _$use(_ref$10, _el$97) : (refUnknown = _el$97);
  return _el$97;
})();
const template77 = _$getNextElement(_tmpl$50);
const template78 = _$getNextElement(_tmpl$51);
const template79 = (() => {
  var _el$100 = _$getNextElement(_tmpl$4);
  _el$100.true = true;
  _el$100.false = false;
  return _el$100;
})();
const template80 = (() => {
  var _el$101 = _$getNextElement(_tmpl$4);
  _$setAttribute(_el$101, "true", true);
  _$setAttribute(_el$101, "false", false);
  return _el$101;
})();
const template81 = (() => {
  var _el$102 = _$getNextElement(_tmpl$52);
  _$setAttribute(_el$102, "i", undefined);
  _$setAttribute(_el$102, "j", null);
  _$setAttribute(_el$102, "k", void 0);
  return _el$102;
})();
_$delegateEvents(["click", "input"]);
