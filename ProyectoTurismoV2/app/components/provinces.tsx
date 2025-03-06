import { Form, Link, useNavigation } from "@remix-run/react";
import classNames from "classnames";
import { setSearchParamsString } from "~/utils/misc";
import { DoubleLeftArrow, DoubleRightArrow, Heart, HeartEmpty, LeftArrow, RightArrow } from "./icons";

export type ProvinceCardProps = {
    id:string;
    imageUrl: string;
    name: string;
    info: string;
    climate: string;
    beaches: string | null;
    places: string;
    food: string;
    festivities: string;
    logged?:boolean;
    inFav?:boolean;
    successFunction: (data:string,dato:boolean) => void
  };
  
  export function ProvincieCard({
    id,
    imageUrl,
    name,
    info,
    climate,
    beaches,
    places,
    food,
    festivities,
    successFunction,
    logged,
    inFav,
  }: ProvinceCardProps) {
    const playa = false;
    const navigation = useNavigation();
    return (
      <div
        className={classNames(
          "border-2 border-red-400 rounded-md shadow-2xl mb-4",
          "grid grid-cols-3 grid-rows-3 object-cover overflow-hidden",
          "card"
        )}
      >
        <img
          src={imageUrl}
          alt="xd"
          className={classNames(
            "object-cover h-full col-start-1 col-end-4 row-start-1 row-end-3 w-full py-3 px-20 rounded-3xl",
            "image:px-5",
            
          )}
        />
        <div
          className={classNames(
            "row-start-3 row-end-4 col-start-1 col-end-4",
            "md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4 md:mx-2 md:mb-1",
            "text-start relative px-10 image:px-3"
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
            { logged ? (
                    <div className="absolute top-[1rem] right-2">
                      {
                        navigation.state === "submitting" ? <span>Actualizando</span>:
                        <label>
                          <input className="hidden" type="checkbox" checked={inFav} onChange={(e) => successFunction(id,e.target.checked)}>
                          </input>
                          {inFav ? <Heart/> : <HeartEmpty/>}
                        </label>
                      }
                    </div>
                ) : ""
            }
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
                <PaginationItem to={{search: setSearchParamsString(searchParams,{page:1})}}>
                    <DoubleLeftArrow/>
                </PaginationItem>
                <PaginationItem to={{search: setSearchParamsString(searchParams,{page:currentPage-1})}}>
                    <LeftArrow/>
                </PaginationItem>
            </div> : ""}
            <p className="text-xl font-bold">Página {currentPage } de {totalPages}</p>
            {!islastPage ? <div className="flex gap-1">
                <PaginationItem to={{search: setSearchParamsString(searchParams,{page:currentPage+1})}}>
                    <RightArrow/>
                </PaginationItem>
                <PaginationItem to={{search: setSearchParamsString(searchParams,{page:totalPages})}}>
                    <DoubleRightArrow/>
                </PaginationItem>
            </div> : ""}   
        </div>
    );
  }
  export type PaginationItemProps = {
    to: {search:string}
    children:React.ReactNode
  }
  export function PaginationItem({to,children}:PaginationItemProps){
    return(
        <Link to={to}>
            <div className="bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white">
                {children}
            </div>
        </Link>
    )
  }

  export function ProvincieDetail({
    name,
    imageUrl,
    detaildes,
    desparrafo,
    detailfest,
    festparrafo,
    festUrl,
    detailfood,
    foodparrafo,
    foodUrl,
    detailsite,
    siteparrafo,
    siteUrl
}: {
    name: string;
    imageUrl: string;
    detaildes: string;
    desparrafo: string;
    detailfest: string;
    festparrafo: string;
    festUrl: string;
    detailfood: string;
    foodparrafo: string;
    foodUrl: string;
    detailsite: string;
    siteparrafo: string;
    siteUrl: string;
}) {
    return (
        <div className="max-w-6xl mx-auto p-8">
            {/* Título principal */}
            <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6">{name}</h1>

            {/* Imagen principal con efecto hover */}
            <img 
                src={imageUrl} 
                alt={name} 
                className="w-full h-96 object-cover rounded-xl shadow-lg mb-8 transition-transform duration-300 hover:scale-105 hover:brightness-110"
            />

            {/* Descripción general */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-2">Descripción</h2>
                <p className="text-lg text-gray-800 leading-relaxed mt-4">{detaildes}</p>
                <p className="text-lg text-gray-800 leading-relaxed">{desparrafo}</p>
            </div>

            {/* Festividades */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-2">Festividades</h2>
                <img 
                    src={festUrl} 
                    alt="Festividades" 
                    className="w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
                />
                <p className="text-lg text-gray-800 leading-relaxed mt-4">{detailfest}</p>
                <p className="text-lg text-gray-800 leading-relaxed">{festparrafo}</p> 
            </div>

            {/* Comida típica */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-2">Comida Típica</h2>
                <img 
                    src={foodUrl} 
                    alt="Comida típica" 
                    className="w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
                />
                <p className="text-lg text-gray-800 leading-relaxed mt-4">{detailfood}</p>
                <p className="text-lg text-gray-800 leading-relaxed">{foodparrafo}</p>
            </div>

            {/* Lugares de interés */}
            <div className="mb-8">
                <h2 className="text-3xl font-semibold text-gray-900 border-b-2 pb-2">Lugares de Interés</h2>
                <img 
                    src={siteUrl} 
                    alt="Lugares de interés" 
                    className="w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
                />
                <p className="text-lg text-gray-800 leading-relaxed mt-4">{detailsite}</p>
                <p className="text-lg text-gray-800 leading-relaxed">{siteparrafo}</p>
            </div>
        </div>
    );
}