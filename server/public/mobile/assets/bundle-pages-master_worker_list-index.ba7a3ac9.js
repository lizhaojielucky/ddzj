import{d as a,W as e,v as l,o as s,b as t,w as r,e as o,f as u,k as d,l as i,F as m,r as c,a as n,j as p,g as f,t as _,aq as g}from"./index.9cb42b0a.js";import{_ as h}from"./u-search.258dbada.js";import{_ as v}from"./u-image.b14343b7.js";import{_ as x}from"./z-paging.c80fe707.js";import{d as b}from"./store.fb10cb3f.js";import{_ as w}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.468cc24b.js";var j=w(a({__name:"index",setup(a){const w=e(!1),j=e(""),y=e([]),k=l(null),V=a=>{var e;a?""!==j.value&&(w.value=!0):(j.value="",w.value=!1),null==(e=k.value)||e.reload()},z=async(a,e)=>{try{const{lists:l}=await b({pageNo:a,pageSize:e,name:j.value});k.value.complete(l)}catch(l){console.log("报错=>",l),k.value.complete(!1)}};return(a,e)=>{const l=c(n("u-search"),h),b=p,w=c(n("u-image"),v),C=g,S=c(n("z-paging"),x);return s(),t(b,{class:"container"},{default:r((()=>[o(b,{class:"px-[24rpx] py-[14rpx] bg-white"},{default:r((()=>[o(l,{modelValue:j.value,"onUpdate:modelValue":e[0]||(e[0]=a=>j.value=a),placeholder:"请输入关键词搜索",height:"72",onSearch:V,onCustom:V,onClear:z},null,8,["modelValue"])])),_:1}),o(b,{class:"main bg-white mt-[20rpx]"},{default:r((()=>[o(S,{"auto-show-back-to-top":"",auto:!0,ref_key:"paging",ref:k,modelValue:y.value,"onUpdate:modelValue":e[1]||(e[1]=a=>y.value=a),onQuery:z,fixed:!1,height:"100%"},{default:r((()=>[u(" 订单卡片 "),(s(!0),d(m,null,i(y.value,(a=>(s(),t(C,{key:a.id,url:`/bundle/pages/master_worker_detail/index?id=${a.id}`},{default:r((()=>[o(b,{class:"flex master_worker_item col-start"},{default:r((()=>[o(w,{src:a.user_image,width:"100",height:"100","border-radius":"50%"},null,8,["src"]),o(b,{class:"ml-[20rpx]"},{default:r((()=>[o(b,{class:"text-lg font-medium normal"},{default:r((()=>[f(_(a.name),1)])),_:2},1024),o(b,{class:"lighter text-sm mt-[10rpx]"},{default:r((()=>[f("所在地区："+_(a.city)+" - "+_(a.district),1)])),_:2},1024),o(b,{class:"lighter text-sm mt-[10rpx] truncate w-[580rpx]"},{default:r((()=>[f("服务项目："+_(a.goods_name),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)])),_:2},1032,["url"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1})}}}),[["__scopeId","data-v-00fedfe4"]]);export{j as default};