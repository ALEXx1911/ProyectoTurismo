import { ActionFunction, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import sharp from "sharp";
import { z } from "zod";
import { ButtonSubmit, ErrorMessage} from "~/components/forms";
import { updateUser } from "~/models/user.server";
import { userLoggedRequired } from "~/utils/auth.server";
import { validateForm } from "~/utils/validation";

const profileSchema=z.object({
    username:z.string().min(5,"El nombre de usuario requiere al menos de 5 caracteres."),
});

export const loader=async({request}:LoaderFunctionArgs)=>{
    const user=await userLoggedRequired(request);
    return json({
        user:{
            "username":user.name,
            "profileImage":user.imageUrl
        }
    });
}
//Cargamos el nombre del usuario y la URL de su foto de perfil.
export const action:ActionFunction=async({request})=>{
    const user=await userLoggedRequired(request);
    const formData=await request.formData();
    const image=formData.get("image-profile");
    return validateForm(formData,profileSchema,
        async (data)=>{
            try{
                if (image && typeof image === "object" && "arrayBuffer" in image) {
                    const imageBuffer = await image.arrayBuffer(); 
                    //Convertimos la imagen en un buffer.
                    const resolvedImage = await sharp(Buffer.from(imageBuffer)).toBuffer();
                    //Obtenemos el buffer de la nueva imagen.
                    const base64Image = `data:image/jpeg;base64,${resolvedImage.toString('base64')}`;
                    //Creamos el base64 de la imagen.
                    await updateUser(user.id,data.username,base64Image);
                    return redirect("/");
                   
                }
                //Si se introduce una imagen, la convertimos a base 64.
               
            }catch(error){
               await updateUser(user.id,data.username);
               return redirect("/");
            }
        },  
        (errors)=>(
            json({errors,username:formData.get("username")})
        )
    );
}

export default function Profile(){
    const data=useLoaderData<typeof loader>();
    const actionData=useActionData<typeof action>();
    const imageDefault=data.user.profileImage;
    //Es la imagen de perfil que tiene actualmente el usuario. La vamos a mostrar mientras el usuario
    //no haga ningún cambio.
    const [imageSrc, setImageSrc] = useState(imageDefault);
    //Esta variable contiene la URL de la imagen que se va a mostrar en "img".

    return (
        <div className="form-container">
        <Form className="form-container__form" method="POST" encType="multipart/form-data">
            <Link to="/"><button className="form-container__form__button-exit">Atrás</button></Link>
            <h1 className="form-container__form__title">Editar perfil</h1>
            <div className="form-container__form__image-container">
                <img src={imageSrc} alt=""></img>
                <input type="file" name="image-profile" id="image-profile" accept="image/*" 
                onChange={(e)=>{
                    const profileImage = e.target.files?.[0];
                    if (profileImage) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            if (event.target?.result && typeof event.target.result === "string") {
                                    setImageSrc(event.target.result);
                            }
                        };
                        reader.readAsDataURL(profileImage);
                    }else {
                        const imageNotSelected="/img/imagen-perfil-default.jpg";
                        setImageSrc(imageNotSelected); 
                        //Si no se introduce ninguna imagen, se pone la imagen por defecto.
                    }
                }}/>
                <label className="form-container__form__image-container__label" 
                htmlFor="image-profile">Cambiar foto</label>
            </div>
            <input type="text" name="username" placeholder="Nombre de usuario" defaultValue={data?.user.username}/><br/><br/>
            <ButtonSubmit onClick={(event)=>{
                if(!confirm("¿Estás seguro de que desea aplicar los cambios?")){
                    event.preventDefault();
                }
                //Esta función hace que el navegador muestre un mensaje de confirmación antes
                //de enviar el formulario.
            }}>Guardar cambios</ButtonSubmit>
        </Form>
       <ErrorMessage className="form-container__form-error">{actionData?.errors?.username}</ErrorMessage>
    </div>
    )
}