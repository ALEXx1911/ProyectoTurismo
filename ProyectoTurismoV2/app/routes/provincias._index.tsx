import { ActionFunction, ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Link, useRevalidator } from "react-router-dom";
import { ProvincePagination, ProvincieCard } from "~/components/provinces";
import { deleteProvinceFromFavorites, getAllProvincies, getTotalPages, getUserFavoriteProvinces, provinceToFavorites } from "~/models/provinces.server";
import { getCurrentUser } from "~/utils/auth.server";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let page = Number(url.searchParams.get("page")) || 1;
  const totalPages= await getTotalPages()/8;
  const user = await getCurrentUser(request);
  let data:string[]= [];
  if (user) {
    const userFavsProvincies= await getUserFavoriteProvinces(user?.id || "");
    data = userFavsProvincies.map( province => (province.id));
  }
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
  const checked = actionData.get("checked") === "true";
  /*switch (actionData.get("_action")) {
      case "changeFavorites":{
        checked ? provinceToFavorites(user?.id ? user.id : "",String(actionData.get("provinceId"))) :
        deleteProvinceFromFavorites(user?.id ? user.id : "",String(actionData.get("provinceId")));
      }
      default:
          return null;
  }*/
  const provinceId = String(actionData.get("provinceId"));

  if (checked) {
    await provinceToFavorites(user.id, provinceId);
  } else {
    await deleteProvinceFromFavorites(user.id, provinceId);
  }
  return json({success:true});
}

export default function provincias() {
  const {province,page,totalPages,isLoggedIn,data} = useLoaderData<typeof loader>();
  const addToFavoriteFetcher = useFetcher<any>();
  const deleteFromFavoriteFetcher = useFetcher<any>();
  const revalidator = useRevalidator();
  const favoriteFetcher = useFetcher<any>();
  function changeFavorites(provinceId: string, checked: boolean) {
    favoriteFetcher.submit(
      { _action: "changeFavorites", provinceId, checked },
      { method: "post" }
    );
    revalidator.revalidate();
  }
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">
          Provincias de España
        </h1>
        {!isLoggedIn ? <div className="flex gap-4 mt-4">
            <p>Para añadir a favoritos, inicia sesión</p>
            <Link to={"/login"} className="border-2 border-black px-4 rounded-lg hover:bg-black hover:text-white">Ir al login</Link>
          </div> : null}
        <favoriteFetcher.Form className="my-6 mx-16 grid grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-3 w-[90%]">
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
                inFav={data.includes(provincia.id)}
                successFunction={data.includes(provincia.id) ? (recipeId) => {
                  changeFavorites(recipeId, false)}
                  : (recipeId) => {
                  changeFavorites(recipeId, true)
                  }}
              />
            );
          })}
        </div>
        </favoriteFetcher.Form>
        <ProvincePagination currentPage={page} totalPages={Math.round(totalPages)}/>
      </div>
    </div>
  );
}
//Esta función muestra todas las provincias si la URL no tiene ningún parámetro de búsqueda.
