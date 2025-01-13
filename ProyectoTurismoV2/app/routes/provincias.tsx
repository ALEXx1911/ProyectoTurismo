import { json } from "@remix-run/node";
import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { getProvincies } from "~/models/provinces.server";


export const loader= async() => {
  const province = await getProvincies();
  return json(province);
}

export default function provincias() {
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
      <div className="provincias__padding">
        <Outlet />
      </div>
      <div>
            <h1 className="text-4xl text-red-600 font-semibold uppercase mt-6 text-center">Provincias de España</h1>
            <div className="my-6 mx-16 grid auto-cols-[minmax(_1fr,_2fr)] gap-2 md:grid-cols-2">
                <p>Provincia aqui</p>
            </div>
        </div>
    </div>
  );
}
//Aquí deben mostrarse todas las provincias.

function provincia(){

}
//Aquí se puede hacer el componente para cada provincia.
