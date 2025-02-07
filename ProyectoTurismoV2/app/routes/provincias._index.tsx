import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ProvincePagination, ProvincieCard } from "~/components/provinces";
import { getAllProvincies, getTotalPages } from "~/models/provinces.server";

export const loader = async ({request}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let page = Number(url.searchParams.get("page")) || 1;
  const totalPages= await getTotalPages()/8;
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
  });
};
//Sacamos las provincias junto a todos los datos de las mismas en el "loader".

export default function provincias() {
  const {province,page,totalPages} = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">
          Provincias de España
        </h1>
        <div className="my-6 mx-16 grid auto-cols-[minmax(_1fr,_2fr)] gap-2 md:grid-cols-2">
          {province.map((provincia:any) => {
            return (
              <ProvincieCard
                key={provincia.id}
                imageUrl={provincia.imageUrl}
                name={provincia.name}
                info={provincia.description}
                climate={provincia.climate}
                places={provincia.recommendedPlaces}
                food={provincia.typicalFood}
                festivities={provincia.festivities}
                beaches={provincia.beaches}
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
