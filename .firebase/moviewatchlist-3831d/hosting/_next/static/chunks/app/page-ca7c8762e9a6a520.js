(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7735:function(e,t,l){Promise.resolve().then(l.bind(l,9204))},9204:function(e,t,l){"use strict";l.r(t),l.d(t,{default:function(){return m}});var a=l(7437),r=l(2265),s=l(738),i=l(5978);let n=(0,s.ZF)({apiKey:"AIzaSyDGI5Z8KKCj-JnbBzyqsniGXQPMaUo3g5o",authDomain:"moviewatchlist-3831d.firebaseapp.com",projectId:"moviewatchlist-3831d",storageBucket:"moviewatchlist-3831d.appspot.com",messagingSenderId:"469596024562",appId:"1:469596024562:web:d8e9d01537ae65f58baa6b",measurementId:"G-N4MDRQRFNB"}),o=(0,i.ad)(n);async function c(){let e=(0,i.hJ)(o,"movies"),t=[];(await (0,i.PL)(e)).forEach(e=>{t.push(e.data())});let l=[];return t.forEach(e=>{let t={description:e.description,id:e.id,image:e.image,name:e.name,year:e.year};l.push(t)}),l}function d(e){c().then(t=>{e(t)})}async function u(e,t,l,a,r,s){let i=new Map([["US","United States"],["GB","United Kingdom"],["CA","Canada"],["AU","Australia"],["DE","Germany"],["FR","France"],["IT","Italy"],["JP","Japan"],["KR","South Korea"],["CN","China"],["RU","Russia"],["IN","India"],["BR","Brazil"],["MX","Mexico"],["ES","Spain"],["SE","Sweden"],["NL","Netherlands"],["DK","Denmark"],["NO","Norway"],["FI","Finland"],["BE","Belgium"],["IE","Ireland"],["CH","Switzerland"],["AT","Austria"],["PT","Portugal"],["PL","Poland"],["HU","Hungary"],["CZ","Czech Republic"],["GR","Greece"],["TR","Turkey"],["SG","Singapore"],["HK","Hong Kong"],["TH","Thailand"],["ID","Indonesia"],["PH","Philippines"],["AR","Argentina"],["CL","Chile"],["CO","Colombia"],["PE","Peru"],["ZA","South Africa"],["EG","Egypt"]]);t(null),l(null),a(null),r(null),s(null),fetch("https://api.themoviedb.org/3/movie/"+e+"?api_key=1ea4c77bc924d2f26c117fbfdcfd6664").then(e=>{e.json().then(e=>{console.log(e);let n=e.production_companies,o=e.runtime;t(o=Math.floor(o/60)+"h "+o%60+"m");let c=n.map(e=>null===e.logo_path?null:"https://image.tmdb.org/t/p/original"+e.logo_path);l(c=(c=c.filter(e=>null!==e)).slice(0,5)),a(e.genres.map(e=>e.name));let d=[];e.production_countries.forEach(e=>{let t=i.get(e.iso_3166_1);t&&d.push(t)}),r(d),e.homepage&&s(e.homepage)})})}async function h(e){return(await fetch("https://api.themoviedb.org/3/search/movie?api_key=1ea4c77bc924d2f26c117fbfdcfd6664&query="+e)).json()}function m(){let[e,t]=(0,r.useState)([]);return(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"flex flex-row h-[100px] w-[1000px] m-auto align-middle",children:[(0,a.jsx)("img",{className:"h-[100px] rounded-lg",src:"./logo.webp",alt:"logo"}),(0,a.jsx)("h1",{className:"m-auto",children:"Movie List Website"})]}),function(e,t){let[l,s]=(0,r.useState)(null);return(0,r.useEffect)(()=>{c().then(t=>{e(t)})},[]),(0,a.jsxs)("div",{className:"grid  w-[vw] gap-[10px] bg-slate-700 m-auto p-2 rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10",children:[t?t.map(t=>(0,a.jsxs)("div",{className:"flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1",onClick:()=>s(t),children:[(0,a.jsx)("img",{className:" object-cover ",src:t.image,alt:t.name}),(0,a.jsx)("h1",{className:"items-center text-center m-auto max-h-[50px]",children:t.name+" ("+t.year+")"}),(0,a.jsx)("button",{className:"text-white text-lg bg-red-500 rounded-lg w-[100%] h-[60px] float-end",onClick:l=>{var a;return a=t.id,void(l.stopPropagation(),function(e,t){let l=(0,i.hJ)(o,"movies"),a=(0,i.JU)(l,t.toString());console.log("deleting doc with id: "+t),(0,i.oe)(a).then(()=>{d(e)})}(e,a))},children:"Remove"})]},t.id)):"Loading...",function(e,t){var l,s,i;let[n,o]=(0,r.useState)([]),[c,d]=(0,r.useState)([]),[h,m]=(0,r.useState)([]),[g,x]=(0,r.useState)(""),[p,f]=(0,r.useState)([]),[v,b]=(0,r.useState)(null),[j,N]=(0,r.useState)(null),[w,y]=(0,r.useState)(null),[S,_]=(0,r.useState)(""),[C,k]=(0,r.useState)(null),[M,I]=(0,r.useState)(null),[A,E]=(0,r.useState)(null);return e?((0,r.useEffect)(()=>{(function(e,t,l,a){fetch("https://api.themoviedb.org/3/movie/"+e+"/credits?api_key=1ea4c77bc924d2f26c117fbfdcfd6664").then(e=>{e.json().then(e=>{let r=e.cast.slice(0,6),s=e.crew.filter(e=>"Director"===e.job),i=e.crew.filter(e=>"Screenplay"===e.job||"Writer"===e.job).slice(0,4);t(r),l(s),a(i)})})})(e.id,o,d,m),function(e,t){fetch("https://api.themoviedb.org/3/movie/"+e+"/videos?api_key=1ea4c77bc924d2f26c117fbfdcfd6664").then(e=>{e.json().then(e=>{if(0===e.results.length){t(null);return}let l=e.results.filter(e=>"Trailer"===e.type);0===l.length&&(l=e.results);let a=Math.floor(Math.random()*l.length),r="https://www.youtube.com/embed/"+l[a].key;t(r),console.log(e),console.log(r)})})}(e.id,x),u(e.id,b,f,k,I,E),function(e,t,l,a){fetch("https://api.themoviedb.org/3/movie/".concat(e,"/watch/providers?api_key=").concat("1ea4c77bc924d2f26c117fbfdcfd6664")).then(e=>{e.json().then(e=>{t(null),l(null),a(null),console.log(e);let r=e.results.GB;r&&(r.flatrate&&t(r.flatrate),r.rent&&l(r.rent),a(r.link))})})}(e.id,N,y,_)},[e]),(0,a.jsx)("div",{className:"fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] z-10 bg-[rgba(255,255,255,0.15)] hover:cursor-pointer",onClick:()=>t(null),children:(0,a.jsx)("div",{className:"fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] bg-slate-500 z-20 rounded-[50px] p-10 hover:cursor-default",onClick:e=>(function(e){e.stopPropagation()})(e),children:(0,a.jsxs)("div",{className:"grid grid-cols-1  xl:grid-cols-3 gap-5 h-[100%] overflow-auto",children:[(0,a.jsx)("img",{className:"m-auto max-h-[400px] xl:max-h-[90%]",src:e.image,alt:e.name}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-2 m-auto",children:[null!=A?(0,a.jsx)("a",{href:A,className:"m-auto text-xl hover:cursor-pointer",children:(0,a.jsxs)("h1",{className:"m-auto text-xl  text-center",children:[" ",e.name+" ("+e.year+")"," "]})}):(0,a.jsxs)("h1",{className:"m-auto text-xl hover:cursor-text text-center",children:[" ",e.name+" ("+e.year+")"," "]}),(0,a.jsxs)("h2",{className:"m-auto hover:cursor-text text-center",children:[" ",e.description," "]}),(0,a.jsx)("h2",{className:"m-auto text-[20px] hover:cursor-text",children:v}),(0,a.jsx)("h2",{className:"m-auto text-[20px] hover:cursor-text",children:C?C.join(", "):"Loading..."}),(0,a.jsx)("h4",{className:"m-auto text-[15px] hover:cursor-text text-center",children:M?M.join(", "):"Loading..."}),(0,a.jsx)("div",{className:"grid max-h-[100px] gap-3 grid-cols-"+Math.min(null!==(l=null==p?void 0:p.length)&&void 0!==l?l:0,4),children:p?p.map(e=>(0,a.jsx)("img",{className:"m-auto max-h-[100px] ",src:e})):"Loading..."})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-2",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1",children:[(0,a.jsx)("h2",{className:"m-auto hover:cursor-text grid ",children:" Cast: "}),(0,a.jsx)("div",{className:"grid grid-cols-2 gap-1",children:n?n.map(e=>(0,a.jsxs)("p",{className:"text-center hover:cursor-text",children:[e.name," "]},e.id)):"Loading..."}),(0,a.jsxs)("h2",{className:"m-auto hover:cursor-text",children:[" ",(null==c?void 0:c.length)>1?"Directors:":"Director:"]}),(0,a.jsx)("div",{className:"grid gap-1 grid-cols-"+Math.min(null!==(s=null==c?void 0:c.length)&&void 0!==s?s:0,3),children:c?c.map(e=>(0,a.jsxs)("p",{className:"text-center hover:cursor-text",children:[e.name," "]},e.id)):"Loading..."}),(0,a.jsxs)("h2",{className:"m-auto hover:cursor-text",children:[" ",(null==h?void 0:h.length)>1?"Writers:":"Writer:"," "]}),(0,a.jsx)("div",{className:"grid gap-1 grid-cols-"+Math.min(null!==(i=null==h?void 0:h.length)&&void 0!==i?i:0,3),children:h?h.map(e=>(0,a.jsxs)("p",{className:"text-center hover:cursor-text",children:[e.name," "]},e.id)):"Loading..."})]}),g&&(0,a.jsx)("iframe",{src:g,className:"m-auto w-[100%] max-w-[500px] aspect-video",allowFullScreen:!0}),j||w?(console.log("rentingAvailability len = "+(null==w?void 0:w.length)),(null==j?void 0:j.length)>0)?(0,a.jsxs)("div",{className:"grid grid-cols-1",children:[(null==j?void 0:j.length)>0?(0,a.jsx)("h2",{className:"m-auto hover:cursor-text",children:"Streaming Availability:"}):null,(0,a.jsx)("div",{className:"grid gap-1 grid-cols-"+(j?j.length:1),children:j?j.map(e=>(0,a.jsx)("a",{href:S,children:(0,a.jsx)("img",{className:"m-auto h-[50px]",src:"https://image.tmdb.org/t/p/original"+e.logo_path})})):"Not available to stream"})]}):(0,a.jsxs)("div",{className:"grid grid-cols-1",children:[(null==w?void 0:w.length)>0?(0,a.jsx)("h2",{className:"m-auto hover:cursor-text",children:"Renting Availability:"}):null,(0,a.jsx)("div",{className:"grid gap-1 grid-cols-"+(w?Math.min(w.length,4):1),children:w?w.map(e=>(0,a.jsx)("a",{href:S,children:(0,a.jsx)("img",{className:"m-auto h-[50px]",src:"https://image.tmdb.org/t/p/original"+e.logo_path})})):"Not available to rent"})]}):(0,a.jsx)("h2",{className:"m-auto hover:cursor-text",children:"Not available to stream or rent"})]})]})})})):((0,r.useEffect)(()=>{o([]),d([]),m([]),x("")},[e]),null)}(l,s)]})}(t,e),function(e){let[t,l]=(0,r.useState)(null),[s,n]=(0,r.useState)(""),[c,u]=(0,r.useState)(null),[m,g]=(0,r.useState)(null),[x,p]=(0,r.useState)("title"),[f,v]=(0,r.useState)(),[b,j]=(0,r.useState)(null),[N,w]=(0,r.useState)(null);return(0,r.useRef)(null),(0,r.useEffect)(()=>{if(null===f&&l(null),f){let t=[];for(let e=0;e<Math.min(f.length,20);e++){let l=Math.floor(Math.random()*f.length);if(t.includes(f[l])){e--;continue}t.push(f[l])}l((0,a.jsx)("div",{className:"grid  gap-4 p-[10px] rounded-xl grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10",children:t.map(t=>null===t.image?null:(0,a.jsxs)("div",{className:"flex flex-col border border-red-100 rounded-xl hover:cursor-pointer overflow-hidden gap-1",onClick:()=>{var l;return l=0,void(!function(e){let t=(0,i.hJ)(o,"movies"),l=(0,i.JU)(t,e.id.toString());console.log("adding movie: "+e.name);let a={description:e.description,id:e.id,image:e.image,name:e.name,year:e.year};(0,i.pl)(l,a)}(t),setTimeout(()=>d(e),100))},children:[(0,a.jsx)("img",{className:" object-cover ",src:t.image,alt:t.name}),(0,a.jsx)("h1",{className:"items-center text-center m-auto max-h-[50px] text-white",children:t.name+" ("+t.year+")"})]},t.id))}))}},[f]),(0,a.jsxs)("div",{className:"w-[vw] bg-slate-600 top-5 rounded-lg",children:[(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-2 p-2 max-w-[1000px] m-auto",children:[(0,a.jsx)("button",{onClick:()=>{p("title"),v([])},className:"title"===x?"text-white text-xl rounded-lg p-2 bg-blue-600":"text-white text-xl rounded-lg p-2 bg-gray-400",children:"Search Titles"}),(0,a.jsx)("button",{onClick:()=>{p("random"),v([])},className:"random"===x?"text-white text-xl rounded-lg p-2 bg-blue-600":"text-white text-xl rounded-lg p-2 bg-gray-400",children:"Random Search"})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 gap-5 text-center text-black m-auto p-4",children:["title"===x&&(0,a.jsx)("input",{type:"text",name:"name",autoComplete:"off",required:!0,placeholder:"Title",className:"bg-gray-800 text-white text-center w-[500px] m-auto rounded-lg p-2 text-xl ",onChange:e=>{e.target.scrollIntoView(),function(e,t){let l=e+"";setTimeout(()=>{if(l===e){if(e.length<3){t(null);return}h(e).then(e=>{if(0===e.results.length){t(null);return}let l=[];for(let t=0;t<e.results.length;t++){let a=e.results[t],r={id:a.id,name:a.title,image:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2"+a.poster_path,description:a.overview,year:a.release_date.split("-")[0]};l.push(r)}t(l)})}},500)}(e.target.value,v)}}),"random"===x&&(0,a.jsxs)("div",{className:"grid grid-cols-3 gap-2 w-[100%] p-2 m-auto",children:[function(e,t){let l=new Map([["Select Genre",-1],["Action",28],["Adventure",12],["Animation",16],["Comedy",35],["Crime",80],["Documentary",99],["Drama",18],["Family",10751],["Fantasy",14],["History",36],["Horror",27],["Music",10402],["Mystery",9648],["Romance",10749],["Science Fiction",878],["TV Movie",10770],["Thriller",53],["War",10752],["Western",37]]);return(0,a.jsxs)("select",{className:"text-white text-xl rounded-lg bg-gray-800 text-center",name:"genre",value:e,onChange:e=>t(e.target.value),children:[(0,a.jsx)("option",{value:"none",children:"Select Genre"}),Array.from(l.keys()).map(e=>(0,a.jsx)("option",{value:l.get(e),children:e},e))]})}(s,n),(0,a.jsxs)("div",{className:"grid grid-cols-1",children:[(0,a.jsx)("input",{type:"text",name:"director",autoComplete:"off",placeholder:"Director",required:!0,className:"bg-gray-800 text-white text-center w-[100%]  m-auto rounded-lg text-xl",onChange:e=>{e.target.scrollIntoView(),function(e,t){let l=e+"";setTimeout(()=>{if(l!==e)return;if(e.length<3){t(null);return}let a="https://api.themoviedb.org/3/search/person?api_key=1ea4c77bc924d2f26c117fbfdcfd6664&query="+e+"&include_adult=false";fetch(a+="&with_job=Director").then(e=>{e.json().then(e=>{e.results.sort((e,t)=>t.popularity-e.popularity),t(e)})})},500)}(e.target.value,u)}}),(0,a.jsx)("div",{className:"grid grid-cols-1 gap-2 relative",children:c&&c.results.map(e=>(0,a.jsxs)("div",{className:"text-white text-xl rounded-lg bg-gray-800 text-center hover:bg-blue-500 hover:cursor-pointer",onClick:()=>{g({id:e.id,name:e.name}),u(null)},children:[" ",e.name]},e.id))}),(0,a.jsxs)("div",{className:"flex text-white text-xl rounded-lg bg-gray-800 gap-2 justify-center",children:[(0,a.jsx)("h1",{className:"text-center",children:null!=m?m.name:"Not found"}),(0,a.jsx)("button",{onClick:e=>{e.preventDefault(),g(null)},children:" x"})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1",children:[(0,a.jsx)("input",{type:"text",name:"actor",autoComplete:"off",placeholder:"Actor",required:!0,className:"bg-gray-800 text-white text-center w-[100%]  m-auto rounded-lg text-xl",onChange:e=>{e.target.scrollIntoView(),function(e,t){let l=e+"";setTimeout(()=>{if(l===e){if(e.length<3){t(null);return}fetch("https://api.themoviedb.org/3/search/person?api_key=1ea4c77bc924d2f26c117fbfdcfd6664&query="+e+"&include_adult=false").then(e=>{e.json().then(e=>{e.results.sort((e,t)=>t.popularity-e.popularity),t(e.results)})})}},500)}(e.target.value,j)}}),(0,a.jsx)("div",{className:"grid grid-cols-1 gap-2 relative",children:b&&b.map(e=>(0,a.jsxs)("div",{className:"text-white text-xl rounded-lg bg-gray-800 text-center hover:bg-blue-500 hover:cursor-pointer",onClick:()=>{w({id:e.id,name:e.name}),j(null)},children:[" ",e.name]},e.id))}),(0,a.jsxs)("div",{className:"flex text-white text-xl rounded-lg bg-gray-800 gap-2 justify-center",children:[(0,a.jsx)("h1",{className:"text-center",children:null!=N?N.name:"Not found"}),(0,a.jsx)("button",{onClick:e=>{e.preventDefault(),w(null)},children:" x"})]})]}),(0,a.jsx)("button",{className:"bg-red-500 text-white text-xl rounded-lg p-2 col-span-3",onClick:()=>{!function(e,t,l){console.log(l);let a=[];e([]);let r="https://api.themoviedb.org/3/discover/movie?api_key=1ea4c77bc924d2f26c117fbfdcfd6664";l.actors&&(r+="&with_cast="+l.actors.id),l.director&&(r+="&with_crew="+l.director.id),l.genre&&"none"!==l.genre&&(r+="&with_genres="+l.genre);for(let t=1;t<9;t++)fetch(r+"&page="+t).then(t=>{t.ok&&t.json().then(t=>{let l=t.results;if(0===l.length)return;let r=l.length;for(let e=0;e<r;e++){let t=l[e],r={id:t.id,name:t.title,image:"https://www.themoviedb.org/t/p/w600_and_h900_bestv2"+t.poster_path,description:t.overview,year:t.release_date.split("-")[0]};a.push(r)}console.log("newRandomMovies"),console.log(a),e(a)})})}(v,0,{genre:s,director:m,actors:N})},children:"Show Random Movies"})]}),(0,a.jsx)("div",{className:"top-5",onChange:e=>e.target.scrollIntoView(),children:t})]})]})}(t),(0,a.jsxs)("div",{className:"flex flex-row m-auto w-[1000px] text-center",children:[(0,a.jsx)("p",{children:"special thanks to"}),(0,a.jsx)("img",{className:"w-[100px]",src:"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg",alt:"tmdb"})]})]})}}},function(e){e.O(0,[358,448,971,117,744],function(){return e(e.s=7735)}),_N_E=e.O()}]);