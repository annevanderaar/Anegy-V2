import{k as i,_ as m,m as t,o as a,e as r,F as u,p as f,c as v,w as s,a as o,d as c,t as n}from"./app-392eb6b1.js";const x=i({props:{credits:{type:Object,required:!0}}});const h={class:"d-flex flex-wrap justify-center"};function g(y,$,k,C,w,b){const _=t("v-avatar"),d=t("v-card-title"),p=t("v-card-text"),l=t("v-card");return a(),r("div",h,[(a(!0),r(u,null,f(this.credits.crew,e=>(a(),v(l,{key:e.id,href:`/people/${e.id}`,width:"300px",class:"cards"},{default:s(()=>[o(_,{image:`https://image.tmdb.org/t/p/w500${e.profile_path}`,size:"128",class:"ma-2"},null,8,["image"]),o(d,null,{default:s(()=>[c(n(e.name),1)]),_:2},1024),o(p,{class:"text-center"},{default:s(()=>[c(n(e.job),1)]),_:2},1024)]),_:2},1032,["href"]))),128))])}const B=m(x,[["render",g],["__scopeId","data-v-d045a706"]]);export{B as default};