import{r as g,j as e}from"./jsx-runtime-DQs7YwYB.js";import{B as j,E as m}from"./forms-CvZqWo5f.js";import{v as h,A as b,F as N,L as p}from"./components-Drm0OdQ5.js";import"./index-CHD5LLT7.js";function S(){var l,c,f;const r=h(),i="/img/imagen-perfil-default.jpg",[x,n]=g.useState(i),_=b();return e.jsxs("div",{className:"form-container",children:[e.jsxs(N,{className:"form-container__form",method:"POST",encType:"multipart/form-data",onKeyDown:s=>{if(s.key==="Enter"){s.preventDefault();const a=s.currentTarget,o=new FormData(a);_(o,{method:"post",replace:!0})}},children:[e.jsx(p,{to:"/",children:e.jsx("button",{className:"form-container__form__button-exit",children:"Atrás"})}),e.jsx("h1",{className:"form-container__form__title",children:"Registro"}),e.jsxs("div",{className:"form-container__form__image-container",children:[e.jsx("img",{src:x,alt:""}),e.jsx("input",{type:"file",name:"image-profile",id:"image-profile",accept:"image/*",onChange:s=>{var o;const a=(o=s.target.files)==null?void 0:o[0];if(a){const u=new FileReader;u.onload=t=>{var d;(d=t.target)!=null&&d.result&&typeof t.target.result=="string"&&n(t.target.result)},u.readAsDataURL(a)}else n(i)}}),e.jsx("label",{className:"form-container__form__image-container__label",htmlFor:"image-profile",children:"Cambiar foto"})]}),e.jsx("input",{type:"email",name:"email",placeholder:"Email",defaultValue:r==null?void 0:r.email}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("input",{type:"text",name:"username",placeholder:"Nombre de usuario",defaultValue:r==null?void 0:r.username}),e.jsx("br",{}),e.jsx("br",{}),e.jsx("input",{type:"password",name:"password",placeholder:"Contraseña"}),e.jsx("br",{}),e.jsx("br",{}),e.jsx(j,{children:"Registrarse"})]}),e.jsx(m,{className:"form-container__form-error",children:(l=r==null?void 0:r.errors)==null?void 0:l.email}),e.jsx(m,{className:"form-container__form-error",children:(c=r==null?void 0:r.errors)==null?void 0:c.username}),e.jsx(m,{className:"form-container__form-error",children:(f=r==null?void 0:r.errors)==null?void 0:f.password}),e.jsx(p,{className:"form-container__message",to:"../login",children:"¿Ya tiene una cuenta? Inicie sesión ahora"})]})}export{S as default};
