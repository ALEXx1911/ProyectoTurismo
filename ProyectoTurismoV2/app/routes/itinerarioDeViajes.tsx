import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { Navigation } from "swiper/modules";

export default function iterinarioDeViajes() {
  return (
    <div>
      <h1 className="provincias__titulo">Irinerario</h1>
      <nav className="provincias__border">
        <NavLink
          to="itinerario"
          className={({ isActive }) =>
            classNames(
              "provincias__button",
              isActive ? "provincias__border" : ""
            )
          }
        >
          Itirerarios
        </NavLink>
      </nav>
      <div className="py-4 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}
