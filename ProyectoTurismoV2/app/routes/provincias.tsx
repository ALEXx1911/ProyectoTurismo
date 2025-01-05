import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";

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
    </div>
  );
}
//Aquí deben mostrarse todas las provincias.
