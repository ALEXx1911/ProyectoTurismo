import { LoaderFunctionArgs } from "@remix-run/node";
import { userLoggedRequired } from "~/utils/auth.server";

export const loader=async({request}:LoaderFunctionArgs)=>{
    await userLoggedRequired(request);
    //Es necesario que haya una sesión iniciada.
    return null;
}
export default function provinciasFavoritas(){
    return (
        <div>
            <p>Aquí se mostrarán las provincias que el usuario haya guardado en favoritas.</p>
        </div>
    );
}