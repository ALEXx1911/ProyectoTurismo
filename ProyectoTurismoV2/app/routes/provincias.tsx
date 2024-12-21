import { NavLink, Outlet } from "@remix-run/react";
import classNames from "classnames";

export default function provincias() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold my-4">Provincias</h1>
      <nav className="border-b-2 pb-2 mt-2">
        <NavLink to="provincia" className={({ isActive }) => classNames()}>
          Provincia
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
