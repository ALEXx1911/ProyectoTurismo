import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { z } from "zod";
import { ErrorMessage } from "~/components/forms";
import { createUser, getUser } from "~/models/user.server";
import { validateForm } from "~/utils/validation";
const registerSchema=z.object({
    email:z.string().email(),
    username:z.string().min(5),
    password:z.string().min(5)
});
//Parámetros de cómo deben ser los datos del registro.

export const action:ActionFunction=async({request})=>{
    const formData=await request.formData();
    return validateForm(formData,registerSchema,(async({email,username,password})=>{
        const user=await getUser(email);
        if(user==null){
            createUser(email,username,password);
            return redirect("../login");
        }else{
            return json({errors:{email:"El usuario introducido ya existe."}});
        }
        //Si el usuario ya existe, no te vas a poder registrar.
    }),
    (errors)=>(json({errors, email:formData.get("email"),username:"Username: "+formData.get("username"),
    password:"Password: "+formData.get("password")}, {status:403})))
}


export default function register(){
    const actionData=useActionData<typeof action>();
    return (
        <div className="login-container">
            <Form className="login-container__login-form" method="POST">
                <Link to="/"><button className="login-container__login-form__button-exit">Atrás</button></Link>
                <h1 className="login-container__login-form__title">Registro</h1>
                <input type="email" name="email" placeholder="Email" defaultValue={actionData?.email}/><br/><br/>
                <input type="text" name="username" placeholder="Username" defaultValue={actionData?.username}/><br/><br/>
                <input type="password" name="password" placeholder="Contraseña"/><br/><br/>
                <button className="login-container__login-form__button-submit">Registrarse<span></span><span></span><span></span><span></span></button>
            </Form>
           <ErrorMessage>{actionData?.errors?.email}</ErrorMessage>
           <ErrorMessage>{actionData?.errors?.password}</ErrorMessage>
           <Link to="../login">¿Ya tiene una cuenta? Inicie sesión ahora.</Link>
        </div>
    );
}