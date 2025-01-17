import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { NavLink, Outlet } from "react-router-dom";
import { getProvincies } from "~/models/provinces.server";

export default function iterinarioDeViajes() {
  return (
    <div>
      <h1 className="provincias__titulo">Provincias</h1>
      <nav className="provincias__border">
        <NavLink
          to="iterinario"
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
    </div>
  );
}
