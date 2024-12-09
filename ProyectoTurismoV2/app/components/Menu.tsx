import { Link, useNavigation } from "@remix-run/react";
import { ReactNode, useState } from "react";

type MenuProps={
    active:boolean;
    //handleClickLogin:()=>void;
}
export default function Menu({active}:MenuProps){
    const navigation=useNavigation();
    const isLoading=navigation.state=="loading";

    if(active){
        return(
           <>
                {isLoading ?
                <div className="bull-gif-container">
                    <img className="bull-gif-container__bull-gif" src="../../img/torocorriendo.gif" 
                    alt="" />
                </div>:""}
                <div className="menu">
                    <ul className="menu__list">
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
}
//Función para mostrar un menú.

type menuOptionProps={
    to:string;
    children:ReactNode;
   // handleClick:()=>void;
}
function MenuOption({to,children}:menuOptionProps){
    return (
        <Link to={to}>
            <li className="menu__option">
                {children}
            </li>
        </Link>
    );
}
//Es un componente para cada opción del menú.
