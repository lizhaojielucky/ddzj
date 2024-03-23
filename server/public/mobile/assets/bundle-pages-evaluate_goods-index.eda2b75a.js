import{d as e,r as a,a as t,o as s,b as l,w as o,e as d,g as i,t as r,B as c,f as u,k as m,l as n,D as _,s as f,F as p,az as v,j as g,i as x,v as y,W as b,aa as k,bb as h,h as j,a1 as w,c as V,y as z}from"./index.5b37717f.js";import{a as C,t as F}from"./tabs.db810b4f.js";import{d as I,e as N}from"./goods.26d30f7c.js";import{_ as S}from"./z-paging.ab3f2020.js";import{_ as U}from"./u-image.8c26ebe0.js";import{_ as $}from"./u-rate.88731838.js";import{_ as B}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-badge.eadb0f30.js";import"./u-button.71edba3f.js";import"./u-empty.cc6bdf05.js";import"./u-icon.14dc2ec9.js";import"./util.920cc201.js";var D=B(e({__name:"card",props:{goods_id:{default:""},comment:{default:""},goods_comment_image:{default:""},reply:{default:""},create_time:{default:""},service_comment:{default:""},user:{default:{avatar:"",nickname:""}}},setup(e){const y=e;return(b,k)=>{const h=a(t("u-image"),U),j=g,w=a(t("u-rate"),$),V=x;return s(),l(j,{class:"card"},{default:o((()=>[d(j,{class:"card--header flex justify-between col-start"},{default:o((()=>[d(j,{class:"flex"},{default:o((()=>[d(h,{src:e.user.avatar,width:"80",height:"80","border-radius":"50%"},null,8,["src"]),d(j,{class:"ml-[20rpx]"},{default:o((()=>[d(j,{class:"text-base normal font-medium"},{default:o((()=>[i(r(e.user.nickname),1)])),_:1}),d(j,{class:"text-muted text-xs mt-[10rpx]"},{default:o((()=>[i(r(e.create_time),1)])),_:1})])),_:1})])),_:1}),d(j,{class:"flex"},{default:o((()=>[d(w,{count:5,modelValue:e.service_comment,"onUpdate:modelValue":k[0]||(k[0]=e=>c(service_comment)?service_comment.value=e:null),size:"28","inactive-icon":"star-fill"},null,8,["modelValue"]),d(j,{class:"ml-[20rpx] lighter text-xs"},{default:o((()=>[5==e.service_comment?(s(),l(V,{key:0},{default:o((()=>[i("非常好")])),_:1})):u("v-if",!0),4==e.service_comment?(s(),l(V,{key:1},{default:o((()=>[i("好")])),_:1})):u("v-if",!0),3==e.service_comment?(s(),l(V,{key:2},{default:o((()=>[i("一般")])),_:1})):u("v-if",!0),2==e.service_comment?(s(),l(V,{key:3},{default:o((()=>[i("差")])),_:1})):u("v-if",!0),1==e.service_comment?(s(),l(V,{key:4},{default:o((()=>[i("非常差")])),_:1})):u("v-if",!0)])),_:1})])),_:1})])),_:1}),d(j,{class:"card--main"},{default:o((()=>[d(j,{class:"content"},{default:o((()=>[i(r(e.comment),1)])),_:1}),d(j,{class:"flex flex-wrap"},{default:o((()=>[(s(!0),m(p,null,n(e.goods_comment_image,((e,a)=>(s(),l(j,{key:a,class:_(["mt-[10rpx]",{"mr-[10rpx]":(a+1)%3!=0}]),onClick:f((e=>{v({current:a,urls:y.goods_comment_image.map((e=>e.uri))})}),["stop"])},{default:o((()=>[d(h,{src:e.uri,width:"210",height:"210"},null,8,["src"])])),_:2},1032,["class","onClick"])))),128))])),_:1}),e.reply?(s(),l(j,{key:0,class:"reply normal text-base mt-[20rpx]"},{default:o((()=>[d(V,{class:"font-medium"},{default:o((()=>[i("商家回复: ")])),_:1}),d(V,null,{default:o((()=>[i(r(e.reply),1)])),_:1})])),_:1})):u("v-if",!0)])),_:1})])),_:1})}}}),[["__scopeId","data-v-61435966"]]);const L=e({__name:"list",props:{goods_id:{default:0},i:null,index:null,cid:{default:0}},setup(e){const d=e,i=y(null),r=b([]),c=b(!0);k((()=>d.index),(async()=>{var e;await h(),d.i==d.index&&j(c)&&(c.value=!1,null==(e=i.value)||e.reload())}),{immediate:!0});const u=async(e,a)=>{try{const{lists:t}=await I({goods_id:d.goods_id,pageNo:e,pageSize:a,id:d.cid});i.value.complete(t)}catch(t){console.log("报错=>",t),i.value.complete(!1)}};return(d,c)=>{const _=a(t("z-paging"),S);return s(),l(_,{"auto-show-back-to-top":"",auto:e.i==e.index,ref_key:"paging",ref:i,modelValue:r.value,"onUpdate:modelValue":c[0]||(c[0]=e=>r.value=e),"data-key":e.i,onQuery:u,fixed:!1,height:"100%"},{default:o((()=>[(s(!0),m(p,null,n(r.value,((e,a)=>(s(),l(D,{key:a,comment:e.comment,goods_comment_image:e.goods_comment_image,reply:e.reply,create_time:e.create_time,goods_id:e.goods_id,service_comment:e.service_comment,user:e.user},null,8,["comment","goods_comment_image","reply","create_time","goods_id","service_comment","user"])))),128))])),_:1},8,["auto","modelValue","data-key"])}}});var Q=B(e({__name:"index",setup(e){const i=b(8),r=b([]),c=b(0),_=w(),f=V((()=>_.token)),v=e=>{c.value=Number(e)};return z((e=>{i.value=e.id||0,(async()=>{const e=await N({goods_id:i.value});r.value=[...e.comment]})()})),(e,_)=>{const x=g,y=a(t("tab"),C),b=a(t("tabs"),F);return r.value.length?(s(),l(x,{key:0,class:"container"},{default:o((()=>[d(b,{current:c.value,onChange:v,height:"80","bar-width":"60",barStyle:{bottom:"0"},auth:!0,activeColor:"#F36161"},{default:o((()=>[(s(!0),m(p,null,n(r.value,((e,a)=>(s(),l(y,{key:a,name:`${e.name}(${e.count})`},{default:o((()=>[j(f)?(s(),l(x,{key:0,class:"List pt-[20rpx]"},{default:o((()=>[d(L,{cid:e.id,i:a,index:c.value,goods_id:i.value},null,8,["cid","i","index","goods_id"])])),_:2},1024)):u("v-if",!0)])),_:2},1032,["name"])))),128))])),_:1},8,["current"])])),_:1})):u("v-if",!0)}}}),[["__scopeId","data-v-a28fd390"]]);export{Q as default};