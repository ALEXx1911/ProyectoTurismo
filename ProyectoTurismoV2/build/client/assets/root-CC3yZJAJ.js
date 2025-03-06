import{o as F,p as M,q as E,t as I,r as u,_ as P,n as e,N as B,L as v,F as z,v as A,w as O,x as R,O as V,M as S,y,S as U,z as G}from"./components-DW4gz7iF.js";import{c as H}from"./index-CDbQRcq7.js";import{E as J}from"./forms-DDZGWonC.js";import{S as Y}from"./icons-bfhvtXlW.js";/**
 * @remix-run/react v2.15.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let N="positions";function D({getKey:s,...r}){let{isSpaMode:a}=F(),i=M(),d=E();I({getKey:s,storageKey:N});let g=u.useMemo(()=>{if(!s)return null;let n=s(i,d);return n!==i.key?n:null},[]);if(a)return null;let t=((n,c)=>{if(!window.history.state||!window.history.state.key){let m=Math.random().toString(32).slice(2);window.history.replaceState({key:m},"")}try{let p=JSON.parse(sessionStorage.getItem(n)||"{}")[c||window.history.state.key];typeof p=="number"&&window.scrollTo(0,p)}catch(m){console.error(m),sessionStorage.removeItem(n)}}).toString();return u.createElement("script",P({},r,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${t})(${JSON.stringify(N)}, ${JSON.stringify(g)})`}}))}function $({image:s,username:r,handleClickProfileBox:a}){return e.jsxs("div",{className:"header__profile-box",onClick:a,children:[e.jsx("img",{className:"header__profile-box__image",src:s,alt:"Foto de perfil para cuando no hay una sesión iniciada"}),e.jsx("h4",{className:"header__profile-box__username",children:r})]})}function q({active:s,isUserLogged:r}){if(s)return e.jsx("div",{className:"menu",children:e.jsxs("ul",{className:"menu__list",children:[e.jsx(l,{to:"/",children:"Página principal"}),e.jsx(l,{to:"provincias",children:"Todas las provincias"}),r?e.jsxs(e.Fragment,{children:[e.jsx(l,{to:"itinerarioDeViajes",children:"Itinerario de viajes"}),e.jsx(l,{to:"provinciasFavoritas",children:"Provincias Favoritas"})]}):e.jsx(l,{to:"register",children:"Registrarse"}),r?e.jsxs(e.Fragment,{children:[e.jsx(l,{to:"profile",children:"Editar perfil"}),e.jsx(l,{to:"logout",children:"Cerrar sesión"})]}):e.jsx(l,{to:"login",children:"Iniciar sesión"})]})})}function l({to:s,children:r}){return e.jsx(B,{to:s,children:({isActive:a})=>e.jsx("li",{className:H(a?"menu__option__selected":"menu__option"),children:r})})}function Z({username:s,profileImage:r,isUserLogged:a,errorMessage:i}){const[d,g]=u.useState(!1),[t,n]=u.useState(""),[c,m]=u.useState([]),[p,x]=u.useState(!1),f=["Álava","Albacete","Alicante","Almería","Ávila","Badajoz","Islas Baleares","Barcelona","Burgos","Cádiz","Cantabria","Castellón","Ciudad Real","Córdoba","Cuenca","Gerona","Granada","Guadalajara","Guipúzcoa","Huesca","Jaén","León","Lleida","Lugo","Madrid","Málaga","Murcia","Navarra","Ourense","Palencia","Pontevedra","La Rioja","Salamanca","Segovia","Sevilla","Soria","Tarragona","Teruel","Toledo","Valencia","Valladolid","Vizcaya","Zamora","Zaragoza"],j=o=>o.normalize("NFD").replace(/[\u0300-\u036f]/g,""),w=o=>{let h=o.target.value;h=h.charAt(0).toUpperCase()+h.slice(1).toLowerCase(),n(h);const L=h===""?f:f.filter(T=>j(T).toUpperCase().includes(j(h).toUpperCase()));m(L)},b=()=>{x(!0)},k=()=>{setTimeout(()=>x(!1),200)},_=o=>{n(o),x(!1)};function C(){g(!d)}return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{className:"header__logo-container",children:[e.jsx(v,{to:"/",children:e.jsx("img",{className:"header__logo",src:"/img/logo.jpeg",alt:"Logo de la compañía"})}),e.jsx("h4",{className:"header__name",children:"turismoEspaña"})]}),e.jsxs("div",{className:"header__search-bar-container",children:[e.jsxs(z,{className:"header__search-bar-container__form",method:"POST",children:[e.jsx("input",{type:"text",className:"header__search-bar-container__form__search-bar",autoComplete:"off",placeholder:"Buscar provincia",name:"province",value:t,onChange:w,onFocus:b,onBlur:k}),e.jsx("button",{className:"header__search-bar-container__form__search-button",children:e.jsx(Y,{})})]}),e.jsx(J,{className:"header__search-bar-container__form__error-message",children:i})]}),p&&e.jsx("div",{className:"dropdown",children:c.length>0?c.map(o=>e.jsx("div",{className:"dropdown-item",onClick:()=>_(o),children:o},o)):t===""?f.map(o=>e.jsx("div",{className:"dropdown-item",onClick:()=>_(o),children:o},o)):e.jsx("div",{className:"dropdown-item",children:"No se encontraron provincias"})}),e.jsx($,{image:typeof r=="string"?r:"/img/imagen-perfil-default.jpg",username:typeof s=="string"?s:"No login",handleClickProfileBox:C})]}),e.jsx(q,{active:d,isUserLogged:a})]})}function W(){const s=[{name:"Facebook",url:"https://facebook.com",imgSrc:"../../img/facebook.png"},{name:"X (Twitter)",url:"https://x.com",imgSrc:"../../img/x.png"},{name:"YouTube",url:"https://youtube.com",imgSrc:"../../img/yt.png"},{name:"Instagram",url:"https://instagram.com",imgSrc:"../../img/ig.png"}],r=new Date().getFullYear();return e.jsxs("footer",{className:"footer",children:[e.jsxs("div",{className:"footer__social-icons",children:[e.jsx("p",{className:"footer__social-title",children:"Siguenos en:"}),e.jsx("div",{className:"footer__social-grid",children:s.map((a,i)=>e.jsx("a",{href:a.url,className:"footer__icon","aria-label":a.name,target:"_blank",rel:"noopener noreferrer",children:e.jsx("img",{src:a.imgSrc,alt:a.name,className:"footer__icon-img"})},i))})]}),e.jsxs("div",{className:"footer__branding",children:[e.jsx("img",{src:"../../img/TurismoEspaña.png",alt:"Turismo España",className:"footer__title-image"}),e.jsx("img",{src:"../../img/logo.jpeg",alt:"Logo de España",className:"footer__logo"}),e.jsxs("p",{className:"footer__rights",children:["©",r," TurismoEspaña Todos los derechos reservados"]})]}),e.jsxs("div",{className:"footer__links",children:[e.jsx("a",{href:"",className:"footer__link",children:"Contacto"}),e.jsx("a",{href:"",className:"footer__link",children:"Aviso Legal"}),e.jsx("a",{href:"",className:"footer__link",children:"Uso de la Información"}),e.jsx("a",{href:"",className:"footer__link",children:"Política de Cookies"})]})]})}const se=()=>[{title:"TurismoEspaña"},{name:"description",content:""}],ae=()=>[{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"},{rel:"stylesheet",href:"../css/style.css"},{rel:"shortcut icon",href:"../img/image-favicon.png",type:"image/x-icon"}];function re({children:s}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(S,{}),e.jsx(y,{})]}),e.jsxs("body",{children:[s,e.jsx(D,{}),e.jsx(U,{})]})]})}function oe(){var c;const r=A().state=="loading",a=O(),i=a==null?void 0:a.username,d=a==null?void 0:a.profile_image,g=a.isUserLogged,t=R(),n=(c=t==null?void 0:t.errors)==null?void 0:c.province;return e.jsxs(e.Fragment,{children:[r?e.jsx("div",{className:"bull-gif-container",children:e.jsx("img",{className:"bull-gif-container__bull-gif",src:"/img/torocorriendo.gif",alt:""})}):null,e.jsx(Z,{username:i,profileImage:d,isUserLogged:g,errorMessage:n}),e.jsx(V,{}),e.jsx(W,{})]})}function ne(){const s=G();return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"UTF-8"}),e.jsx(S,{}),e.jsx(y,{}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),e.jsx("title",{children:"Vaya..."})]}),e.jsx("body",{className:"h-4/5",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h1",{className:"text-2xl font-mono my-4",children:"Vaya..."}),e.jsx("p",{className:"font-light",children:"Si estás viendo esta página es porque se ha producido un error inesperado."}),s instanceof Error?e.jsx("p",{className:"my-4 font-bold",children:s.message}):null,e.jsx(v,{to:"/",children:"Volver a la página principal"})]})})]})}export{ne as ErrorBoundary,re as Layout,oe as default,ae as links,se as meta};
