import{D as c}from"./DetailsStore-d5d1fc36.js";import{k as f,_ as m,o as a,c as o,w as t,b as u,t as k,a as l,d as r,f as s,m as d}from"./app-d2cccad7.js";const p=f({components:{},data(){return{detailStore:c()}}});function h(e,b,w,v,g,S){const n=d("v-icon"),i=d("v-chip"),_=d("v-row");return a(),o(_,{class:"flex-align"},{default:t(()=>[u("h4",null,k(e.$t("details.links"))+":",1),e.detailStore.data.homepage?(a(),o(i,{key:0,href:`${e.detailStore.data.homepage}`,class:"btnText",target:"_blank",variant:"outlined"},{default:t(()=>[l(n,null,{default:t(()=>[r("mdi-home-circle")]),_:1})]),_:1},8,["href"])):s("",!0),e.detailStore.links.imdb_id?(a(),o(i,{key:1,href:`https://www.imdb.com/title/${e.detailStore.links.imdb_id}`,class:"btnText",target:"_blank",variant:"outlined"},{default:t(()=>[l(n,null,{default:t(()=>[r("mdi-database")]),_:1})]),_:1},8,["href"])):s("",!0),e.detailStore.links.twitter_id?(a(),o(i,{key:2,href:`https://twitter.com/${e.detailStore.links.twitter_id}`,class:"btnText",target:"_blank",variant:"outlined"},{default:t(()=>[l(n,null,{default:t(()=>[r("mdi-twitter")]),_:1})]),_:1},8,["href"])):s("",!0),e.detailStore.links.facebook_id?(a(),o(i,{key:3,href:`https://www.facebook.com/${e.detailStore.links.facebook_id}`,class:"btnText",target:"_blank",variant:"outlined"},{default:t(()=>[l(n,null,{default:t(()=>[r("mdi-facebook")]),_:1})]),_:1},8,["href"])):s("",!0),e.detailStore.links.instagram_id?(a(),o(i,{key:4,href:`https://www.instagram.com/${e.detailStore.links.instagram_id}`,class:"btnText",target:"_blank",variant:"outlined"},{default:t(()=>[l(n,null,{default:t(()=>[r("mdi-instagram")]),_:1})]),_:1},8,["href"])):s("",!0)]),_:1})}const T=m(p,[["render",h],["__scopeId","data-v-55f4b74e"]]);export{T as L};
