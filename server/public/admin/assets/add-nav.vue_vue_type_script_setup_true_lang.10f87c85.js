import{y as D,u as F}from"./element-plus.a3b114e5.js";import{_ as y}from"./index.6759d5ec.js";import{_ as A}from"./picker.5f88087f.js";import{_ as B}from"./picker.680ce7f4.js";import{f as p,b as C}from"./index.70851800.js";import{D as E}from"./vuedraggable.c932d9d2.js";import{d as w,e as U,o as c,c as N,a as l,V as t,M as u,L as $,u as r,k as z,T as L}from"./@vue.3ddec1b2.js";const T={class:"bg-fill-light flex items-center w-full p-4 mb-4"},I={class:"upload-btn w-[60px] h-[60px]"},M={class:"ml-3 flex-1"},P={class:"flex"},R=l("span",{class:"text-tx-regular flex-none mr-3"},"\u540D\u79F0",-1),j={class:"flex mt-[18px]"},q=l("span",{class:"text-tx-regular flex-none mr-3"},"\u94FE\u63A5",-1),W=w({__name:"add-nav",props:{modelValue:{type:Array,default:()=>[]},max:{type:Number,default:10},min:{type:Number,default:1}},emits:["update:modelValue"],setup(_,{emit:i}){const e=_,m=U({get(){return e.modelValue},set(a){i("update:modelValue",a)}}),f=()=>{var a;((a=e.modelValue)==null?void 0:a.length)<e.max?e.modelValue.push({image:"",name:"\u5BFC\u822A\u540D\u79F0",link:{}}):p.msgError(`\u6700\u591A\u6DFB\u52A0${e.max}\u4E2A`)},V=a=>{var s;if(((s=e.modelValue)==null?void 0:s.length)<=e.min)return p.msgError(`\u6700\u5C11\u4FDD\u7559${e.min}\u4E2A`);e.modelValue.splice(a,1)};return(a,s)=>{const x=C,g=B,h=D,k=A,b=y,v=F;return c(),N("div",null,[l("div",null,[t(r(E),{class:"draggable",modelValue:r(m),"onUpdate:modelValue":s[0]||(s[0]=o=>z(m)?m.value=o:null),animation:"300"},{item:u(({element:o,index:d})=>[(c(),$(b,{class:"max-w-[400px]",key:d,onClose:n=>V(d),showClose:d},{default:u(()=>[l("div",T,[t(g,{modelValue:o.image,"onUpdate:modelValue":n=>o.image=n,"upload-class":"bg-body",size:"60px"},{upload:u(()=>[l("div",I,[t(x,{name:"el-icon-Plus",size:20})])]),_:2},1032,["modelValue","onUpdate:modelValue"]),l("div",M,[l("div",P,[R,t(h,{modelValue:o.name,"onUpdate:modelValue":n=>o.name=n,placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0"},null,8,["modelValue","onUpdate:modelValue"])]),l("div",j,[q,t(k,{modelValue:o.link,"onUpdate:modelValue":n=>o.link=n},null,8,["modelValue","onUpdate:modelValue"])])])])]),_:2},1032,["onClose","showClose"]))]),_:1},8,["modelValue"])]),l("div",null,[t(v,{type:"primary",onClick:f},{default:u(()=>[L("\u6DFB\u52A0")]),_:1})])])}}});export{W as _};