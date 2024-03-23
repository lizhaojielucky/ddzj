import{J as e,L as t,a6 as a,r as l,a as s,o as n,b as i,w as r,e as o,C as u,g as c,t as d,f as p,p as f,D as m,j as b,d as y,W as v,a7 as g,a8 as h,k as x,l as _,F as k,n as S,v as w,i as B,q as C}from"./index.9cb42b0a.js";import{_ as j}from"./u-icon.468cc24b.js";import{_ as z}from"./plugin-vue_export-helper.21dcd24c.js";import{_ as I}from"./z-paging.c80fe707.js";import{_ as H}from"./u-empty.9001ced0.js";import{_ as N}from"./u-image.b14343b7.js";import{b as W,c as $}from"./store.fb10cb3f.js";import{P as F}from"./index.61116428.js";import{_ as T}from"./index.a84c4fbb.js";import"./u-badge.501077f9.js";import"./util.19b21874.js";let E=e(),O={};var V=z({name:"u-navbar",props:{height:{type:[String,Number],default:""},backIconColor:{type:String,default:"#606266"},backIconName:{type:String,default:"nav-back"},backIconSize:{type:[String,Number],default:"44"},backText:{type:String,default:""},backTextStyle:{type:Object,default:()=>({color:"#606266"})},title:{type:String,default:""},titleWidth:{type:[String,Number],default:"250"},titleColor:{type:String,default:"#606266"},titleBold:{type:Boolean,default:!1},titleSize:{type:[String,Number],default:32},isBack:{type:[Boolean,String],default:!0},background:{type:Object,default:()=>({background:"#ffffff"})},isFixed:{type:Boolean,default:!0},immersive:{type:Boolean,default:!1},borderBottom:{type:Boolean,default:!0},zIndex:{type:[String,Number],default:""},customBack:{type:Function,default:null}},data:()=>({menuButtonInfo:O,statusBarHeight:E.statusBarHeight}),computed:{navbarInnerStyle(){let e={};return e.height=this.navbarHeight+"px",e},navbarStyle(){let e={};return e.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.navbar,Object.assign(e,this.background),e},titleStyle(){let e={};return e.left=(E.windowWidth-t(this.titleWidth))/2+"px",e.right=(E.windowWidth-t(this.titleWidth))/2+"px",e.width=t(this.titleWidth)+"px",e},navbarHeight(){return this.height?this.height:44}},created(){},methods:{goBack(){"function"==typeof this.customBack?this.customBack.bind(this.$u.$parent.call(this))():a()}}},[["render",function(e,t,a,y,v,g){const h=b,x=l(s("u-icon"),j);return n(),i(h,{class:""},{default:r((()=>[o(h,{class:m(["u-navbar",{"u-navbar-fixed":a.isFixed,"u-border-bottom":a.borderBottom}]),style:u([g.navbarStyle])},{default:r((()=>[o(h,{class:"u-status-bar",style:u({height:v.statusBarHeight+"px"})},null,8,["style"]),o(h,{class:"u-navbar-inner",style:u([g.navbarInnerStyle])},{default:r((()=>[a.isBack?(n(),i(h,{key:0,class:"u-back-wrap",onClick:g.goBack},{default:r((()=>[o(h,{class:"u-icon-wrap"},{default:r((()=>[o(x,{name:a.backIconName,color:a.backIconColor,size:a.backIconSize},null,8,["name","color","size"])])),_:1}),a.backText?(n(),i(h,{key:0,class:"u-icon-wrap u-back-text u-line-1",style:u([a.backTextStyle])},{default:r((()=>[c(d(a.backText),1)])),_:1},8,["style"])):p("v-if",!0)])),_:1},8,["onClick"])):p("v-if",!0),a.title?(n(),i(h,{key:1,class:"u-navbar-content-title",style:u([g.titleStyle])},{default:r((()=>[o(h,{class:"u-title u-line-1",style:u({color:a.titleColor,fontSize:a.titleSize+"rpx",fontWeight:a.titleBold?"bold":"normal"})},{default:r((()=>[c(d(a.title),1)])),_:1},8,["style"])])),_:1},8,["style"])):p("v-if",!0),o(h,{class:"u-slot-content"},{default:r((()=>[f(e.$slots,"default",{},void 0,!0)])),_:3}),o(h,{class:"u-slot-right"},{default:r((()=>[f(e.$slots,"right",{},void 0,!0)])),_:3})])),_:3},8,["style"])])),_:3},8,["style","class"]),p(" 解决fixed定位后导航栏塌陷的问题 "),a.isFixed&&!a.immersive?(n(),i(h,{key:0,class:"u-navbar-placeholder",style:u({width:"100%",height:Number(g.navbarHeight)+v.statusBarHeight+"px"})},null,8,["style"])):p("v-if",!0)])),_:3})}],["__scopeId","data-v-7cc3d59a"]]);var M=z(y({__name:"cate-card",props:{param:{default:{id:0,name:""}},pid:{default:0}},setup(e){const t=e,a=v([]);return t.param.id&&(async()=>{const e=await W({category_id:t.param.id});a.value=e.lists})(),console.log("son",t.param),(t,u)=>{const f=b,m=l(s("u-empty"),H),y=l(s("u-image"),N);return n(),i(f,{class:"card"},{default:r((()=>[p(" Content Header Satrt "),p(' <template v-if="param.level !== 1">\n            <view\n                class="flex justify-between card--header"\n                @click="goPage(`/bundle/pages/category_goods_list/index?id=${pid}`)"\n            >\n                <view class="name">{{ param.name }}</view>\n                <view class="flex">\n                    <u-icon name="arrow-right" size="22"></u-icon>\n                </view>\n            </view>\n        </template> '),1!==e.param.level?(n(),i(f,{key:0,class:"flex justify-between card--header"},{default:r((()=>[o(f,{class:"name"},{default:r((()=>[c(d(e.param.name),1)])),_:1})])),_:1})):p("v-if",!0),g(o(f,{class:"empty"},{default:r((()=>[o(m,{text:"暂无数据～",src:"/static/images/empty/collection.png","icon-size":300,color:"#888888"})])),_:1},512),[[h,1===e.param.level&&!a.value.length]]),p(" Content Header End "),p(" Content Main Start "),o(f,{class:"card--main"},{default:r((()=>[(n(!0),x(k,null,_(a.value,(e=>(n(),i(f,{key:e.id,class:"goods flex w-[230rpx] h-[205rpx]",onClick:t=>{return a=`/pages/goods/index?id=${e.id}`,void S({url:a});var a}},{default:r((()=>[o(y,{src:e.image,width:"100%",height:"100%"},null,8,["src"]),o(f,{class:"mt-[20rpx] truncate"},{default:r((()=>[c(d(e.name),1)])),_:2},1024),o(f,{class:"text-primary mt-[10rpx]"},{default:r((()=>[o(F,{price:e.price,desc:e.unit_desc},null,8,["price","desc"])])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1}),p(" Content Main End ")])),_:1})}}}),[["__scopeId","data-v-53a02680"]]);var P=z(y({__name:"index",setup(e){const t=v([]),a=v(0),u=w(),f=async(e,t)=>{try{const{lists:e}=await $();u.value.complete(e)}catch(a){console.log("报错=>",a),u.value.complete(!1)}};return(e,y)=>{const v=l(s("u-icon"),j),g=B,h=b,w=l(s("u-navbar"),V),z=C,H=l(s("z-paging"),I);return n(),i(h,{class:"container"},{default:r((()=>[o(w,{"is-back":!1,title:"",class:"flex"},{default:r((()=>[o(h,{class:"navbar h5_navbar flex ml-[20rpx] pl-[20rpx]",onClick:y[0]||(y[0]=e=>{S({url:"/bundle/pages/search/index"})})},{default:r((()=>[o(v,{name:"search",size:"34",color:"#888888"}),o(g,{class:"flex items-center ml-[20rpx]"},{default:r((()=>[c("请输入关键词搜索")])),_:1})])),_:1})])),_:1}),o(h,{class:"flex main"},{default:r((()=>[o(h,{class:"content"},{default:r((()=>[o(z,{"scroll-y":"true",class:"menu"},{default:r((()=>[(n(!0),x(k,null,_(t.value,((e,t)=>(n(),i(h,{key:e.id,class:m(["truncate menu--item",{"text-primary":t===a.value}]),onClick:e=>a.value=t},{default:r((()=>[c(d(e.name),1)])),_:2},1032,["class","onClick"])))),128))])),_:1}),o(h,{class:"layout"},{default:r((()=>[o(H,{ref_key:"paging",ref:u,modelValue:t.value,"onUpdate:modelValue":y[1]||(y[1]=e=>t.value=e),onQuery:f,fixed:!1,height:"100%","loading-more-enabled":!1,"empty-view-text":""},{default:r((()=>[p(" Content Start "),o(h,{class:"content-box"},{default:r((()=>[(n(!0),x(k,null,_(t.value,((e,t)=>{var l,s;return n(),x(k,{key:e.id},[t!=a.value||(null==(l=null==e?void 0:e.sons)?void 0:l.length)?p("v-if",!0):(n(),i(M,{key:0,param:e},null,8,["param"])),t==a.value&&(null==(s=null==e?void 0:e.sons)?void 0:s.length)?(n(!0),x(k,{key:1},_(e.sons,((t,a)=>(n(),i(M,{key:t.id,param:t,pid:e.id},null,8,["param","pid"])))),128)):p("v-if",!0)],64)})),128))])),_:1}),p(" Content End ")])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1}),p(" 底部导航栏 "),o(T)])),_:1})}}}),[["__scopeId","data-v-0c8ea666"]]);export{P as default};