import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import { ReactNode } from "react";

export default function Menu(){
   return( <div className="menu">
        <ul className="menu__list">
            <MenuOption to="login">Iniciar sesión</MenuOption>
            <MenuOption to="provincias">Tus viajes</MenuOption>
            <MenuOption to="provinciasFavoritas">Provincias Favoritas</MenuOption>
            <MenuOption to="/">Página principal</MenuOption>
        </ul>
    </div>);
}

type menuOptionProps={
    to:string;
    children:ReactNode;
}
function MenuOption({to,children}:menuOptionProps){
    return (
        <NavLink to={to}>
            {({isActive})=>(
                <li className={classNames(
                "menu__option",
                isActive?"menu__option__selected":""
                )}>
                    {children}
                </li>
            )}
        </NavLink>
    );
}
//Es un componente para cada opción del menú.