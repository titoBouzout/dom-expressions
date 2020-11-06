import { assignProps as _$assignProps } from "r-server";
import { dynamicProperty as _$dynamicProperty } from "r-server";
import { ssrSpread as _$ssrSpread } from "r-server";
import { escape as _$escape } from "r-server";
import { createComponent as _$createComponent } from "r-server";
import { ssr as _$ssr } from "r-server";
import { getHydrationKey as _$getHydrationKey } from "r-server";

const children = _$ssr(['<div data-hk="', '"></div>'], _$getHydrationKey());

const dynamic = {
  children
};

const template = _$createComponent(Module, {
  children: children
});

const template2 = _$ssr(
  ['<module data-hk="', '">', "</module>"],
  _$getHydrationKey(),
  _$escape(children)
);

const template3 = _$ssr(['<module data-hk="', '">Hello</module>'], _$getHydrationKey());

const template4 = _$ssr(
  ['<module data-hk="', '">', "</module>"],
  _$getHydrationKey(),
  _$createComponent(Hello, {})
);

const template5 = _$ssr(
  ['<module data-hk="', '">', "</module>"],
  _$getHydrationKey(),
  _$escape(dynamic.children)
);

const template6 = _$createComponent(Module, {
  get children() {
    return dynamic.children;
  }
});

const template7 = _$ssr(
  ['<module data-hk="', '" ', "></module>"],
  _$getHydrationKey(),
  _$ssrSpread(dynamic, false, false)
);

const template8 = _$ssr(
  ['<module data-hk="', '" ', ">Hello</module>"],
  _$getHydrationKey(),
  _$ssrSpread(dynamic, false, true)
);

const template9 = _$ssr(
  ['<module data-hk="', '" ', ">", "</module>"],
  _$getHydrationKey(),
  _$ssrSpread(dynamic, false, true),
  _$escape(dynamic.children)
);

const template10 = _$createComponent(
  Module,
  _$assignProps(
    Object.keys(dynamic).reduce(
      (m$, k$) => ((m$[k$] = () => dynamic[k$]), _$dynamicProperty(m$, k$)),
      {}
    ),
    {
      children: "Hello"
    }
  )
);

const template11 = _$ssr(
  ['<module data-hk="', '">', "</module>"],
  _$getHydrationKey(),
  _$escape(state.children)
);

const template12 = _$createComponent(Module, {
  children: state.children
});
