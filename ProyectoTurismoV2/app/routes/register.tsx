import { ActionFunction, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import sharp from "sharp";
import { z } from "zod";
import { ButtonSubmit, ErrorMessage } from "~/components/forms";
import { createUser, getUser } from "~/models/user.server";
import { userNotLoggedRequired } from "~/utils/auth.server";
import { validateForm } from "~/utils/validation";

export const loader=async({request}:LoaderFunctionArgs)=>{
    await userNotLoggedRequired(request);
    return null;
}
const registerSchema=z.object({
    email:z.string().email("Se ha introducido un email inválido."),
    username:z.string().min(5,"El nombre de usuario requiere al menos de 5 caracteres."),
    password:z.string().min(5,"La contraseña tiene que ser de al menos 5 caracteres.")
});
//Parámetros de cómo deben ser los datos del registro.

export const action:ActionFunction=async({request})=>{
    const formData=await request.formData();
    return validateForm(formData,registerSchema,(async({email,username,password})=>{
        const user=await getUser(email);
        if(user==null){
            const image=formData.get("image-profile");
           try{
                if (image && typeof image === "object" && "arrayBuffer" in image) {
                    const imageBuffer = await image.arrayBuffer(); 
                    //Convertimos la imagen en un buffer.
                    const resolvedImage = await sharp(Buffer.from(imageBuffer)).toBuffer();
                    //Obtenemos el buffer de la nueva imagen.
                    const base64Image = `data:image/jpeg;base64,${resolvedImage.toString('base64')}`;
                    //Creamos el base64 de la imagen.
                    await createUser(email,username,password,base64Image);
                    return redirect("/login");
               }
            }catch(error){
                const defaultFile ="/img/imagen-perfil-default.jpg";
                //Si no hay una imagen, metemos la imagen por defecto como imagen de perfil.
                await createUser(email,username,password,defaultFile);
                return redirect("/login");
            }
            //Creamos el usuario con imagen de la imagen de perfil según haya sido o no seleccionada.
        }else{
            return json({errors:{email:"El usuario introducido ya existe."}});
        }
        //Si el usuario ya existe, no te vas a poder registrar.
    }),
    (errors)=>(json({errors, email:formData.get("email"),username:formData.get("username"),
    password:formData.get("password")}, {status:403})))
}

export default function register(){
    const actionData=useActionData<typeof action>();
    const defaultFile ="/img/imagen-perfil-default.jpg";
    //Es la imagen que se va a mostrar por defecto cuando no haya ninguna foto de perfil introducida.
    const [imageSrc, setImageSrc] = useState(defaultFile);
    //Esta variable contiene la URL de la imagen que se va a mostrar en "img".
    return (
        <div className="form-container">
            <Form className="form-container__form" method="POST" encType="multipart/form-data">
                <Link to="/"><button className="form-container__form__button-exit">Atrás</button></Link>
                <h1 className="form-container__form__title">Registro</h1>
                <div className="form-container__form__image-container">
                    <img src={imageSrc} alt="" />
                    <input type="file" name="image-profile" id="image-profile" accept="image/*" 
                    onChange={(e)=>{
                        const profileImage = e.target.files?.[0];
                        //Extrae la imagen seleccionada si es que hay una. Si no se ha seleccionado
                        //ninguna imagen, devuelve "undefined".
                        if (profileImage) {
                            const reader = new FileReader();
                            //Un objeto "FileReader" sirve para leer un archivo.
                            reader.onload = (event) => {
                                if (event.target?.result && typeof event.target.result === "string") {
                                    setImageSrc(event.target.result);
                                }
                                //Esta función cambia "imageSrc" para que sea "profileImage" si 
                                //el resultado de "event" existe es tipo "string".
                            };
                            //Se define la función que se va a ejecuta cuando "reader" haya leído 
                            //el archivo.
                            reader.readAsDataURL(profileImage);
                            //Lee la imagen y la codifica en base 64 para mostrar la imagen.
                        }else {
                            setImageSrc(defaultFile); 
                            //Si no se introduce ninguna imagen, se pone la imagen por defecto.
                        }
                    }}/>
                    <label className="form-container__form__image-container__label" 
                    htmlFor="image-profile">Cambiar foto</label>
                </div>
                <input type="email" name="email" placeholder="Email" defaultValue={actionData?.email}/><br/><br/>
                <input type="text" name="username" placeholder="Nombre de usuario" defaultValue={actionData?.username}/><br/><br/>
                <input type="password" name="password" placeholder="Contraseña"/><br/><br/>
                <ButtonSubmit>Registrarse</ButtonSubmit>
            </Form>
           <ErrorMessage className="form-container__form-error">{actionData?.errors?.email}</ErrorMessage>
           <ErrorMessage className="form-container__form-error">{actionData?.errors?.username}</ErrorMessage>
           <ErrorMessage className="form-container__form-error">{actionData?.errors?.password}</ErrorMessage>
           <Link className="form-container__message" to="../login">¿Ya tiene una cuenta? Inicie sesión ahora</Link>
        </div>
    );
}
//En esta ruta sirve para que el usuario se registre.