import{_ as V}from"./index.9abd4cc2.js";import{y as b,A as w,B as x,G as y,u as B}from"./element-plus.a3b114e5.js";import{_ as E}from"./index.vue_vue_type_script_setup_true_lang.0e249a79.js";import{d as F,r as g,o as d,c as h,a as m,V as e,M as r,a4 as D,O as A,L as C,T as k,W as U,ar as N}from"./@vue.3ddec1b2.js";import{c as P,d as G}from"./website.4be91757.js";import"./index.70851800.js";import"./@vueuse.b3730649.js";import"./lodash.6cb7eccb.js";import"./axios.12352f85.js";import"./vue-router.70b81833.js";import"./pinia.4a4088b7.js";import"./css-color-function.dd4e654e.js";import"./color.d16e2a95.js";import"./clone.4b5fce73.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./@element-plus.4237e19d.js";import"./nprogress.71de6100.js";import"./vue-clipboard3.c11106c9.js";import"./clipboard.4820288f.js";import"./echarts.db1d6bb4.js";import"./zrender.84752e5a.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.d7b1dc3a.js";import"./lodash-es.32bc9704.js";import"./async-validator.fb49d0f5.js";import"./dayjs.f21e22db.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@wangeditor.d15abcb9.js";import"./picker.680ce7f4.js";import"./index.cb61996f.js";import"./index.58caa13d.js";import"./index.vue_vue_type_script_setup_true_lang.455193be.js";import"./index.6759d5ec.js";import"./index.f971bb32.js";import"./usePaging.0e69bc9a.js";import"./vue3-video-play.6dd73449.js";import"./vuedraggable.c932d9d2.js";import"./vue.f7b45964.js";import"./sortablejs.4f3af5d7.js";const I={class:"xl:flex"},M=m("span",{class:"font-medium"},"\u670D\u52A1\u534F\u8BAE",-1),T=m("span",{class:"font-medium"},"\u9690\u79C1\u534F\u8BAE",-1),Pt=F({__name:"protocol",setup(L){const t=g({service_title:"",service_content:"",privacy_title:"",privacy_content:""}),i=async()=>{t.value=await P()},_=async()=>{await G({...t.value}),i()};return i(),(O,o)=>{const a=b,n=w,p=x,s=E,u=y,c=B,v=V,f=N("perms");return d(),h(U,null,[m("div",I,[e(u,{class:"!border-none flex-1 xl:mr-4 mb-4",shadow:"never"},{header:r(()=>[M]),default:r(()=>[e(p,{model:t.value,"label-width":"80px",onSubmit:o[1]||(o[1]=D(()=>{},["prevent"]))},{default:r(()=>[e(n,{label:"\u534F\u8BAE\u540D\u79F0"},{default:r(()=>[e(a,{modelValue:t.value.service_title,"onUpdate:modelValue":o[0]||(o[0]=l=>t.value.service_title=l)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),e(s,{class:"mb-10",modelValue:t.value.service_content,"onUpdate:modelValue":o[2]||(o[2]=l=>t.value.service_content=l),height:"600"},null,8,["modelValue"])]),_:1}),e(u,{class:"!border-none flex-1 mb-4",shadow:"never"},{header:r(()=>[T]),default:r(()=>[e(p,{model:t.value,"label-width":"80px"},{default:r(()=>[e(n,{label:"\u534F\u8BAE\u540D\u79F0"},{default:r(()=>[e(a,{modelValue:t.value.privacy_title,"onUpdate:modelValue":o[3]||(o[3]=l=>t.value.privacy_title=l)},null,8,["modelValue"])]),_:1})]),_:1},8,["model"]),e(s,{class:"mb-10",modelValue:t.value.privacy_content,"onUpdate:modelValue":o[4]||(o[4]=l=>t.value.privacy_content=l),height:"600"},null,8,["modelValue"])]),_:1})]),A((d(),C(v,null,{default:r(()=>[e(c,{type:"primary",onClick:_},{default:r(()=>[k("\u4FDD\u5B58")]),_:1})]),_:1})),[[f,["setting.web.web_setting/setAgreement"]]])],64)}}});export{Pt as default};