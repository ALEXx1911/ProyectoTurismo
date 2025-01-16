import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { getProvincies } from "~/models/provinces.server";

export const loader = async () => {
  const province = await getProvincies();
  return json(province);
};

export default function provincias() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="provincias">
      <h1 className="provincias__titulo">Provincias</h1>
      <nav className="provincias__border">
        <NavLink
          to="Provincia"
          className={({ isActive }) =>
            classNames(
              "provincias__button",
              isActive ? "provincias__border" : ""
            )
          }
        >
          Provincia
        </NavLink>
      </nav>
      <div className="py-4 overflow-y-auto">
        <Outlet />
      </div>
      <div>
        <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">
          Provincias de España
        </h1>
        <div className="my-6 mx-16 grid auto-cols-[minmax(_1fr,_2fr)] gap-2 md:grid-cols-2">
          {data.map((provincia) => {
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
      </div>
    </div>
  );
}
//Aquí deben mostrarse todas las provincias.

function provincia() {}
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
        <button className="buttonCard mb-1 mt-1 hover:border-red-600 self-center">
          Añadir
        </button>
      </div>
    </div>
  );
}
