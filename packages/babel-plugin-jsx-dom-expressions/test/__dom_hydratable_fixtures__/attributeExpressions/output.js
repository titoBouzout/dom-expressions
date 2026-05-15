import { template as _$template } from "r-dom";
import { delegateEvents as _$delegateEvents } from "r-dom";
import { getNextMarker as _$getNextMarker } from "r-dom";
import { insert as _$insert } from "r-dom";
import { memo as _$memo } from "r-dom";
import { addEventListener as _$addEventListener } from "r-dom";
import { style as _$style } from "r-dom";
import { setStyleProperty as _$setStyleProperty } from "r-dom";
import { setAttribute as _$setAttribute } from "r-dom";
import { effect as _$effect } from "r-dom";
import { setProperty as _$setProperty } from "r-dom";
import { getNextElement as _$getNextElement } from "r-dom";
import { runHydrationEvents as _$runHydrationEvents } from "r-dom";
import { className as _$className } from "r-dom";
import { ref as _$ref } from "r-dom";
import { spread as _$spread } from "r-dom";
import { mergeProps as _$mergeProps } from "r-dom";
var _tmpl$ = /*#__PURE__*/ _$template(`<div><h1><a href=/>Welcome`),
  _tmpl$2 = /*#__PURE__*/ _$template(`<div><div></div><div> </div><div>`),
  _tmpl$3 = /*#__PURE__*/ _$template(`<div foo> `),
  _tmpl$4 = /*#__PURE__*/ _$template(`<div>`),
  _tmpl$5 = /*#__PURE__*/ _$template(`<div class=a className=b>`),
  _tmpl$6 = /*#__PURE__*/ _$template(`<div style=margin-right:40px>`),
  _tmpl$7 = /*#__PURE__*/ _$template(`<div onclick="console.log('hi')">`),
  _tmpl$8 = /*#__PURE__*/ _$template(`<input type=checkbox checked>`),
  _tmpl$9 = /*#__PURE__*/ _$template(`<input type=checkbox>`),
  _tmpl$0 = /*#__PURE__*/ _$template(`<div class="\`a">\`$\``),
  _tmpl$1 = /*#__PURE__*/ _$template(`<button class="static hi"type=button>Write`),
  _tmpl$10 = /*#__PURE__*/ _$template(`<button class="a b c">Hi`),
  _tmpl$11 = /*#__PURE__*/ _$template(`<div><input readonly><input>`),
  _tmpl$12 = /*#__PURE__*/ _$template(`<div style=c:static>`),
  _tmpl$13 = /*#__PURE__*/ _$template(`<div data="&quot;hi&quot;"data2="&quot;">`),
  _tmpl$14 = /*#__PURE__*/ _$template(`<a>`),
  _tmpl$15 = /*#__PURE__*/ _$template(`<div><!$><!/><a>`),
  _tmpl$16 = /*#__PURE__*/ _$template(`<div>Hi`),
  _tmpl$17 = /*#__PURE__*/ _$template(`<label><span>Input is <!$><!/></span><input><div>`),
  _tmpl$18 = /*#__PURE__*/ _$template(
    `<div class="class1 class2 class3 class4 class5 class6"random="random1 random2\n    random3 random4"style="color:red;background-color:blue !important;border:1px solid black;font-size:12px">`
  ),
  _tmpl$19 = /*#__PURE__*/ _$template(`<button>`),
  _tmpl$20 = /*#__PURE__*/ _$template(`<input value=10>`),
  _tmpl$21 = /*#__PURE__*/ _$template(`<select><option>Red</option><option>Blue`),
  _tmpl$22 = /*#__PURE__*/ _$template(`<img src>`),
  _tmpl$23 = /*#__PURE__*/ _$template(`<div><img src>`),
  _tmpl$24 = /*#__PURE__*/ _$template(`<img src loading=lazy>`, 1),
  _tmpl$25 = /*#__PURE__*/ _$template(`<div><img src loading=lazy>`, 1),
  _tmpl$26 = /*#__PURE__*/ _$template(`<iframe src>`),
  _tmpl$27 = /*#__PURE__*/ _$template(`<div><iframe src>`),
  _tmpl$28 = /*#__PURE__*/ _$template(`<iframe src loading=lazy>`, 1),
  _tmpl$29 = /*#__PURE__*/ _$template(`<div><iframe src loading=lazy>`, 1),
  _tmpl$30 = /*#__PURE__*/ _$template(`<div title="<u>data</u>">`),
  _tmpl$31 = /*#__PURE__*/ _$template(`<div true truestr=true truestrjs=true>`),
  _tmpl$32 = /*#__PURE__*/ _$template(`<div falsestr=false falsestrjs=false>`),
  _tmpl$33 = /*#__PURE__*/ _$template(`<div true>`),
  _tmpl$34 = /*#__PURE__*/ _$template(`<div a b c d f=0 g h l>`),
  _tmpl$35 = /*#__PURE__*/ _$template(`<math display=block><mrow>`),
  _tmpl$36 = /*#__PURE__*/ _$template(`<math><mrow><mi>x</mi><mo>=</math>`, 2),
  _tmpl$37 = /*#__PURE__*/ _$template(`<div style=background:red>`),
  _tmpl$38 = /*#__PURE__*/ _$template(
    `<div style=background:red;color:green;margin:3;padding:0.4>`
  ),
  _tmpl$39 = /*#__PURE__*/ _$template(`<div style=background:red;color:green>`),
  _tmpl$40 = /*#__PURE__*/ _$template(`<video>`),
  _tmpl$41 = /*#__PURE__*/ _$template(`<video playsinline>`),
  _tmpl$42 = /*#__PURE__*/ _$template(`<video poster=1.jpg>`),
  _tmpl$43 = /*#__PURE__*/ _$template(`<div><video poster=1.jpg>`),
  _tmpl$44 = /*#__PURE__*/ _$template(`<div><video>`),
  _tmpl$45 = /*#__PURE__*/ _$template(`<button type=button>`),
  _tmpl$46 = /*#__PURE__*/ _$template(`<div style=duplicate2>`),
  _tmpl$47 = /*#__PURE__*/ _$template(`<div class=todo>`),
  _tmpl$48 = /*#__PURE__*/ _$template(`<div class="todo item">`);
