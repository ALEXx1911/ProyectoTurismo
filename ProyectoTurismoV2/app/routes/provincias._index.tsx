import { ActionFunction, ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { string } from "zod";
import { ProvincePagination, ProvincieCard } from "~/components/provinces";
import db from "~/db.server";
import { deleteProvinceFromFavorites, getAllProvincies, getTotalPages, getUserFavoriteProvinces, provinceToFavorites } from "~/models/provinces.server";
import { getCurrentUser } from "~/utils/auth.server";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let page = Number(url.searchParams.get("page")) || 1;
  const totalPages= await getTotalPages()/8;
  const user = await getCurrentUser(request);
  //let userFavsProvincies= [{}];
  //if (user !== null) {
    const userFavsProvincies= await getUserFavoriteProvinces(user?.id || "");
    const data = userFavsProvincies.map( province => (province.name));
  //}
  if (page <=0) {
    page = 1;
  }
  if (page>totalPages) {
    page=Math.round(totalPages);
  }
  const province = await getAllProvincies(page);
  
  return json({
    province,
    page,
    totalPages,
    isLoggedIn: user !== null,
    data,
  });
};
//Sacamos las provincias junto a todos los datos de las mismas en el "loader".

export const action: ActionFunction = async ({request,params}:ActionFunctionArgs) => {
  const actionData = await request.formData();
  const user = await getCurrentUser(request);
  switch (actionData.get("_action")) {
      case "addToFavorite":{
        provinceToFavorites(user?.id ? user.id : "",String(actionData.get("provinceId")));
      }
      case "deleteFromFavorite":{
        deleteProvinceFromFavorites(user?.id ? user.id : "",String(actionData.get("provinceId")));
      }
      default:
          return null;
  }

}

export default function provincias() {
  const {province,page,totalPages,isLoggedIn,data} = useLoaderData<typeof loader>();
  const addToFavoriteFetcher = useFetcher<any>();
  const deleteFromFavoriteFetcher = useFetcher<any>();
  const addToFavorite= (provinceId:string) =>
      addToFavoriteFetcher.submit({
          _action:"addToFavorite",
          provinceId,
      },{method:"post"});
  const deleteFromFavorite= (provinceId:string) =>
    deleteFromFavoriteFetcher.submit({
        _action:"deleteFromFavorite",
        provinceId,
    },{method:"post"});
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">
          Provincias de España
        </h1>
        <div className="my-6 mx-16 grid grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-3 w-[90%]">
          {province.map((provincia) => {
            return (
              <ProvincieCard
                id={provincia.id}
                key={provincia.id}
                imageUrl={provincia.imageUrl}
                name={provincia.name}
                info={provincia.description}
                climate={provincia.climate}
                places={provincia.recommendedPlaces}
                food={provincia.typicalFood}
                festivities={provincia.festivities}
                beaches={provincia.beaches}
                logged={isLoggedIn}
                inFav={data.includes(provincia.name)}
                successFunction={data.includes(provincia.name) ? deleteFromFavorite : addToFavorite}
              ></ProvincieCard>
            );
          })}
        </div>
        <ProvincePagination currentPage={page} totalPages={Math.round(totalPages)}/>
      </div>
    </div>
  );
}
//Esta función muestra todas las provincias si la URL no tiene ningún parámetro de búsqueda.
