import{Z as t}from"./index.5b37717f.js";const a=a=>t.get({url:"/index/index",data:a}),s=()=>t.get({url:"/goods_category/lists"}),e=a=>t.get({url:"/goods_category/otherLists",data:a}),r=a=>t.get({url:"/goods/lists",data:a},{ignoreCancel:!0}),o=a=>t.get({url:"/staff/lists",data:a}),g=a=>t.get({url:"/staff/detail",data:a}),i=()=>t.get({url:"/region/city"});function d(){return t.get({url:"/search/hotLists"})}export{a,r as b,s as c,o as d,g as e,e as f,d as g,i as h};