import{d as e,u as t,r as s,a,o as n,b as l,w as r,e as i,k as o,l as c,h as u,F as d,f as m,S as p,m as f,j as b,ag as x,t as y,g as _,D as g,n as v,a1 as k,W as h,c as w,ab as j}from"./index.9cb42b0a.js";import{_ as C}from"./u-image.b14343b7.js";import{_ as I}from"./u-icon.468cc24b.js";import{n as O}from"./util.19b21874.js";import{_ as U}from"./index.a84c4fbb.js";import{_ as F}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-badge.501077f9.js";const z=e({__name:"user-banner",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const{getImageUrl:x}=t();return(t,y)=>{const _=s(a("u-image"),C),g=p,v=f,k=b;return e.content.data.length&&e.content.enabled?(n(),l(k,{key:0,class:"banner h-[200rpx] mx-[20rpx] mt-[20rpx] translate-y-0"},{default:r((()=>[i(v,{class:"swiper h-full","indicator-dots":e.content.data.length>1,"indicator-active-color":"#4173ff",autoplay:!0},{default:r((()=>[(n(!0),o(d,null,c(e.content.data,((e,t)=>(n(),l(g,{key:t,onClick:t=>{return s=e.limk,void O(s);var s}},{default:r((()=>[i(_,{mode:"aspectFit",width:"100%",height:"100%",src:u(x)(e.image),"border-radius":14},null,8,["src"])])),_:2},1032,["onClick"])))),128))])),_:1},8,["indicator-dots"])])),_:1})):m("v-if",!0)}}}),D=e({__name:"my-service",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})}},setup(e){const l=e,{getImageUrl:r}=t(),p=e=>{O(e)};return console.log("service：",l.content),(t,l)=>{const f=s(a("u-image"),C),b=s(a("u-icon"),I);return n(),o("div",{class:"my-service bg-white mx-[20rpx] mt-[20rpx] rounded-lg"},[e.content.title?(n(),o("div",{key:0,class:"title px-[30rpx] py-[20rpx] font-medium text-xl border-light border-solid border-0 border-b"},[x("div",null,y(e.content.title),1)])):m("v-if",!0),m(" 横排 "),1==e.content.style?(n(),o("div",{key:1,class:"flex flex-wrap pt-[40rpx] pb-[20rpx]"},[(n(!0),o(d,null,c(e.content.data,((e,t)=>(n(),o("div",{key:t,class:"flex flex-col items-center w-1/4 mb-[15px]",onClick:t=>p(e.link)},[i(f,{width:"52",height:"52",src:u(r)(e.image),alt:""},null,8,["src"]),x("div",{class:"mt-[7px]"},y(e.name),1)],8,["onClick"])))),128))])):m("v-if",!0),m(" 竖排 "),2==e.content.style?(n(),o("div",{key:2},[(n(!0),o(d,null,c(e.content.data,((e,t)=>(n(),o("div",{key:t,class:"flex items-center border-light border-solid border-0 border-b h-[100rpx] px-[24rpx]",onClick:t=>p(e.link)},[i(f,{width:"48",height:"48",src:u(r)(e.image),alt:""},null,8,["src"]),x("div",{class:"ml-[20rpx] flex-1"},y(e.name),1),x("div",{class:"text-muted"},[i(b,{name:"arrow-right"})])],8,["onClick"])))),128))])):m("v-if",!0)])}}});var S=F(e({__name:"my-subscribe",props:{content:{type:Object,default:()=>({})},styles:{type:Object,default:()=>({})},userInfo:{type:Object,default:()=>({})}},setup(e){const{getImageUrl:p}=t();return(t,f)=>{const x=b,k=s(a("u-icon"),I),h=s(a("u-image"),C);return n(),l(x,{class:"my-subscribe bg-white mx-[20rpx] mt-[20rpx] rounded-lg"},{default:r((()=>[e.content.title?(n(),l(x,{key:0,class:"title px-[30rpx] py-[20rpx] font-medium text-xl border-light border-solid border-0 border-b"},{default:r((()=>[i(x,{class:"flex justify-between items-center"},{default:r((()=>[i(x,null,{default:r((()=>[_(y(e.content.title),1)])),_:1}),i(x,{class:"text-muted inline text-xs",onClick:f[0]||(f[0]=e=>{v({url:`/pages/order/index?type=${0}`})})},{default:r((()=>[_(" 查看"),i(k,{name:"arrow-right"})])),_:1})])),_:1})])),_:1})):m("v-if",!0),i(x,{class:"flex pt-[20px] pb-[10px]"},{default:r((()=>[(n(!0),o(d,null,c(e.content.data,((e,t)=>(n(),l(x,{key:t,class:g({"flex-1":e.display}),onClick:t=>{return s=e.link,void O(s);var s}},{default:r((()=>[e.display?(n(),l(x,{key:0,class:"order-menu-item flex flex-col items-center mb-[15px]"},{default:r((()=>[i(h,{width:"52",height:"52",src:u(p)(e.image),alt:""},null,8,["src"]),i(x,{class:"mt-[7rpx]"},{default:r((()=>[_(y(e.name),1)])),_:2},1024)])),_:2},1024)):m("v-if",!0)])),_:2},1032,["class","onClick"])))),128))])),_:1})])),_:1})}}}),[["__scopeId","data-v-5ed1680c"]]);var W=F(e({__name:"user",setup(e){const p=t(),f=k();let x=h({nickname:"",is_staff:0,avatar:"",mobile:"",service_num:0,wait_pay_num:0,staff_wait_num:0,finish_num:0,appoint_num:0,decorate_page:[]});x=w((()=>f.userInfo));const g=w((()=>p.config)),O=e=>{v({url:e})};return j((()=>{(async()=>{await f.getUser(),x.value=f.userInfo,console.log(x.value)})()})),(e,t)=>{const p=s(a("u-image"),C),f=b,v=s(a("u-icon"),I),k=s(a("w-user-banner"),z);return n(),o(d,null,[i(f,{class:"user"},{default:r((()=>[i(f,{class:"flex justify-between user--info"},{default:r((()=>{var e;return[m(" 用户头像 "),i(p,{onClick:t[0]||(t[0]=e=>O("/bundle/pages/user_profile/index")),src:(null==(e=u(x))?void 0:e.avatar)||u(g).default_avatar,width:"100",height:"100","border-radius":"50"},null,8,["src"]),m(" 用户名字 "),i(f,{class:"user-name flex-1 ml-[20rpx] mt-[25rpx]",onClick:t[1]||(t[1]=e=>O("/bundle/pages/user_profile/index"))},{default:r((()=>{var e;return[_(y((null==(e=u(x))?void 0:e.nickname)||"未登录"),1)]})),_:1}),m(" 设置 "),i(v,{name:"setting",color:"#fff",size:"44",onClick:t[2]||(t[2]=e=>O("/pages/user_set/user_set"))})]})),_:1}),(n(!0),o(d,null,c(u(x).decorate_page,((e,t)=>(n(),l(f,{key:t},{default:r((()=>["my-subscribe"==e.name?(n(),l(S,{key:0,content:e.content,userInfo:u(x),styles:e.styles},null,8,["content","userInfo","styles"])):m("v-if",!0),"my-service"==e.name?(n(),l(D,{key:1,content:e.content,styles:e.styles},null,8,["content","styles"])):m("v-if",!0),"user-banner"==e.name?(n(),l(k,{key:2,content:e.content,styles:e.styles},null,8,["content","styles"])):m("v-if",!0)])),_:2},1024)))),128))])),_:1}),m(" 底部导航栏 "),i(U)],64)}}}),[["__scopeId","data-v-7b630108"]]);export{W as default};