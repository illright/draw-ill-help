var le=Object.defineProperty;var q=Object.getOwnPropertySymbols;var ce=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable;var O=(s,e,t)=>e in s?le(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,Y=(s,e)=>{for(var t in e||(e={}))ce.call(e,t)&&O(s,t,e[t]);if(q)for(var t of q(e))fe.call(e,t)&&O(s,t,e[t]);return s};import{r as ue}from"./singletons-12a22614.js";import{S as x,i as C,s as D,B as R,M as de,N as he,a as b,d as h,O as F,f as p,p as ge,K as M,P as J,e as _,k as z,c as v,n as V,b as g,F as B,A as me,X as be,Y as _e,U as H,J as W,D as ve,G as we,H as pe,I as ye,x as N,u as A,y as Se,j as T,m as K,Z,o as L,_ as G,r as X,v as j,w as Q,$ as ke,t as Be,g as xe,h as Ce,a0 as De}from"./vendor-4fd8af32.js";import{c as Me}from"./classes-ea0002a8.js";const U=new Map;let $=0;function tt(s){return U.set($,s),$++}function Ne(s){const e=U.get(s);return U.delete(s),e}const Ae=ue,nt=Ee;async function Ee(s,e){return Ae.goto(s,e,[])}function Pe(s){let e,t='<path d="M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z" fill="currentColor"/>',a=[{width:"1.2em"},{height:"1.2em"},{preserveAspectRatio:"xMidYMid meet"},{viewBox:"0 0 24 24"},s[0]],n={};for(let o=0;o<a.length;o+=1)n=R(n,a[o]);return{c(){e=de("svg"),this.h()},l(o){e=he(o,"svg",{width:!0,height:!0,preserveAspectRatio:!0,viewBox:!0});var i=b(e);i.forEach(h),this.h()},h(){F(e,n)},m(o,i){p(o,e,i),e.innerHTML=t},p(o,[i]){F(e,n=ge(a,[{width:"1.2em"},{height:"1.2em"},{preserveAspectRatio:"xMidYMid meet"},{viewBox:"0 0 24 24"},i&1&&o[0]]))},i:M,o:M,d(o){o&&h(e)}}}function Te(s,e,t){return s.$$set=a=>{t(0,e=R(R({},e),J(a)))},e=J(e),[e]}class st extends x{constructor(e){super();C(this,e,Te,Pe,D,{})}}let y;function Le(s){if(s.contentBoxSize){const e=Array.isArray(s.contentBoxSize)?s.contentBoxSize[0]:s.contentBoxSize;return{width:e.inlineSize,height:e.blockSize}}else return{width:s.contentRect.width,height:s.contentRect.height}}function je(s,e){y!==void 0&&y.disconnect(),y=new ResizeObserver(t=>{for(const a of t){const n=Le(a);for(const o of s)o.setDimensions(n)}}),y.observe(e)}function Ie(){y==null||y.disconnect()}function Re(s){let e,t,a,n,o;return{c(){e=_("div"),t=_("canvas"),a=z(),n=_("div"),o=_("canvas"),this.h()},l(i){e=v(i,"DIV",{class:!0});var f=b(e);t=v(f,"CANVAS",{}),b(t).forEach(h),f.forEach(h),a=V(i),n=v(i,"DIV",{class:!0});var c=b(n);o=v(c,"CANVAS",{}),b(o).forEach(h),c.forEach(h),this.h()},h(){g(e,"class","h-full"),g(n,"class","sr-only")},m(i,f){p(i,e,f),B(e,t),s[9](t),s[10](e),p(i,a,f),p(i,n,f),B(n,o),s[11](o)},p:M,i:M,o:M,d(i){i&&h(e),s[9](null),s[10](null),i&&h(a),i&&h(n),s[11](null)}}}function ze(s,e,t){let a,n,o,i,f,c,l="#ffffff",r="#000000";function u(){i==null||i.clear(),i==null||i.setBackgroundColor(l,()=>{})}function w(d){i!==void 0&&t(6,i.isDrawingMode=d,i)}function E(d,m){if(i!==void 0){const k=Ne(d);if(m===null)return;i.remove(k);const re=m.className==="Circle"?{rx:m.bbox[2]/2,ry:m.bbox[3]/2}:{width:m.bbox[2],height:m.bbox[3]},P=new Me[m.className](Y({left:m.bbox[0],top:m.bbox[1]},re));P.stroke=r,P.strokeWidth=4,P.fill="transparent",i.add(P)}}function S(d){const m=document.querySelector("html");if(m!==null){const k=getComputedStyle(m);d.matches?(t(7,l=k.getPropertyValue("--canvas-dark-bg")),t(8,r=k.getPropertyValue("--canvas-dark-fg"))):(t(7,l=k.getPropertyValue("--canvas-light-bg")),t(8,r=k.getPropertyValue("--canvas-light-fg")))}}me(()=>{c=window.matchMedia("(prefers-color-scheme: dark)"),c.addEventListener("change",S),S(c),!(n===void 0||o===void 0)&&(t(6,i=new W.fabric.Canvas(n,{enableRetinaScaling:!1,isDrawingMode:!0,backgroundColor:l})),t(6,i.freeDrawingBrush.width=4,i),t(6,i.freeDrawingBrush.color=r,i),f=new W.fabric.Canvas(o,{skipOffscreen:!1,enableRetinaScaling:!1}),i.on("object:added",({target:d})=>{d instanceof W.fabric.Path?i!==void 0&&f!==void 0&&se("object-drawn",{object:d,fabricReal:i,fabricOffScreen:f}):d!==void 0&&(d.stroke=r)}),a!==void 0&&je([i,f],a))}),be(()=>{c==null||c.removeEventListener("change",S),Ie()});const se=_e();function oe(d){H[d?"unshift":"push"](()=>{n=d,t(1,n)})}function ie(d){H[d?"unshift":"push"](()=>{a=d,t(0,a)})}function ae(d){H[d?"unshift":"push"](()=>{o=d,t(2,o)})}return s.$$.update=()=>{s.$$.dirty&448&&i!==void 0&&(t(6,i.freeDrawingBrush.color=r,i),i.setBackgroundColor(l,()=>{}))},[a,n,o,u,w,E,i,l,r,oe,ie,ae]}class ot extends x{constructor(e){super();C(this,e,ze,Re,D,{clear:3,setDrawingMode:4,addPredictedObject:5})}get clear(){return this.$$.ctx[3]}get setDrawingMode(){return this.$$.ctx[4]}get addPredictedObject(){return this.$$.ctx[5]}}function Ve(s,e){const[t,a,n,o]=s;return[Math.max(0,t-n*(e-1)),Math.max(0,a-o*(e-1)),n*(e*2-1),o*(e*2-1)]}function He(s){const{left:e,top:t,width:a,height:n,strokeWidth:o}=s;if(!(e===void 0||t===void 0||a===void 0||n===void 0||o===void 0))return[e,t,a+o,n+o]}function We(s){const[e,t,a,n]=s,o=[e+a/2,t+n/2],i=Math.max(a,n);return[o[0]-i/2,o[1]-i/2,i,i]}function Ue(s,e){const[t,a,n,o]=s,[i,f]=e;return[t-i,a-f,n,o]}function qe(s,e,t){const[a,n,o,i]=s,[f,c,l,r]=e,[u,w,E,S]=t;return[a/l*E,n/r*S,o/l*E,i/r*S]}const ee=416,I=[0,0,ee,ee];function Oe(s,e){const t=document.createElement("canvas"),a=I;t.width=I[2],t.height=I[3];const n=t.getContext("2d");return n!==null?(n.fillStyle="white",n.fillRect(0,0,t.width,t.height),n.drawImage(s,...e,...a),t):null}async function it(s,e){if(s===void 0)return null;const t=s.toObject();t.stroke="#000",await new Promise(n=>e.loadFromJSON({objects:[t],background:"#fff"},n)),e.renderAll();const a=He(s);if(a!==void 0){const n=We(Ve(a,1.1)),o=Ue(a,n),i=qe(o,n,I),f=Oe(e.getElement(),n);if(f!==null)return[f,i,n]}return null}function Ye(s){let e,t;const a=s[2].default,n=ve(a,s,s[1],null);return{c(){e=_("div"),n&&n.c(),this.h()},l(o){e=v(o,"DIV",{class:!0});var i=b(e);n&&n.l(i),i.forEach(h),this.h()},h(){g(e,"class","p-1 rounded-lg absolute left-1/2 bottom-2 -translate-x-1/2 grid grid-flow-col grid-rows-1 gap-1 bg-black bg-opacity-20 text-gray-500 ")},m(o,i){p(o,e,i),n&&n.m(e,null),t=!0},p(o,[i]){n&&n.p&&(!t||i&2)&&we(n,a,o,o[1],t?ye(a,o[1],i,null):pe(o[1]),null)},i(o){t||(N(n,o),t=!0)},o(o){A(n,o),t=!1},d(o){o&&h(e),n&&n.d(o)}}}const te={};function Fe(s,e,t){let{$$slots:a={},$$scope:n}=e,{name:o="toolbar"}=e;return Se(te,o),s.$$set=i=>{"name"in i&&t(0,o=i.name),"$$scope"in i&&t(1,n=i.$$scope)},[o,n,a]}class at extends x{constructor(e){super();C(this,e,Fe,Ye,D,{name:0})}}function Je(s){let e,t,a,n,o,i,f;var c=s[1];function l(r){return{props:{class:"w-6 h-6"}}}return c&&(n=new c(l())),{c(){e=_("label"),t=_("input"),a=z(),n&&T(n.$$.fragment),this.h()},l(r){e=v(r,"LABEL",{class:!0,title:!0});var u=b(e);t=v(u,"INPUT",{type:!0,name:!0,"aria-label":!0,class:!0}),a=V(u),n&&K(n.$$.fragment,u),u.forEach(h),this.h()},h(){g(t,"type","radio"),g(t,"name",s[3]),t.__value=s[2],t.value=t.__value,g(t,"aria-label",s[2]),g(t,"class","sr-only"),s[5][0].push(t),g(e,"class","rounded-md w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-opacity-20 hover:bg-black "),g(e,"title",s[2]),Z(e,"text-blue-700",s[2]===s[0])},m(r,u){p(r,e,u),B(e,t),t.checked=t.__value===s[0],B(e,a),n&&L(n,e,null),o=!0,i||(f=G(t,"change",s[4]),i=!0)},p(r,[u]){if((!o||u&4)&&(t.__value=r[2],t.value=t.__value),(!o||u&4)&&g(t,"aria-label",r[2]),u&1&&(t.checked=t.__value===r[0]),c!==(c=r[1])){if(n){X();const w=n;A(w.$$.fragment,1,0,()=>{j(w,1)}),Q()}c?(n=new c(l()),T(n.$$.fragment),N(n.$$.fragment,1),L(n,e,null)):n=null}(!o||u&4)&&g(e,"title",r[2]),u&5&&Z(e,"text-blue-700",r[2]===r[0])},i(r){o||(n&&N(n.$$.fragment,r),o=!0)},o(r){n&&A(n.$$.fragment,r),o=!1},d(r){r&&h(e),s[5][0].splice(s[5][0].indexOf(t),1),n&&j(n),i=!1,f()}}}function Ke(s,e,t){let{icon:a}=e,{toolName:n}=e,{group:o}=e;const i=ke(te),f=[[]];function c(){o=this.__value,t(0,o)}return s.$$set=l=>{"icon"in l&&t(1,a=l.icon),"toolName"in l&&t(2,n=l.toolName),"group"in l&&t(0,o=l.group)},[o,a,n,i,c,f]}class rt extends x{constructor(e){super();C(this,e,Ke,Je,D,{icon:1,toolName:2,group:0})}}function ne(s){let e,t;return{c(){e=_("span"),t=Be(s[3]),this.h()},l(a){e=v(a,"SPAN",{class:!0});var n=b(e);t=xe(n,s[3]),n.forEach(h),this.h()},h(){g(e,"class","absolute right-0 top-0 px-1 h-4 text-xs rounded-full bg-red-600 text-white")},m(a,n){p(a,e,n),B(e,t)},p(a,n){n&8&&Ce(t,a[3])},d(a){a&&h(e)}}}function Ze(s){let e,t,a,n,o,i;var f=s[0];function c(r){return{props:{class:"w-6 h-6 text-white"}}}f&&(t=new f(c()));let l=s[3]!==null&&ne(s);return{c(){e=_("button"),t&&T(t.$$.fragment),a=z(),l&&l.c(),this.h()},l(r){e=v(r,"BUTTON",{class:!0,title:!0});var u=b(e);t&&K(t.$$.fragment,u),a=V(u),l&&l.l(u),u.forEach(h),this.h()},h(){g(e,"class","relative rounded-md w-12 h-12 flex justify-center items-center bg-opacity-80 bg-blue-800 hover:bg-opacity-80 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed "),g(e,"title",s[1]),e.disabled=s[2]},m(r,u){p(r,e,u),t&&L(t,e,null),B(e,a),l&&l.m(e,null),n=!0,o||(i=G(e,"click",s[4]),o=!0)},p(r,[u]){if(f!==(f=r[0])){if(t){X();const w=t;A(w.$$.fragment,1,0,()=>{j(w,1)}),Q()}f?(t=new f(c()),T(t.$$.fragment),N(t.$$.fragment,1),L(t,e,a)):t=null}r[3]!==null?l?l.p(r,u):(l=ne(r),l.c(),l.m(e,null)):l&&(l.d(1),l=null),(!n||u&2)&&g(e,"title",r[1]),(!n||u&4)&&(e.disabled=r[2])},i(r){n||(t&&N(t.$$.fragment,r),n=!0)},o(r){t&&A(t.$$.fragment,r),n=!1},d(r){r&&h(e),t&&j(t),l&&l.d(),o=!1,i()}}}function Ge(s,e,t){let{icon:a}=e,{actionName:n}=e,{disabled:o=!1}=e,{badge:i=null}=e;function f(c){De.call(this,s,c)}return s.$$set=c=>{"icon"in c&&t(0,a=c.icon),"actionName"in c&&t(1,n=c.actionName),"disabled"in c&&t(2,o=c.disabled),"badge"in c&&t(3,i=c.badge)},[a,n,o,i,f]}class lt extends x{constructor(e){super();C(this,e,Ge,Ze,D,{icon:0,actionName:1,disabled:2,badge:3})}}export{lt as A,st as B,ot as C,at as T,rt as a,it as e,nt as g,tt as t};
