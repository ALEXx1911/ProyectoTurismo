import { Link, useNavigation } from "@remix-run/react";
import { ReactNode } from "react";

export default function Menu(){
    const navigation=useNavigation();
    const isLoading=navigation.state=="loading";
    return(
        <>
            {isLoading ?
                <div className="app-container__profile-box__bull-gif-container">
                    <img className="app-container__profile-box__bull-gif-container__bull-gif" src="../../img/torocorriendo.gif" 
                    alt="" />
                </div>:""}
                <div className="app-container__profile-box__menu">
                    <ul className="app-container__profile-box__menu__list">
                        <MenuOption to="login">Iniciar sesión</MenuOption>
                        <MenuOption to="/">Ajustes</MenuOption>
                        <MenuOption to="/">Tus viajes</MenuOption>
                        <MenuOption to="provinciasFavoritas">Provincias Favoritas</MenuOption>
                        <MenuOption to="/">Ayuda</MenuOption>
                    </ul>
                </div>
        </>
    );
}
//Función para mostrar un menú.

type menuOptionProps={
    to:string;
    children:ReactNode;
}
function MenuOption({to,children}:menuOptionProps){
    return (
        <Link to={to}>
            <li className="app-container__profile-box__menu__option">
                {children}
            </li>
        </Link>
    );
}
//Es un componente para cada opción del menú.


//Este componente igual no se usa pero es necesario mantenerlo por si acaso.
