import{J as n}from"./vendor-4fd8af32.js";function l(){return new Worker("/draw-ill-help/_app/assets/yolov5.worker.f43fb8ab.js",{type:"module"})}let t,i=[],s;const p=new Promise(e=>{s=e});function u(e){i.push(e)}function b(e){i=i.filter(a=>a!==e)}function c(e){if(e.data.type==="prediction")for(const a of i)a(e.data.id,e.data.data);else e.data.type==="model-ready"&&(s==null||s())}const m={initialize(){t=new l,t.addEventListener("message",c)},predict(e,a,r){const o=e.getContext("2d"),d=o==null?void 0:o.getImageData(0,0,e.width,e.height);e!==void 0&&(t==null||t.postMessage({image:d,regionBBox:a,id:r}))},stop(){t==null||t.removeEventListener("message",c),i=[]}},v={Circle:n.fabric.Ellipse,Rectangle:n.fabric.Rect};export{v as c,m as d,p as m,u as o,b as u};