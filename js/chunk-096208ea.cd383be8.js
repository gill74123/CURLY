(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-096208ea"],{"109e":function(e,t,n){
/*!
  * Bootstrap manipulator.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,n){e.exports=n()})(0,(function(){"use strict";function e(e){return"true"===e||"false"!==e&&(e===Number(e).toString()?Number(e):""===e||"null"===e?null:e)}function t(e){return e.replace(/[A-Z]/g,e=>"-"+e.toLowerCase())}const n={setDataAttribute(e,n,r){e.setAttribute("data-bs-"+t(n),r)},removeDataAttribute(e,n){e.removeAttribute("data-bs-"+t(n))},getDataAttributes(t){if(!t)return{};const n={};return Object.keys(t.dataset).filter(e=>e.startsWith("bs")).forEach(r=>{let o=r.replace(/^bs/,"");o=o.charAt(0).toLowerCase()+o.slice(1,o.length),n[o]=e(t.dataset[r])}),n},getDataAttribute(n,r){return e(n.getAttribute("data-bs-"+t(r)))},offset(e){const t=e.getBoundingClientRect();return{top:t.top+window.pageYOffset,left:t.left+window.pageXOffset}},position(e){return{top:e.offsetTop,left:e.offsetLeft}}};return n}))},"302d":function(e,t,n){
/*!
  * Bootstrap base-component.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,r){e.exports=r(n("6ee1"),n("6a95"))})(0,(function(e,t){"use strict";const n=e=>e&&"object"===typeof e&&"default"in e?e:{default:e},r=n(e),o=n(t),i=1e3,s="transitionend",l=e=>{if(!e)return 0;let{transitionDuration:t,transitionDelay:n}=window.getComputedStyle(e);const r=Number.parseFloat(t),o=Number.parseFloat(n);return r||o?(t=t.split(",")[0],n=n.split(",")[0],(Number.parseFloat(t)+Number.parseFloat(n))*i):0},c=e=>{e.dispatchEvent(new Event(s))},a=e=>!(!e||"object"!==typeof e)&&("undefined"!==typeof e.jquery&&(e=e[0]),"undefined"!==typeof e.nodeType),d=e=>a(e)?e.jquery?e[0]:e:"string"===typeof e&&e.length>0?document.querySelector(e):null,u=e=>{"function"===typeof e&&e()},f=(e,t,n=!0)=>{if(!n)return void u(e);const r=5,o=l(t)+r;let i=!1;const a=({target:n})=>{n===t&&(i=!0,t.removeEventListener(s,a),u(e))};t.addEventListener(s,a),setTimeout(()=>{i||c(t)},o)},p="5.1.3";class g{constructor(e){e=d(e),e&&(this._element=e,r.default.set(this._element,this.constructor.DATA_KEY,this))}dispose(){r.default.remove(this._element,this.constructor.DATA_KEY),o.default.off(this._element,this.constructor.EVENT_KEY),Object.getOwnPropertyNames(this).forEach(e=>{this[e]=null})}_queueCallback(e,t,n=!0){f(e,t,n)}static getInstance(e){return r.default.get(d(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,"object"===typeof t?t:null)}static get VERSION(){return p}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}static get DATA_KEY(){return"bs."+this.NAME}static get EVENT_KEY(){return"."+this.DATA_KEY}}return g}))},"5af4":function(e,t,n){"use strict";var r=n("810f"),o=n.n(r);t["a"]={data:function(){return{collapse:""}},methods:{toggleCollapse:function(){this.collapse.toggle()},closeCollapse:function(){this.collapse.hide()}},mounted:function(){this.collapse=new o.a(this.$refs.collapse,{toggle:!1})}}},"6a95":function(e,t,n){
/*!
  * Bootstrap event-handler.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,n){e.exports=n()})(0,(function(){"use strict";const e=()=>{const{jQuery:e}=window;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},t=/[^.]*(?=\..*)\.|.*/,n=/\..*/,r=/::\d+$/,o={};let i=1;const s={mouseenter:"mouseover",mouseleave:"mouseout"},l=/^(mouseenter|mouseleave)/i,c=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function a(e,t){return t&&`${t}::${i++}`||e.uidEvent||i++}function d(e){const t=a(e);return e.uidEvent=t,o[t]=o[t]||{},o[t]}function u(e,t){return function n(r){return r.delegateTarget=e,n.oneOff&&j.off(e,r.type,t),t.apply(e,[r])}}function f(e,t,n){return function r(o){const i=e.querySelectorAll(t);for(let{target:s}=o;s&&s!==this;s=s.parentNode)for(let l=i.length;l--;)if(i[l]===s)return o.delegateTarget=s,r.oneOff&&j.off(e,o.type,t,n),n.apply(s,[o]);return null}}function p(e,t,n=null){const r=Object.keys(e);for(let o=0,i=r.length;o<i;o++){const i=e[r[o]];if(i.originalHandler===t&&i.delegationSelector===n)return i}return null}function g(e,t,n){const r="string"===typeof t,o=r?n:t;let i=y(e);const s=c.has(i);return s||(i=e),[r,o,i]}function h(e,n,r,o,i){if("string"!==typeof n||!e)return;if(r||(r=o,o=null),l.test(n)){const e=e=>function(t){if(!t.relatedTarget||t.relatedTarget!==t.delegateTarget&&!t.delegateTarget.contains(t.relatedTarget))return e.call(this,t)};o?o=e(o):r=e(r)}const[s,c,h]=g(n,r,o),m=d(e),b=m[h]||(m[h]={}),y=p(b,c,s?r:null);if(y)return void(y.oneOff=y.oneOff&&i);const j=a(c,n.replace(t,"")),O=s?f(e,r,o):u(e,r);O.delegationSelector=s?r:null,O.originalHandler=c,O.oneOff=i,O.uidEvent=j,b[j]=O,e.addEventListener(h,O,s)}function m(e,t,n,r,o){const i=p(t[n],r,o);i&&(e.removeEventListener(n,i,Boolean(o)),delete t[n][i.uidEvent])}function b(e,t,n,r){const o=t[n]||{};Object.keys(o).forEach(i=>{if(i.includes(r)){const r=o[i];m(e,t,n,r.originalHandler,r.delegationSelector)}})}function y(e){return e=e.replace(n,""),s[e]||e}const j={on(e,t,n,r){h(e,t,n,r,!1)},one(e,t,n,r){h(e,t,n,r,!0)},off(e,t,n,o){if("string"!==typeof t||!e)return;const[i,s,l]=g(t,n,o),c=l!==t,a=d(e),u=t.startsWith(".");if("undefined"!==typeof s){if(!a||!a[l])return;return void m(e,a,l,s,i?n:null)}u&&Object.keys(a).forEach(n=>{b(e,a,n,t.slice(1))});const f=a[l]||{};Object.keys(f).forEach(n=>{const o=n.replace(r,"");if(!c||t.includes(o)){const t=f[n];m(e,a,l,t.originalHandler,t.delegationSelector)}})},trigger(t,n,r){if("string"!==typeof n||!t)return null;const o=e(),i=y(n),s=n!==i,l=c.has(i);let a,d=!0,u=!0,f=!1,p=null;return s&&o&&(a=o.Event(n,r),o(t).trigger(a),d=!a.isPropagationStopped(),u=!a.isImmediatePropagationStopped(),f=a.isDefaultPrevented()),l?(p=document.createEvent("HTMLEvents"),p.initEvent(i,d,!0)):p=new CustomEvent(n,{bubbles:d,cancelable:!0}),"undefined"!==typeof r&&Object.keys(r).forEach(e=>{Object.defineProperty(p,e,{get(){return r[e]}})}),f&&p.preventDefault(),u&&t.dispatchEvent(p),p.defaultPrevented&&"undefined"!==typeof a&&a.preventDefault(),p}};return j}))},"6ee1":function(e,t,n){
/*!
  * Bootstrap data.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,n){e.exports=n()})(0,(function(){"use strict";const e=new Map,t={set(t,n,r){e.has(t)||e.set(t,new Map);const o=e.get(t);o.has(n)||0===o.size?o.set(n,r):console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(o.keys())[0]}.`)},get(t,n){return e.has(t)&&e.get(t).get(n)||null},remove(t,n){if(!e.has(t))return;const r=e.get(t);r.delete(n),0===r.size&&e.delete(t)}};return t}))},"810f":function(e,t,n){
/*!
  * Bootstrap collapse.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,r){e.exports=r(n("6ee1"),n("6a95"),n("109e"),n("848f"),n("302d"))})(0,(function(e,t,n,r,o){"use strict";const i=e=>e&&"object"===typeof e&&"default"in e?e:{default:e},s=i(e),l=i(t),c=i(n),a=i(r),d=i(o),u=e=>null===e||void 0===e?""+e:{}.toString.call(e).match(/\s([a-z]+)/i)[1].toLowerCase(),f=e=>{let t=e.getAttribute("data-bs-target");if(!t||"#"===t){let n=e.getAttribute("href");if(!n||!n.includes("#")&&!n.startsWith("."))return null;n.includes("#")&&!n.startsWith("#")&&(n="#"+n.split("#")[1]),t=n&&"#"!==n?n.trim():null}return t},p=e=>{const t=f(e);return t&&document.querySelector(t)?t:null},g=e=>{const t=f(e);return t?document.querySelector(t):null},h=e=>!(!e||"object"!==typeof e)&&("undefined"!==typeof e.jquery&&(e=e[0]),"undefined"!==typeof e.nodeType),m=e=>h(e)?e.jquery?e[0]:e:"string"===typeof e&&e.length>0?document.querySelector(e):null,b=(e,t,n)=>{Object.keys(n).forEach(r=>{const o=n[r],i=t[r],s=i&&h(i)?"element":u(i);if(!new RegExp(o).test(s))throw new TypeError(`${e.toUpperCase()}: Option "${r}" provided type "${s}" but expected type "${o}".`)})},y=e=>{e.offsetHeight},j=()=>{const{jQuery:e}=window;return e&&!document.body.hasAttribute("data-bs-no-jquery")?e:null},O=[],E=e=>{"loading"===document.readyState?(O.length||document.addEventListener("DOMContentLoaded",()=>{O.forEach(e=>e())}),O.push(e)):e()},v=e=>{E(()=>{const t=j();if(t){const n=e.NAME,r=t.fn[n];t.fn[n]=e.jQueryInterface,t.fn[n].Constructor=e,t.fn[n].noConflict=()=>(t.fn[n]=r,e.jQueryInterface)}})},N="collapse",_="bs.collapse",w="."+_,V=".data-api",x={toggle:!0,parent:null},T={toggle:"boolean",parent:"(null|element)"},A="show"+w,S="shown"+w,C="hide"+w,k="hidden"+w,D=`click${w}${V}`,L="show",B="collapse",$="collapsing",M="collapsed",q=`:scope .${B} .${B}`,I="collapse-horizontal",P="width",z="height",Y=".collapse.show, .collapse.collapsing",F='[data-bs-toggle="collapse"]';class K extends d.default{constructor(e,t){super(e),this._isTransitioning=!1,this._config=this._getConfig(t),this._triggerArray=[];const n=a.default.find(F);for(let r=0,o=n.length;r<o;r++){const e=n[r],t=p(e),o=a.default.find(t).filter(e=>e===this._element);null!==t&&o.length&&(this._selector=t,this._triggerArray.push(e))}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return x}static get NAME(){return N}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e,t=[];if(this._config.parent){const e=a.default.find(q,this._config.parent);t=a.default.find(Y,this._config.parent).filter(t=>!e.includes(t))}const n=a.default.findOne(this._selector);if(t.length){const r=t.find(e=>n!==e);if(e=r?K.getInstance(r):null,e&&e._isTransitioning)return}const r=l.default.trigger(this._element,A);if(r.defaultPrevented)return;t.forEach(t=>{n!==t&&K.getOrCreateInstance(t,{toggle:!1}).hide(),e||s.default.set(t,_,null)});const o=this._getDimension();this._element.classList.remove(B),this._element.classList.add($),this._element.style[o]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove($),this._element.classList.add(B,L),this._element.style[o]="",l.default.trigger(this._element,S)},c=o[0].toUpperCase()+o.slice(1),d="scroll"+c;this._queueCallback(i,this._element,!0),this._element.style[o]=this._element[d]+"px"}hide(){if(this._isTransitioning||!this._isShown())return;const e=l.default.trigger(this._element,C);if(e.defaultPrevented)return;const t=this._getDimension();this._element.style[t]=this._element.getBoundingClientRect()[t]+"px",y(this._element),this._element.classList.add($),this._element.classList.remove(B,L);const n=this._triggerArray.length;for(let o=0;o<n;o++){const e=this._triggerArray[o],t=g(e);t&&!this._isShown(t)&&this._addAriaAndCollapsedClass([e],!1)}this._isTransitioning=!0;const r=()=>{this._isTransitioning=!1,this._element.classList.remove($),this._element.classList.add(B),l.default.trigger(this._element,k)};this._element.style[t]="",this._queueCallback(r,this._element,!0)}_isShown(e=this._element){return e.classList.contains(L)}_getConfig(e){return e={...x,...c.default.getDataAttributes(this._element),...e},e.toggle=Boolean(e.toggle),e.parent=m(e.parent),b(N,e,T),e}_getDimension(){return this._element.classList.contains(I)?P:z}_initializeChildren(){if(!this._config.parent)return;const e=a.default.find(q,this._config.parent);a.default.find(F,this._config.parent).filter(t=>!e.includes(t)).forEach(e=>{const t=g(e);t&&this._addAriaAndCollapsedClass([e],this._isShown(t))})}_addAriaAndCollapsedClass(e,t){e.length&&e.forEach(e=>{t?e.classList.remove(M):e.classList.add(M),e.setAttribute("aria-expanded",t)})}static jQueryInterface(e){return this.each((function(){const t={};"string"===typeof e&&/show|hide/.test(e)&&(t.toggle=!1);const n=K.getOrCreateInstance(this,t);if("string"===typeof e){if("undefined"===typeof n[e])throw new TypeError(`No method named "${e}"`);n[e]()}}))}}return l.default.on(document,D,F,(function(e){("A"===e.target.tagName||e.delegateTarget&&"A"===e.delegateTarget.tagName)&&e.preventDefault();const t=p(this),n=a.default.find(t);n.forEach(e=>{K.getOrCreateInstance(e,{toggle:!1}).toggle()})})),v(K),K}))},"848f":function(e,t,n){
/*!
  * Bootstrap selector-engine.js v5.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,n){e.exports=n()})(0,(function(){"use strict";const e=e=>!(!e||"object"!==typeof e)&&("undefined"!==typeof e.jquery&&(e=e[0]),"undefined"!==typeof e.nodeType),t=t=>!(!e(t)||0===t.getClientRects().length)&&"visible"===getComputedStyle(t).getPropertyValue("visibility"),n=e=>!e||e.nodeType!==Node.ELEMENT_NODE||(!!e.classList.contains("disabled")||("undefined"!==typeof e.disabled?e.disabled:e.hasAttribute("disabled")&&"false"!==e.getAttribute("disabled"))),r=3,o={find(e,t=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(t,e))},findOne(e,t=document.documentElement){return Element.prototype.querySelector.call(t,e)},children(e,t){return[].concat(...e.children).filter(e=>e.matches(t))},parents(e,t){const n=[];let o=e.parentNode;while(o&&o.nodeType===Node.ELEMENT_NODE&&o.nodeType!==r)o.matches(t)&&n.push(o),o=o.parentNode;return n},prev(e,t){let n=e.previousElementSibling;while(n){if(n.matches(t))return[n];n=n.previousElementSibling}return[]},next(e,t){let n=e.nextElementSibling;while(n){if(n.matches(t))return[n];n=n.nextElementSibling}return[]},focusableChildren(e){const r=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(e=>e+':not([tabindex^="-"])').join(", ");return this.find(r,e).filter(e=>!n(e)&&t(e))}};return o}))},"99af":function(e,t,n){"use strict";var r=n("23e7"),o=n("da84"),i=n("d039"),s=n("e8b5"),l=n("861d"),c=n("7b0b"),a=n("07fa"),d=n("8418"),u=n("65f0"),f=n("1dde"),p=n("b622"),g=n("2d00"),h=p("isConcatSpreadable"),m=9007199254740991,b="Maximum allowed index exceeded",y=o.TypeError,j=g>=51||!i((function(){var e=[];return e[h]=!1,e.concat()[0]!==e})),O=f("concat"),E=function(e){if(!l(e))return!1;var t=e[h];return void 0!==t?!!t:s(e)},v=!j||!O;r({target:"Array",proto:!0,forced:v},{concat:function(e){var t,n,r,o,i,s=c(this),l=u(s,0),f=0;for(t=-1,r=arguments.length;t<r;t++)if(i=-1===t?s:arguments[t],E(i)){if(o=a(i),f+o>m)throw y(b);for(n=0;n<o;n++,f++)n in i&&d(l,f,i[n])}else{if(f>=m)throw y(b);d(l,f++,i)}return l.length=f,l}})},b0c0:function(e,t,n){var r=n("83ab"),o=n("5e77").EXISTS,i=n("e330"),s=n("9bf2").f,l=Function.prototype,c=i(l.toString),a=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=i(a.exec),u="name";r&&!o&&s(l,u,{configurable:!0,get:function(){try{return d(a,c(this))[1]}catch(e){return""}}})},da9e:function(e,t,n){"use strict";var r=n("7a23"),o={class:"timeline d-flex justify-content-center list-unstyled m-0"},i=Object(r["createElementVNode"])("li",{class:"timeline-item active"},[Object(r["createElementVNode"])("p",{class:"timeline-pointer"},"1"),Object(r["createTextVNode"])(" 訂單確認 ")],-1),s=Object(r["createElementVNode"])("p",{class:"timeline-pointer"},"2",-1),l=Object(r["createTextVNode"])(" 訂單建立 "),c=[s,l],a=Object(r["createElementVNode"])("p",{class:"timeline-pointer"},"3",-1),d=Object(r["createTextVNode"])(" 完成訂單 "),u=[a,d];function f(e,t,n,s,l,a){var d,f;return Object(r["openBlock"])(),Object(r["createElementBlock"])("ul",o,[i,Object(r["createElementVNode"])("li",{class:Object(r["normalizeClass"])(["timeline-item",null!==(d=n.order)&&void 0!==d&&d.id?"active":""])},c,2),Object(r["createElementVNode"])("li",{class:Object(r["normalizeClass"])(["timeline-item",null!==(f=n.order)&&void 0!==f&&f.is_paid?"active":""])},u,2)])}var p={props:["order"]},g=n("6b0d"),h=n.n(g);const m=h()(p,[["render",f]]);t["a"]=m},db72:function(e,t,n){"use strict";n.r(t);n("b0c0");var r=n("7a23"),o={class:"pay container py-6 py-md-7"},i={class:"row justify-content-center py-6 py-md-7"},s={class:"col-lg-8 bg-white py-5 px-2 px-lg-3"},l=Object(r["createElementVNode"])("h2",{class:"border-bottom text-center pb-3 mb-4"},"訂單資訊",-1),c={class:"d-flex flex-column align-items-center"},a=Object(r["createTextVNode"])(" 商品資訊 "),d=Object(r["createElementVNode"])("span",{class:"material-icons-outlined"},"expand_more",-1),u=[a,d],f={class:"collapse show w-100",ref:"collapse"},p={class:"row gx-3 align-items-center"},g={class:"col-3"},h=["src","alt"],m={class:"col-6 text-dark"},b={class:"card-body d-flex align-items-center p-0"},y={class:"me-2"},j={class:"card-text"},O={class:"col-3 align-self-center"},E={class:"card-text fw-medium"},v={class:"table table-hover text-dark w-100 my-5"},N=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"訂單編號：",-1),_={id:"orderId"},w=Object(r["createElementVNode"])("span",{class:"material-icons-outlined fs-3 ms-2"},"content_copy",-1),V=[w],x=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"姓名：",-1),T=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"手機：",-1),A=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"Email：",-1),S=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"收件地址：",-1),C=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"備註：",-1),k=Object(r["createElementVNode"])("td",{width:"120",class:"text-align-justify"},"訂單金額：",-1),D={key:0,class:"text-danger fw-bold"},L={key:1,class:"text-danger fw-bold"},B={key:1,class:"text-center"},$=Object(r["createElementVNode"])("h2",{class:"d-flex flex-column mb-3"},[Object(r["createElementVNode"])("span",{class:"material-icons-outlined text-success fs-6 mb-2"},"task_alt"),Object(r["createTextVNode"])(" 訂單支付完成 ")],-1),M=Object(r["createElementVNode"])("div",{class:"fs-3 text-light mb-4"},[Object(r["createElementVNode"])("h5",{class:"mb-2"},"— 感謝您的訂購 —"),Object(r["createElementVNode"])("p",null,[Object(r["createTextVNode"])(" 商品預計於七個工作天內寄送 "),Object(r["createElementVNode"])("br"),Object(r["createTextVNode"])(" 再請留意簡訊通知 ")])],-1),q=Object(r["createTextVNode"])("繼續選購");function I(e,t,n,a,d,w){var I=Object(r["resolveComponent"])("Loading"),P=Object(r["resolveComponent"])("Timeline"),z=Object(r["resolveComponent"])("RouterLink");return Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],null,[Object(r["createVNode"])(I,{active:d.isLoading,"onUpdate:active":t[0]||(t[0]=function(e){return d.isLoading=e})},null,8,["active"]),Object(r["createElementVNode"])("div",o,[Object(r["createVNode"])(P,{order:d.order},null,8,["order"]),Object(r["createElementVNode"])("div",i,[Object(r["createElementVNode"])("div",s,[d.order.is_paid?(Object(r["openBlock"])(),Object(r["createElementBlock"])("div",B,[$,M,Object(r["createVNode"])(z,{to:"/products",class:"btn btn-primary px-5 py-2"},{default:Object(r["withCtx"])((function(){return[q]})),_:1})])):(Object(r["openBlock"])(),Object(r["createElementBlock"])(r["Fragment"],{key:0},[l,Object(r["createElementVNode"])("div",c,[Object(r["createElementVNode"])("button",{class:"d-flex justify-content-between btn btn-primary rounded-0 text-start fw-medium w-100",type:"button",onClick:t[1]||(t[1]=function(){return e.toggleCollapse&&e.toggleCollapse.apply(e,arguments)})},u),Object(r["createElementVNode"])("div",f,[(Object(r["openBlock"])(!0),Object(r["createElementBlock"])(r["Fragment"],null,Object(r["renderList"])(d.order.products,(function(e){return Object(r["openBlock"])(),Object(r["createElementBlock"])("div",{class:"card rounded-0",key:e},[Object(r["createElementVNode"])("div",p,[Object(r["createElementVNode"])("div",g,[Object(r["createElementVNode"])("img",{class:"card-img img-fluid rounded-0",src:e.product.imageUrl,alt:e.product.title},null,8,h)]),Object(r["createElementVNode"])("div",m,[Object(r["createElementVNode"])("div",b,[Object(r["createElementVNode"])("h5",y,Object(r["toDisplayString"])(e.product.title),1),Object(r["createElementVNode"])("p",j,"x "+Object(r["toDisplayString"])(e.qty),1)])]),Object(r["createElementVNode"])("div",O,[Object(r["createElementVNode"])("p",E,"NT$ "+Object(r["toDisplayString"])(e.total),1)])])])})),128))],512),Object(r["createElementVNode"])("table",v,[Object(r["createElementVNode"])("tbody",null,[Object(r["createElementVNode"])("tr",null,[N,Object(r["createElementVNode"])("td",null,[Object(r["createElementVNode"])("span",_,Object(r["toDisplayString"])(d.order.id),1),Object(r["createElementVNode"])("a",{href:"#",onClick:t[2]||(t[2]=Object(r["withModifiers"])((function(e){return w.copyToClipBoard()}),["prevent"]))},V)])]),Object(r["createElementVNode"])("tr",null,[x,Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(d.order.user.name),1)]),Object(r["createElementVNode"])("tr",null,[T,Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(d.order.user.tel),1)]),Object(r["createElementVNode"])("tr",null,[A,Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(d.order.user.email),1)]),Object(r["createElementVNode"])("tr",null,[S,Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(d.order.user.address),1)]),Object(r["createElementVNode"])("tr",null,[C,Object(r["createElementVNode"])("td",null,Object(r["toDisplayString"])(d.order.message),1)]),Object(r["createElementVNode"])("tr",null,[k,d.order.total<1e3?(Object(r["openBlock"])(),Object(r["createElementBlock"])("td",D,"NT$ "+Object(r["toDisplayString"])(d.order.total)+" ("+Object(r["toDisplayString"])(d.order.is_paid?"已付款":"未付款")+")",1)):(Object(r["openBlock"])(),Object(r["createElementBlock"])("td",L,"NT$ "+Object(r["toDisplayString"])(d.order.total)+" ("+Object(r["toDisplayString"])(d.order.is_paid?"已付款":"未付款")+")",1))])])]),Object(r["createElementVNode"])("button",{type:"button",class:"btn btn-primary w-100 py-2",onClick:t[3]||(t[3]=function(){return w.toPay&&w.toPay.apply(w,arguments)})},"確認付款")])],64))])])])],64)}n("99af");var P=n("da9e"),z=n("5af4"),Y={data:function(){return{order:{user:{}},orderId:"",isLoading:!1}},components:{Timeline:P["a"]},mixins:[z["a"]],methods:{getOrder:function(){var e=this;this.isLoading=!0;var t=this.$route.params.id;this.orderId=t;var n="".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("gillchin","/order/").concat(t);this.$http.get(n).then((function(t){e.order=t.data.order,e.order.total<1e3&&(e.order.total=e.order.total+60),e.isLoading=!1})).catch((function(t){e.$httpMessageState(t.response,"錯誤訊息")}))},toPay:function(){var e=this,t="".concat("https://vue3-course-api.hexschool.io/v2","/api/").concat("gillchin","/pay/").concat(this.orderId);this.$http.post(t).then((function(t){e.getOrder(),e.$httpMessageState(t,"付款")})).catch((function(t){e.$httpMessageState("errMessage",t.response.data.message)}))},copyToClipBoard:function(){navigator.clipboard&&(navigator.clipboard.writeText(this.orderId),this.$httpMessageState(!0,"訂單編號複製"))}},mounted:function(){this.getOrder()}},F=n("6b0d"),K=n.n(F);const H=K()(Y,[["render",I]]);t["default"]=H}}]);
//# sourceMappingURL=chunk-096208ea.cd383be8.js.map