import * as styles from "./styles.module.css";
import { binding } from "somewhere";
function refFn() {}
const refConst = null;
const selected = true;
let id = "my-h1";
let link;
var _el$ = _$getNextElement(_tmpl$),
  _el$2 = _el$.firstChild,
  _el$3 = _el$2.firstChild;
_$spread(
  _el$,
  _$mergeProps(
    {
      id: "main"
    },
    results,
    {
      class: {
        selected: unknown
      },
      style: {
        color
      }
    }
  ),
  true
);
_$spread(
  _el$2,
  _$mergeProps(
    {
      id: "my-h1"
    },
    results,
    {
      foo: true,
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
    }
  ),
  true
);
var _ref$ = link;
typeof _ref$ === "function" || Array.isArray(_ref$) ? _$ref(() => _ref$, _el$3) : (link = _el$3);
_$className(_el$3, {
  "ccc ddd": true
});
_$runHydrationEvents();
const template = _el$;
var _el$4 = _$getNextElement(_tmpl$2),
  _el$5 = _el$4.firstChild,
  _el$6 = _el$5.nextSibling,
  _el$7 = _el$6.firstChild,
  _el$8 = _el$6.nextSibling;
_$spread(
  _el$4,
  _$mergeProps(() => getProps("test")),
  true
);
_$setProperty(_el$5, "textContent", rowId);
_$setProperty(_el$8, "innerHTML", "<div/>");
_$effect(
  () => row.label,
  _v$ => {
    _$setProperty(_el$7, "data", _v$);
  }
);
_$runHydrationEvents();
const template2 = _el$4;
var _el$9 = _$getNextElement(_tmpl$3),
  _el$0 = _el$9.firstChild;
