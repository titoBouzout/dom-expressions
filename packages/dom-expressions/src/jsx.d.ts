import * as csstype from "csstype";

/**
 * Based on JSX types for Surplus and Inferno and adapted for `dom-expressions`.
 *
 * https://github.com/adamhaile/surplus/blob/master/index.d.ts
 * https://github.com/infernojs/inferno/blob/master/packages/inferno/src/core/types.ts
 *
 * MathML typings coming mostly from Preact
 * https://github.com/preactjs/preact/blob/07dc9f324e58569ce66634aa03fe8949b4190358/src/jsx.d.ts#L2575
 *
 * Checked against other frameworks via the following table:
 * https://github.com/potahtml/namespace-jsx-project/blob/master/jsx/readme.md
 *
 * Note: Typings must include attributes and not properties (unless the property is special-cased,
 * such textContent, event handlers, etc).
 */
type DOMElement = Element;

export namespace JSX {
  type Element = Node | ArrayElement | (string & {}) | number | boolean | null | undefined;
  interface ArrayElement extends Array<Element> {}
  interface ElementClass {
    // empty, libs can define requirements downstream
  }
  interface ElementAttributesProperty {
    // empty, libs can define requirements downstream
  }
  interface ElementChildrenAttribute {
    children: {};
  }
  interface EventHandler<T, E extends Event> {
    (
      e: E & {
        currentTarget: T;
        target: DOMElement;
      }
    ): void;
  }

  interface BoundEventHandler<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>
  > {
    0: (data: any, ...e: Parameters<EHandler>) => void;
    1: any;
  }
  type EventHandlerUnion<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>
  > = EHandler | BoundEventHandler<T, E, EHandler>;

  interface EventHandlerWithOptions<T, E extends Event, EHandler = EventHandler<T, E>>
    extends AddEventListenerOptions {
    handleEvent: EHandler;
  }

  type EventHandlerWithOptionsUnion<
    T,
    E extends Event,
    EHandler extends EventHandler<T, any> = EventHandler<T, E>
  > = EHandler | EventHandlerWithOptions<T, E, EHandler>;

  interface InputEventHandler<T, E extends InputEvent> {
    (
      e: E & {
        currentTarget: T;
        target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          ? T
          : DOMElement;
      }
    ): void;
  }
  type InputEventHandlerUnion<T, E extends InputEvent> = EventHandlerUnion<
    T,
    E,
    InputEventHandler<T, E>
  >;

  interface ChangeEventHandler<T, E extends Event> {
    (
      e: E & {
        currentTarget: T;
        target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          ? T
          : DOMElement;
      }
    ): void;
  }
  type ChangeEventHandlerUnion<T, E extends Event> = EventHandlerUnion<
    T,
    E,
    ChangeEventHandler<T, E>
  >;

  interface FocusEventHandler<T, E extends FocusEvent> {
    (
      e: E & {
        currentTarget: T;
        target: T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
          ? T
          : DOMElement;
      }
    ): void;
  }
  type FocusEventHandlerUnion<T, E extends FocusEvent> = EventHandlerUnion<
    T,
    E,
    FocusEventHandler<T, E>
  >;

  const SERIALIZABLE: unique symbol;
  interface SerializableAttributeValue {
    toString(): string;
    [SERIALIZABLE]: never;
  }

  interface IntrinsicAttributes {
    ref?: unknown | ((e: unknown) => void) | undefined;
  }
  interface CustomAttributes<T> {
    ref?: T | ((el: T) => void) | undefined;
    /** @deprecated Use `clsx` instead. https://www.npmjs.com/package/clsx */
    classList?:
      | {
          [k: string]: boolean | undefined;
        }
      | undefined;
    $ServerOnly?: boolean | undefined;
  }
  type Accessor<T> = () => T;
  interface Directives {}
  interface DirectiveFunctions {
    [x: string]: (el: DOMElement, accessor: Accessor<any>) => void;
  }
  interface ExplicitProperties {}
  interface ExplicitAttributes {}
  interface ExplicitBoolAttributes {}
  interface CustomEvents {}
  /** @deprecated Replaced by CustomEvents */
  interface CustomCaptureEvents {}
  type DirectiveAttributes = {
    [Key in keyof Directives as `use:${Key}`]?: Directives[Key];
  };
  type DirectiveFunctionAttributes<T> = {
    [K in keyof DirectiveFunctions as string extends K
      ? never
      : `use:${K}`]?: DirectiveFunctions[K] extends (
      el: infer E, // will be unknown if not provided
      ...rest: infer R // use rest so that we can check whether it's provided or not
    ) => void
      ? T extends E // everything extends unknown if E is unknown
        ? R extends [infer A] // check if has accessor provided
          ? A extends Accessor<infer V>
            ? V // it's an accessor
            : never // it isn't, type error
          : true // no accessor provided
        : never // T is the wrong element
      : never; // it isn't a function
  };
  type PropAttributes = {
    [Key in keyof ExplicitProperties as `prop:${Key}`]?: ExplicitProperties[Key];
  };
  type AttrAttributes = {
    [Key in keyof ExplicitAttributes as `attr:${Key}`]?: ExplicitAttributes[Key];
  };
  type BoolAttributes = {
    [Key in keyof ExplicitBoolAttributes as `bool:${Key}`]?: ExplicitBoolAttributes[Key];
  };
  type OnAttributes<T> = {
    [Key in keyof CustomEvents as `on:${Key}`]?: EventHandlerWithOptionsUnion<T, CustomEvents[Key]>;
  };
  type OnCaptureAttributes<T> = {
    [Key in keyof CustomCaptureEvents as `oncapture:${Key}`]?: EventHandler<
      T,
      CustomCaptureEvents[Key]
    >;
  };
  interface DOMAttributes<T>
    extends CustomAttributes<T>,
      DirectiveAttributes,
      DirectiveFunctionAttributes<T>,
      PropAttributes,
      AttrAttributes,
      BoolAttributes,
      OnAttributes<T>,
      OnCaptureAttributes<T>,
      CustomEventHandlersCamelCase<T>,
      CustomEventHandlersLowerCase<T>,
      CustomEventHandlersNamespaced<T> {
    children?: Element | undefined;
    innerHTML?: string | undefined;
    innerText?: string | number | undefined;
    textContent?: string | number | undefined;
    // camel case events
    onCopy?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    onCut?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    onPaste?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    onCompositionEnd?: EventHandlerUnion<T, CompositionEvent> | undefined;
    onCompositionStart?: EventHandlerUnion<T, CompositionEvent> | undefined;
    onCompositionUpdate?: EventHandlerUnion<T, CompositionEvent> | undefined;
    onFocusOut?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onFocusIn?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onEncrypted?: EventHandlerUnion<T, MediaEncryptedEvent> | undefined;
    onDragExit?: EventHandlerUnion<T, DragEvent> | undefined;
    // lower case events
    oncopy?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    oncut?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    onpaste?: EventHandlerUnion<T, ClipboardEvent> | undefined;
    oncompositionend?: EventHandlerUnion<T, CompositionEvent> | undefined;
    oncompositionstart?: EventHandlerUnion<T, CompositionEvent> | undefined;
    oncompositionupdate?: EventHandlerUnion<T, CompositionEvent> | undefined;
    onfocusout?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onfocusin?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onencrypted?: EventHandlerUnion<T, MediaEncryptedEvent> | undefined;
    ondragexit?: EventHandlerUnion<T, DragEvent> | undefined;
    // lower case events
    "on:copy"?: EventHandlerWithOptionsUnion<T, ClipboardEvent> | undefined;
    "on:cut"?: EventHandlerWithOptionsUnion<T, ClipboardEvent> | undefined;
    "on:paste"?: EventHandlerWithOptionsUnion<T, ClipboardEvent> | undefined;
    "on:compositionend"?: EventHandlerWithOptionsUnion<T, CompositionEvent> | undefined;
    "on:compositionstart"?: EventHandlerWithOptionsUnion<T, CompositionEvent> | undefined;
    "on:compositionupdate"?: EventHandlerWithOptionsUnion<T, CompositionEvent> | undefined;
    "on:focusout"?:
      | EventHandlerWithOptionsUnion<T, FocusEvent, FocusEventHandler<T, FocusEvent>>
      | undefined;
    "on:focusin"?:
      | EventHandlerWithOptionsUnion<T, FocusEvent, FocusEventHandler<T, FocusEvent>>
      | undefined;
    "on:encrypted"?: EventHandlerWithOptionsUnion<T, MediaEncryptedEvent> | undefined;
    "on:dragexit"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
  }
  interface CustomEventHandlersCamelCase<T> {
    onAbort?: EventHandlerUnion<T, UIEvent> | undefined;
    onAnimationEnd?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onAnimationIteration?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onAnimationStart?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onAuxClick?: EventHandlerUnion<T, MouseEvent> | undefined;
    onBeforeInput?: InputEventHandlerUnion<T, InputEvent> | undefined;
    onBeforeToggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
    onBlur?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onCanPlay?: EventHandlerUnion<T, Event> | undefined;
    onCanPlayThrough?: EventHandlerUnion<T, Event> | undefined;
    onChange?: ChangeEventHandlerUnion<T, Event> | undefined;
    onClick?: EventHandlerUnion<T, MouseEvent> | undefined;
    onContextMenu?: EventHandlerUnion<T, MouseEvent> | undefined;
    onDblClick?: EventHandlerUnion<T, MouseEvent> | undefined;
    onDrag?: EventHandlerUnion<T, DragEvent> | undefined;
    onDragEnd?: EventHandlerUnion<T, DragEvent> | undefined;
    onDragEnter?: EventHandlerUnion<T, DragEvent> | undefined;
    onDragLeave?: EventHandlerUnion<T, DragEvent> | undefined;
    onDragOver?: EventHandlerUnion<T, DragEvent> | undefined;
    onDragStart?: EventHandlerUnion<T, DragEvent> | undefined;
    onDrop?: EventHandlerUnion<T, DragEvent> | undefined;
    onDurationChange?: EventHandlerUnion<T, Event> | undefined;
    onEmptied?: EventHandlerUnion<T, Event> | undefined;
    onEnded?: EventHandlerUnion<T, Event> | undefined;
    onError?: EventHandlerUnion<T, ErrorEvent> | undefined;
    onFocus?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    onGotPointerCapture?: EventHandlerUnion<T, PointerEvent> | undefined;
    onInput?: InputEventHandlerUnion<T, InputEvent> | undefined;
    onInvalid?: EventHandlerUnion<T, Event> | undefined;
    onKeyDown?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onKeyPress?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onKeyUp?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onLoad?: EventHandlerUnion<T, Event> | undefined;
    onLoadedData?: EventHandlerUnion<T, Event> | undefined;
    onLoadedMetadata?: EventHandlerUnion<T, Event> | undefined;
    onLoadStart?: EventHandlerUnion<T, Event> | undefined;
    onLostPointerCapture?: EventHandlerUnion<T, PointerEvent> | undefined;
    onMouseDown?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseEnter?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseLeave?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseMove?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseOut?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseOver?: EventHandlerUnion<T, MouseEvent> | undefined;
    onMouseUp?: EventHandlerUnion<T, MouseEvent> | undefined;
    onPause?: EventHandlerUnion<T, Event> | undefined;
    onPlay?: EventHandlerUnion<T, Event> | undefined;
    onPlaying?: EventHandlerUnion<T, Event> | undefined;
    onPointerCancel?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerDown?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerEnter?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerLeave?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerMove?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerOut?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerOver?: EventHandlerUnion<T, PointerEvent> | undefined;
    onPointerUp?: EventHandlerUnion<T, PointerEvent> | undefined;
    onProgress?: EventHandlerUnion<T, ProgressEvent> | undefined;
    onRateChange?: EventHandlerUnion<T, Event> | undefined;
    onReset?: EventHandlerUnion<T, Event> | undefined;
    onScroll?: EventHandlerUnion<T, Event> | undefined;
    onScrollEnd?: EventHandlerUnion<T, Event> | undefined;
    onSeeked?: EventHandlerUnion<T, Event> | undefined;
    onSeeking?: EventHandlerUnion<T, Event> | undefined;
    onSelect?: EventHandlerUnion<T, Event> | undefined;
    onStalled?: EventHandlerUnion<T, Event> | undefined;
    onSubmit?: EventHandlerUnion<T, SubmitEvent> | undefined;
    onSuspend?: EventHandlerUnion<T, Event> | undefined;
    onTimeUpdate?: EventHandlerUnion<T, Event> | undefined;
    onToggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
    onTouchCancel?: EventHandlerUnion<T, TouchEvent> | undefined;
    onTouchEnd?: EventHandlerUnion<T, TouchEvent> | undefined;
    onTouchMove?: EventHandlerUnion<T, TouchEvent> | undefined;
    onTouchStart?: EventHandlerUnion<T, TouchEvent> | undefined;
    onTransitionStart?: EventHandlerUnion<T, TransitionEvent> | undefined;
    onTransitionEnd?: EventHandlerUnion<T, TransitionEvent> | undefined;
    onTransitionRun?: EventHandlerUnion<T, TransitionEvent> | undefined;
    onTransitionCancel?: EventHandlerUnion<T, TransitionEvent> | undefined;
    onVolumeChange?: EventHandlerUnion<T, Event> | undefined;
    onWaiting?: EventHandlerUnion<T, Event> | undefined;
    onWheel?: EventHandlerUnion<T, WheelEvent> | undefined;
  }
  /** @type {GlobalEventHandlers} */
  interface CustomEventHandlersLowerCase<T> {
    onabort?: EventHandlerUnion<T, UIEvent> | undefined;
    onanimationend?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onanimationiteration?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onanimationstart?: EventHandlerUnion<T, AnimationEvent> | undefined;
    onauxclick?: EventHandlerUnion<T, MouseEvent> | undefined;
    onbeforeinput?: InputEventHandlerUnion<T, InputEvent> | undefined;
    onbeforetoggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
    onblur?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    oncanplay?: EventHandlerUnion<T, Event> | undefined;
    oncanplaythrough?: EventHandlerUnion<T, Event> | undefined;
    onchange?: ChangeEventHandlerUnion<T, Event> | undefined;
    onclick?: EventHandlerUnion<T, MouseEvent> | undefined;
    oncontextmenu?: EventHandlerUnion<T, MouseEvent> | undefined;
    ondblclick?: EventHandlerUnion<T, MouseEvent> | undefined;
    ondrag?: EventHandlerUnion<T, DragEvent> | undefined;
    ondragend?: EventHandlerUnion<T, DragEvent> | undefined;
    ondragenter?: EventHandlerUnion<T, DragEvent> | undefined;
    ondragleave?: EventHandlerUnion<T, DragEvent> | undefined;
    ondragover?: EventHandlerUnion<T, DragEvent> | undefined;
    ondragstart?: EventHandlerUnion<T, DragEvent> | undefined;
    ondrop?: EventHandlerUnion<T, DragEvent> | undefined;
    ondurationchange?: EventHandlerUnion<T, Event> | undefined;
    onemptied?: EventHandlerUnion<T, Event> | undefined;
    onended?: EventHandlerUnion<T, Event> | undefined;
    onerror?: EventHandlerUnion<T, ErrorEvent> | undefined;
    onfocus?: FocusEventHandlerUnion<T, FocusEvent> | undefined;
    ongotpointercapture?: EventHandlerUnion<T, PointerEvent> | undefined;
    oninput?: InputEventHandlerUnion<T, InputEvent> | undefined;
    oninvalid?: EventHandlerUnion<T, Event> | undefined;
    onkeydown?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onkeypress?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onkeyup?: EventHandlerUnion<T, KeyboardEvent> | undefined;
    onload?: EventHandlerUnion<T, Event> | undefined;
    onloadeddata?: EventHandlerUnion<T, Event> | undefined;
    onloadedmetadata?: EventHandlerUnion<T, Event> | undefined;
    onloadstart?: EventHandlerUnion<T, Event> | undefined;
    onlostpointercapture?: EventHandlerUnion<T, PointerEvent> | undefined;
    onmousedown?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmouseenter?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmouseleave?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmousemove?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmouseout?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmouseover?: EventHandlerUnion<T, MouseEvent> | undefined;
    onmouseup?: EventHandlerUnion<T, MouseEvent> | undefined;
    onpause?: EventHandlerUnion<T, Event> | undefined;
    onplay?: EventHandlerUnion<T, Event> | undefined;
    onplaying?: EventHandlerUnion<T, Event> | undefined;
    onpointercancel?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerdown?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerenter?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerleave?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointermove?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerout?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerover?: EventHandlerUnion<T, PointerEvent> | undefined;
    onpointerup?: EventHandlerUnion<T, PointerEvent> | undefined;
    onprogress?: EventHandlerUnion<T, ProgressEvent> | undefined;
    onratechange?: EventHandlerUnion<T, Event> | undefined;
    onreset?: EventHandlerUnion<T, Event> | undefined;
    onscroll?: EventHandlerUnion<T, Event> | undefined;
    onscrollend?: EventHandlerUnion<T, Event> | undefined;
    onseeked?: EventHandlerUnion<T, Event> | undefined;
    onseeking?: EventHandlerUnion<T, Event> | undefined;
    onselect?: EventHandlerUnion<T, Event> | undefined;
    onstalled?: EventHandlerUnion<T, Event> | undefined;
    onsubmit?: EventHandlerUnion<T, SubmitEvent> | undefined;
    onsuspend?: EventHandlerUnion<T, Event> | undefined;
    ontimeupdate?: EventHandlerUnion<T, Event> | undefined;
    ontoggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
    ontouchcancel?: EventHandlerUnion<T, TouchEvent> | undefined;
    ontouchend?: EventHandlerUnion<T, TouchEvent> | undefined;
    ontouchmove?: EventHandlerUnion<T, TouchEvent> | undefined;
    ontouchstart?: EventHandlerUnion<T, TouchEvent> | undefined;
    ontransitionstart?: EventHandlerUnion<T, TransitionEvent> | undefined;
    ontransitionend?: EventHandlerUnion<T, TransitionEvent> | undefined;
    ontransitionrun?: EventHandlerUnion<T, TransitionEvent> | undefined;
    ontransitioncancel?: EventHandlerUnion<T, TransitionEvent> | undefined;
    onvolumechange?: EventHandlerUnion<T, Event> | undefined;
    onwaiting?: EventHandlerUnion<T, Event> | undefined;
    onwheel?: EventHandlerUnion<T, WheelEvent> | undefined;
  }
  interface CustomEventHandlersNamespaced<T> {
    "on:abort"?: EventHandlerWithOptionsUnion<T, UIEvent> | undefined;
    "on:animationend"?: EventHandlerWithOptionsUnion<T, AnimationEvent> | undefined;
    "on:animationiteration"?: EventHandlerWithOptionsUnion<T, AnimationEvent> | undefined;
    "on:animationstart"?: EventHandlerWithOptionsUnion<T, AnimationEvent> | undefined;
    "on:auxclick"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:beforeinput"?:
      | EventHandlerWithOptionsUnion<T, InputEvent, InputEventHandler<T, InputEvent>>
      | undefined;
    "on:beforetoggle"?: EventHandlerWithOptionsUnion<T, ToggleEvent> | undefined;
    "on:blur"?:
      | EventHandlerWithOptionsUnion<T, FocusEvent, FocusEventHandler<T, FocusEvent>>
      | undefined;
    "on:canplay"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:canplaythrough"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:change"?: EventHandlerWithOptionsUnion<T, Event, ChangeEventHandler<T, Event>> | undefined;
    "on:click"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:contextmenu"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:dblclick"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:drag"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:dragend"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:dragenter"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:dragleave"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:dragover"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:dragstart"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:drop"?: EventHandlerWithOptionsUnion<T, DragEvent> | undefined;
    "on:durationchange"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:emptied"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:ended"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:error"?: EventHandlerWithOptionsUnion<T, ErrorEvent> | undefined;
    "on:focus"?:
      | EventHandlerWithOptionsUnion<T, FocusEvent, FocusEventHandler<T, FocusEvent>>
      | undefined;
    "on:gotpointercapture"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:input"?:
      | EventHandlerWithOptionsUnion<T, InputEvent, InputEventHandler<T, InputEvent>>
      | undefined;
    "on:invalid"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:keydown"?: EventHandlerWithOptionsUnion<T, KeyboardEvent> | undefined;
    "on:keypress"?: EventHandlerWithOptionsUnion<T, KeyboardEvent> | undefined;
    "on:keyup"?: EventHandlerWithOptionsUnion<T, KeyboardEvent> | undefined;
    "on:load"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:loadeddata"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:loadedmetadata"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:loadstart"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:lostpointercapture"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:mousedown"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mouseenter"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mouseleave"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mousemove"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mouseout"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mouseover"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:mouseup"?: EventHandlerWithOptionsUnion<T, MouseEvent> | undefined;
    "on:pause"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:play"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:playing"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:pointercancel"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerdown"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerenter"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerleave"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointermove"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerout"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerover"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:pointerup"?: EventHandlerWithOptionsUnion<T, PointerEvent> | undefined;
    "on:progress"?: EventHandlerWithOptionsUnion<T, ProgressEvent> | undefined;
    "on:ratechange"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:reset"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:scroll"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:scrollend"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:seeked"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:seeking"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:select"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:stalled"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:submit"?: EventHandlerWithOptionsUnion<T, SubmitEvent> | undefined;
    "on:suspend"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:timeupdate"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:toggle"?: EventHandlerWithOptionsUnion<T, ToggleEvent> | undefined;
    "on:touchcancel"?: EventHandlerWithOptionsUnion<T, TouchEvent> | undefined;
    "on:touchend"?: EventHandlerWithOptionsUnion<T, TouchEvent> | undefined;
    "on:touchmove"?: EventHandlerWithOptionsUnion<T, TouchEvent> | undefined;
    "on:touchstart"?: EventHandlerWithOptionsUnion<T, TouchEvent> | undefined;
    "on:transitionstart"?: EventHandlerWithOptionsUnion<T, TransitionEvent> | undefined;
    "on:transitionend"?: EventHandlerWithOptionsUnion<T, TransitionEvent> | undefined;
    "on:transitionrun"?: EventHandlerWithOptionsUnion<T, TransitionEvent> | undefined;
    "on:transitioncancel"?: EventHandlerWithOptionsUnion<T, TransitionEvent> | undefined;
    "on:volumechange"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:waiting"?: EventHandlerWithOptionsUnion<T, Event> | undefined;
    "on:wheel"?: EventHandlerWithOptionsUnion<T, WheelEvent> | undefined;
  }

