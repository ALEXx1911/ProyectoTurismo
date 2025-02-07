import { Link } from "@remix-run/react";
import classNames from "classnames";
import { setSearchParamsString } from "~/utils/misc";
import { DoubleLeftArrow, DoubleRightArrow, LeftArrow, RightArrow } from "./icons";

export type ProvinceCardProps = {
    imageUrl: string;
    name: string;
    info: string;
    climate: string;
    beaches: string | null;
    places: string;
    food: string;
    festivities: string;
  };
  
  export function ProvincieCard({
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
  export type ProvincePaginationProps = {
    currentPage: number
    totalPages: number
  }
  export function ProvincePagination({currentPage,totalPages}:ProvincePaginationProps,{searchParams}:{searchParams : URLSearchParams}){
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