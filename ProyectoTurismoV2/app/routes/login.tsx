import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form,Link, Outlet, redirect, useActionData, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/react";
import { z } from "zod";
import { ButtonSubmit, ErrorMessage } from "~/components/forms";
import { getUser } from "~/models/user.server";
import { userNotLoggedRequired } from "~/utils/auth.server";
import { comparePasswords } from "~/utils/passwordUtils";
import { validateForm } from "~/utils/validation";

const formSchema=z.object({
    email:z.string().email("Se ha introducido un email inválido."),
    password:z.string()
});

export const loader=async({request}:LoaderFunctionArgs)=>{
    await userNotLoggedRequired(request);
    return null;
}

export const action:ActionFunction=async({request})=>{
    await userNotLoggedRequired(request);
    const formData=await request.formData();
    //Sacamos los datos del formulario.
    return validateForm(formData,formSchema,
        async({email,password})=>{
            const user=await getUser(email);
            if(user==null){
                return json({errors:{email: "El usuario o la contraseña no son correctos."}})
            }
             //Si el usuario no existe, se devuelve un json con el error.
            const passwordHashed=user.password;
            const passwordIsCorrect=await comparePasswords(password,passwordHashed);
            //Comprobamos que la contraseña introducida por el usuario es correcta.

            if(passwordIsCorrect){
               return redirect(`/login/validateUser?userId=${user.id}`)
            }
            //Si la contraseña es correcta, entonces iniciamos la sesión.
            return json({errors:{email: "El usuario o la contraseña no son correctos."}});
            //Si la contraseña no coincide con el usuario, se devuelve un json con el error.

        },

        (errors)=>(json({errors,email:formData.get("email"),username:formData.get("username")},{status:403}))
    );
}
//Se valida el "email" en el "action". Si el email es válido, te redirige a la página principal.

export default function login(){
    const actionData=useActionData<typeof action>();
    const submit = useSubmit();
    return (
        <>
        <Outlet />
        <div className="form-container">
            <Form className="form-container__form" method="POST"
             onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  //Objeto "FormData" que contiene los datos del formulario.
                  submit(formData, { method: "post", replace: true }); 
                }
                 //Si la tecla es "Enter", el formulario se enviará. Lo hemos tenido que hacer 
                 //manualmente porque no dejaba hacerlo. Con "useSubmit()" no se recarga la página.
              }}>
                <Link to="/"><button className="form-container__form__button-exit">Atrás</button></Link>
                <h1 className="form-container__form__title">Iniciar sesión</h1>
                <input type="email" name="email" placeholder="Email" defaultValue={actionData?.email}/><br/><br/>
                <input type="password" name="password" placeholder="Contraseña"/><br/><br/>
                <ButtonSubmit>Iniciar sesión</ButtonSubmit>
            </Form>
            <ErrorMessage className="form-container__form-error">{actionData?.errors?.email}</ErrorMessage>
            <ErrorMessage className="form-container__form-error">{actionData?.errors?.username}</ErrorMessage>
            <Link className="form-container__message" to="../register">
                ¿Aún no tiene cuenta? Regístrese ahora
            </Link>
        </div>
        </>
    );
}
