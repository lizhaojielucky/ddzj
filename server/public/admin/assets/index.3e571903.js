import{H as C,G as b,Q as v,_ as w,u as A,S as k,T as y}from"./element-plus.a3b114e5.js";import{_ as D,s as x}from"./edit.vue_vue_type_script_setup_true_lang.6c372775.js";import{d as T,s as L,_ as R,o as a,c as S,V as t,M as e,O as d,L as i,T as l,ar as V}from"./@vue.3ddec1b2.js";import"./@vueuse.b3730649.js";import"./lodash-es.32bc9704.js";import"./async-validator.fb49d0f5.js";import"./@element-plus.4237e19d.js";import"./dayjs.f21e22db.js";import"./axios.12352f85.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./index.70851800.js";import"./lodash.6cb7eccb.js";import"./vue-router.70b81833.js";import"./pinia.4a4088b7.js";import"./css-color-function.dd4e654e.js";import"./color.d16e2a95.js";import"./clone.4b5fce73.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.71de6100.js";import"./vue-clipboard3.c11106c9.js";import"./clipboard.4820288f.js";import"./echarts.db1d6bb4.js";import"./zrender.84752e5a.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.d7b1dc3a.js";import"./index.cb61996f.js";const N={class:"storage"},Et=T({__name:"index",setup($){const m=L(),o=R({loading:!1,lists:[]}),p=async()=>{try{o.loading=!0,o.lists=await x(),o.loading=!1}catch{o.loading=!1}},F=r=>{var s;(s=m.value)==null||s.open(r)};return p(),(r,s)=>{const f=C,c=b,u=v,_=w,B=A,E=k,g=V("perms"),h=y;return a(),S("div",N,[t(c,{class:"!border-none",shadow:"never"},{default:e(()=>[t(f,{type:"warning",title:"\u6E29\u99A8\u63D0\u793A\uFF1A1.\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\u540E\uFF0C\u9700\u8981\u5C06\u8D44\u6E90\u6587\u4EF6\u4F20\u8F93\u81F3\u65B0\u7684\u5B58\u50A8\u7AEF\uFF1B2.\u8BF7\u52FF\u968F\u610F\u5207\u6362\u5B58\u50A8\u65B9\u5F0F\uFF0C\u53EF\u80FD\u5BFC\u81F4\u56FE\u7247\u65E0\u6CD5\u67E5\u770B",closable:!1,"show-icon":""})]),_:1}),d((a(),i(c,{class:"!border-none mt-4",shadow:"never"},{default:e(()=>[t(E,{size:"large",data:o.lists},{default:e(()=>[t(u,{label:"\u50A8\u5B58\u65B9\u5F0F",prop:"name","min-width":"120"}),t(u,{label:"\u50A8\u5B58\u4F4D\u7F6E",prop:"path","min-width":"160"}),t(u,{label:"\u72B6\u6001","min-width":"80"},{default:e(({row:n})=>[n.status==1?(a(),i(_,{key:0},{default:e(()=>[l("\u5F00\u542F")]),_:1})):(a(),i(_,{key:1,type:"danger"},{default:e(()=>[l("\u5173\u95ED")]),_:1}))]),_:1}),t(u,{label:"\u64CD\u4F5C","min-width":"80",fixed:"right"},{default:e(({row:n})=>[d((a(),i(B,{type:"primary",link:"",onClick:z=>F(n.engine)},{default:e(()=>[l(" \u8BBE\u7F6E ")]),_:2},1032,["onClick"])),[[g,["setting.storage/setup"]]])]),_:1})]),_:1},8,["data"])]),_:1})),[[h,o.loading]]),t(D,{ref_key:"editRef",ref:m,onSuccess:p},null,512)])}}});export{Et as default};