import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import { ReactNode } from "react";

type MenuProps = {
  active: boolean;
  isUserLogged: boolean;
};

export default function Menu({ active, isUserLogged }: MenuProps) {
  if (active) {
    return (
      <div className="menu">
        <ul className="menu__list">
          <MenuOption to="/">Página principal</MenuOption>
          <MenuOption to="provincias">Todas las provincias</MenuOption>
          {isUserLogged ? (
            <>
              <MenuOption to="itinerarioDeViajes">
                Itinerario de viajes
              </MenuOption>
              <MenuOption to="provinciasFavoritas">
                Provincias Favoritas
              </MenuOption>
            </>
          ) : (
            <MenuOption to="register">Registrarse</MenuOption>
          )}
          {isUserLogged ? (
            <>
              <MenuOption to="profile">Editar perfil</MenuOption>
              <MenuOption to="logout">Cerrar sesión</MenuOption>
            </>
          ) : (
            <MenuOption to="login">Iniciar sesión</MenuOption>
          )}
        </ul>
      </div>
    );
  }
}
//Este componente devuelve un menú de opciones siempre y cuando "active" sea "true". Las 
//opciones del menú cambiarán según haya o no un usuario con la sesión iniciada.

type MenuOptionProps = {
  to: string;
  children: ReactNode;
};
function MenuOption({ to, children }: MenuOptionProps) {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <li
          className={classNames(
            isActive ? "menu__option__selected" : "menu__option"
          )}
        >
          {children}
        </li>
      )}
    </NavLink>
  );
}
//Es un componente para cada opción del menú.
