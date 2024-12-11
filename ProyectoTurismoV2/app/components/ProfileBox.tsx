import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type ProfileBoxProps={
    image:string;
    username: string;
    //La función "handleClickProfileBox" es simplemente para utilizar "handleClickProfileBox" de "Header.tsx".
}
export default function ProfileBox({image,username}:ProfileBoxProps){
    return (
        <div className="app-container__profile-box">
            <img  className="app-container__profile-box__image" src={image} 
            alt="Foto de perfil para cuando no hay una sesión iniciada"/>
            <h4 className="app-container__profile-box__username">
                {username}
            </h4>
            <div className="app-container__profile-box__menu">
                <ul className="app-container__profile-box__menu__list">
                    <MenuOption to="login">Iniciar sesión</MenuOption>
                    <MenuOption to="/">Ajustes</MenuOption>
                    <MenuOption to="/">Tus viajes</MenuOption>
                    <MenuOption to="provinciasFavoritas">Provincias Favoritas</MenuOption>
                    <MenuOption to="/">Ayuda</MenuOption>
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
        <Link to={to}>
            <li className="app-container__profile-box__menu__option">
                {children}
            </li>
        </Link>
    );
}
//Es un componente para cada opción del menú.


//Por ahora no vamos a mostrar el Login.
//El tema de poner usuarios se hará más adelante.