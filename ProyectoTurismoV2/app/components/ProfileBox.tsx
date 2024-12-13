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
        </div>
        
    );
}

/*type MenuProps={
    active:boolean;
    //handleClickLogin:()=>void;
}*/



//Por ahora no vamos a mostrar el Login.
//El tema de poner usuarios se hará más adelante.