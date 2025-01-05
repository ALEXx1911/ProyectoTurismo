import { LoaderFunction, LoaderFunctionArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { ReactNode } from "react";
type MenuProps={
    active:boolean;
}
export const loader=async({request}:LoaderFunctionArgs)=>{
    const cookie=request.headers.get("cookie");
    console.log(cookie);
    return cookie;
}   

export default function Menu({active}:MenuProps){
    const data=useLoaderData();
    let userLogin:boolean=false;
    if(data?.username){
        userLogin=true;
    }else{
        userLogin=false;
    }

  if(active){
    return( 
    <div className="menu">
        <ul className="menu__list">
            <MenuOption to="/">Página principal</MenuOption>
            <MenuOption to="provincias">Todas las provincias</MenuOption>
            <MenuOption to="viajes">Tus viajes</MenuOption>
            {userLogin?<MenuOption to="provinciasFavoritas">Provincias Favoritas</MenuOption>:
            <MenuOption to="register">Registrarse</MenuOption>}
            <MenuOption to="login">{userLogin?"Iniciar sesión con otra cuenta":
            "Iniciar sesión"}</MenuOption>
        </ul>
    </div>);
  }
}
//Este componente devuelve un menú de opciones siempre y cuando "active" sea "true".
//Se añadirá una opción que cuando la sesión esté iniciada, cambie el botón de "iniciar sesión" a
//"cerrar sesión". 

type MenuOptionProps={
    to:string;
    children:ReactNode;
}
function MenuOption({to,children}:MenuOptionProps){
    return (
        <NavLink to={to}>
            {({isActive})=>(
                <li className={classNames(
                isActive?"menu__option__selected":"menu__option"
                )}>
                    {children}
                </li>
            )}
        </NavLink>
    );
}
//Es un componente para cada opción del menú.