_$effect(
  () => ({
    e: /*@once*/ state.id,
    t: /*@once*/ state.color,
    a: state.name,
    o: /*@once*/ state.content
  }),
  ({ e, t, a, o }, _p$) => {
    e !== _p$?.e && _$setAttribute(_el$9, "id", e);
    t !== _p$?.t && _$setStyleProperty(_el$9, "background-color", t);
    a !== _p$?.a && _$setAttribute(_el$9, "name", a);
    (!_p$ || o !== _p$.o) && _$setProperty(_el$0, "data", o);
  }
);
const template3 = _el$9;
var _el$1 = _$getNextElement(_tmpl$4);
_$className(_el$1, {
  "ccc:ddd": true
});
_$effect(
  () => state.class,
  _v$ => {
    _$setAttribute(_el$1, "className", _v$);
  }
);
const template4 = _el$1;
const template5 = _$getNextElement(_tmpl$5);
var _el$11 = _$getNextElement(_tmpl$4);
_$setProperty(_el$11, "textContent", "Hi");
_$effect(
  () => someStyle(),
  (_v$, _$p) => {
    _$style(_el$11, _v$, _$p);
  }
);
const template6 = _el$11;
let undefVar;
var _el$12 = _$getNextElement(_tmpl$6);
_el$12.classList.toggle("other-class2", !!undefVar);
_$effect(
  () => ({
    "background-color": color(),
    ...props.style
  }),
  (_v$, _$p) => {
    _$style(_el$12, _v$, _$p);
  }
);
const template7 = _el$12;
let refTarget;
var _el$13 = _$getNextElement(_tmpl$4);
var _ref$2 = refTarget;
typeof _ref$2 === "function" || Array.isArray(_ref$2)
  ? _$ref(() => _ref$2, _el$13)
  : (refTarget = _el$13);
const template8 = _el$13;
var _el$14 = _$getNextElement(_tmpl$4);
_$ref(() => e => console.log(e), _el$14);
const template9 = _el$14;
var _el$15 = _$getNextElement(_tmpl$4);
var _ref$3 = refFactory();
(typeof _ref$3 === "function" || Array.isArray(_ref$3)) && _$ref(() => _ref$3, _el$15);
const template10 = _el$15;
var _el$16 = _$getNextElement(_tmpl$7);
_el$16.htmlFor = thing;
_el$16.number = 123;
const template12 = _el$16;
const template13 = _$getNextElement(_tmpl$8);
var _el$18 = _$getNextElement(_tmpl$9);
_$effect(
  () => state.visible,
  _v$ => {
    _el$18.checked = _v$;
  }
);
const template14 = _el$18;
const template15 = _$getNextElement(_tmpl$0);
const template16 = _$getNextElement(_tmpl$1);
var _el$21 = _$getNextElement(_tmpl$10);
_$addEventListener(_el$21, "click", increment, true);
_$runHydrationEvents();
const template17 = _el$21;
var _el$22 = _$getNextElement(_tmpl$4);
_$spread(
  _el$22,
  _$mergeProps(() => ({
    get [key()]() {
      return props.value;
    }
  })),
  false
);
_$runHydrationEvents();
const template18 = _el$22;
var _el$23 = _$getNextElement(_tmpl$4);
_$className(_el$23, [
  {
    "bg-red-500": true
  },
  "flex flex-col"
]);
const template19 = _el$23;
var _el$24 = _$getNextElement(_tmpl$11),
  _el$25 = _el$24.firstChild,
  _el$26 = _el$25.nextSibling;
