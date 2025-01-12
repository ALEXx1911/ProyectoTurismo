import { ActionFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Form,Link, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { z } from "zod";
import { ButtonSubmit, ErrorMessage } from "~/components/forms";
import { getUser } from "~/models/user.server";
import { commitSession, getSession } from "~/sessions";
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
                const cookieHeader=request.headers.get("cookie");
                const session=await getSession(cookieHeader);
                session.set("userId",undefined);
                session.set("username",undefined);
                session.set("profile_image",undefined);
                //Dejamos en "undefined" los parámetros que estuvieran anteriormente.
                session.set("userId",user.id);
                session.set("username",user.name);
                //Insertamos el nombre de usuario a la sesión. 
                const userProfileImage=user.imageUrl;
                if(userProfileImage!==null){
                    session.set("profile_image",userProfileImage);
                }
                return redirect("/",{
                    headers:{
                        "Set-Cookie":await commitSession(session)
                    }
                });
                {/*Guardamos la sesión en los headers y redirigimos a la página principal.*/}
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
    return (
        <div className="form-container">
            <Form className="form-container__form" method="POST">
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
    );
}
