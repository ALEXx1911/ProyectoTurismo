import{j as r}from"./jsx-runtime-DQs7YwYB.js";import{B as c,E as t}from"./forms-CvZqWo5f.js";import{v as f,A as u,O as x,F as d,L as a}from"./components-Drm0OdQ5.js";import"./index-CHD5LLT7.js";function b(){var o,n;const e=f(),m=u();return r.jsxs(r.Fragment,{children:[r.jsx(x,{}),r.jsxs("div",{className:"form-container",children:[r.jsxs(d,{className:"form-container__form",method:"POST",onKeyDown:s=>{if(s.key==="Enter"){s.preventDefault();const i=s.currentTarget,l=new FormData(i);m(l,{method:"post",replace:!0})}},children:[r.jsx(a,{to:"/",children:r.jsx("button",{className:"form-container__form__button-exit",children:"Atrás"})}),r.jsx("h1",{className:"form-container__form__title",children:"Iniciar sesión"}),r.jsx("input",{type:"email",name:"email",placeholder:"Email",defaultValue:e==null?void 0:e.email}),r.jsx("br",{}),r.jsx("br",{}),r.jsx("input",{type:"password",name:"password",placeholder:"Contraseña"}),r.jsx("br",{}),r.jsx("br",{}),r.jsx(c,{children:"Iniciar sesión"})]}),r.jsx(t,{className:"form-container__form-error",children:(o=e==null?void 0:e.errors)==null?void 0:o.email}),r.jsx(t,{className:"form-container__form-error",children:(n=e==null?void 0:e.errors)==null?void 0:n.username}),r.jsx(a,{className:"form-container__message",to:"../register",children:"¿Aún no tiene cuenta? Regístrese ahora"})]})]})}export{b as default};