_$addEventListener(_el$25, "input", doSomething, true);
_$addEventListener(_el$26, "input", doSomethingElse, true);
_$setAttribute(_el$26, "readonly", value);
_$effect(
  () => ({
    e: s(),
    t: min(),
    a: max(),
    o: s2(),
    i: min(),
    n: max()
  }),
  ({ e, t, a, o, i, n }, _p$) => {
    _el$25.value = e ?? "";
    t !== _p$?.t && _$setAttribute(_el$25, "min", t);
    a !== _p$?.a && _$setAttribute(_el$25, "max", a);
    _el$26.checked = o;
    i !== _p$?.i && _$setAttribute(_el$26, "min", i);
    n !== _p$?.n && _$setAttribute(_el$26, "max", n);
  }
);
_$runHydrationEvents();
const template20 = _el$24;
var _el$27 = _$getNextElement(_tmpl$12);
_$effect(
  () => ({
    ...rest
  }),
  (_v$, _$p) => {
    _$style(_el$27, _v$, _$p);
  }
);
const template21 = _el$27;
const template22 = _$getNextElement(_tmpl$13);
var _el$29 = _$getNextElement(_tmpl$4);
_$insert(_el$29, () => "t" in test && "true");
_$effect(
  () => "t" in test,
  _v$ => {
    _$setAttribute(_el$29, "disabled", _v$);
  }
);
const template23 = _el$29;
var _el$30 = _$getNextElement(_tmpl$14);
_$spread(
  _el$30,
  _$mergeProps(props, {
    something: true
  }),
  false
);
_$runHydrationEvents();
const template24 = _el$30;
var _el$31 = _$getNextElement(_tmpl$15),
  _el$33 = _el$31.firstChild,
  [_el$34, _co$] = _$getNextMarker(_el$33.nextSibling),
  _el$32 = _el$34.nextSibling;
_$insert(_el$31, () => props.children, _el$34, _co$);
_$spread(
  _el$32,
  _$mergeProps(props, {
    something: true
  }),
  false
);
_$runHydrationEvents();
const template25 = _el$31;
var _el$35 = _$getNextElement(_tmpl$16);
_$spread(
  _el$35,
  _$mergeProps(
    {
      start: "Hi",
      middle: middle
    },
    spread
  ),
  true
);
_$runHydrationEvents();
const template26 = _el$35;
var _el$36 = _$getNextElement(_tmpl$16);
_$spread(
  _el$36,
  _$mergeProps(
    {
      start: "Hi"
    },
    first,
    {
      middle: middle
    },
    second
  ),
  true
);
_$runHydrationEvents();
const template27 = _el$36;
var _el$37 = _$getNextElement(_tmpl$17),
  _el$38 = _el$37.firstChild,
  _el$39 = _el$38.firstChild,
  _el$40 = _el$39.nextSibling,
  [_el$41, _co$2] = _$getNextMarker(_el$40.nextSibling),
  _el$42 = _el$38.nextSibling,
  _el$43 = _el$42.nextSibling;
_$spread(_el$37, _$mergeProps(api), true);
_$spread(_el$38, _$mergeProps(api), true);
_$insert(_el$38, () => (api() ? "checked" : "unchecked"), _el$41, _co$2);
_$spread(_el$42, _$mergeProps(api), false);
_$spread(_el$43, _$mergeProps(api), false);
_$runHydrationEvents();
const template28 = _el$37;
var _el$44 = _$getNextElement(_tmpl$4);
_$setAttribute(_el$44, "attribute", !!someValue);
_$insert(_el$44, !!someValue);
const template29 = _el$44;
const template30 = _$getNextElement(_tmpl$18);
var _el$46 = _$getNextElement(_tmpl$4);
_$effect(
  () => getStore.itemProperties.color,
  _v$ => {
    _$setStyleProperty(_el$46, "background-color", _v$);
  }
);
const template31 = _el$46;
const template32 = _$getNextElement(_tmpl$4);
const template33 = [
  (() => {
    var _el$48 = _$getNextElement(_tmpl$19);
    _$effect(
      () => styles.button,
      (_v$, _$p) => {
        _$className(_el$48, _v$, _$p);
      }
    );
    return _el$48;
  })(),
  (() => {
    var _el$49 = _$getNextElement(_tmpl$19);
    _$effect(
      () => styles["foo--bar"],
      (_v$, _$p) => {
        _$className(_el$49, _v$, _$p);
      }
    );
    return _el$49;
  })(),
  (() => {
    var _el$50 = _$getNextElement(_tmpl$19);
    _$effect(
      () => styles.foo.bar,
      (_v$, _$p) => {
        _$className(_el$50, _v$, _$p);
      }
    );
    return _el$50;
  })(),
  (() => {
    var _el$51 = _$getNextElement(_tmpl$19);
    _$effect(
      () => styles[foo()],
      (_v$, _$p) => {
        _$className(_el$51, _v$, _$p);
      }
    );
    return _el$51;
  })()
];
var _el$52 = _$getNextElement(_tmpl$4);
var _ref$4 = a().b.c;
typeof _ref$4 === "function" || Array.isArray(_ref$4)
  ? _$ref(() => _ref$4, _el$52)
  : (a().b.c = _el$52);
