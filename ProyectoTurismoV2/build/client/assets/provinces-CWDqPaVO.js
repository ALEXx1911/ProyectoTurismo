import{j as e}from"./jsx-runtime-DQs7YwYB.js";import{c as g}from"./index-CHD5LLT7.js";import{H as p,b as f,D as v,L as N,R as u,c as w}from"./icons-B63PWRLh.js";import{L as y}from"./components-Drm0OdQ5.js";function n(s,r){const a=new URLSearchParams(s);for(const[t,l]of Object.entries(r)){if(l===void 0){a.delete(t);continue}a.set(t,String(l))}return Array.from(a.entries()).map(([t,l])=>l?`${t}=${encodeURI(l)}`:t).join("&")}function D({id:s,imageUrl:r,name:a,info:t,climate:l,beaches:i,places:c,food:x,festivities:m,successFunction:d,logged:h,inFav:j}){return e.jsxs("div",{className:g("border-2 border-red-400 rounded-md shadow-2xl","grid grid-cols-3 grid-rows-3 object-cover overflow-hidden","card"),children:[e.jsx("img",{src:r,alt:"xd",className:g("object-cover h-full col-start-1 col-end-4 row-start-1 row-end-3 w-full py-3 px-20 rounded-3xl","image:px-3")}),e.jsxs("div",{className:g("row-start-3 row-end-4 col-start-1 col-end-4","md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4 md:mx-2 md:mb-1","text-start relative px-10 image:px-3"),children:[e.jsx("h4",{className:"font-bold text-xl text-center mb-1 titulo",children:a}),e.jsx("p",{children:t}),e.jsxs("p",{children:[e.jsx("span",{className:"font-bold",children:"Clima: "}),l]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-bold",children:"Lugares Recomendados: "}),c]}),i?e.jsxs("p",{children:[e.jsx("span",{className:"font-bold",children:"Playas: "}),i]}):"",e.jsxs("p",{children:[e.jsx("span",{className:"font-bold",children:"Comida típica: "}),x]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-bold",children:"Festividades: "}),m]}),h?e.jsx("div",{className:"absolute top-[1rem] right-2",children:j?e.jsx("button",{onClick:()=>d(s),children:e.jsx(p,{})}):e.jsx("button",{onClick:()=>d(s),children:e.jsx(f,{})})}):""]})]})}function S({currentPage:s,totalPages:r},{searchParams:a}){const t=s===r,l=s===1;return e.jsxs("div",{className:"flex gap-4 items-center my-4",children:[l?"":e.jsxs("div",{className:"flex gap-1",children:[e.jsx(o,{to:{search:n(a,{page:1})},children:e.jsx(v,{})}),e.jsx(o,{to:{search:n(a,{page:s-1})},children:e.jsx(N,{})})]}),e.jsxs("p",{className:"text-xl font-bold",children:["Página ",s," de ",r]}),t?"":e.jsxs("div",{className:"flex gap-1",children:[e.jsx(o,{to:{search:n(a,{page:s+1})},children:e.jsx(u,{})}),e.jsx(o,{to:{search:n(a,{page:r})},children:e.jsx(w,{})})]})]})}function o({to:s,children:r}){return e.jsx(y,{to:s,children:e.jsx("div",{className:"bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white",children:r})})}function P({name:s,imageUrl:r,detaildes:a,desparrafo:t,detailfest:l,festparrafo:i,festUrl:c,detailfood:x,foodparrafo:m,foodUrl:d,detailsite:h,siteparrafo:j,siteUrl:b}){return e.jsxs("div",{className:"max-w-6xl mx-auto p-8",children:[e.jsx("h1",{className:"text-5xl font-extrabold text-center text-gray-900 mb-6",children:s}),e.jsx("img",{src:r,alt:s,className:"w-full h-96 object-cover rounded-xl shadow-lg mb-8 transition-transform duration-300 hover:scale-105 hover:brightness-110"}),e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-semibold text-gray-900 border-b-2 pb-2",children:"Descripción"}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed mt-4",children:a}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed",children:t})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-semibold text-gray-900 border-b-2 pb-2",children:"Festividades"}),e.jsx("img",{src:c,alt:"Festividades",className:"w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed mt-4",children:l}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed",children:i})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-semibold text-gray-900 border-b-2 pb-2",children:"Comida Típica"}),e.jsx("img",{src:d,alt:"Comida típica",className:"w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed mt-4",children:x}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed",children:m})]}),e.jsxs("div",{className:"mb-8",children:[e.jsx("h2",{className:"text-3xl font-semibold text-gray-900 border-b-2 pb-2",children:"Lugares de Interés"}),e.jsx("img",{src:b,alt:"Lugares de interés",className:"w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed mt-4",children:h}),e.jsx("p",{className:"text-lg text-gray-800 leading-relaxed",children:j})]})]})}export{D as P,S as a,P as b};
