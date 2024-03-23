import{d as e,W as a,a9 as t,r as o,a as r,o as s,b as d,w as n,e as l,g as u,t as i,k as c,l as m,F as f,f as _,p,s as v,n as g,j as b,i as x,v as y,aa as j,bb as h,h as I,a1 as k,c as w,y as S}from"./index.9cb42b0a.js";import{_ as z}from"./z-paging.c80fe707.js";import{_ as C}from"./u-image.b14343b7.js";import{_ as V}from"./u-count-down.3fe6fde2.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";import{O as N}from"./index.6f6941f0.js";import{h as $}from"./order.fd95e5a7.js";import{t as D,a as E}from"./tabs.4f865e0e.js";import"./u-icon.468cc24b.js";import"./u-input.76fad595.js";import"./u-modal.0e49579f.js";import"./u-popup.44c78583.js";import"./util.19b21874.js";import"./u-badge.501077f9.js";import"./u-button.1b523469.js";import"./u-empty.9001ced0.js";var L=F(e({__name:"order-card",props:{orderInfo:{default:{}}},setup(e){const y=e,j=a(0);t((()=>{const e=y.orderInfo.order_cancel_time,a=(new Date).getTime()/1e3;j.value=1e3*(e-a)}));const h=()=>{g({url:`/bundle/pages/service_order_detail/index?id=${y.orderInfo.id}`})};return(a,t)=>{const g=b,y=o(r("u-image"),C),I=o(r("u-count-down"),V),k=x;return s(),d(g,{class:"card",onClick:v(h,["stop"])},{default:n((()=>[l(g,{class:"card--header flex justify-between"},{default:n((()=>[l(g,{class:"order-sn"},{default:n((()=>[u("订单编号："+i(e.orderInfo.sn),1)])),_:1}),l(g,{class:"status"},{default:n((()=>[u(i(e.orderInfo.order_status_desc),1)])),_:1})])),_:1}),(s(!0),c(f,null,m(e.orderInfo.order_goods,(a=>(s(),d(g,{key:a.id,class:"card--main flex"},{default:n((()=>[l(y,{src:a.goods_image,width:"160",height:"160"},null,8,["src"]),l(g,{class:"ml-[20rpx] service-text"},{default:n((()=>[l(g,{class:"service-text--name truncate"},{default:n((()=>[u(i(a.goods_name),1)])),_:2},1024),l(g,{class:"mt-[16rpx]"},{default:n((()=>[u("预约时间: "+i(e.orderInfo.appoint_time)+" "+i(e.orderInfo.appoint_week),1)])),_:1}),l(g,{class:"mt-[16rpx]"},{default:n((()=>[u("实付金额: ¥"+i(e.orderInfo.order_amount),1)])),_:1})])),_:2},1024)])),_:2},1024)))),128)),l(g,{class:"card--footer flex justify-between"},{default:n((()=>[l(g,{class:"text-primary"},{default:n((()=>[e.orderInfo.order_cancel_time?(s(),c(f,{key:0},[j.value>=0?(s(),d(g,{key:0,class:"flex"},{default:n((()=>[l(I,{timestamp:j.value,format:"mm:ss","font-size":26,"separator-size":26,onEnd:t[0]||(t[0]=e=>j.value=0)},null,8,["timestamp"]),l(k,{class:"ml-[10rpx]"},{default:n((()=>[u("后自动取消")])),_:1})])),_:1})):_("v-if",!0)],64)):_("v-if",!0)])),_:1}),l(g,null,{default:n((()=>[p(a.$slots,"default",{},void 0,!0)])),_:3})])),_:3})])),_:3},8,["onClick"])}}}),[["__scopeId","data-v-300358ee"]]);const O=e({__name:"order-list",props:{order_status:{default:0},i:null,index:null},setup(e){const t=e,u=y(null),i=a([]),_=a(!0);j((()=>t.index),(async()=>{var e;await h(),t.i==t.index&&I(_)&&(_.value=!1,null==(e=u.value)||e.reload())}),{immediate:!0});const p=async(e,a)=>{try{const{lists:o}=await $({order_status:t.order_status,pageNo:e,pageSize:a});u.value.complete(o)}catch(o){console.log("报错=>",o),u.value.complete(!1)}};return(a,t)=>{const _=o(r("z-paging"),z);return s(),d(_,{"auto-show-back-to-top":"",auto:e.i==e.index,ref_key:"paging",ref:u,modelValue:i.value,"onUpdate:modelValue":t[0]||(t[0]=e=>i.value=e),"data-key":e.i,onQuery:p,fixed:!1,height:"100%"},{default:n((()=>[(s(!0),c(f,null,m(i.value,((e,a)=>(s(),d(L,{key:a,orderInfo:e},{default:n((()=>{var a;return[l(N,{orderId:null==e?void 0:e.id,cancel:e.cancel_btn,evaluate:e.comment_btn,contact:e.contact_btn,pay:e.pay_btn,mobile:null==(a=null==e?void 0:e.staff)?void 0:a.mobile,confirmService:e.confirm_service_btn,verification:e.verification_btn,orderStatus:e.order_status,goods_image:e.order_goods[0].goods_image,goods_name:e.order_goods[0].goods_name,type:2,onRefresh:p},null,8,["orderId","cancel","evaluate","contact","pay","mobile","confirmService","verification","orderStatus","goods_image","goods_name"])]})),_:2},1032,["orderInfo"])))),128))])),_:1},8,["auto","modelValue","data-key"])}}});var Q=F(e({__name:"index",setup(e){const t=k(),o=w((()=>t.token)),r=a([{name:"全部",order_status:0},{name:"预约中",order_status:1},{name:"服务中",order_status:2},{name:"已完成",order_status:3},{name:"已关闭",order_status:4}]),u=a(0),i=e=>{u.value=Number(e)};return S((async e=>{u.value=1*(null==e?void 0:e.type)||0})),(e,a)=>{const t=b;return s(),d(t,{class:"order-list"},{default:n((()=>[_(' :auth="true" 是表示需要权限登录的 '),l(D,{current:u.value,onChange:i,height:"80","bar-width":"60",barStyle:{bottom:"0"},auth:!0,activeColor:"#F36161"},{default:n((()=>[(s(!0),c(f,null,m(r.value,((e,a)=>(s(),d(E,{key:a,name:e.name},{default:n((()=>[I(o)?(s(),d(t,{key:0,class:"orderList pt-[20rpx]"},{default:n((()=>[l(O,{order_status:e.order_status,i:a,index:u.value},null,8,["order_status","i","index"])])),_:2},1024)):_("v-if",!0)])),_:2},1032,["name"])))),128))])),_:1},8,["current"])])),_:1})}}}),[["__scopeId","data-v-2722b120"]]);export{Q as default};