const template35 = _el$52;
var _el$53 = _$getNextElement(_tmpl$4);
var _ref$5 = a().b?.c;
(typeof _ref$5 === "function" || Array.isArray(_ref$5)) && _$ref(() => _ref$5, _el$53);
const template36 = _el$53;
var _el$54 = _$getNextElement(_tmpl$4);
var _ref$6 = a() ? b : c;
(typeof _ref$6 === "function" || Array.isArray(_ref$6)) && _$ref(() => _ref$6, _el$54);
const template37 = _el$54;
var _el$55 = _$getNextElement(_tmpl$4);
var _ref$7 = a() ?? b;
(typeof _ref$7 === "function" || Array.isArray(_ref$7)) && _$ref(() => _ref$7, _el$55);
const template38 = _el$55;
const template39 = _$getNextElement(_tmpl$20);
var _el$57 = _$getNextElement(_tmpl$4);
_$effect(
  () => a(),
  _v$ => {
    _$setStyleProperty(_el$57, "color", _v$);
  }
);
const template40 = _el$57;
var _el$58 = _$getNextElement(_tmpl$21),
  _el$59 = _el$58.firstChild,
  _el$60 = _el$59.nextSibling;
_$effect(
  () => ({
    e: state.color,
    t: Color.Red,
    a: Color.Blue
  }),
  ({ e, t, a }, _p$) => {
    queueMicrotask(() => (_el$58.value = e)) || (_el$58.value = e);
    _el$59.value = t;
    _el$60.value = a;
  }
);
const template41 = _el$58;
const template42 = _$getNextElement(_tmpl$22);
const template43 = _$getNextElement(_tmpl$23);
const template44 = _$getNextElement(_tmpl$24);
const template45 = _$getNextElement(_tmpl$25);
const template46 = _$getNextElement(_tmpl$26);
const template47 = _$getNextElement(_tmpl$27);
const template48 = _$getNextElement(_tmpl$28);
const template49 = _$getNextElement(_tmpl$29);
const template50 = _$getNextElement(_tmpl$30);
var _el$70 = _$getNextElement(_tmpl$4);
_$ref(() => binding, _el$70);
const template51 = _el$70;
var _el$71 = _$getNextElement(_tmpl$4);
var _ref$8 = binding.prop;
typeof _ref$8 === "function" || Array.isArray(_ref$8)
  ? _$ref(() => _ref$8, _el$71)
  : (binding.prop = _el$71);
const template52 = _el$71;
var _el$72 = _$getNextElement(_tmpl$4);
var _ref$9 = refFn;
typeof _ref$9 === "function" || Array.isArray(_ref$9)
  ? _$ref(() => _ref$9, _el$72)
  : (refFn = _el$72);
const template53 = _el$72;
var _el$73 = _$getNextElement(_tmpl$4);
_$ref(() => refConst, _el$73);
const template54 = _el$73;
var _el$74 = _$getNextElement(_tmpl$4);
var _ref$0 = refUnknown;
typeof _ref$0 === "function" || Array.isArray(_ref$0)
  ? _$ref(() => _ref$0, _el$74)
  : (refUnknown = _el$74);
