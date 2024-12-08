import { Link, useNavigation } from "@remix-run/react";
import { ReactNode, useState } from "react";

type MenuProps={
    active:boolean;
    //handleClickLogin:()=>void;
}
export default function Menu({active}:MenuProps){
    const [isLoading,setIsLoading]=useState(false);
    //const navigation=useNavigation();
    //const isLoading=navigation.state=="loading";
    function handleClick(){
        setIsLoading(true);
        setTimeout(()=>{
            setIsLoading(false);
        },1000);
    }
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
                        <MenuOption to="login" handleClick={handleClick}>Iniciar sesión</MenuOption>
                        <MenuOption to="/" handleClick={handleClick}>Ajustes</MenuOption>
                        <MenuOption to="/" handleClick={handleClick}>Tus viajes</MenuOption>
                        <MenuOption to="provinciasFavoritas" handleClick={handleClick}>Provincias Favoritas</MenuOption>
                        <MenuOption to="/" handleClick={handleClick}>Ayuda</MenuOption>
                    </ul>
                </div>
           </>
        );
    }
}

type menuOptionProps={
    to:string;
    children:ReactNode;
    handleClick:()=>void;
}
function MenuOption({to,children,handleClick}:menuOptionProps){
    return (
        <Link to={to} onClick={handleClick}>
            <li className="menu__option">
                {children}
            </li>
        </Link>
    );
}
//Es un componente para cada opción del menú.
