import{d as e,W as a,u as o,c as s,x as t,o as r,b as l,w as u,e as d,h as c,g as n,s as p,f as m,a0 as i,a6 as f,r as _,a as b,aq as x,j as w}from"./index.9cb42b0a.js";import{_ as v}from"./u-input.76fad595.js";import{_ as g}from"./u-form-item.0965a801.js";import{_ as h}from"./u-form.8da3bcb2.js";import{r as V,_ as j}from"./account.cc6251a7.js";import{_ as y}from"./u-button.1b523469.js";import{v as $}from"./util.19b21874.js";import{_ as k}from"./plugin-vue_export-helper.21dcd24c.js";import"./u-icon.468cc24b.js";var B=k(e({__name:"register",setup(e){const k=a(!1),B=o(),U=s((()=>1==B.config.openAgreement)),C=t({account:"",password:"",password_confirm:""}),q=async()=>!k.value&&U.value?uni.$u.toast("请勾选已阅读并同意《服务协议》和《隐私协议》"):C.account?C.password?C.password_confirm?C.password!=C.password_confirm?uni.$u.toast("两次输入的密码不一致"):$(C.password)&&$(C.password_confirm)?(await V(C),void i({title:"注册成功！",icon:"none",duration:1500,complete:function(){setTimeout((()=>{f()}),1500)}})):uni.$u.toast("密码应为6-20位数字+英文"):uni.$u.toast("请输入确认密码"):uni.$u.toast("请输入密码"):uni.$u.toast("请输入账号");return(e,a)=>{const o=_(b("u-input"),v),s=_(b("u-form-item"),g),t=_(b("u-form"),h),i=x,f=w,V=_(b("u-checkbox"),j),$=_(b("u-button"),y);return r(),l(f,{class:"register bg-white min-h-full flex flex-col items-center px-[40rpx] pt-[40rpx] box-border"},{default:u((()=>[d(f,{class:"w-full"},{default:u((()=>[d(t,{borderBottom:"","label-width":150},{default:u((()=>[d(s,{label:"创建账号",borderBottom:""},{default:u((()=>[d(o,{class:"flex-1",modelValue:C.account,"onUpdate:modelValue":a[0]||(a[0]=e=>C.account=e),border:!1,placeholder:"请输入账号"},null,8,["modelValue"])])),_:1}),d(s,{label:"设置密码",borderBottom:""},{default:u((()=>[d(o,{class:"flex-1",type:"password",modelValue:C.password,"onUpdate:modelValue":a[1]||(a[1]=e=>C.password=e),placeholder:"6-20位数字+字母或符号组合",border:!1},null,8,["modelValue"])])),_:1}),d(s,{label:"确认密码",borderBottom:""},{default:u((()=>[d(o,{class:"flex-1",type:"password",modelValue:C.password_confirm,"onUpdate:modelValue":a[2]||(a[2]=e=>C.password_confirm=e),placeholder:"请确认密码",border:!1},null,8,["modelValue"])])),_:1})])),_:1}),c(U)?(r(),l(f,{key:0,class:"mt-[40rpx]"},{default:u((()=>[d(V,{modelValue:k.value,"onUpdate:modelValue":a[5]||(a[5]=e=>k.value=e),shape:"circle"},{default:u((()=>[d(f,{class:"text-xs flex"},{default:u((()=>[n(" 已阅读并同意 "),d(i,{onClick:a[3]||(a[3]=p((()=>{}),["stop"])),class:"text-error","hover-class":"none",url:"/pages/agreement/agreement?type=service"},{default:u((()=>[n(" 《服务协议》 ")])),_:1}),n(" 和"),d(i,{onClick:a[4]||(a[4]=p((()=>{}),["stop"])),class:"text-error","hover-class":"none",url:"/pages/agreement/agreement?type=privacy"},{default:u((()=>[n(" 《隐私协议》 ")])),_:1})])),_:1})])),_:1},8,["modelValue"])])),_:1})):m("v-if",!0),d(f,{class:"mt-[60rpx]"},{default:u((()=>[d($,{type:"error",shape:"circle",onClick:q},{default:u((()=>[n(" 注册 ")])),_:1})])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-17fe5e3c"]]);export{B as default};