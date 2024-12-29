import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import sharp from "sharp";
import { z } from "zod";
import { ButtonSubmit, ErrorMessage } from "~/components/forms";
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
            const image=formData.get("image-profile");
            console.log(image);
           try{
                if (image && typeof image === "object" && "arrayBuffer" in image) {
                    const imageBuffer = await image.arrayBuffer(); 
                    //Convertimos la imagen en un buffer.
                    const resizedImage = await sharp(Buffer.from(imageBuffer))
                    .resize(80, 80)
                    .toFormat('jpeg')
                    .toBuffer();
                    //Redimiensionamos la imagen, la pasamos a JPEG y obtenemos el buffer de la
                    //nueva imagen.
                    const base64Image = `data:image/jpeg;base64,${resizedImage.toString('base64')}`;
                    createUser(email,username,password,base64Image);
                    return redirect("../login");
               }
            }catch(error){
                createUser(email,username,password);
                return redirect("../login");
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
    return (
        <div className="form-container">
            <Form className="form-container__form" method="POST" encType="multipart/form-data">
                <Link to="/"><button className="form-container__form__button-exit">Atrás</button></Link>
                <h1 className="form-container__form__title">Registro</h1>
                <input type="file" name="image-profile" accept="image/*" /><br/>
                <input type="email" name="email" placeholder="Email" defaultValue={actionData?.email}/><br/><br/>
                <input type="text" name="username" placeholder="Username" defaultValue={actionData?.username}/><br/><br/>
                <input type="password" name="password" placeholder="Contraseña"/><br/><br/>
                <ButtonSubmit>Registrarse</ButtonSubmit>
            </Form>
           <ErrorMessage className="form-container__form-error">{actionData?.errors?.email}</ErrorMessage>
           <ErrorMessage className="form-container__form-error">{actionData?.errors?.password}</ErrorMessage>
           <Link className="form-container__message" to="../login">¿Ya tiene una cuenta? Inicie sesión ahora</Link>
        </div>
    );
}