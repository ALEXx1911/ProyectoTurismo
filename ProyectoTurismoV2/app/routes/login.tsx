import { ActionFunction } from "@remix-run/node";
import { Form,Link, redirect, useActionData } from "@remix-run/react";
import { json } from "@remix-run/react";
import { z } from "zod";
import { ErrorMessage } from "~/components/forms";
import { getUser } from "~/models/user.server";
import { commitSession, getSession } from "~/sessions";
import { comparePasswords } from "~/utils/passwordUtils";
import { validateForm } from "~/utils/validation";

const loginSchema=z.object({
    email:z.string().email(),
    password:z.string()
});

export const action:ActionFunction=async({request})=>{
    const formData=await request.formData();
    //Sacamos los datos del formulario.
    return validateForm(formData,loginSchema,
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
                session.set("username",user.name);
                //Insertamos el nombre de usuario a la sesión. 
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

        (errors)=>(json({errors,email:formData.get("email")},{status:403}))
    );
}
//Se valida el "email" en el "action". Si el email es válido, te redirige a la página principal.

export default function Login(){
    const actionData=useActionData<typeof action>();
    //Sacamos los datos del "action".
    return (
        <div className="login-container">
            <Form className="login-container__login-form" method="POST">
                <Link to="/"><button className="login-container__login-form__button-exit">Atrás</button></Link>
                <h1 className="login-container__login-form__title">Iniciar sesión</h1>
                <input type="email" name="email" placeholder="Email" defaultValue={actionData?.email}/><br/><br/>
                <input type="password" name="password" placeholder="Contraseña"/><br/><br/>
                <button className="login-container__login-form__button-submit">Iniciar sesión<span></span><span></span><span></span><span></span></button>
            </Form>
            <ErrorMessage>{actionData?.errors?.email}
            </ErrorMessage>
            <Link to="../register">¿Aún no tiene cuenta? Regístrese ahora</Link>
        </div>
    );
}
