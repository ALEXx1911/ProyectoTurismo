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
export async function createUser(email:string, username:string,password:string){
    const passwordConHash=await hashPassword(password);
    return db.user.create({
        data:{
            email:email,
            name:username,
            password:passwordConHash
        }
    })
}
//Función para crear un usuario. La función hashea contraseña.