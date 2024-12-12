import { NavLink } from "@remix-run/react";
import classNames from "classnames";
import { ReactNode } from "react";

type ProfileBoxProps={
    image:string;
    username: string;
    //La función "handleClickProfileBox" es simplemente para utilizar "handleClickProfileBox" de "Header.tsx".
}
export default function ProfileBox({image,username}:ProfileBoxProps){
    return (
        <div className="app-container__profile-box">
            <div className="app-container__profile-box__user">
                <img  className="app-container__profile-box__user__image" src={image} 
                alt="Foto de perfil para cuando no hay una sesión iniciada"/>
                <h4 className="app-container__profile-box__user__username">
                    {username}
                </h4>
            </div>
            <div className="app-container__profile-box__menu">
                <ul className="app-container__profile-box__menu__list">
                    <MenuOption to="login">Iniciar sesión</MenuOption>
                    <MenuOption to="/nada">Tus viajes</MenuOption>
                    <MenuOption to="provinciasFavoritas">Provincias Favoritas</MenuOption>
                    <MenuOption to="/">Página principal</MenuOption>
                </ul>
            </div>
        </div>
        
    );
}

/*type MenuProps={
    active:boolean;
    //handleClickLogin:()=>void;
}*/

type menuOptionProps={
    to:string;
    children:ReactNode;
}
function MenuOption({to,children}:menuOptionProps){
    return (
        <NavLink to={to}>
            {({isActive})=>(
                <li className={classNames(
                "app-container__profile-box__menu__option",
                isActive?"app-container__profile-box__menu__option__selected":""
                )}>
                    {children}
                </li>
            )}
        </NavLink>
    );
}
//Es un componente para cada opción del menú.


//Por ahora no vamos a mostrar el Login.
//El tema de poner usuarios se hará más adelante.