import { json, LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import classNames from "classnames";import { DoubleLeftArrow, DoubleRightArrow, LeftArrow, RightArrow } from "~/components/icons";
import { getAllProvincies, getTotalPages } from "~/models/provinces.server";
import { setSearchParamsString } from "~/utils/misc";

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
          {province.map((provincia) => {
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

type ProvinceCardProps = {
  imageUrl: string;
  name: string;
  info: string;
  climate: string;
  beaches: string | null;
  places: string;
  food: string;
  festivities: string;
};

function ProvincieCard({
  imageUrl,
  name,
  info,
  climate,
  beaches,
  places,
  food,
  festivities,
}: ProvinceCardProps) {
  const playa = false;
  return (
    <div
      className={classNames(
        "border-2 border-red-400 rounded-md",
        "grid grid-cols-3 grid-rows-3 object-cover overflow-hidden",
        "card"
      )}
    >
      <img
        src={imageUrl}
        alt="xd"
        className={classNames(
          "w-full object-cover h-full col-start-1 col-end-4 row-start-1 row-end-3",
          "md:col-start-1 md:col-end-4 md:p-3 md:object-cover",
          "imagenxd"
        )}
      />
      <div
        className={classNames(
          "row-start-3 row-end-4 col-start-1 col-end-4",
          "md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4 md:mx-2 md:mb-1",
          "text-start"
        )}
      >
        <h4 className="font-bold text-xl text-center mb-1 titulo">{name}</h4>
        <p>{info}</p>
        <p>
          <span className="font-bold">Clima: </span>
          {climate}
        </p>
        <p>
          <span className="font-bold">Lugares Recomendados: </span>
          {places}
        </p>
        {beaches ? (
          <p>
            <span className="font-bold">Playas: </span>
            {beaches}
          </p>
        ) : (
          ""
        )}
        <p>
          <span className="font-bold">Comida típica: </span>
          {food}
        </p>
        <p>
          <span className="font-bold">Festividades: </span>
          {festivities}
        </p>
      </div>
    </div>
  );
}
type ProvincePaginationProps = {
  currentPage: number
  totalPages: number
}
function ProvincePagination({currentPage,totalPages}:ProvincePaginationProps,{searchParams}:{searchParams : URLSearchParams}){
  const islastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;
  return(
    <div className="flex gap-4 items-center my-4">
    {!isFirstPage ? <div className="flex gap-1">
      <Link to={{search: setSearchParamsString(searchParams,{page:1})}}>
        <div className="bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white">
          <DoubleLeftArrow/>
        </div>
    </Link>
    <Link to={{search: setSearchParamsString(searchParams,{page:currentPage-1})}}>
        <div className="bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white">
          <LeftArrow/>
        </div>
    </Link>
      </div> : ""}
    <p className="text-xl font-bold">Página {currentPage } de {totalPages}</p>
    {!islastPage ? <div className="flex gap-1">
      <Link to={{search: setSearchParamsString(searchParams,{page:currentPage+1})}}>
        <div className="bg-white p-1 rounded-xl transition-all ease-in-out duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white">
          <RightArrow/>
        </div>
      </Link>
      <Link to={{search: setSearchParamsString(searchParams,{page:totalPages})}}>
        <div className="bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white">
          <DoubleRightArrow/>
        </div>
    </Link>
      </div> : ""}   
</div>
  );
}