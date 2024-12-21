import { createCookieSessionStorage } from "@remix-run/node";
import { sessionCookie } from "./cookies";

export const {getSession,commitSession,destroySession}=createCookieSessionStorage({
    cookie:sessionCookie
});
//Devuelve los métodos de una nueva sesión que hemos creado en la que se incluye la "sessionCookie".