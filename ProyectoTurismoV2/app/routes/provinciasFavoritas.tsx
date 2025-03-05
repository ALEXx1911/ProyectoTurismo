import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProvincieCard } from "~/components/provinces";
import {  getUserFavoriteProvinces } from "~/models/provinces.server";
import { userLoggedRequired } from "~/utils/auth.server";

export const loader=async({request}:LoaderFunctionArgs)=>{
    const user=await userLoggedRequired(request);
    //Es necesario que haya una sesión iniciada.
    const provincesFavorites= await getUserFavoriteProvinces(user.id);
    return json({
        provinces:provincesFavorites
    })
}
//Devolvemos las provincias favoritas del usuario.

export default function provincesFavoritas(){
    const data=useLoaderData<typeof loader>();
return (
    <div>
        {data.provinces.length==0?<h2 className="text-red-600 text-lg text-center p-36 uppercase">No se ha añadido ninguna provincia a favoritos</h2>:null}
        
            {data.provinces.map((province:any)=>
            <ProvincieCard
                key={province.id}
                imageUrl={province.imageUrl}
                name={province.name}
                info={province.description}
                climate={province.climate}
                places={province.recommendedPlaces}
                food={province.typicalFood}
                festivities={province.festivities}
                beaches={province.beaches}
            />
        )}
    </div>
);
}