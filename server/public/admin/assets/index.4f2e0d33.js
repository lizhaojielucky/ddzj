import{y as P,A as O,O as M,P as j,u as z,B as G,G as Q,Q as W,a as $,t as q,_ as H,R as J,S as K,b as X}from"./element-plus.62ab1451.js";import{a as Y,f as Z,g as ee}from"./category.5e9d6050.js";import{L as te}from"./@element-plus.4237e19d.js";import y from"./category-form.f589bb33.js";import{f as oe}from"./index.7e7d93d0.js";import{u as le}from"./usePaging.0e69bc9a.js";import{d as ae,s as ue,r as F,j as se,o as f,c as re,V as e,M as t,a as m,u as r,T as n,O as w,U as ne,L as g,S as b,W as ie,ar as me}from"./@vue.3ddec1b2.js";import"./@vueuse.b3730649.js";import"./lodash-es.32bc9704.js";import"./async-validator.fb49d0f5.js";import"./dayjs.3f20994d.js";import"./axios.25713f9d.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.7a0b9c3a.js";import"./picker.f4c7e29a.js";import"./index.86959ff9.js";import"./index.vue_vue_type_script_setup_true_lang.ec3e131a.js";import"./index.01b851d7.js";import"./index.830c02a8.js";import"./vue3-video-play.6dd73449.js";import"./vuedraggable.e8f60bfb.js";import"./vue.bed21213.js";import"./sortablejs.95142d26.js";import"./lodash.09c27007.js";import"./vue-router.70b81833.js";import"./pinia.4a4088b7.js";import"./css-color-function.6cac4cf2.js";import"./color.aa9d0e7b.js";import"./clone.467d5f2b.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.73f6d097.js";import"./vue-clipboard3.8191fcdc.js";import"./clipboard.e51d27f9.js";import"./echarts.db1d6bb4.js";import"./zrender.84752e5a.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.d7b1dc3a.js";const de={class:"flex"},pe={class:"w-[88px]"},_e={class:"image-slot"},ce={class:"flex items-center"},rt=ae({__name:"index",setup(fe){const B=ue();F([]);const l=F({name:"",is_show:"",is_recommend:""}),{pager:D,getLists:i,resetPage:V,resetParams:k}=le({fetchFun:Y,params:l.value}),x=async d=>{await oe.confirm("\u5982\u679C\u8BE5\u670D\u52A1\u5DF2\u88AB\u5E08\u5085\u5173\u8054\uFF0C\u6B64\u6B21\u64CD\u4F5C\u4E5F\u4F1A\u540C\u65F6\u5220\u9664\u5E08\u5085\u5173\u8054\u7684\u670D\u52A1\u9879\u76EE\uFF0C\u8BF7\u8C28\u614E\u64CD\u4F5C"),await Z({id:d}),i()},A=async(d,a)=>{await ee({is_show:d,id:a}),i()};return se(()=>{i()}),(d,a)=>{const R=P,p=O,s=M,h=j,v=z,S=G,C=Q,u=W,T=$,U=X,L=q,E=H,I=J,N=K,_=me("perms");return f(),re(ie,null,[e(C,{class:"!border-none",shadow:"never"},{default:t(()=>[e(S,{class:"ls-form",model:l.value,inline:""},{default:t(()=>[e(p,{label:"\u5206\u7C7B\u540D\u79F0"},{default:t(()=>[e(R,{class:"ls-input",modelValue:l.value.name,"onUpdate:modelValue":a[0]||(a[0]=o=>l.value.name=o),placeholder:"\u8BF7\u8F93\u5165\u5206\u7C7B\u540D\u79F0"},null,8,["modelValue"])]),_:1}),e(p,{label:"\u663E\u793A\u72B6\u6001"},{default:t(()=>[e(h,{modelValue:l.value.is_show,"onUpdate:modelValue":a[1]||(a[1]=o=>l.value.is_show=o),class:"ls-input"},{default:t(()=>[e(s,{label:"\u5168\u90E8",value:""}),e(s,{label:"\u663E\u793A",value:"1"}),e(s,{label:"\u9690\u85CF",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(p,{label:"\u9996\u9875\u63A8\u8350"},{default:t(()=>[e(h,{modelValue:l.value.is_recommend,"onUpdate:modelValue":a[2]||(a[2]=o=>l.value.is_recommend=o),class:"ls-input"},{default:t(()=>[e(s,{label:"\u5168\u90E8",value:""}),e(s,{label:"\u63A8\u8350",value:"1"}),e(s,{label:"\u4E0D\u63A8\u8350",value:"0"})]),_:1},8,["modelValue"])]),_:1}),e(p,null,{default:t(()=>[m("div",de,[e(v,{type:"primary",onClick:r(V)},{default:t(()=>[n("\u67E5\u8BE2")]),_:1},8,["onClick"]),e(v,{onClick:r(k)},{default:t(()=>[n("\u91CD\u7F6E")]),_:1},8,["onClick"])])]),_:1})]),_:1},8,["model"])]),_:1}),e(C,{shadow:"never",class:"!border-none mt-4"},{default:t(()=>[m("div",pe,[w(e(y,{onRefresh:r(i),type:"primary",btnText:"\u65B0\u589E\u5206\u7C7B"},null,8,["onRefresh"]),[[_,["goods.goods_category/add"]]])]),m("div",null,[e(N,{ref_key:"tableRef",ref:B,data:r(D).lists,size:"large","row-key":"id",indent:20,"tree-props":{children:"sons"}},{default:t(()=>[e(u,{label:"\u5206\u7C7B\u540D\u79F0","show-overflow-tooltip":"","min-width":"190"},{default:t(({row:o})=>[n(ne(o.name),1)]),_:1}),e(u,{label:"\u5206\u7C7B\u56FE\u7247","min-width":"140"},{default:t(o=>[e(U,{style:{width:"40px",height:"40px"},src:o.row.image,"preview-src-list":[o.row.image],"hide-on-click-modal":!0,"preview-teleported":!0,fit:"cover"},{error:t(()=>[m("div",_e,[e(T,null,{default:t(()=>[e(r(te))]),_:1})])]),_:2},1032,["src","preview-src-list"])]),_:1}),e(u,{property:"address",label:"\u72B6\u6001","min-width":"140"},{default:t(o=>[w(e(L,{modelValue:o.row.is_show,"onUpdate:modelValue":c=>o.row.is_show=c,"active-value":1,"inactive-value":0,onChange:c=>A(c,o.row.id)},null,8,["modelValue","onUpdate:modelValue","onChange"]),[[_,["goods.goods_category/status"]]])]),_:1}),e(u,{property:"recommend_desc",label:"\u9996\u9875\u63A8\u8350","min-width":"157"},{default:t(o=>[o.row.is_recommend==0?(f(),g(E,{key:0,type:"info"},{default:t(()=>[n("\u4E0D\u63A8\u8350")]),_:1})):b("",!0),o.row.is_recommend==1?(f(),g(E,{key:1,type:"success"},{default:t(()=>[n("\u63A8\u8350")]),_:1})):b("",!0)]),_:1}),e(u,{property:"sort",label:"\u6392\u5E8F","min-width":"140"}),e(u,{property:"create_time",label:"\u6DFB\u52A0\u65F6\u95F4","min-width":"180"}),e(u,{label:"\u64CD\u4F5C","min-width":"182",fixed:"right"},{default:t(o=>[m("div",ce,[w(e(y,{id:o.row.id,type:"text",btnText:"\u7F16\u8F91",onRefresh:r(i)},null,8,["id","onRefresh"]),[[_,["goods.goods_category/edit"]]]),w((f(),g(I,{class:"ml-4",type:"danger",underline:!1,onClick:c=>x(o.row.id)},{default:t(()=>[n(" \u5220\u9664 ")]),_:2},1032,["onClick"])),[[_,["goods.goods_category/del"]]])])]),_:1})]),_:1},8,["data"])])]),_:1})],64)}}});export{rt as default};