  interface CSSProperties extends csstype.PropertiesHyphen {
    // Override
    [key: `-${string}`]: string | number | undefined;
  }

  type HTMLAutocapitalize = "off" | "none" | "on" | "sentences" | "words" | "characters";
  type HTMLDir = "ltr" | "rtl" | "auto";
  type HTMLFormEncType = "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";
  type HTMLFormMethod = "post" | "get" | "dialog";
  type HTMLCrossorigin = "anonymous" | "use-credentials" | "";
  type HTMLReferrerPolicy =
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin"
    | "origin-when-cross-origin"
    | "same-origin"
    | "strict-origin"
    | "strict-origin-when-cross-origin"
    | "unsafe-url";
  type HTMLIframeSandbox =
    | "allow-downloads-without-user-activation"
    | "allow-downloads"
    | "allow-forms"
    | "allow-modals"
    | "allow-orientation-lock"
    | "allow-pointer-lock"
    | "allow-popups"
    | "allow-popups-to-escape-sandbox"
    | "allow-presentation"
    | "allow-same-origin"
    | "allow-scripts"
    | "allow-storage-access-by-user-activation"
    | "allow-top-navigation"
    | "allow-top-navigation-by-user-activation"
    | "allow-top-navigation-to-custom-protocols";
  type HTMLLinkAs =
    | "audio"
    | "document"
    | "embed"
    | "fetch"
    | "font"
    | "image"
    | "object"
    | "script"
    | "style"
    | "track"
    | "video"
    | "worker";

