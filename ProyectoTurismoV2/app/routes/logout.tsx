import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { closeSession } from "~/sessions";
import { userLoggedRequired } from "~/utils/auth.server";

export const loader=async({request}:LoaderFunctionArgs)=>{
    await userLoggedRequired(request);
    await closeSession(request);
}
//Cerramos la sesión en el servidor.
export default function Logout(){
    return redirect("/");
}
//Reedirigimos a la página principal.