//En este ficheros se realizarán las funciones para extraer, editar, crear y borrar usuarios.
import db from "~/db.server";
import { hashPassword } from "~/utils/passwordUtils";

export function getUser(email:string){
    return db.user.findUnique({
        where:{
            email:email
        }
    });
}
//Función para obtener un usuario a partir de su email.
export async function createUser(email:string, username:string,password:string,imageURL?:string){
    const passwordConHash=await hashPassword(password);
   if(typeof(imageURL)==undefined){
    return db.user.create({
        data:{
            email:email,
            name:username,
            password:passwordConHash,
        }
    });
   }else{
    return db.user.create({
        data:{
            email:email,
            name:username,
            password:passwordConHash,
            imageUrl:imageURL
        }
    });
   }
}
//Función para crear un usuario. La función hashea contraseña.

export async function getUserById(userId:string){
    return db.user.findUnique({
        where:{
            id:userId
        }
    });
}
//Función que busca el usuario según su ID.