  // All the WAI-ARIA 1.1 attributes from https://www.w3.org/TR/wai-aria-1.1/
  interface AriaAttributes {
    /**
     * Identifies the currently active element when DOM focus is on a composite widget, textbox,
     * group, or application.
     */
    "aria-activedescendant"?: string | undefined;
    /**
     * Indicates whether assistive technologies will present all, or only parts of, the changed
     * region based on the change notifications defined by the aria-relevant attribute.
     */
    "aria-atomic"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates whether inputting text could trigger display of one or more predictions of the
     * user's intended value for an input and specifies how predictions would be presented if they
     * are made.
     */
    "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
    /**
     * Indicates an element is being modified and that assistive technologies MAY want to wait until
     * the modifications are complete before exposing them to the user.
     */
    "aria-busy"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.
     *
     * @see aria-pressed @see aria-selected.
     */
    "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
    /**
     * Defines the total number of columns in a table, grid, or treegrid.
     *
     * @see aria-colindex.
     */
    "aria-colcount"?: number | string | undefined;
    /**
     * Defines an element's column index or position with respect to the total number of columns
     * within a table, grid, or treegrid.
     *
     * @see aria-colcount @see aria-colspan.
     */
    "aria-colindex"?: number | string | undefined;
    /**
     * Defines the number of columns spanned by a cell or gridcell within a table, grid, or
     * treegrid.
     *
     * @see aria-colindex @see aria-rowspan.
     */
    "aria-colspan"?: number | string | undefined;
    /**
     * Identifies the element (or elements) whose contents or presence are controlled by the current
     * element.
     *
     * @see aria-owns.
     */
    "aria-controls"?: string | undefined;
    /**
     * Indicates the element that represents the current item within a container or set of related
     * elements.
     */
    "aria-current"?:
      | boolean
      | "false"
      | "true"
      | "page"
      | "step"
      | "location"
      | "date"
      | "time"
      | undefined;
    /**
     * Identifies the element (or elements) that describes the object.
     *
     * @see aria-labelledby
     */
    "aria-describedby"?: string | undefined;
    /**
     * Identifies the element that provides a detailed, extended description for the object.
     *
     * @see aria-describedby.
     */
    "aria-details"?: string | undefined;
    /**
     * Indicates that the element is perceivable but disabled, so it is not editable or otherwise
     * operable.
     *
     * @see aria-hidden @see aria-readonly.
     */
    "aria-disabled"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates what functions can be performed when a dragged object is released on the drop
     * target.
     *
     * @deprecated In ARIA 1.1
     */
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
    /**
     * Identifies the element that provides an error message for the object.
     *
     * @see aria-invalid @see aria-describedby.
     */
    "aria-errormessage"?: string | undefined;
    /**
     * Indicates whether the element, or another grouping element it controls, is currently expanded
     * or collapsed.
     */
    "aria-expanded"?: boolean | "false" | "true" | undefined;
    /**
     * Identifies the next element (or elements) in an alternate reading order of content which, at
     * the user's discretion, allows assistive technology to override the general default of reading
     * in document source order.
     */
    "aria-flowto"?: string | undefined;
    /**
     * Indicates an element's "grabbed" state in a drag-and-drop operation.
     *
     * @deprecated In ARIA 1.1
     */
    "aria-grabbed"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates the availability and type of interactive popup element, such as menu or dialog,
     * that can be triggered by an element.
     */
    "aria-haspopup"?:
      | boolean
      | "false"
      | "true"
      | "menu"
      | "listbox"
      | "tree"
      | "grid"
      | "dialog"
      | undefined;
    /**
     * Indicates whether the element is exposed to an accessibility API.
     *
     * @see aria-disabled.
     */
    "aria-hidden"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates the entered value does not conform to the format expected by the application.
     *
     * @see aria-errormessage.
     */
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    /**
     * Indicates keyboard shortcuts that an author has implemented to activate or give focus to an
     * element.
     */
    "aria-keyshortcuts"?: string | undefined;
    /**
     * Defines a string value that labels the current element.
     *
     * @see aria-labelledby.
     */
    "aria-label"?: string | undefined;
    /**
     * Identifies the element (or elements) that labels the current element.
     *
     * @see aria-describedby.
     */
    "aria-labelledby"?: string | undefined;
    /** Defines the hierarchical level of an element within a structure. */
    "aria-level"?: number | string | undefined;
    /**
     * Indicates that an element will be updated, and describes the types of updates the user
     * agents, assistive technologies, and user can expect from the live region.
     */
    "aria-live"?: "off" | "assertive" | "polite" | undefined;
    /** Indicates whether an element is modal when displayed. */
    "aria-modal"?: boolean | "false" | "true" | undefined;
    /** Indicates whether a text box accepts multiple lines of input or only a single line. */
    "aria-multiline"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates that the user may select more than one item from the current selectable
     * descendants.
     */
    "aria-multiselectable"?: boolean | "false" | "true" | undefined;
    /** Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. */
    "aria-orientation"?: "horizontal" | "vertical" | undefined;
    /**
     * Identifies an element (or elements) in order to define a visual, functional, or contextual
     * parent/child relationship between DOM elements where the DOM hierarchy cannot be used to
     * represent the relationship.
     *
     * @see aria-controls.
     */
    "aria-owns"?: string | undefined;
    /**
     * Defines a short hint (a word or short phrase) intended to aid the user with data entry when
     * the control has no value. A hint could be a sample value or a brief description of the
     * expected format.
     */
    "aria-placeholder"?: string | undefined;
    /**
     * Defines an element's number or position in the current set of listitems or treeitems. Not
     * required if all elements in the set are present in the DOM.
     *
     * @see aria-setsize.
     */
    "aria-posinset"?: number | string | undefined;
    /**
     * Indicates the current "pressed" state of toggle buttons.
     *
     * @see aria-checked @see aria-selected.
     */
    "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;
    /**
     * Indicates that the element is not editable, but is otherwise operable.
     *
     * @see aria-disabled.
     */
    "aria-readonly"?: boolean | "false" | "true" | undefined;
    /**
     * Indicates what notifications the user agent will trigger when the accessibility tree within a
     * live region is modified.
     *
     * @see aria-atomic.
     */
    "aria-relevant"?:
      | "additions"
      | "additions removals"
      | "additions text"
      | "all"
      | "removals"
      | "removals additions"
      | "removals text"
      | "text"
      | "text additions"
      | "text removals"
      | undefined;
    /** Indicates that user input is required on the element before a form may be submitted. */
    "aria-required"?: boolean | "false" | "true" | undefined;
    /** Defines a human-readable, author-localized description for the role of an element. */
    "aria-roledescription"?: string | undefined;
    /**
     * Defines the total number of rows in a table, grid, or treegrid.
     *
     * @see aria-rowindex.
     */
    "aria-rowcount"?: number | string | undefined;
    /**
     * Defines an element's row index or position with respect to the total number of rows within a
     * table, grid, or treegrid.
     *
     * @see aria-rowcount @see aria-rowspan.
     */
    "aria-rowindex"?: number | string | undefined;
    /**
     * Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
     *
     * @see aria-rowindex @see aria-colspan.
     */
    "aria-rowspan"?: number | string | undefined;
    /**
     * Indicates the current "selected" state of various widgets.
     *
     * @see aria-checked @see aria-pressed.
     */
    "aria-selected"?: boolean | "false" | "true" | undefined;
    /**
     * Defines the number of items in the current set of listitems or treeitems. Not required if all
     * elements in the set are present in the DOM.
     *
     * @see aria-posinset.
     */
    "aria-setsize"?: number | string | undefined;
    /** Indicates if items in a table or grid are sorted in ascending or descending order. */
    "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
    /** Defines the maximum allowed value for a range widget. */
    "aria-valuemax"?: number | string | undefined;
    /** Defines the minimum allowed value for a range widget. */
    "aria-valuemin"?: number | string | undefined;
    /**
     * Defines the current value for a range widget.
     *
     * @see aria-valuetext.
     */
    "aria-valuenow"?: number | string | undefined;
    /** Defines the human readable text alternative of aria-valuenow for a range widget. */
    "aria-valuetext"?: string | undefined;
    role?:
      | "alert"
      | "alertdialog"
      | "application"
      | "article"
      | "banner"
      | "button"
      | "cell"
      | "checkbox"
      | "columnheader"
      | "combobox"
      | "complementary"
      | "contentinfo"
      | "definition"
      | "dialog"
      | "directory"
      | "document"
      | "feed"
      | "figure"
      | "form"
      | "grid"
      | "gridcell"
      | "group"
      | "heading"
      | "img"
      | "link"
      | "list"
      | "listbox"
      | "listitem"
      | "log"
      | "main"
      | "marquee"
      | "math"
      | "menu"
      | "menubar"
      | "menuitem"
      | "menuitemcheckbox"
      | "menuitemradio"
      | "meter"
      | "navigation"
      | "none"
      | "note"
      | "option"
      | "presentation"
      | "progressbar"
      | "radio"
      | "radiogroup"
      | "region"
      | "row"
      | "rowgroup"
      | "rowheader"
      | "scrollbar"
      | "search"
      | "searchbox"
      | "separator"
      | "slider"
      | "spinbutton"
      | "status"
      | "switch"
      | "tab"
      | "table"
      | "tablist"
      | "tabpanel"
      | "term"
      | "textbox"
      | "timer"
      | "toolbar"
      | "tooltip"
      | "tree"
      | "treegrid"
      | "treeitem"
      | undefined;
  }

  // TODO: Should we allow this?
  // type ClassKeys = `class:${string}`;
  // type CSSKeys = Exclude<keyof csstype.PropertiesHyphen, `-${string}`>;

  // type CSSAttributes = {
  //   [key in CSSKeys as `style:${key}`]: csstype.PropertiesHyphen[key];
  // };

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // [key: ClassKeys]: boolean;
    accesskey?: string | undefined;
    class?: string | undefined;
    contenteditable?: boolean | "plaintext-only" | "inherit" | undefined;
    contextmenu?: string | undefined;
    dir?: HTMLDir | undefined;
    draggable?: boolean | "false" | "true" | undefined;
    hidden?: boolean | "hidden" | "until-found" | undefined;
    id?: string | undefined;
    is?: string | undefined;
    inert?: boolean | undefined;
    lang?: string | undefined;
    spellcheck?: boolean | undefined;
    style?: CSSProperties | string | undefined;
    tabindex?: number | string | undefined;
    title?: string | undefined;
    translate?: "yes" | "no" | undefined;
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any | undefined;
    popover?: boolean | "manual" | "auto" | undefined;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autocapitalize?: HTMLAutocapitalize | undefined;
    slot?: string | undefined;
    color?: string | undefined;
    itemprop?: string | undefined;
    itemscope?: boolean | undefined;
    itemtype?: string | undefined;
    itemid?: string | undefined;
    itemref?: string | undefined;
    part?: string | undefined;
    exportparts?: string | undefined;
    inputmode?:
      | "decimal"
      | "email"
      | "none"
      | "numeric"
      | "search"
      | "tel"
      | "text"
      | "url"
      | undefined;