const template55 = _el$74;
const template56 = _$getNextElement(_tmpl$31);
const template57 = _$getNextElement(_tmpl$32);
var _el$77 = _$getNextElement(_tmpl$4);
_el$77.true = true;
_el$77.false = false;
const template58 = _el$77;
const template59 = _$getNextElement(_tmpl$33);
var _el$79 = _$getNextElement(_tmpl$34);
_$setAttribute(_el$79, "i", undefined);
_$setAttribute(_el$79, "j", null);
_$setAttribute(_el$79, "k", void 0);
const template60 = _el$79;
const template61 = _$getNextElement(_tmpl$35);
const template62 = _$getNextElement(_tmpl$36);
const template63 = _$getNextElement(_tmpl$37);
const template64 = _$getNextElement(_tmpl$38);
const template65 = _$getNextElement(_tmpl$39);
var _el$85 = _$getNextElement(_tmpl$39);
_$effect(
  () => signal(),
  _v$ => {
    _$setStyleProperty(_el$85, "border", _v$);
  }
);
const template66 = _el$85;
var _el$86 = _$getNextElement(_tmpl$39);
_$setStyleProperty(_el$86, "border", somevalue);
const template67 = _el$86;
var _el$87 = _$getNextElement(_tmpl$39);
_$effect(
  () => some.access,
  _v$ => {
    _$setStyleProperty(_el$87, "border", _v$);
  }
);
const template68 = _el$87;
const template69 = _$getNextElement(_tmpl$39);
var _el$89 = _$getNextElement(_tmpl$40);
_$setAttribute(_el$89, "playsinline", value);
const template70 = _el$89;
const template71 = _$getNextElement(_tmpl$41);
const template72 = _$getNextElement(_tmpl$40);
const template73 = _$getNextElement(_tmpl$42);
const template74 = _$getNextElement(_tmpl$43);
var _el$94 = _$getNextElement(_tmpl$40);
_el$94.poster = "1.jpg";
const template75 = _el$94;
var _el$95 = _$getNextElement(_tmpl$44),
  _el$96 = _el$95.firstChild;
_el$96.poster = "1.jpg";
const template76 = _el$95;

// ONCE TESTS
var _el$97 = _$getNextElement(_tmpl$4);
_$effect(
  () => ({
    e: /*@once*/ props.width,
    t: props.height
  }),
  ({ e, t }, _p$) => {
    e !== _p$?.e && _$setStyleProperty(_el$97, "width", e);
    t !== _p$?.t && _$setStyleProperty(_el$97, "height", t);
  }
);
const template77 = _el$97;
var _el$98 = _$getNextElement(_tmpl$4);
_$effect(
  () => ({
    e: /*@once*/ props.width,
    t: props.height,
    a: color()
  }),
  ({ e, t, a }, _p$) => {
    e !== _p$?.e && _$setStyleProperty(_el$98, "width", e);
    t !== _p$?.t && _$setStyleProperty(_el$98, "height", t);
    a !== _p$?.a && _$setAttribute(_el$98, "something", a);
  }
);
const template78 = _el$98;
var _el$99 = _$getNextElement(_tmpl$4);
_$effect(
  () => ({
    e: props.width,
    t: /* @once */ props.height,
    a: /*@once*/ color()
  }),
  ({ e, t, a }, _p$) => {
    e !== _p$?.e && _$setStyleProperty(_el$99, "width", e);
    t !== _p$?.t && _$setStyleProperty(_el$99, "height", t);
    a !== _p$?.a && _$setAttribute(_el$99, "something", a);
  }
);
const template79 = _el$99;

// ONCE TESTS SPREADS

const propsSpread = {
  something: color(),
  style: {
    "background-color": color(),
    color: /* @once*/ color(),
    "margin-right": /* @once */ props.right
  }
};
var _el$100 = _$getNextElement(_tmpl$4);
_$spread(_el$100, propsSpread, false);
_$runHydrationEvents();
const template80 = _el$100;
var _el$101 = _$getNextElement(_tmpl$4);
_$spread(_el$101, propsSpread, false);
_$runHydrationEvents();
const template81 = _el$101;
var _el$102 = _$getNextElement(_tmpl$4);
_$spread(
  _el$102,
  _$mergeProps(propsSpread, {
    get ["data-dynamic"]() {
      return color();
    },
    get ["data-static"]() {
      return /* @once */ color();
    }
  }),
  false
);
_$runHydrationEvents();
const template82 = _el$102;
var _el$103 = _$getNextElement(_tmpl$4);
_$spread(
  _el$103,
  _$mergeProps(propsSpread, {
    get ["data-dynamic"]() {
      return color();
    },
    get ["data-static"]() {
      return /* @once */ color();
    }
  }),
  false
);
_$runHydrationEvents();
const template83 = _el$103;
var _el$104 = _$getNextElement(_tmpl$4);
_$spread(
  _el$104,
  _$mergeProps(propsSpread1, propsSpread2, propsSpread3, {
    get ["data-dynamic"]() {
      return color();
    },
    get ["data-static"]() {
      return /* @once */ color();
    }
  }),
  false
);
_$runHydrationEvents();
const template84 = _el$104;

