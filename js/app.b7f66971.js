(function(e){function n(n){for(var c,o,u=n[0],i=n[1],l=n[2],d=0,s=[];d<u.length;d++)o=u[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&s.push(r[o][0]),r[o]=0;for(c in i)Object.prototype.hasOwnProperty.call(i,c)&&(e[c]=i[c]);h&&h(n);while(s.length)s.shift()();return a.push.apply(a,l||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],c=!0,o=1;o<t.length;o++){var u=t[o];0!==r[u]&&(c=!1)}c&&(a.splice(n--,1),e=i(i.s=t[0]))}return e}var c={},o={app:0},r={app:0},a=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-04fb964c":"8e912c1f","chunk-096208ea":"cd383be8","chunk-213edbee":"5b0d46bc","chunk-2d0f0a00":"41016dde","chunk-2d5e07b4":"2332fadf","chunk-3a3e47f1":"33248ae7","chunk-3ad049be":"9336affc","chunk-02d32e4c":"aaf50fe4","chunk-625e5d88":"7a5f98ff","chunk-29cb4c6e":"5eb0eb17","chunk-2fb9937d":"5eef93de","chunk-3241bd68":"3da74c59","chunk-b84b5a90":"ac4fb946","chunk-6b7d331c":"afc857dd","chunk-cf8d3c78":"0443bc5c","chunk-58b46d8d":"63922870","chunk-602bf206":"1e2be41a","chunk-d780a454":"b5139bf4","chunk-ebd62fcc":"79631124","chunk-8e59b72c":"256e2384","chunk-f4eca36c":"c0ed7ea9"}[e]+".js"}function i(n){if(c[n])return c[n].exports;var t=c[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.e=function(e){var n=[],t={"chunk-3241bd68":1,"chunk-6b7d331c":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var c="css/"+({}[e]||e)+"."+{"chunk-04fb964c":"31d6cfe0","chunk-096208ea":"31d6cfe0","chunk-213edbee":"31d6cfe0","chunk-2d0f0a00":"31d6cfe0","chunk-2d5e07b4":"31d6cfe0","chunk-3a3e47f1":"31d6cfe0","chunk-3ad049be":"31d6cfe0","chunk-02d32e4c":"31d6cfe0","chunk-625e5d88":"31d6cfe0","chunk-29cb4c6e":"31d6cfe0","chunk-2fb9937d":"31d6cfe0","chunk-3241bd68":"36814cb8","chunk-b84b5a90":"31d6cfe0","chunk-6b7d331c":"8ea60a03","chunk-cf8d3c78":"31d6cfe0","chunk-58b46d8d":"31d6cfe0","chunk-602bf206":"31d6cfe0","chunk-d780a454":"31d6cfe0","chunk-ebd62fcc":"31d6cfe0","chunk-8e59b72c":"31d6cfe0","chunk-f4eca36c":"31d6cfe0"}[e]+".css",r=i.p+c,a=document.getElementsByTagName("link"),u=0;u<a.length;u++){var l=a[u],d=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(d===c||d===r))return n()}var s=document.getElementsByTagName("style");for(u=0;u<s.length;u++){l=s[u],d=l.getAttribute("data-href");if(d===c||d===r)return n()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=n,h.onerror=function(n){var c=n&&n.target&&n.target.src||r,a=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=c,delete o[e],h.parentNode.removeChild(h),t(a)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){o[e]=0})));var c=r[e];if(0!==c)if(c)n.push(c[2]);else{var a=new Promise((function(n,t){c=r[e]=[n,t]}));n.push(c[2]=a);var l,d=document.createElement("script");d.charset="utf-8",d.timeout=120,i.nc&&d.setAttribute("nonce",i.nc),d.src=u(e);var s=new Error;l=function(n){d.onerror=d.onload=null,clearTimeout(h);var t=r[e];if(0!==t){if(t){var c=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+c+": "+o+")",s.name="ChunkLoadError",s.type=c,s.request=o,t[1](s)}r[e]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:d})}),12e4);d.onerror=d.onload=l,document.head.appendChild(d)}return Promise.all(n)},i.m=e,i.c=c,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var c in e)i.d(t,c,function(n){return e[n]}.bind(null,c));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/CURLY/",i.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],d=l.push.bind(l);l.push=n,l=l.slice();for(var s=0;s<l.length;s++)n(l[s]);var h=d;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"0bd5":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d"),t("d3b7"),t("159b"),t("b64b");var c=t("7a23"),o=(t("c789"),t("bc3a")),r=t.n(o),a=t("130e"),u=t("1344"),i=Object(u["a"])(),l=i,d=t("3730"),s=t.n(d),h=t("e311"),f=t.n(h),b=Object(c["createElementVNode"])("img",{class:"loading-img",src:f.a,alt:"pageLoadingIcon"},null,-1),p=Object(c["createElementVNode"])("span",{class:"text-light fs-4 fw-bold mt-3"},"—— L O D I N G ——",-1);function m(e,n,t,o,r,a){var u=Object(c["resolveComponent"])("Loading");return Object(c["openBlock"])(),Object(c["createBlock"])(u,null,{default:Object(c["withCtx"])((function(){return[b,p]})),_:1})}var k=t("9062"),g=t.n(k),v=(t("e40d"),{components:{Loading:g.a}}),O=t("6b0d"),j=t.n(O);const y=j()(v,[["render",m]]);var w=y,E=t("f5af"),P=t.n(E),B=(t("e829"),{class:"toast-container position-fixed end-0 p-2"}),C={key:0,class:"material-icons-outlined me-3"},T={key:1,class:"material-icons-outlined me-2"},_={class:"fs-3 me-auto"},x=["onClick"];function N(e,n,t,o,r,a){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",B,[(Object(c["openBlock"])(!0),Object(c["createElementBlock"])(c["Fragment"],null,Object(c["renderList"])(r.messages,(function(e,n){return Object(c["openBlock"])(),Object(c["createElementBlock"])("div",{key:n,class:"toast show",role:"alert"},[Object(c["createElementVNode"])("div",{class:Object(c["normalizeClass"])(["toast-body d-flex align-items-center text-white rounded bg-opacity-75","bg-".concat(e.style)])},["success"===e.style?(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",C,"check_circle_outline")):(Object(c["openBlock"])(),Object(c["createElementBlock"])("span",T,"error_outline")),Object(c["createElementVNode"])("p",_,Object(c["toDisplayString"])(e.title),1),Object(c["createElementVNode"])("button",{type:"button",class:"btn-close btn-close-white",onClick:function(e){return a.removeToast(n)},"aria-label":"Close"},null,8,x)],2)])})),128))])}t("a434");var L={data:function(){return{messages:[]}},methods:{showToast:function(){var e=this;setTimeout((function(){e.messages.shift()}),3e3)},removeToast:function(e){this.messages.splice(e,1)}},mounted:function(){var e=this;this.$emitter.on("push-message",(function(n){var t=n.style,c=n.title;e.messages.push({style:t,title:c}),e.showToast()}))}};t("6ac4");const M=j()(L,[["render",N]]);var S=M,A=function(e,n,t){var c;null!==e&&void 0!==e&&null!==(c=e.data)&&void 0!==c&&c.success||!0===e?this.$emitter.emit("push-message",{style:"success",title:"".concat(n,"成功")}):"errMessage"===e?this.$emitter.emit("push-message",{style:"danger",title:n}):this.$emitter.emit("push-message",{style:"danger",title:"".concat(n,"失敗")})},V=t("7bb1"),$=t("3aa8"),F=t("cbdf"),D=t("9457");function I(e,n){var t=Object(c["resolveComponent"])("ToastMessages"),o=Object(c["resolveComponent"])("RouterView");return Object(c["openBlock"])(),Object(c["createElementBlock"])(c["Fragment"],null,[Object(c["createVNode"])(t),Object(c["createVNode"])(o)],64)}t("5a23");const z={},q=j()(z,[["render",I]]);var J=q,R=(t("3ca3"),t("ddb0"),t("6c02")),U=[{path:"",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-02d32e4c")]).then(t.bind(null,"ec5a"))},children:[{path:"",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-6b7d331c"),t.e("chunk-cf8d3c78")]).then(t.bind(null,"4bac"))}},{path:"about",component:function(){return t.e("chunk-2d0f0a00").then(t.bind(null,"9cbb"))}},{path:"products",component:function(){return t.e("chunk-58b46d8d").then(t.bind(null,"ed84"))}},{path:"product/:id",component:function(){return Promise.all([t.e("chunk-6b7d331c"),t.e("chunk-d780a454")]).then(t.bind(null,"8bdd"))}},{path:"favorite",component:function(){return Promise.all([t.e("chunk-6b7d331c"),t.e("chunk-ebd62fcc")]).then(t.bind(null,"b6d4"))}},{path:"order",component:function(){return t.e("chunk-8e59b72c").then(t.bind(null,"b84e"))}},{path:"pay/:id",component:function(){return t.e("chunk-096208ea").then(t.bind(null,"db72"))}},{path:"articles",component:function(){return t.e("chunk-04fb964c").then(t.bind(null,"2673"))}},{path:"article/:id",component:function(){return t.e("chunk-f4eca36c").then(t.bind(null,"a0dc"))}},{path:"orderTrack",component:function(){return t.e("chunk-602bf206").then(t.bind(null,"608d"))}}]},{path:"/admin",component:function(){return t.e("chunk-2d5e07b4").then(t.bind(null,"0a6e"))},children:[{path:"products",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-625e5d88"),t.e("chunk-2fb9937d")]).then(t.bind(null,"d416"))}},{path:"orders",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-625e5d88"),t.e("chunk-29cb4c6e")]).then(t.bind(null,"5651"))}},{path:"coupons",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-625e5d88"),t.e("chunk-b84b5a90")]).then(t.bind(null,"d0a3"))}},{path:"articles",component:function(){return Promise.all([t.e("chunk-3ad049be"),t.e("chunk-625e5d88"),t.e("chunk-3241bd68")]).then(t.bind(null,"8fd0"))}}]},{path:"/login",component:function(){return t.e("chunk-213edbee").then(t.bind(null,"ac5b"))}},{path:"/:pathMatch(.*)*",component:function(){return t.e("chunk-3a3e47f1").then(t.bind(null,"9703"))}}],W=Object(R["a"])({history:Object(R["b"])(),routes:U,linkActiveClass:"active",scrollBehavior:function(e,n,t){return{top:0}}}),G=W;Object(V["d"])({generateMessage:Object(F["a"])({zh_TW:D}),validateOnInput:!0}),Object(F["b"])("zh_TW"),Object.keys($["a"]).forEach((function(e){Object(V["e"])(e,$["a"][e])}));var H=Object(c["createApp"])(J);H.config.globalProperties.$emitter=l,H.config.globalProperties.$httpMessageState=A,H.use({install:function(){P.a.init({disable:!1,offset:200,duration:1e3,easing:"ease",once:!0,mirror:!1})}}),H.use(a["a"],r.a),H.use(s.a),H.use(G),H.component("ToastMessages",S),H.component("Loading",w),H.component("Form",V["c"]),H.component("Field",V["b"]),H.component("ErrorMessage",V["a"]),H.mount("#app")},"5a23":function(e,n,t){"use strict";t("0bd5")},"6ac4":function(e,n,t){"use strict";t("80f3")},"80f3":function(e,n,t){},e311:function(e,n,t){e.exports=t.p+"img/cinnamon.5cf901c6.png"}});
//# sourceMappingURL=app.b7f66971.js.map