    /** @deprecated Use lowercase attributes */
    accessKey?: string | undefined;
    /** @deprecated Use lowercase attributes */
    autoCapitalize?: HTMLAutocapitalize | undefined;
    /** @deprecated Use lowercase attributes */
    contentEditable?: boolean | "plaintext-only" | "inherit" | undefined;
    /** @deprecated Use lowercase attributes */
    contextMenu?: string | undefined;
    /** @deprecated Use lowercase attributes */
    exportParts?: string | undefined;
    /** @deprecated Use lowercase attributes */
    inputMode?:
      | "none"
      | "text"
      | "tel"
      | "url"
      | "email"
      | "numeric"
      | "decimal"
      | "search"
      | undefined;
    /** @deprecated Use lowercase attributes */
    itemId?: string | undefined;
    /** @deprecated Use lowercase attributes */
    itemProp?: string | undefined;
    /** @deprecated Use lowercase attributes */
    itemRef?: string | undefined;
    /** @deprecated Use lowercase attributes */
    itemScope?: boolean | undefined;
    /** @deprecated Use lowercase attributes */
    itemType?: string | undefined;
    /** @deprecated Use lowercase attributes */
    tabIndex?: number | string | undefined;
  }
  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    download?: string | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    ping?: string | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    rel?: string | undefined;
    target?: "_self" | "_blank" | "_parent" | "_top" | (string & {}) | undefined;
    type?: string | undefined;

    /** @experimental */
    attributionsrc?: string | undefined;

    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;

    /** @deprecated */
    charset?: string | undefined;
    /** @deprecated */
    coords?: string | undefined;
    /** @deprecated */
    name?: string | undefined;
    /** @deprecated */
    rev?: string | undefined;
    /** @deprecated */
    shape?: "rect" | "circle" | "poly" | "default" | undefined;
  }
  interface AudioHTMLAttributes<T> extends MediaHTMLAttributes<T> {}
  interface AreaHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string | undefined;
    coords?: string | undefined;
    download?: string | undefined;
    href?: string | undefined;
    ping?: string | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    rel?: string | undefined;
    shape?: "rect" | "circle" | "poly" | "default" | undefined;
    target?: "_self" | "_blank" | "_parent" | "_top" | (string & {}) | undefined;

    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;
  }
  interface BaseHTMLAttributes<T> extends HTMLAttributes<T> {
    href?: string | undefined;
    target?: "_self" | "_blank" | "_parent" | "_top" | (string & {}) | undefined;
  }
  interface BlockquoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
  }
  interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    autofocus?: boolean | undefined;
    command?:
      | "show-modal"
      | "close"
      | "show-popover"
      | "hide-popover"
      | "toggle-popover"
      | (string & {})
      | undefined;
    commandfor?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    formaction?: string | SerializableAttributeValue | undefined;
    formenctype?: HTMLFormEncType | undefined;
    formmethod?: HTMLFormMethod | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: "_self" | "_blank" | "_parent" | "_top" | (string & {}) | undefined;
    popovertarget?: string | undefined;
    popovertargetaction?: "hide" | "show" | "toggle" | undefined;
    name?: string | undefined;
    type?: "submit" | "reset" | "button" | "menu" | undefined;
    value?: string | undefined;

    /** @deprecated Use lowercase attributes */
    formAction?: string | SerializableAttributeValue | undefined;
    /** @deprecated Use lowercase attributes */
    formEnctype?: HTMLFormEncType | undefined;
    /** @deprecated Use lowercase attributes */
    formMethod?: HTMLFormMethod | undefined;
    /** @deprecated Use lowercase attributes */
    formNoValidate?: boolean | undefined;
    /** @deprecated Use lowercase attributes */
    formTarget?: string | undefined;
    /** @deprecated Use lowercase attributes */
    popoverTarget?: string | undefined;
    /** @deprecated Use lowercase attributes */
    popoverTargetAction?: "hide" | "show" | "toggle" | undefined;
  }
  interface CanvasHTMLAttributes<T> extends HTMLAttributes<T> {
    width?: number | string | undefined;
    height?: number | string | undefined;
  }
  interface ColHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number | string | undefined;

    /** @deprecated */
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    /** @deprecated */
    bgcolor?: string | undefined;
    /** @deprecated */
    char?: string | undefined;
    /** @deprecated */
    charoff?: string | undefined;
    /** @deprecated */
    valign?: "baseline" | "bottom" | "middle" | "top" | undefined;
    /** @deprecated */
    width?: number | string | undefined;
  }
  interface ColgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    span?: number | string | undefined;
  }
  interface DataHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: string | string[] | number | undefined;
  }
  interface DetailsHtmlAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
    open?: boolean | undefined;
    onToggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
    ontoggle?: EventHandlerUnion<T, ToggleEvent> | undefined;
  }
  interface DialogHtmlAttributes<T> extends HTMLAttributes<T> {
    open?: boolean | undefined;
    onClose?: EventHandlerUnion<T, Event> | undefined;
    onCancel?: EventHandlerUnion<T, Event> | undefined;
    tabindex?: never | undefined;
  }
  interface EmbedHTMLAttributes<T> extends HTMLAttributes<T> {
    height?: number | string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;

    /** @deprecated */
    align?: "left" | "right" | "justify" | "center" | undefined;
    /** @deprecated */
    name?: string | undefined;
  }
  interface FieldsetHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
  }
  interface FormHTMLAttributes<T> extends HTMLAttributes<T> {
    "accept-charset"?: string | undefined;
    action?: string | SerializableAttributeValue | undefined;
    autocomplete?: "on" | "off" | undefined;
    encoding?: HTMLFormEncType | undefined;
    enctype?: HTMLFormEncType | undefined;
    method?: HTMLFormMethod | undefined;
    name?: string | undefined;
    novalidate?: boolean | undefined;
    rel?: string | undefined;
    target?: "_self" | "_blank" | "_parent" | "_top" | (string & {}) | undefined;

    /** @deprecated Use lowercase attributes */
    noValidate?: boolean | undefined;

    /** @deprecated */
    accept?: string | undefined;
  }
  interface IframeHTMLAttributes<T> extends HTMLAttributes<T> {
    allow?: string | undefined;
    allowfullscreen?: boolean | undefined;
    height?: number | string | undefined;
    loading?: "eager" | "lazy" | undefined;
    name?: string | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    sandbox?: HTMLIframeSandbox | string | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    width?: number | string | undefined;

    /** @experimental */
    browsingtopics?: boolean | undefined;
    /** @experimental */
    credentialless?: boolean | undefined;
    /** @experimental */
    csp?: string | undefined;

    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;

    /** @deprecated */
    allowpaymentrequest?: boolean | undefined;
    /** @deprecated */
    allowtransparency?: boolean | undefined;
    /** @deprecated */
    align?: string | undefined;
    /** @deprecated */
    frameborder?: string | undefined;
    /** @deprecated */
    longdesc?: string | undefined;
    /** @deprecated */
    marginheight?: string | undefined;
    /** @deprecated */
    marginwidth?: string | undefined;
    /** @deprecated */
    scrolling?: "yes" | "no" | "auto" | undefined;

    /** @deprecated */
    seamless?: boolean | undefined;
  }
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    alt?: string | undefined;
    attributionsrc?: string | undefined;
    crossorigin?: HTMLCrossorigin | undefined;
    decoding?: "sync" | "async" | "auto" | undefined;
    height?: number | string | undefined;
    ismap?: boolean | undefined;
    loading?: "eager" | "lazy" | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcset?: string | undefined;
    usemap?: string | undefined;
    width?: number | string | undefined;
    elementtiming?: string | undefined;
    fetchpriority?: "high" | "low" | "auto" | undefined;

    /** @deprecated Use lowercase attributes */
    crossOrigin?: HTMLCrossorigin | undefined;
    /** @deprecated Use lowercase attributes */
    isMap?: boolean | undefined;
    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;
    /** @deprecated Use lowercase attributes */
    srcSet?: string | undefined;
    /** @deprecated Use lowercase attributes */
    useMap?: string | undefined;

    /** @deprecated */
    align?: "top" | "middle" | "bottom" | "left" | "right" | undefined;
    /** @deprecated */
    border?: string | undefined;
    /** @deprecated */
    hspace?: number | undefined;
    /** @deprecated */
    longdesc?: string | undefined;
    /** @deprecated */
    name?: string | undefined;
    /** @deprecated */
    vspace?: number | undefined;
  }
  interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    accept?: string | undefined;
    alt?: string | undefined;
    autocomplete?:
      | "additional-name"
      | "address-level1"
      | "address-level2"
      | "address-level3"
      | "address-level4"
      | "address-line1"
      | "address-line2"
      | "address-line3"
      | "bday"
      | "bday-day"
      | "bday-month"
      | "bday-year"
      | "billing"
      | "cc-additional-name"
      | "cc-csc"
      | "cc-exp"
      | "cc-exp-month"
      | "cc-exp-year"
      | "cc-family-name"
      | "cc-given-name"
      | "cc-name"
      | "cc-number"
      | "cc-type"
      | "country"
      | "country-name"
      | "current-password"
      | "email"
      | "family-name"
      | "fax"
      | "given-name"
      | "home"
      | "honorific-prefix"
      | "honorific-suffix"
      | "impp"
      | "language"
      | "mobile"
      | "name"
      | "new-password"
      | "nickname"
      | "off"
      | "on"
      | "organization"
      | "organization-title"
      | "pager"
      | "photo"
      | "postal-code"
      | "sex"
      | "shipping"
      | "street-address"
      | "tel"
      | "tel-area-code"
      | "tel-country-code"
      | "tel-extension"
      | "tel-local"
      | "tel-local-prefix"
      | "tel-local-suffix"
      | "tel-national"
      | "transaction-amount"
      | "transaction-currency"
      | "url"
      | "username"
      | "work"
      | (string & {})
      | undefined;
    autocorrect?: "on" | "off" | undefined;
    autofocus?: boolean | undefined;
    capture?: "user" | "environment" | undefined;
    checked?: boolean | undefined;
    crossorigin?: HTMLCrossorigin | undefined;
    dirname?: string | undefined;
    disabled?: boolean | undefined;
    enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
    form?: string | undefined;
    formaction?: string | SerializableAttributeValue | undefined;
    formenctype?: HTMLFormEncType | undefined;
    formmethod?: HTMLFormMethod | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    height?: number | string | undefined;
    incremental?: boolean | undefined;
    list?: string | undefined;
    max?: number | string | undefined;
    maxlength?: number | string | undefined;
    min?: number | string | undefined;
    minlength?: number | string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    popovertarget?: string | undefined;
    popovertargetaction?: "hide" | "show" | "toggle" | undefined;
    readonly?: boolean | undefined;
    required?: boolean | undefined;
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search#results
    results?: number | undefined;
    size?: number | string | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?:
      | "button"
      | "checkbox"
      | "color"
      | "date"
      | "datetime-local"
      | "email"
      | "file"
      | "hidden"
      | "image"
      | "month"
      | "number"
      | "password"
      | "radio"
      | "range"
      | "reset"
      | "search"
      | "submit"
      | "tel"
      | "text"
      | "time"
      | "url"
      | "week"
      | undefined;
    value?: string | string[] | number | undefined;
    width?: number | string | undefined;

    /** @deprecated Use lowercase attributes */
    crossOrigin?: HTMLCrossorigin | undefined;
    /** @deprecated Use lowercase attributes */
    formAction?: string | SerializableAttributeValue | undefined;
    /** @deprecated Use lowercase attributes */
    formEnctype?: HTMLFormEncType | undefined;
    /** @deprecated Use lowercase attributes */
    formMethod?: HTMLFormMethod | undefined;
    /** @deprecated Use lowercase attributes */
    formNoValidate?: boolean | undefined;
    /** @deprecated Use lowercase attributes */
    formTarget?: string | undefined;
    /** @deprecated Use lowercase attributes */
    maxLength?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    minLength?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    readOnly?: boolean | undefined;

    /** @deprecated */
    align?: string | undefined;
    /** @deprecated */
    usemap?: string | undefined;
  }
  interface ModHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
    datetime?: string | undefined;

    /** @deprecated Use lowercase attributes */
    dateTime?: string | undefined;
  }
  interface KeygenHTMLAttributes<T> extends HTMLAttributes<T> {
    /** @deprecated */
    autofocus?: boolean | undefined;
    /** @deprecated */
    challenge?: string | undefined;
    /** @deprecated */
    disabled?: boolean | undefined;
    /** @deprecated */
    form?: string | undefined;
    /** @deprecated */
    keyparams?: string | undefined;
    /** @deprecated */
    keytype?: string | undefined;
    /** @deprecated */
    name?: string | undefined;
  }
  interface LabelHTMLAttributes<T> extends HTMLAttributes<T> {
    for?: string | undefined;
    form?: string | undefined;
  }
  interface LiHTMLAttributes<T> extends HTMLAttributes<T> {
    value?: number | string | undefined;

    /** @deprecated */
    type?: "1" | "a" | "A" | "i" | "I" | undefined;
  }
  interface LinkHTMLAttributes<T> extends HTMLAttributes<T> {
    as?: HTMLLinkAs | undefined;
    crossorigin?: HTMLCrossorigin | undefined;
    disabled?: boolean | undefined;
    fetchpriority?: "high" | "low" | "auto" | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    imagesizes?: string | undefined;
    imagesrcset?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    rel?: string | undefined;
    sizes?: string | undefined;
    type?: string | undefined;

    /** @experimental */
    blocking?: "render" | undefined;

    /** @deprecated Use lowercase attributes */
    crossOrigin?: HTMLCrossorigin | undefined;
    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;

    /** @deprecated */
    charset?: string | undefined;
    /** @deprecated */
    rev?: string | undefined;
    /** @deprecated */
    target?: string | undefined;
  }
  interface MapHTMLAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
  }
  interface MediaHTMLAttributes<T> extends HTMLAttributes<T> {
    autoplay?: boolean | undefined;
    controls?: boolean | undefined;
    controlslist?: string | undefined;
    crossorigin?: HTMLCrossorigin | undefined;
    loop?: boolean | undefined;
    muted?: boolean | undefined;
    preload?: "none" | "metadata" | "auto" | "" | undefined;
    src?: string | undefined;

    /** @deprecated Use lowercase attributes */
    crossOrigin?: HTMLCrossorigin | undefined;
    /** @deprecated Use lowercase attributes */
    mediaGroup?: string | undefined;
    /** @deprecated */
    mediagroup?: string | undefined;
  }
  interface MenuHTMLAttributes<T> extends HTMLAttributes<T> {
    /** @deprecated */
    compact?: boolean | undefined;
    /** @deprecated */
    label?: string | undefined;
    /** @deprecated */
    type?: "context" | "toolbar" | undefined;
  }
  interface MetaHTMLAttributes<T> extends HTMLAttributes<T> {
    charset?: string | undefined;
    content?: string | undefined;
    "http-equiv"?:
      | "content-security-policy"
      | "content-type"
      | "default-style"
      | "x-ua-compatible"
      | "refresh"
      | undefined;
    name?: string | undefined;
    media?: string | undefined;

    /** @deprecated */
    scheme?: string | undefined;
  }
  interface MeterHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    high?: number | string | undefined;
    low?: number | string | undefined;
    max?: number | string | undefined;
    min?: number | string | undefined;
    optimum?: number | string | undefined;
    value?: string | string[] | number | undefined;
  }
  interface QuoteHTMLAttributes<T> extends HTMLAttributes<T> {
    cite?: string | undefined;
  }
  interface ObjectHTMLAttributes<T> extends HTMLAttributes<T> {
    data?: string | undefined;
    form?: string | undefined;
    height?: number | string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;

    /** @deprecated Use lowercase attributes */
    useMap?: string | undefined;

    /** @deprecated */
    align?: string | undefined;
    /** @deprecated */
    archive?: string | undefined;
    /** @deprecated */
    border?: string | undefined;
    /** @deprecated */
    classid?: string | undefined;
    /** @deprecated */
    code?: string | undefined;
    /** @deprecated */
    codebase?: string | undefined;
    /** @deprecated */
    codetype?: string | undefined;
    /** @deprecated */
    declare?: string | undefined;
    /** @deprecated */
    hspace?: string | undefined;
    /** @deprecated */
    standby?: string | undefined;
    /** @deprecated */
    usemap?: string | undefined;
    /** @deprecated */
    vspace?: string | undefined;
    /** @deprecated */
    typemustmatch?: boolean | undefined;
  }
  interface OlHTMLAttributes<T> extends HTMLAttributes<T> {
    reversed?: boolean | undefined;
    start?: number | string | undefined;
    type?: "1" | "a" | "A" | "i" | "I" | undefined;

    /** @deprecated */
    compact?: boolean | undefined;
  }
  interface OptgroupHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
  }
  interface OptionHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string | string[] | number | undefined;
  }
  interface OutputHTMLAttributes<T> extends HTMLAttributes<T> {
    form?: string | undefined;
    for?: string | undefined;
    name?: string | undefined;
  }
  interface ParamHTMLAttributes<T> extends HTMLAttributes<T> {
    /** @deprecated */
    name?: string | undefined;
    /** @deprecated */
    value?: string | number | undefined;
    /** @deprecated */
    type?: string | undefined;
    /** @deprecated */
    valuetype?: "data" | "ref" | "object" | undefined;
  }
  interface ProgressHTMLAttributes<T> extends HTMLAttributes<T> {
    max?: number | string | undefined;
    value?: string | string[] | number | undefined;
  }
  interface ScriptHTMLAttributes<T> extends HTMLAttributes<T> {
    async?: boolean | undefined;
    crossorigin?: HTMLCrossorigin | undefined;
    defer?: boolean | undefined;
    fetchpriority?: "high" | "low" | "auto" | undefined;
    integrity?: string | undefined;
    nomodule?: boolean | undefined;
    nonce?: string | undefined;
    referrerpolicy?: HTMLReferrerPolicy | undefined;
    src?: string | undefined;
    type?: "importmap" | "module" | "speculationrules" | (string & {}) | undefined;

    /** @experimental */
    attributionsrc?: string | undefined;
    /** @experimental */
    blocking?: boolean | undefined;

    /** @deprecated Use lowercase attributes */
    crossOrigin?: HTMLCrossorigin | undefined;
    /** @deprecated Use lowercase attributes */
    noModule?: boolean | undefined;
    /** @deprecated Use lowercase attributes */
    referrerPolicy?: HTMLReferrerPolicy | undefined;

    /** @deprecated */
    charset?: string | undefined;
    /** @deprecated */
    event?: string | undefined;
    /** @deprecated */
    language?: string | undefined;
  }
  interface SelectHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?: number | string | undefined;
    value?: string | string[] | number | undefined;
  }
  interface HTMLSlotElementAttributes<T> extends HTMLAttributes<T> {
    name?: string | undefined;
  }
  interface SourceHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcset?: string | undefined;
    type?: string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
  }
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    media?: string | undefined;
    nonce?: string | undefined;

    /** @experimental */
    blocking?: boolean | undefined;
    /** @deprecated */
    scoped?: boolean | undefined;
    /** @deprecated */
    type?: string | undefined;
  }
  interface TdHTMLAttributes<T> extends HTMLAttributes<T> {
    colspan?: number | string | undefined;
    headers?: string | undefined;
    rowspan?: number | string | undefined;

    /** @deprecated Use lowercase attributes */
    colSpan?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    rowSpan?: number | string | undefined;

    /** @deprecated */
    abbr?: string | undefined;
    /** @deprecated */
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    /** @deprecated */
    axis?: string | undefined;
    /** @deprecated */
    bgcolor?: string | undefined;
    /** @deprecated */
    char?: string | undefined;
    /** @deprecated */
    charoff?: string | undefined;
    /** @deprecated */
    height?: string | undefined;
    /** @deprecated */
    nowrap?: boolean | undefined;
    /** @deprecated */
    scope?: "col" | "row" | "rowgroup" | "colgroup" | undefined;
    /** @deprecated */
    valign?: "baseline" | "bottom" | "middle" | "top" | undefined;
    /** @deprecated */
    width?: number | string | undefined;
  }
  interface TemplateHTMLAttributes<T> extends HTMLAttributes<T> {
    shadowrootmode?: "open" | "closed" | undefined;
    shadowrootclonable?: boolean | undefined;
    shadowrootdelegatesfocus?: boolean | undefined;
    shadowrootserializable?: boolean | undefined;

    /** @deprecated */
    content?: DocumentFragment | undefined;
  }
  interface TextareaHTMLAttributes<T> extends HTMLAttributes<T> {
    autocomplete?:
      | "additional-name"
      | "address-level1"
      | "address-level2"
      | "address-level3"
      | "address-level4"
      | "address-line1"
      | "address-line2"
      | "address-line3"
      | "bday"
      | "bday-day"
      | "bday-month"
      | "bday-year"
      | "billing"
      | "cc-additional-name"
      | "cc-csc"
      | "cc-exp"
      | "cc-exp-month"
      | "cc-exp-year"
      | "cc-family-name"
      | "cc-given-name"
      | "cc-name"
      | "cc-number"
      | "cc-type"
      | "country"
      | "country-name"
      | "current-password"
      | "email"
      | "family-name"
      | "fax"
      | "given-name"
      | "home"
      | "honorific-prefix"
      | "honorific-suffix"
      | "impp"
      | "language"
      | "mobile"
      | "name"
      | "new-password"
      | "nickname"
      | "off"
      | "on"
      | "organization"
      | "organization-title"
      | "pager"
      | "photo"
      | "postal-code"
      | "sex"
      | "shipping"
      | "street-address"
      | "tel"
      | "tel-area-code"
      | "tel-country-code"
      | "tel-extension"
      | "tel-local"
      | "tel-local-prefix"
      | "tel-local-suffix"
      | "tel-national"
      | "transaction-amount"
      | "transaction-currency"
      | "url"
      | "username"
      | "work"
      | (string & {})
      | undefined;
    autocorrect?: "on" | "off" | undefined;
    autofocus?: boolean | undefined;
    cols?: number | string | undefined;
    dirname?: string | undefined;
    disabled?: boolean | undefined;
    enterkeyhint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
    form?: string | undefined;
    maxlength?: number | string | undefined;
    minlength?: number | string | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readonly?: boolean | undefined;
    required?: boolean | undefined;
    rows?: number | string | undefined;
    value?: string | string[] | number | undefined;
    wrap?: "hard" | "soft" | "off" | undefined;

    /** @deprecated Use lowercase attributes */
    maxLength?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    minLength?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    readOnly?: boolean | undefined;
  }
  interface ThHTMLAttributes<T> extends HTMLAttributes<T> {
    abbr?: string | undefined;
    colspan?: number | string | undefined;
    headers?: string | undefined;
    rowspan?: number | string | undefined;
    scope?: "col" | "row" | "rowgroup" | "colgroup" | undefined;

    /** @deprecated Use lowercase attributes */
    colSpan?: number | string | undefined;
    /** @deprecated Use lowercase attributes */
    rowSpan?: number | string | undefined;

    /** @deprecated */
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    /** @deprecated */
    axis?: string | undefined;
    /** @deprecated */
    bgcolor?: string | undefined;
    /** @deprecated */
    char?: string | undefined;
    /** @deprecated */
    charoff?: string | undefined;
    /** @deprecated */
    height?: string | undefined;
    /** @deprecated */
    nowrap?: boolean | undefined;
    /** @deprecated */
    valign?: "baseline" | "bottom" | "middle" | "top" | undefined;
    /** @deprecated */
    width?: number | string | undefined;
  }
  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    datetime?: string | undefined;

    /** @deprecated Use lowercase attributes */
    dateTime?: string | undefined;
  }
  interface TrackHTMLAttributes<T> extends HTMLAttributes<T> {
    default?: boolean | undefined;
    kind?: // MDN
    | "alternative"
      | "descriptions"
      | "main"
      | "main-desc"
      | "translation"
      | "commentary"
      // ??
      | "subtitles"
      | "captions"
      | "chapters"
      | "metadata"
      | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srclang?: string | undefined;
  }
  interface VideoHTMLAttributes<T> extends MediaHTMLAttributes<T> {
    height?: number | string | undefined;
    playsinline?: boolean | undefined;
    poster?: string | undefined;
    width?: number | string | undefined;
    disablepictureinpicture?: boolean | undefined;
    disableremoteplayback?: boolean | undefined;
  }

  interface WebViewHTMLAttributes<T> extends HTMLAttributes<T> {
    allowfullscreen?: boolean | undefined;
    allowpopups?: boolean | undefined;
    autofocus?: boolean | undefined;
    autosize?: boolean | undefined;
    blinkfeatures?: string | undefined;
    disableblinkfeatures?: string | undefined;
    disableguestresize?: boolean | undefined;
    disablewebsecurity?: boolean | undefined;
    guestinstance?: string | undefined;
    httpreferrer?: string | undefined;
    nodeintegration?: boolean | undefined;
    partition?: string | undefined;
    plugins?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
    useragent?: string | undefined;
    webpreferences?: string | undefined;
  }

  type SVGPreserveAspectRatio =
    | "none"
    | "xMinYMin"
    | "xMidYMin"
    | "xMaxYMin"
    | "xMinYMid"
    | "xMidYMid"
    | "xMaxYMid"
    | "xMinYMax"
    | "xMidYMax"
    | "xMaxYMax"
    | "xMinYMin meet"
    | "xMidYMin meet"
    | "xMaxYMin meet"
    | "xMinYMid meet"
    | "xMidYMid meet"
    | "xMaxYMid meet"
    | "xMinYMax meet"
    | "xMidYMax meet"
    | "xMaxYMax meet"
    | "xMinYMin slice"
    | "xMidYMin slice"
    | "xMaxYMin slice"
    | "xMinYMid slice"
    | "xMidYMid slice"
    | "xMaxYMid slice"
    | "xMinYMax slice"
    | "xMidYMax slice"
    | "xMaxYMax slice";
  type ImagePreserveAspectRatio =
    | SVGPreserveAspectRatio
    | "defer none"
    | "defer xMinYMin"
    | "defer xMidYMin"
    | "defer xMaxYMin"
    | "defer xMinYMid"
    | "defer xMidYMid"
    | "defer xMaxYMid"
    | "defer xMinYMax"
    | "defer xMidYMax"
    | "defer xMaxYMax"
    | "defer xMinYMin meet"
    | "defer xMidYMin meet"
    | "defer xMaxYMin meet"
    | "defer xMinYMid meet"
    | "defer xMidYMid meet"
    | "defer xMaxYMid meet"
    | "defer xMinYMax meet"
    | "defer xMidYMax meet"
    | "defer xMaxYMax meet"
    | "defer xMinYMin slice"
    | "defer xMidYMin slice"
    | "defer xMaxYMin slice"
    | "defer xMinYMid slice"
    | "defer xMidYMid slice"
    | "defer xMaxYMid slice"
    | "defer xMinYMax slice"
    | "defer xMidYMax slice"
    | "defer xMaxYMax slice";
  type SVGUnits = "userSpaceOnUse" | "objectBoundingBox";
  interface CoreSVGAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    id?: string | undefined;
    lang?: string | undefined;
    tabindex?: number | string | undefined;

    /** @deprecated Use lowercase attributes */
    tabIndex?: number | string | undefined;
  }
  interface StylableSVGAttributes {
    class?: string | undefined;
    style?: CSSProperties | string | undefined;
  }
  interface TransformableSVGAttributes {
    transform?: string | undefined;
  }
  interface ConditionalProcessingSVGAttributes {
    requiredExtensions?: string | undefined;
    requiredFeatures?: string | undefined;
    systemLanguage?: string | undefined;
  }
  interface ExternalResourceSVGAttributes {
    externalResourcesRequired?: "true" | "false" | undefined;
  }
  interface AnimationTimingSVGAttributes {
    begin?: string | undefined;
    dur?: string | undefined;
    end?: string | undefined;
    min?: string | undefined;
    max?: string | undefined;
    restart?: "always" | "whenNotActive" | "never" | undefined;
    repeatCount?: number | "indefinite" | undefined;
    repeatDur?: string | undefined;
    fill?: "freeze" | "remove" | undefined;
  }
  interface AnimationValueSVGAttributes {
    calcMode?: "discrete" | "linear" | "paced" | "spline" | undefined;
    values?: string | undefined;
    keyTimes?: string | undefined;
    keySplines?: string | undefined;
    from?: number | string | undefined;
    to?: number | string | undefined;
    by?: number | string | undefined;
  }
  interface AnimationAdditionSVGAttributes {
    attributeName?: string | undefined;
    additive?: "replace" | "sum" | undefined;
    accumulate?: "none" | "sum" | undefined;
  }
  interface AnimationAttributeTargetSVGAttributes {
    attributeName?: string | undefined;
    attributeType?: "CSS" | "XML" | "auto" | undefined;
  }
  interface PresentationSVGAttributes {
    "alignment-baseline"?:
      | "auto"
      | "baseline"
      | "before-edge"
      | "text-before-edge"
      | "middle"
      | "central"
      | "after-edge"
      | "text-after-edge"
      | "ideographic"
      | "alphabetic"
      | "hanging"
      | "mathematical"
      | "inherit"
      | undefined;
    "baseline-shift"?: number | string | undefined;
    clip?: string | undefined;
    "clip-path"?: string | undefined;
    "clip-rule"?: "nonzero" | "evenodd" | "inherit" | undefined;
    color?: string | undefined;
    "color-interpolation"?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
    "color-interpolation-filters"?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
    "color-profile"?: string | undefined;
    "color-rendering"?: "auto" | "optimizeSpeed" | "optimizeQuality" | "inherit" | undefined;
    cursor?: string | undefined;
    direction?: "ltr" | "rtl" | "inherit" | undefined;
    display?: string | undefined;
    "dominant-baseline"?:
      | "auto"
      | "text-bottom"
      | "alphabetic"
      | "ideographic"
      | "middle"
      | "central"
      | "mathematical"
      | "hanging"
      | "text-top"
      | "inherit"
      | undefined;
    "enable-background"?: string | undefined;
    fill?: string | undefined;
    "fill-opacity"?: number | string | "inherit" | undefined;
    "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined;
    filter?: string | undefined;
    "flood-color"?: string | undefined;
    "flood-opacity"?: number | string | "inherit" | undefined;
    "font-family"?: string | undefined;
    "font-size"?: string | undefined;
    "font-size-adjust"?: number | string | undefined;
    "font-stretch"?: string | undefined;
    "font-style"?: "normal" | "italic" | "oblique" | "inherit" | undefined;
    "font-variant"?: string | undefined;
    "font-weight"?: number | string | undefined;
    "glyph-orientation-horizontal"?: string | undefined;
    "glyph-orientation-vertical"?: string | undefined;
    "image-rendering"?: "auto" | "optimizeQuality" | "optimizeSpeed" | "inherit" | undefined;
    kerning?: string | undefined;
    "letter-spacing"?: number | string | undefined;
    "lighting-color"?: string | undefined;
    "marker-end"?: string | undefined;
    "marker-mid"?: string | undefined;
    "marker-start"?: string | undefined;
    mask?: string | undefined;
    opacity?: number | string | "inherit" | undefined;
    overflow?: "visible" | "hidden" | "scroll" | "auto" | "inherit" | undefined;
    pathLength?: string | number | undefined;
    "pointer-events"?:
      | "bounding-box"
      | "visiblePainted"
      | "visibleFill"
      | "visibleStroke"
      | "visible"
      | "painted"
      | "color"
      | "fill"
      | "stroke"
      | "all"
      | "none"
      | "inherit"
      | undefined;
    "shape-rendering"?:
      | "auto"
      | "optimizeSpeed"
      | "crispEdges"
      | "geometricPrecision"
      | "inherit"
      | undefined;
    "stop-color"?: string | undefined;
    "stop-opacity"?: number | string | "inherit" | undefined;
    stroke?: string | undefined;
    "stroke-dasharray"?: string | undefined;
    "stroke-dashoffset"?: number | string | undefined;
    "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | undefined;
    "stroke-linejoin"?: "arcs" | "bevel" | "miter" | "miter-clip" | "round" | "inherit" | undefined;
    "stroke-miterlimit"?: number | string | "inherit" | undefined;
    "stroke-opacity"?: number | string | "inherit" | undefined;
    "stroke-width"?: number | string | undefined;
    "text-anchor"?: "start" | "middle" | "end" | "inherit" | undefined;
    "text-decoration"?:
      | "none"
      | "underline"
      | "overline"
      | "line-through"
      | "blink"
      | "inherit"
      | undefined;
    "text-rendering"?:
      | "auto"
      | "optimizeSpeed"
      | "optimizeLegibility"
      | "geometricPrecision"
      | "inherit"
      | undefined;
    "unicode-bidi"?: string | undefined;
    visibility?: "visible" | "hidden" | "collapse" | "inherit" | undefined;
    "word-spacing"?: number | string | undefined;
    "writing-mode"?: "lr-tb" | "rl-tb" | "tb-rl" | "lr" | "rl" | "tb" | "inherit" | undefined;
  }
  interface AnimationElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      ConditionalProcessingSVGAttributes {}
  interface ContainerElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      Pick<
        PresentationSVGAttributes,
        | "clip-path"
        | "mask"
        | "cursor"
        | "opacity"
        | "filter"
        | "enable-background"
        | "color-interpolation"
        | "color-rendering"
      > {}
  interface FilterPrimitiveElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      Pick<PresentationSVGAttributes, "color-interpolation-filters"> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    result?: string | undefined;
  }
  interface SingleInputFilterSVGAttributes {
    in?: string | undefined;
  }
  interface DoubleInputFilterSVGAttributes {
    in?: string | undefined;
    in2?: string | undefined;
  }
  interface FitToViewBoxSVGAttributes {
    viewBox?: string | undefined;
    preserveAspectRatio?: SVGPreserveAspectRatio | undefined;
  }
  interface GradientElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes {
    gradientUnits?: SVGUnits | undefined;
    gradientTransform?: string | undefined;
    spreadMethod?: "pad" | "reflect" | "repeat" | undefined;
    href?: string | undefined;
  }
  interface GraphicsElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      Pick<
        PresentationSVGAttributes,
        | "clip-rule"
        | "mask"
        | "pointer-events"
        | "cursor"
        | "opacity"
        | "filter"
        | "display"
        | "visibility"
        | "color-interpolation"
        | "color-rendering"
      > {}
  interface LightSourceElementSVGAttributes<T> extends CoreSVGAttributes<T> {}
  interface NewViewportSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      Pick<PresentationSVGAttributes, "overflow" | "clip"> {
    viewBox?: string | undefined;
  }
  interface ShapeElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      Pick<
        PresentationSVGAttributes,
        | "color"
        | "fill"
        | "fill-rule"
        | "fill-opacity"
        | "stroke"
        | "stroke-width"
        | "stroke-linecap"
        | "stroke-linejoin"
        | "stroke-miterlimit"
        | "stroke-dasharray"
        | "stroke-dashoffset"
        | "stroke-opacity"
        | "shape-rendering"
        | "pathLength"
      > {}
  interface TextContentElementSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      Pick<
        PresentationSVGAttributes,
        | "font-family"
        | "font-style"
        | "font-variant"
        | "font-weight"
        | "font-stretch"
        | "font-size"
        | "font-size-adjust"
        | "kerning"
        | "letter-spacing"
        | "word-spacing"
        | "text-decoration"
        | "glyph-orientation-horizontal"
        | "glyph-orientation-vertical"
        | "direction"
        | "unicode-bidi"
        | "text-anchor"
        | "dominant-baseline"
        | "color"
        | "fill"
        | "fill-rule"
        | "fill-opacity"
        | "stroke"
        | "stroke-width"
        | "stroke-linecap"
        | "stroke-linejoin"
        | "stroke-miterlimit"
        | "stroke-dasharray"
        | "stroke-dashoffset"
        | "stroke-opacity"
      > {}
  interface ZoomAndPanSVGAttributes {
    zoomAndPan?: "disable" | "magnify" | undefined;
  }
  interface AnimateSVGAttributes<T>
    extends AnimationElementSVGAttributes<T>,
      AnimationAttributeTargetSVGAttributes,
      AnimationTimingSVGAttributes,
      AnimationValueSVGAttributes,
      AnimationAdditionSVGAttributes,
      Pick<PresentationSVGAttributes, "color-interpolation" | "color-rendering"> {}
  interface AnimateMotionSVGAttributes<T>
    extends AnimationElementSVGAttributes<T>,
      AnimationTimingSVGAttributes,
      AnimationValueSVGAttributes,
      AnimationAdditionSVGAttributes {
    path?: string | undefined;
    keyPoints?: string | undefined;
    rotate?: number | string | "auto" | "auto-reverse" | undefined;
    origin?: "default" | undefined;
  }
  interface AnimateTransformSVGAttributes<T>
    extends AnimationElementSVGAttributes<T>,
      AnimationAttributeTargetSVGAttributes,
      AnimationTimingSVGAttributes,
      AnimationValueSVGAttributes,
      AnimationAdditionSVGAttributes {
    type?: "translate" | "scale" | "rotate" | "skewX" | "skewY" | undefined;
  }
  interface CircleSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes {
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    r?: number | string | undefined;
  }
  interface ClipPathSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "clip-path"> {
    clipPathUnits?: SVGUnits | undefined;
  }
  interface DefsSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes {}
  interface DescSVGAttributes<T> extends CoreSVGAttributes<T>, StylableSVGAttributes {}
  interface EllipseSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes {
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
  }
  interface FeBlendSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      DoubleInputFilterSVGAttributes,
      StylableSVGAttributes {
    mode?: "normal" | "multiply" | "screen" | "darken" | "lighten" | undefined;
  }
  interface FeColorMatrixSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {
    type?: "matrix" | "saturate" | "hueRotate" | "luminanceToAlpha" | undefined;
    values?: string | undefined;
  }
  interface FeComponentTransferSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {}
  interface FeCompositeSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      DoubleInputFilterSVGAttributes,
      StylableSVGAttributes {
    operator?: "over" | "in" | "out" | "atop" | "xor" | "arithmetic" | undefined;
    k1?: number | string | undefined;
    k2?: number | string | undefined;
    k3?: number | string | undefined;
    k4?: number | string | undefined;
  }
  interface FeConvolveMatrixSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {
    order?: number | string | undefined;
    kernelMatrix?: string | undefined;
    divisor?: number | string | undefined;
    bias?: number | string | undefined;
    targetX?: number | string | undefined;
    targetY?: number | string | undefined;
    edgeMode?: "duplicate" | "wrap" | "none" | undefined;
    kernelUnitLength?: number | string | undefined;
    preserveAlpha?: "true" | "false" | undefined;
  }
  interface FeDiffuseLightingSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes,
      Pick<PresentationSVGAttributes, "color" | "lighting-color"> {
    surfaceScale?: number | string | undefined;
    diffuseConstant?: number | string | undefined;
    kernelUnitLength?: number | string | undefined;
  }
  interface FeDisplacementMapSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      DoubleInputFilterSVGAttributes,
      StylableSVGAttributes {
    scale?: number | string | undefined;
    xChannelSelector?: "R" | "G" | "B" | "A" | undefined;
    yChannelSelector?: "R" | "G" | "B" | "A" | undefined;
  }
  interface FeDistantLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
    azimuth?: number | string | undefined;
    elevation?: number | string | undefined;
  }
  interface FeDropShadowSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      FilterPrimitiveElementSVGAttributes<T>,
      StylableSVGAttributes,
      Pick<PresentationSVGAttributes, "color" | "flood-color" | "flood-opacity"> {
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    stdDeviation?: number | string | undefined;
  }
  interface FeFloodSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      StylableSVGAttributes,
      Pick<PresentationSVGAttributes, "color" | "flood-color" | "flood-opacity"> {}
  interface FeFuncSVGAttributes<T> extends CoreSVGAttributes<T> {
    type?: "identity" | "table" | "discrete" | "linear" | "gamma" | undefined;
    tableValues?: string | undefined;
    slope?: number | string | undefined;
    intercept?: number | string | undefined;
    amplitude?: number | string | undefined;
    exponent?: number | string | undefined;
    offset?: number | string | undefined;
  }
  interface FeGaussianBlurSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {
    stdDeviation?: number | string | undefined;
  }
  interface FeImageSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes {
    preserveAspectRatio?: SVGPreserveAspectRatio | undefined;
    href?: string | undefined;
  }
  interface FeMergeSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      StylableSVGAttributes {}
  interface FeMergeNodeSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      SingleInputFilterSVGAttributes {}
  interface FeMorphologySVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {
    operator?: "erode" | "dilate" | undefined;
    radius?: number | string | undefined;
  }
  interface FeOffsetSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {
    dx?: number | string | undefined;
    dy?: number | string | undefined;
  }
  interface FePointLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    z?: number | string | undefined;
  }
  interface FeSpecularLightingSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes,
      Pick<PresentationSVGAttributes, "color" | "lighting-color"> {
    surfaceScale?: string | undefined;
    specularConstant?: string | undefined;
    specularExponent?: string | undefined;
    kernelUnitLength?: number | string | undefined;
  }
  interface FeSpotLightSVGAttributes<T> extends LightSourceElementSVGAttributes<T> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    z?: number | string | undefined;
    pointsAtX?: number | string | undefined;
    pointsAtY?: number | string | undefined;
    pointsAtZ?: number | string | undefined;
    specularExponent?: number | string | undefined;
    limitingConeAngle?: number | string | undefined;
  }
  interface FeTileSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      SingleInputFilterSVGAttributes,
      StylableSVGAttributes {}
  interface FeTurbulanceSVGAttributes<T>
    extends FilterPrimitiveElementSVGAttributes<T>,
      StylableSVGAttributes {
    baseFrequency?: number | string | undefined;
    numOctaves?: number | string | undefined;
    seed?: number | string | undefined;
    stitchTiles?: "stitch" | "noStitch" | undefined;
    type?: "fractalNoise" | "turbulence" | undefined;
  }
  interface FilterSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes {
    filterUnits?: SVGUnits | undefined;
    primitiveUnits?: SVGUnits | undefined;
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    filterRes?: number | string | undefined;
  }
  interface ForeignObjectSVGAttributes<T>
    extends NewViewportSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "display" | "visibility"> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
  }
  interface GSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "display" | "visibility"> {}
  interface ImageSVGAttributes<T>
    extends NewViewportSVGAttributes<T>,
      GraphicsElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "color-profile" | "image-rendering"> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    preserveAspectRatio?: ImagePreserveAspectRatio | undefined;
    href?: string | undefined;
  }
  interface LineSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
    x1?: number | string | undefined;
    y1?: number | string | undefined;
    x2?: number | string | undefined;
    y2?: number | string | undefined;
  }
  interface LinearGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
    x1?: number | string | undefined;
    x2?: number | string | undefined;
    y1?: number | string | undefined;
    y2?: number | string | undefined;
  }
  interface MarkerSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      FitToViewBoxSVGAttributes,
      Pick<PresentationSVGAttributes, "overflow" | "clip"> {
    markerUnits?: "strokeWidth" | "userSpaceOnUse" | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    markerWidth?: number | string | undefined;
    markerHeight?: number | string | undefined;
    orient?: string | undefined;
  }
  interface MaskSVGAttributes<T>
    extends Omit<ContainerElementSVGAttributes<T>, "opacity" | "filter">,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes {
    maskUnits?: SVGUnits | undefined;
    maskContentUnits?: SVGUnits | undefined;
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
  }
  interface MetadataSVGAttributes<T> extends CoreSVGAttributes<T> {}
  interface MPathSVGAttributes<T> extends CoreSVGAttributes<T> {}
  interface PathSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
    d?: string | undefined;
    pathLength?: number | string | undefined;
  }
  interface PatternSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      FitToViewBoxSVGAttributes,
      Pick<PresentationSVGAttributes, "overflow" | "clip"> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    patternUnits?: SVGUnits | undefined;
    patternContentUnits?: SVGUnits | undefined;
    patternTransform?: string | undefined;
    href?: string | undefined;
  }
  interface PolygonSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
    points?: string | undefined;
  }
  interface PolylineSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "marker-start" | "marker-mid" | "marker-end"> {
    points?: string | undefined;
  }
  interface RadialGradientSVGAttributes<T> extends GradientElementSVGAttributes<T> {
    cx?: number | string | undefined;
    cy?: number | string | undefined;
    r?: number | string | undefined;
    fx?: number | string | undefined;
    fy?: number | string | undefined;
  }
  interface RectSVGAttributes<T>
    extends GraphicsElementSVGAttributes<T>,
      ShapeElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    rx?: number | string | undefined;
    ry?: number | string | undefined;
  }
  interface SetSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      StylableSVGAttributes,
      AnimationTimingSVGAttributes {}
  interface StopSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      StylableSVGAttributes,
      Pick<PresentationSVGAttributes, "color" | "stop-color" | "stop-opacity"> {
    offset?: number | string | undefined;
  }
  interface SvgSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      NewViewportSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      FitToViewBoxSVGAttributes,
      ZoomAndPanSVGAttributes,
      PresentationSVGAttributes {
    version?: string | undefined;
    baseProfile?: string | undefined;
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    contentScriptType?: string | undefined;
    contentStyleType?: string | undefined;
    xmlns?: string | undefined;
    "xmlns:xlink"?: string | undefined;
  }
  interface SwitchSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "display" | "visibility"> {}
  interface SymbolSVGAttributes<T>
    extends ContainerElementSVGAttributes<T>,
      NewViewportSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      FitToViewBoxSVGAttributes {
    width?: number | string | undefined;
    height?: number | string | undefined;
    preserveAspectRatio?: SVGPreserveAspectRatio | undefined;
    refX?: number | string | undefined;
    refY?: number | string | undefined;
    viewBox?: string | undefined;
    x?: number | string | undefined;
    y?: number | string | undefined;
  }
  interface TextSVGAttributes<T>
    extends TextContentElementSVGAttributes<T>,
      GraphicsElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      TransformableSVGAttributes,
      Pick<PresentationSVGAttributes, "writing-mode" | "text-rendering"> {
    x?: number | string | undefined;
    y?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    rotate?: number | string | undefined;
    textLength?: number | string | undefined;
    lengthAdjust?: "spacing" | "spacingAndGlyphs" | undefined;
  }
  interface TextPathSVGAttributes<T>
    extends TextContentElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      Pick<
        PresentationSVGAttributes,
        "alignment-baseline" | "baseline-shift" | "display" | "visibility"
      > {
    startOffset?: number | string | undefined;
    method?: "align" | "stretch" | undefined;
    spacing?: "auto" | "exact" | undefined;
    href?: string | undefined;
  }
  interface TSpanSVGAttributes<T>
    extends TextContentElementSVGAttributes<T>,
      ConditionalProcessingSVGAttributes,
      ExternalResourceSVGAttributes,
      StylableSVGAttributes,
      Pick<
        PresentationSVGAttributes,
        "alignment-baseline" | "baseline-shift" | "display" | "visibility"
      > {
    x?: number | string | undefined;
    y?: number | string | undefined;
    dx?: number | string | undefined;
    dy?: number | string | undefined;
    rotate?: number | string | undefined;
    textLength?: number | string | undefined;
    lengthAdjust?: "spacing" | "spacingAndGlyphs" | undefined;
  }
  /** @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use */
  interface UseSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      StylableSVGAttributes,
      ConditionalProcessingSVGAttributes,
      GraphicsElementSVGAttributes<T>,
      PresentationSVGAttributes,
      ExternalResourceSVGAttributes,
      TransformableSVGAttributes {
    x?: number | string | undefined;
    y?: number | string | undefined;
    width?: number | string | undefined;
    height?: number | string | undefined;
    href?: string | undefined;
  }
  interface ViewSVGAttributes<T>
    extends CoreSVGAttributes<T>,
      ExternalResourceSVGAttributes,
      FitToViewBoxSVGAttributes,
      ZoomAndPanSVGAttributes {
    viewTarget?: string | undefined;
  }

  interface MathMLAttributes<T> extends HTMLAttributes<T> {
    displaystyle?: boolean | undefined;
    /** @deprecated */
    href?: string | undefined;
    /** @deprecated */
    mathbackground?: string | undefined;
    /** @deprecated */
    mathcolor?: string | undefined;
    /** @deprecated */
    mathsize?: string | undefined;
    nonce?: string | undefined;
    scriptlevel?: string | undefined;
  }

  interface MathMLAnnotationElementAttributes<T> extends MathMLAttributes<T> {
    encoding?: string | undefined;

    /** @deprecated */
    src?: string | undefined;
  }
  interface MathMLAnnotationXmlElementAttributes<T> extends MathMLAttributes<T> {
    encoding?: string | undefined;

    /** @deprecated */
    src?: string | undefined;
  }
  interface MathMLMactionElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    actiontype?: "statusline" | "toggle" | undefined;
    /** @deprecated */
    selection?: string | undefined;
  }
  interface MathMLMathElementAttributes<T> extends MathMLAttributes<T> {
    display?: "block" | "inline" | undefined;
  }
  interface MathMLMerrorElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMfracElementAttributes<T> extends MathMLAttributes<T> {
    linethickness?: string | undefined;

    /** @deprecated */
    denomalign?: "center" | "left" | "right" | undefined;
    /** @deprecated */
    numalign?: "center" | "left" | "right" | undefined;
  }
  interface MathMLMiElementAttributes<T> extends MathMLAttributes<T> {
    mathvariant?: "normal" | undefined;
  }

  interface MathMLMmultiscriptsElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    subscriptshift?: string | undefined;
    /** @deprecated */
    superscriptshift?: string | undefined;
  }
  interface MathMLMnElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMoElementAttributes<T> extends MathMLAttributes<T> {
    fence?: boolean | undefined;
    form?: "prefix" | "infix" | "postfix" | undefined;
    largeop?: boolean | undefined;
    lspace?: string | undefined;
    maxsize?: string | undefined;
    minsize?: string | undefined;
    movablelimits?: boolean | undefined;
    rspace?: string | undefined;
    separator?: boolean | undefined;
    stretchy?: boolean | undefined;
    symmetric?: boolean | undefined;

    /** @non-standard */
    accent?: boolean | undefined;
  }
  interface MathMLMoverElementAttributes<T> extends MathMLAttributes<T> {
    accent?: boolean | undefined;
  }
  interface MathMLMpaddedElementAttributes<T> extends MathMLAttributes<T> {
    depth?: string | undefined;
    height?: string | undefined;
    lspace?: string | undefined;
    voffset?: string | undefined;
    width?: string | undefined;
  }
  interface MathMLMphantomElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMprescriptsElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMrootElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMrowElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMsElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    lquote?: string | undefined;
    /** @deprecated */
    rquote?: string | undefined;
  }
  interface MathMLMspaceElementAttributes<T> extends MathMLAttributes<T> {
    depth?: string | undefined;
    height?: string | undefined;
    width?: string | undefined;
  }
  interface MathMLMsqrtElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMstyleElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    background?: string | undefined;
    /** @deprecated */
    color?: string | undefined;
    /** @deprecated */
    fontsize?: string | undefined;
    /** @deprecated */
    fontstyle?: string | undefined;
    /** @deprecated */
    fontweight?: string | undefined;
    /** @deprecated */
    scriptminsize?: string | undefined;
    /** @deprecated */
    scriptsizemultiplier?: string | undefined;
  }
  interface MathMLMsubElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    subscriptshift?: string | undefined;
  }
  interface MathMLMsubsupElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    subscriptshift?: string | undefined;
    /** @deprecated */
    superscriptshift?: string | undefined;
  }
  interface MathMLMsupElementAttributes<T> extends MathMLAttributes<T> {
    /** @deprecated */
    superscriptshift?: string | undefined;
  }
  interface MathMLMtableElementAttributes<T> extends MathMLAttributes<T> {
    /** @non-standard */
    align?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    /** @non-standard */
    columnalign?: "center" | "left" | "right" | undefined;
    /** @non-standard */
    columnlines?: "dashed" | "none" | "solid" | undefined;
    /** @non-standard */
    columnspacing?: string | undefined;
    /** @non-standard */
    frame?: "dashed" | "none" | "solid" | undefined;
    /** @non-standard */
    framespacing?: string | undefined;
    /** @non-standard */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
    /** @non-standard */
    rowlines?: "dashed" | "none" | "solid" | undefined;
    /** @non-standard */
    rowspacing?: string | undefined;
    /** @non-standard */
    width?: string | undefined;
  }
  interface MathMLMtdElementAttributes<T> extends MathMLAttributes<T> {
    columnspan?: number | undefined;
    rowspan?: number | undefined;
    /** @non-standard */
    columnalign?: "center" | "left" | "right" | undefined;
    /** @non-standard */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
  }
  interface MathMLMtextElementAttributes<T> extends MathMLAttributes<T> {}
  interface MathMLMtrElementAttributes<T> extends MathMLAttributes<T> {
    /** @non-standard */
    columnalign?: "center" | "left" | "right" | undefined;
    /** @non-standard */
    rowalign?: "axis" | "baseline" | "bottom" | "center" | "top" | undefined;
  }
  interface MathMLMunderElementAttributes<T> extends MathMLAttributes<T> {
    accentunder?: boolean | undefined;
  }
  interface MathMLMunderoverElementAttributes<T> extends MathMLAttributes<T> {
    accent?: boolean | undefined;
    accentunder?: boolean | undefined;
  }
  interface MathMLSemanticsElementAttributes<T> extends MathMLAttributes<T> {}

  /* MathMLDeprecatedElements */

  interface MathMLMencloseElementAttributes<T> extends MathMLAttributes<T> {
    /** @non-standard */
    notation?: string | undefined;
  }
  interface MathMLMfencedElementAttributes<T> extends MathMLAttributes<T> {
    close?: string | undefined;
    open?: string | undefined;
    separators?: string | undefined;
  }

  /** @type {HTMLElementTagNameMap} */
  interface HTMLElementTags {
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement
     */
    a: AnchorHTMLAttributes<HTMLAnchorElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/abbr
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    abbr: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    address: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLAreaElement
     */
    area: AreaHTMLAttributes<HTMLAreaElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    article: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    aside: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
     */
    audio: AudioHTMLAttributes<HTMLAudioElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/b
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    b: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLBaseElement
     */
    base: BaseHTMLAttributes<HTMLBaseElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdi
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    bdi: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/bdo
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    bdo: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement
     */
    blockquote: BlockquoteHTMLAttributes<HTMLQuoteElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLBodyElement
     */
    body: HTMLAttributes<HTMLBodyElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/br
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLBRElement
     */
    br: HTMLAttributes<HTMLBRElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
     */
    button: ButtonHTMLAttributes<HTMLButtonElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
     */
    canvas: CanvasHTMLAttributes<HTMLCanvasElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/caption
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCaptionElement
     */
    caption: HTMLAttributes<HTMLTableCaptionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/cite
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    cite: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/code
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    code: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/col
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableColElement
     */
    col: ColHTMLAttributes<HTMLTableColElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableColElement
     */
    colgroup: ColgroupHTMLAttributes<HTMLTableColElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/data
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataElement
     */
    data: DataHTMLAttributes<HTMLDataElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDataListElement
     */
    datalist: HTMLAttributes<HTMLDataListElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dd
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    dd: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/del
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement
     */
    del: ModHTMLAttributes<HTMLModElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDetailsElement
     */
    details: DetailsHtmlAttributes<HTMLDetailsElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dfn
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    dfn: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
     */
    dialog: DialogHtmlAttributes<HTMLDialogElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDivElement
     */
    div: HTMLAttributes<HTMLDivElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLDListElement
     */
    dl: HTMLAttributes<HTMLDListElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dt
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    dt: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    em: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/embed
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLEmbedElement
     */
    embed: EmbedHTMLAttributes<HTMLEmbedElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement
     */
    fieldset: FieldsetHTMLAttributes<HTMLFieldSetElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figcaption
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    figcaption: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    figure: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    footer: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
     */
    form: FormHTMLAttributes<HTMLFormElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h1: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h2
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h2: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h3
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h3: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h4
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h4: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h5
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h5: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h6
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadingElement
     */
    h6: HTMLAttributes<HTMLHeadingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHeadElement
     */
    head: HTMLAttributes<HTMLHeadElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    header: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hgroup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    hgroup: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHRElement
     */
    hr: HTMLAttributes<HTMLHRElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/html
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLHtmlElement
     */
    html: HTMLAttributes<HTMLHtmlElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/i
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    i: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement
     */
    iframe: IframeHTMLAttributes<HTMLIFrameElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
     */
    img: ImgHTMLAttributes<HTMLImageElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
     */
    input: InputHTMLAttributes<HTMLInputElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ins
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLModElement
     */
    ins: ModHTMLAttributes<HTMLModElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/kbd
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    kbd: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement
     */
    label: LabelHTMLAttributes<HTMLLabelElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLLegendElement
     */
    legend: HTMLAttributes<HTMLLegendElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLLIElement
     */
    li: LiHTMLAttributes<HTMLLIElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLLinkElement
     */
    link: LinkHTMLAttributes<HTMLLinkElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    main: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement
     */
    map: MapHTMLAttributes<HTMLMapElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    mark: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menu
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLMenuElement
     */
    menu: MenuHTMLAttributes<HTMLMenuElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLMetaElement
     */
    meta: MetaHTMLAttributes<HTMLMetaElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
     */
    meter: MeterHTMLAttributes<HTMLMeterElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    nav: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    noscript: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/object
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement
     */
    object: ObjectHTMLAttributes<HTMLObjectElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLOListElement
     */
    ol: OlHTMLAttributes<HTMLOListElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/optgroup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptGroupElement
     */
    optgroup: OptgroupHTMLAttributes<HTMLOptGroupElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/option
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionElement
     */
    option: OptionHTMLAttributes<HTMLOptionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLOutputElement
     */
    output: OutputHTMLAttributes<HTMLOutputElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLParagraphElement
     */
    p: HTMLAttributes<HTMLParagraphElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLPictureElement
     */
    picture: HTMLAttributes<HTMLPictureElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLPreElement
     */
    pre: HTMLAttributes<HTMLPreElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
     */
    progress: ProgressHTMLAttributes<HTMLProgressElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLQuoteElement
     */
    q: QuoteHTMLAttributes<HTMLQuoteElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rp
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    rp: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/rt
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    rt: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ruby
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    ruby: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/s
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    s: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/samp
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    samp: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLScriptElement
     */
    script: ScriptHTMLAttributes<HTMLScriptElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/search
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    search: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    section: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
     */
    select: SelectHTMLAttributes<HTMLSelectElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement
     */
    slot: HTMLSlotElementAttributes<HTMLSlotElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/small
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    small: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/source
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement
     */
    source: SourceHTMLAttributes<HTMLSourceElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLSpanElement
     */
    span: HTMLAttributes<HTMLSpanElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    strong: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement
     */
    style: StyleHTMLAttributes<HTMLStyleElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sub
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    sub: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    summary: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/sup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    sup: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableElement
     */
    table: HTMLAttributes<HTMLTableElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tbody
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
     */
    tbody: HTMLAttributes<HTMLTableSectionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/td
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
     */
    td: TdHTMLAttributes<HTMLTableCellElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement
     */
    template: TemplateHTMLAttributes<HTMLTemplateElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
     */
    textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tfoot
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
     */
    tfoot: HTMLAttributes<HTMLTableSectionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableCellElement
     */
    th: ThHTMLAttributes<HTMLTableCellElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/thead
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableSectionElement
     */
    thead: HTMLAttributes<HTMLTableSectionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement
     */
    time: TimeHTMLAttributes<HTMLTimeElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTitleElement
     */
    title: HTMLAttributes<HTMLTitleElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/tr
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement
     */
    tr: HTMLAttributes<HTMLTableRowElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLTrackElement
     */
    track: TrackHTMLAttributes<HTMLTrackElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/u
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    u: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLUListElement
     */
    ul: HTMLAttributes<HTMLUListElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/var
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    var: HTMLAttributes<HTMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
     */
    video: VideoHTMLAttributes<HTMLVideoElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    wbr: HTMLAttributes<HTMLElement>;
    /** @url https://www.electronjs.org/docs/latest/api/webview-tag */
    webview: WebViewHTMLAttributes<HTMLElement>;
  }
  /** @type {HTMLElementDeprecatedTagNameMap} */
  interface HTMLElementDeprecatedTags {
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/big
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
     */
    big: HTMLAttributes<HTMLElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/keygen
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement
     */
    keygen: KeygenHTMLAttributes<HTMLUnknownElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/menuitem
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement
     */
    menuitem: HTMLAttributes<HTMLUnknownElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/xxxxx
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLUnknownElement
     */
    noindex: HTMLAttributes<HTMLUnknownElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/HTML/Element/param
     * @url https://developer.mozilla.org/en-US/docs/Web/API/HTMLParamElement
     */
    param: ParamHTMLAttributes<HTMLParamElement>;
  }
  /** @type {SVGElementTagNameMap} */
  interface SVGElementTags {
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animate
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateElement
     */
    animate: AnimateSVGAttributes<SVGAnimateElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateMotion
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateMotionElement
     */
    animateMotion: AnimateMotionSVGAttributes<SVGAnimateMotionElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/animateTransform
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGAnimateTransformElement
     */
    animateTransform: AnimateTransformSVGAttributes<SVGAnimateTransformElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGCircleElement
     */
    circle: CircleSVGAttributes<SVGCircleElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/clipPath
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGClipPathElement
     */
    clipPath: ClipPathSVGAttributes<SVGClipPathElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGDefsElement
     */
    defs: DefsSVGAttributes<SVGDefsElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/desc
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGDescElement
     */
    desc: DescSVGAttributes<SVGDescElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGEllipseElement
     */
    ellipse: EllipseSVGAttributes<SVGEllipseElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feBlend
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEBlendElement
     */
    feBlend: FeBlendSVGAttributes<SVGFEBlendElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEColorMatrixElement
     */
    feColorMatrix: FeColorMatrixSVGAttributes<SVGFEColorMatrixElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComponentTransfer
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEComponentTransferElemen
     */
    feComponentTransfer: FeComponentTransferSVGAttributes<SVGFEComponentTransferElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feComposite
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFECompositeElement
     */
    feComposite: FeCompositeSVGAttributes<SVGFECompositeElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feConvolveMatrix
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEConvolveMatrixElement
     */
    feConvolveMatrix: FeConvolveMatrixSVGAttributes<SVGFEConvolveMatrixElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDiffuseLightingElement
     */
    feDiffuseLighting: FeDiffuseLightingSVGAttributes<SVGFEDiffuseLightingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDisplacementMap
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDisplacementMapElement
     */
    feDisplacementMap: FeDisplacementMapSVGAttributes<SVGFEDisplacementMapElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDistantLight
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDistantLightElement
     */
    feDistantLight: FeDistantLightSVGAttributes<SVGFEDistantLightElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDropShadow
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEDropShadowElement
     */
    feDropShadow: FeDropShadowSVGAttributes<SVGFEDropShadowElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFlood
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFloodElement
     */
    feFlood: FeFloodSVGAttributes<SVGFEFloodElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncA
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncAElement
     */
    feFuncA: FeFuncSVGAttributes<SVGFEFuncAElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncB
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncBElement
     */
    feFuncB: FeFuncSVGAttributes<SVGFEFuncBElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncG
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncGElement
     */
    feFuncG: FeFuncSVGAttributes<SVGFEFuncGElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feFuncR
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEFuncRElement
     */
    feFuncR: FeFuncSVGAttributes<SVGFEFuncRElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feGaussianBlur
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEGaussianBlurElement
     */
    feGaussianBlur: FeGaussianBlurSVGAttributes<SVGFEGaussianBlurElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feImage
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEImageElement
     */
    feImage: FeImageSVGAttributes<SVGFEImageElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMerge
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMergeElement
     */
    feMerge: FeMergeSVGAttributes<SVGFEMergeElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMergeNode
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMergeNodeElement
     */
    feMergeNode: FeMergeNodeSVGAttributes<SVGFEMergeNodeElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feMorphology
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEMorphologyElement
     */
    feMorphology: FeMorphologySVGAttributes<SVGFEMorphologyElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feOffset
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEOffsetElement
     */
    feOffset: FeOffsetSVGAttributes<SVGFEOffsetElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/fePointLight
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFEPointLightElement
     */
    fePointLight: FePointLightSVGAttributes<SVGFEPointLightElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpecularLighting
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFESpecularLightingElement
     */
    feSpecularLighting: FeSpecularLightingSVGAttributes<SVGFESpecularLightingElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feSpotLight
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFESpotLightElement
     */
    feSpotLight: FeSpotLightSVGAttributes<SVGFESpotLightElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTile
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFETileElement
     */
    feTile: FeTileSVGAttributes<SVGFETileElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFETurbulenceElement
     */
    feTurbulence: FeTurbulanceSVGAttributes<SVGFETurbulenceElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGFilterElement
     */
    filter: FilterSVGAttributes<SVGFilterElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGForeignObjectElement
     */
    foreignObject: ForeignObjectSVGAttributes<SVGForeignObjectElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/g
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGGElement
     */
    g: GSVGAttributes<SVGGElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/image
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGImageElement
     */
    image: ImageSVGAttributes<SVGImageElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGLineElement
     */
    line: LineSVGAttributes<SVGLineElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGLinearGradientElement
     */
    linearGradient: LinearGradientSVGAttributes<SVGLinearGradientElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGMarkerElement
     */
    marker: MarkerSVGAttributes<SVGMarkerElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGMaskElement
     */
    mask: MaskSVGAttributes<SVGMaskElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/metadata
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGMetadataElement
     */
    metadata: MetadataSVGAttributes<SVGMetadataElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mpath
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGMPathElement
     */
    mpath: MPathSVGAttributes<SVGMPathElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement
     */
    path: PathSVGAttributes<SVGPathElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/pattern
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGPatternElement
     */
    pattern: PatternSVGAttributes<SVGPatternElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGPolygonElement
     */
    polygon: PolygonSVGAttributes<SVGPolygonElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGPolylineElement
     */
    polyline: PolylineSVGAttributes<SVGPolylineElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/radialGradient
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGRadialGradientElement
     */
    radialGradient: RadialGradientSVGAttributes<SVGRadialGradientElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGRectElement
     */
    rect: RectSVGAttributes<SVGRectElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/set
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGSetElement
     */
    set: SetSVGAttributes<SVGSetElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/stop
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGStopElement
     */
    stop: StopSVGAttributes<SVGStopElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGSVGElement
     */
    svg: SvgSVGAttributes<SVGSVGElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/switch
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGSwitchElement
     */
    switch: SwitchSVGAttributes<SVGSwitchElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGSymbolElement
     */
    symbol: SymbolSVGAttributes<SVGSymbolElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGTextElement
     */
    text: TextSVGAttributes<SVGTextElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGTextPathElement
     */
    textPath: TextPathSVGAttributes<SVGTextPathElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/tspan
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGTSpanElement
     */
    tspan: TSpanSVGAttributes<SVGTSpanElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/use
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGUseElement
     */
    use: UseSVGAttributes<SVGUseElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/SVG/Element/view
     * @url https://developer.mozilla.org/en-US/docs/Web/API/SVGViewElement
     */
    view: ViewSVGAttributes<SVGViewElement>;
  }

  interface MathMLElementTags {
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/annotation
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    annotation: MathMLAnnotationElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/annotation-xml
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    "annotation-xml": MathMLAnnotationXmlElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/math
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    math: MathMLMathElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/merror
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    merror: MathMLMerrorElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfrac
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mfrac: MathMLMfracElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mi
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mi: MathMLMiElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mmultiscripts
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mmultiscripts: MathMLMmultiscriptsElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mn
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mn: MathMLMnElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mo
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mo: MathMLMoElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mover
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mover: MathMLMoverElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mpadded
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mpadded: MathMLMpaddedElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mphantom
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mphantom: MathMLMphantomElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mprescripts
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mprescripts: MathMLMprescriptsElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mroot
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mroot: MathMLMrootElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mrow
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mrow: MathMLMrowElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/ms
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    ms: MathMLMsElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mspace
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mspace: MathMLMspaceElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msqrt
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    msqrt: MathMLMsqrtElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mstyle
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mstyle: MathMLMstyleElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msub
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    msub: MathMLMsubElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msubsup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    msubsup: MathMLMsubsupElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/msup
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    msup: MathMLMsupElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtable
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mtable: MathMLMtableElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtd
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mtd: MathMLMtdElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtext
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mtext: MathMLMtextElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mtr
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mtr: MathMLMtrElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munder
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    munder: MathMLMunderElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/munderover
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    munderover: MathMLMunderoverElementAttributes<MathMLElement>;
    /**
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/semantics
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    semantics: MathMLSemanticsElementAttributes<MathMLElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/maction
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    maction: MathMLMactionElementAttributes<MathMLElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/menclose
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    menclose: MathMLMencloseElementAttributes<MathMLElement>;
    /**
     * @deprecated
     * @url https://developer.mozilla.org/en-US/docs/Web/MathML/Element/mfenced
     * @url https://developer.mozilla.org/en-US/docs/Web/API/MathMLElement
     */
    mfenced: MathMLMfencedElementAttributes<MathMLElement>;
  }

  interface IntrinsicElements
    extends HTMLElementTags,
      HTMLElementDeprecatedTags,
      SVGElementTags,
      MathMLElementTags {}
}