// ONCE PROPERTY OF OBJECT ACCESS

// https://github.com/ryansolid/dom-expressions/issues/252#issuecomment-1572220563
const styleProp = {
  style: {
    width: props.width,
    height: props.height
  }
};
var _el$105 = _$getNextElement(_tmpl$4);
_$effect(
  () => /* @once */ styleProp.style,
  (_v$, _$p) => {
    _$style(_el$105, _v$, _$p);
  }
);
const template85 = _el$105;
var _el$106 = _$getNextElement(_tmpl$4);
_$effect(
  () => styleProp.style,
  (_v$, _$p) => {
    _$style(_el$106, _v$, _$p);
  }
);
const template86 = _el$106;
const style = {
  background: "red",
  border: "solid black " + count() + "px"
};
var _el$107 = _$getNextElement(_tmpl$45);
_$insert(_el$107, count);
_$effect(
  () => ({
    e: count(),
    t: style,
    a: style
  }),
  ({ e, t, a }, _p$) => {
    e !== _p$?.e && _$setAttribute(_el$107, "aria-label", e);
    _$style(_el$107, t, _p$?.t);
    _$className(_el$107, a, _p$?.a);
  }
);
const template87 = _el$107;
var _el$108 = _$getNextElement(_tmpl$45);
_$insert(_el$108, count);
_$effect(
  () => ({
    e: count(),
    t: /* @once*/ style,
    a: /* @once*/ style
  }),
  ({ e, t, a }, _p$) => {
    e !== _p$?.e && _$setAttribute(_el$108, "aria-label", e);
    _$style(_el$108, t, _p$?.t);
    _$className(_el$108, a, _p$?.a);
  }
);
const template88 = _el$108;
const template89 = _$getNextElement(_tmpl$46);
var _el$110 = _$getNextElement(_tmpl$47);
_$effect(
  () => !!isActive(),
  _v$ => {
    _el$110.classList.toggle("active", _v$);
  }
);
const template90 = _el$110;
var _el$111 = _$getNextElement(_tmpl$4);
_$effect(
  () => ["todo", props.active],
  (_v$, _$p) => {
    _$className(_el$111, _v$, _$p);
  }
);
const template91 = _el$111;
var _el$112 = _$getNextElement(_tmpl$48);
_$effect(
  () => !!isActive(),
  _v$ => {
    _el$112.classList.toggle("active", _v$);
  }
);
const template92 = _el$112;
var _el$113 = _$getNextElement(_tmpl$4);
_$effect(
  () => [
    "todo",
    {
      active: isActive(),
      [props.name]: props.enabled
    }
  ],
  (_v$, _$p) => {
    _$className(_el$113, _v$, _$p);
  }
);
const template93 = _el$113;
var _el$114 = _$getNextElement(_tmpl$4);
_$effect(
  () => [
    "todo",
    {
      active: isActive()
    },
    props.extra
  ],
  (_v$, _$p) => {
    _$className(_el$114, _v$, _$p);
  }
);
const template94 = _el$114;
var _el$115 = _$getNextElement(_tmpl$4);
_$effect(
  () => [
    "todo",
    "item",
    {
      todo: false,
      active: isActive()
    }
  ],
  (_v$, _$p) => {
    _$className(_el$115, _v$, _$p);
  }
);
const template95 = _el$115;
_$delegateEvents(["click", "input"]);
