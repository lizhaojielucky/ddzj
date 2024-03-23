import{D as A,y as C,F as g,A as V,B as b,G as x,u as w}from"./element-plus.a3b114e5.js";import{r as c}from"./index.70851800.js";import{_ as h}from"./index.9abd4cc2.js";import{d as y,r as U,o as p,c as k,a as r,V as u,M as e,T as l,O as G,L as N,W as R,ar as q}from"./@vue.3ddec1b2.js";import"./@vueuse.b3730649.js";import"./lodash-es.32bc9704.js";import"./async-validator.fb49d0f5.js";import"./@element-plus.4237e19d.js";import"./dayjs.f21e22db.js";import"./axios.12352f85.js";import"./@ctrl.82a509e0.js";import"./@popperjs.36402333.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./lodash.6cb7eccb.js";import"./vue-router.70b81833.js";import"./pinia.4a4088b7.js";import"./css-color-function.dd4e654e.js";import"./color.d16e2a95.js";import"./clone.4b5fce73.js";import"./color-convert.755d189f.js";import"./color-name.e7a4e1d3.js";import"./color-string.e356f5de.js";import"./balanced-match.d2a36341.js";import"./ms.564e106c.js";import"./nprogress.71de6100.js";import"./vue-clipboard3.c11106c9.js";import"./clipboard.4820288f.js";import"./echarts.db1d6bb4.js";import"./zrender.84752e5a.js";import"./tslib.60310f1a.js";import"./highlight.js.4ebdf9a4.js";import"./@highlightjs.d7b1dc3a.js";function I(s=""){return c.get({url:"/setting.transaction_settings/getConfig",params:s})}function T(s){return c.post({url:"/setting.transaction_settings/setConfig",params:s})}const L={class:"transaction_settings"},M={class:"flex flex-col"},O={class:"flex flex-col"},S=r("div",{class:"form-tips"}," \u5F00\u542F\u4E4B\u540E\uFF0C\u7528\u6237\u4E0B\u5355\u7CFB\u7EDF\u4F1A\u5728\u7B26\u5408\u6761\u4EF6\u7684\u60C5\u51B5\u968F\u673A\u6D3E\u5355\u7ED9\u5E08\u5085 ",-1),Au=y({__name:"index",setup(s){const t=U({cancel_unpaid_orders:"",cancel_unpaid_orders_times:"",verification_orders:"",verification_orders_times:"",is_auth_dispatch:""}),f=async()=>{const _=await I();t.value=_},E=async()=>{await T({...t.value})};return f(),(_,o)=>{const i=A,d=C,n=g,m=V,F=b,v=x,D=w,B=q("perms");return p(),k(R,null,[r("div",L,[u(v,{class:"!border-none mt-4",shadow:"never"},{default:e(()=>[u(F,{model:t.value,"label-width":"160px",ref:"formRef"},{default:e(()=>[u(m,{label:"\u7CFB\u7EDF\u53D6\u6D88\u5F85\u4ED8\u6B3E\u8BA2\u5355",prop:"cancel_unpaid_orders"},{default:e(()=>[u(n,{modelValue:t.value.cancel_unpaid_orders,"onUpdate:modelValue":o[1]||(o[1]=a=>t.value.cancel_unpaid_orders=a)},{default:e(()=>[r("div",M,[u(i,{class:"mb-[14px]",label:0},{default:e(()=>[l("\u5173\u95ED\u7CFB\u7EDF\u81EA\u52A8\u53D6\u6D88\u5F85\u4ED8\u6B3E\u8BA2\u5355")]),_:1}),u(i,{label:1},{default:e(()=>[l(" \u8BA2\u5355\u63D0\u4EA4\u540E "),u(d,{modelValue:t.value.cancel_unpaid_orders_times,"onUpdate:modelValue":o[0]||(o[0]=a=>t.value.cancel_unpaid_orders_times=a),class:"w-20 mx-2 ls-input"},null,8,["modelValue"]),l(" \u5206\u949F\u5185\u672A\u4ED8\u6B3E\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u53D6\u6D88 ")]),_:1})])]),_:1},8,["modelValue"])]),_:1}),u(m,{label:"\u7CFB\u7EDF\u81EA\u52A8\u6838\u9500\u8BA2\u5355",prop:"verification_orders"},{default:e(()=>[u(n,{modelValue:t.value.verification_orders,"onUpdate:modelValue":o[3]||(o[3]=a=>t.value.verification_orders=a)},{default:e(()=>[r("div",O,[u(i,{class:"mb-[14px]",label:0},{default:e(()=>[l("\u5173\u95ED\u7CFB\u7EDF\u81EA\u52A8\u6838\u9500\u8BA2\u5355")]),_:1}),u(i,{label:1},{default:e(()=>[l(" \u5E08\u5085\u672A\u5728 "),u(d,{required:"",modelValue:t.value.verification_orders_times,"onUpdate:modelValue":o[2]||(o[2]=a=>t.value.verification_orders_times=a),class:"w-20 mx-2 ls-input"},null,8,["modelValue"]),l(" \u5C0F\u65F6\u5185\u6838\u9500\u8BA2\u5355\uFF0C\u7CFB\u7EDF\u81EA\u52A8\u6838\u9500 ")]),_:1})])]),_:1},8,["modelValue"])]),_:1}),u(m,{label:"\u7CFB\u7EDF\u968F\u673A\u6D3E\u5355",prop:"is_auth_dispatch"},{default:e(()=>[r("div",null,[u(n,{modelValue:t.value.is_auth_dispatch,"onUpdate:modelValue":o[4]||(o[4]=a=>t.value.is_auth_dispatch=a)},{default:e(()=>[u(i,{label:1},{default:e(()=>[l("\u5F00\u542F")]),_:1}),u(i,{label:0},{default:e(()=>[l("\u5173\u95ED")]),_:1})]),_:1},8,["modelValue"]),S])]),_:1})]),_:1},8,["model"])]),_:1})]),u(h,null,{default:e(()=>[G((p(),N(D,{type:"primary",onClick:E},{default:e(()=>[l("\u4FDD\u5B58")]),_:1})),[[B,["setting.transaction_settings/setConfig"]]])]),_:1})],64)}}});export{Au as default};