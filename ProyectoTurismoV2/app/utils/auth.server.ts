import { redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";
import { getSession } from "~/sessions";

export async function getCurrentUser(request:Request){
    const cookie=request.headers.get("cookie");
    const session=await getSession(cookie);
    const userId=session.get("userId");
    if(userId==null){
        return null;
    }
    return getUserById(userId);
}
//Función que devuelve el usuario que se encuentre actualmente con la sesión iniciada.

export async function userLoggedRequired(request:Request){
    const user=await getCurrentUser(request);
    if(user==null){
        throw redirect("/");
    }
}
//Función que te redirige a "/" si no hay un usuario con la sesión iniciada o si ya no existe el usuario
//con la sesión iniciada.

export async function userNotLoggedRequired(request:Request){
    const user=await getCurrentUser(request);
    if(user!==null){
        throw redirect("/");
    }
}
//Función que te redirige a "/" si hay un usuario con la sesión iniciada.