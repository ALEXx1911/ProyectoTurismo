import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProvinceById } from "~/models/provinces.server";

export const loader=async({request,params}:LoaderFunctionArgs)=>{
    const proviceId=params?.id;
    //Sacamos el "provinceId" de los parámetros de la URL.
    if(typeof proviceId=="string"){
        const province=await getProvinceById(proviceId);
        return province;
    }

    return redirect("/");
    //Si la provincia buscada por ID no existe, reedirigimos al usuario a "/".
}
export default function Province(){
    const data=useLoaderData<typeof loader>();

    return (
        <div>
            <h1>{data?.name}</h1>
            <p>Hola</p>
        </div>
    );

}