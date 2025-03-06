import { ActionFunction, ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { ProvincieCard } from "~/components/provinces";
import {  deleteProvinceFromFavorites, getUserFavoriteProvinces, provinceToFavorites } from "~/models/provinces.server";
import { getCurrentUser, userLoggedRequired } from "~/utils/auth.server";

export const loader=async({request}:LoaderFunctionArgs)=>{
    const user=await userLoggedRequired(request);
    //Es necesario que haya una sesión iniciada.
    const provincesFavorites= await getUserFavoriteProvinces(user.id);
    const names= provincesFavorites.map(province => (province.name));
    return json({
        data:provincesFavorites,
        isLoggedIn: user !== null,
        names,
    })
}
//Devolvemos las provincias favoritas del usuario.

export const action: ActionFunction = async ({request,params}:ActionFunctionArgs) => {
  const actionData = await request.formData();
  const user = await getCurrentUser(request);
  switch (actionData.get("_action")) {
      case "deleteFromFavorite":{
        deleteProvinceFromFavorites(user?.id ? user.id : "",String(actionData.get("provinceId")));
      }
      default:
          return null;
  }

}

export default function provincesFavoritas(){
    const {data,isLoggedIn,names}=useLoaderData<typeof loader>();
    const deleteFromFavoriteFetcher = useFetcher<any>();
    const deleteFromFavorite= (provinceId:string) =>
      deleteFromFavoriteFetcher.submit({
          _action:"deleteFromFavorite",
          provinceId,
      },{method:"post"});
return (
    <div className="flex flex-col items-center w-[90%] mx-auto">
        <h3 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center mb-4">Tus provincias Favoritas</h3>
        {data.length==0?<h2 className="text-red-600 text-lg text-center p-36 uppercase">No se ha añadido ninguna provincia a favoritos</h2>:null}
            <div className="w-full px-30">
            {data.map((province)=>
                <ProvincieCard
                    key={province.id}
                    id={province.id}
                    imageUrl={province.imageUrl}
                    name={province.name}
                    info={province.description}
                    climate={province.climate}
                    places={province.recommendedPlaces}
                    food={province.typicalFood}
                    festivities={province.festivities}
                    beaches={province.beaches}
                    logged={isLoggedIn}
                    inFav={names.includes(province.name)}
                    successFunction={deleteFromFavorite}
                />
            )}
            </div>
    </div>
);
}