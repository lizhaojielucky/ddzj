import{d as u,f as c}from"./element-plus.a3b114e5.js";import{d,o as e,L as r,M as p,c as _,aa as f,W as x,a as y,U as g}from"./@vue.3ddec1b2.js";import{d as v}from"./index.70851800.js";import"./@vueuse.b3730649.js";import"./lodash-es.32bc9704.js";import"./async-validator.fb49d0f5.js";import"./@element-plus.4237e19d.js";import"./dayjs.f21e22db.js";import"./axios.12352f85.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.6cb7eccb.js";import"./vue-router.70b81833.js";import"./pinia.4a4088b7.js";import"./css-color-function.dd4e654e.js";import"./color.d16e2a95.js";import"./clone.4b5fce73.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.71de6100.js";import"./vue-clipboard3.c11106c9.js";import"./clipboard.4820288f.js";import"./echarts.db1d6bb4.js";import"./zrender.84752e5a.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.d7b1dc3a.js";const V=d({__name:"menu",props:{menus:{type:Object,default:()=>({})},modelValue:{type:String,default:"1"}},emits:["update:modelValue"],setup(t,{emit:a}){const i=o=>{a("update:modelValue",o)};return(o,h)=>{const n=u,s=c;return e(),r(s,{"default-active":t.modelValue,class:"w-[160px] min-h-[668px] pages-menu",onSelect:i},{default:p(()=>[(e(!0),_(x,null,f(t.menus,(m,l)=>(e(),r(n,{index:l,key:m.id},{default:p(()=>[y("span",null,g(m.name),1)]),_:2},1032,["index"]))),128))]),_:1},8,["default-active"])}}});const ee=v(V,[["__scopeId","data-v-913ffef7"]]);export{ee as default};