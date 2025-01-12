import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/sessions";
import { userLoggedRequired } from "~/utils/auth.server";

export const loader=async({request}:LoaderFunctionArgs)=>{
    await userLoggedRequired(request);
    const cookie=request.headers.get("cookie");
    const session=await getSession(cookie);
    return json("",{
        headers:{
            "Set-Cookie": await destroySession(session)
        }
    });
}
//Destruimos la sesión en el "loader".

export default function Logout(){
    return redirect("/");
}
//Reedirigimos a la página principal.