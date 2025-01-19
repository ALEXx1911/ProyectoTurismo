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

export async function createUser(email:string, username:string,password:string,imageURL:string){
    const passwordConHash=await hashPassword(password);
    return db.user.create({
        data:{
            email:email,
            name:username,
            password:passwordConHash,
            imageUrl:imageURL
        }
    });
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

export async function updateUser(userId:string,userName:string,imageProfileUrl?:string){
    if(typeof imageProfileUrl=="string"){
        return await db.user.update({
            where:{
                id:userId
            },
            data:{
                name:userName,
                imageUrl:imageProfileUrl
            }
        })
    }
    return await db.user.update({
        where:{
            id:userId
        },
        data:{
            name:userName,
        }
    })
}
//Función que actualiza el "username" y la URL de la imagen de perfil (esta última de manera opcional)
//de un usuario con un ID especificado. 