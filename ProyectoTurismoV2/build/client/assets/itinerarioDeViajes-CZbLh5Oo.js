import{R as V,j as e}from"./jsx-runtime-DQs7YwYB.js";import{c as _}from"./index-CHD5LLT7.js";import{P as F,a as m}from"./icons-B63PWRLh.js";import{P as R,I as x,E as o,D as O}from"./forms-CvZqWo5f.js";import{t as P,y as A,z as p,q as K}from"./components-Drm0OdQ5.js";function z(){var s,l;const a=P();A();const i=p(),t=K(),r=V.useRef(null);(s=t.formData)==null||s.has("q");const n=((l=i.formData)==null?void 0:l.get("_action"))==="createItinerario";return V.useEffect(()=>{!n&&r.current&&(r.current.scrollLeft=0)},[n]),e.jsx("div",{className:" flex flex-col items-center",children:e.jsxs("div",{className:"bg-yellow-50 w-full md:w-[70%] m-7 rounded-lg",children:[e.jsx("h1",{className:"text-4xl text-blue-300 font-semibold uppercase mt-6 text-center ",children:"ITINERARIO DE VIAJES"}),e.jsx(i.Form,{method:"post",children:e.jsxs(R,{name:"_action",value:"createItinerario",className:" w-full md:w-fit md:mx-16",isLoading:n,children:[e.jsx(F,{}),e.jsx("span",{className:"pl-2",children:n?"Creando itinerario...":"Crear itinerario"})]})}),e.jsx("ul",{ref:r,className:_("flex-col gap-8 overflow-x-auto mt-4 pb-4","snap-x snap-mandatory",n?"bg-red-100":""),children:a.itinerarioTablas.map(c=>e.jsx(S,{itinerario:c},c.id))})]})})}function S({itinerario:a}){var s,l,c,j,h,I,b,v,y,N,D,g,w,C;const i=p(),t=p(),r=d=>{if(d.key==="Enter"){d.preventDefault();const E=d.currentTarget.form;if(!E)return;const u=Array.from(E.querySelectorAll("input")),f=u.indexOf(d.currentTarget);f>=0&&f<u.length-1&&u[f+1].focus()}};return((s=i.formData)==null?void 0:s.get("_action"))==="deleteItinerario"&&((l=i.formData)==null?void 0:l.get("itinerarioID"))===a.id?null:e.jsxs("li",{className:_("border-2 border-red-300 rounded-md p-4","my-6 mx-16 grid"),children:[e.jsxs(t.Form,{method:"post",className:"grid grid-cols-[1fr_auto] gap-4 items-center",children:[e.jsxs("div",{children:[e.jsx(x,{type:"text",name:"itinerarioName",defaultValue:a.destino,placeholder:"Destino",autoComplete:"off",className:"text-2xl font-extrabold ",onKeyDown:r,tabIndex:1}),e.jsx(o,{children:(j=(c=t.data)==null?void 0:c.errors)==null?void 0:j.itinerarioName})]}),e.jsx("button",{name:"_action",value:"saveItinerarioName",type:"submit",children:e.jsx(m,{})}),e.jsxs("div",{children:[e.jsx(x,{type:"text",name:"itinerarioComida",defaultValue:a.comida,placeholder:"Comida",autoComplete:"off",className:"text-2xl font-extrabold",onKeyDown:r,tabIndex:2}),e.jsx(o,{children:(I=(h=t.data)==null?void 0:h.errors)==null?void 0:I.itinerarioComida})]}),e.jsx("button",{name:"_action",value:"itinerarioComida",type:"submit",children:e.jsx(m,{})}),e.jsxs("div",{children:[e.jsx(x,{type:"text",name:"itinerarioOcio",defaultValue:a.ocio,placeholder:"Ocio",autoComplete:"off",className:"text-2xl font-extrabold",onKeyDown:r,tabIndex:3}),e.jsx(o,{children:(v=(b=t.data)==null?void 0:b.errors)==null?void 0:v.itinerarioOcio})]}),e.jsx("button",{name:"_action",value:"itinerarioOcio",type:"submit",children:e.jsx(m,{})}),e.jsxs("div",{children:[e.jsx(x,{type:"text",name:"itinerarioViaje",defaultValue:a.viaje,placeholder:"Viaje",autoComplete:"off",className:"text-2xl font-extrabold",onKeyDown:r,tabIndex:4}),e.jsx(o,{children:(N=(y=t.data)==null?void 0:y.errors)==null?void 0:N.itinerarioViaje})]}),e.jsx("button",{name:"_action",value:"itinerarioViaje",type:"submit",children:e.jsx(m,{})}),e.jsx("input",{type:"hidden",name:"itinerarioID",value:a.id}),e.jsx(o,{className:"pl-2",children:(g=(D=t.data)==null?void 0:D.errors)==null?void 0:g.itinerarioID})]}),e.jsxs(i.Form,{method:"post",className:"pt-4",children:[e.jsx("input",{type:"hidden",name:"itinerarioID",value:a.id}),e.jsx(o,{className:"pb-2",children:(C=(w=i.data)==null?void 0:w.errors)==null?void 0:C.itinerarioID}),e.jsx(O,{className:"w-full",name:"_action",value:"deleteItinerario",children:"Eliminar itinerario"})]})]})}function J(){return e.jsx("div",{className:"text-red-500 p-4 text-center",children:"¡Algo salió mal! Por favor intenta nuevamente."})}export{J as ErrorBoundary,z as default};
