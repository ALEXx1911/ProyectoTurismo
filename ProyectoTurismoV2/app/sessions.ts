import { createCookieSessionStorage, json } from "@remix-run/node";
import { sessionCookie } from "./cookies";

export const {getSession,commitSession,destroySession}=createCookieSessionStorage({
    cookie:sessionCookie
});
//Devuelve los métodos de una nueva sesión que hemos creado en la que se incluye la "sessionCookie".

export async function closeSession(request:Request){
    const cookie=request.headers.get("cookie");
    const session=await getSession(cookie);
    return(json({
        headers: {
            "Set-Cookie":destroySession(session)
        }
    }));
}
//Esta función elimina la sesión, destruyendo también la cookie.