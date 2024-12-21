import { createCookie } from "@remix-run/node";

if(!process.env.AUTH_COOKIE_SECRET){
    throw new Error("AUTH_COOKIE_SECRET is not set");
}

export const sessionCookie=createCookie("session__cookie",{
    secrets:[process.env.AUTH_COOKIE_SECRET],
    httpOnly:true,
    secure:true
});
//Constante que crea una cookie cifrada.