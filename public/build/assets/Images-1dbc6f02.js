import{k as c,_ as p,o as t,e as s,F as i,p as _,c as d,w as l,a as m,m as r}from"./app-d2cccad7.js";const f=c({props:{images:{type:Object,required:!0}}}),u={class:"d-flex flex-wrap justify-center"};function h(a,g,k,v,w,x){const o=r("v-img"),n=r("v-card");return t(),s("div",u,[(t(!0),s(i,null,_(a.images.profiles,e=>(t(),d(n,{key:e.id,href:`https://image.tmdb.org/t/p/w500${e.file_path}`,class:"cards",target:"_blank"},{default:l(()=>[m(o,{src:`https://image.tmdb.org/t/p/w500${e.file_path}`,width:"300px"},null,8,["src"])]),_:2},1032,["href"]))),128))])}const b=p(f,[["render",h]]);export{b as default};