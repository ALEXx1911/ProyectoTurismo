import { ReactNode } from "react";
import ProfileBox from "./ProfileBox";

type headerProps={
    logo:string;
   imageProfile?:string;
}
//Le tenemos que pasar un componente que en este caso va a ser ProfileBox
export default function header({logo}:headerProps){
    return(
        <div className="header">
            <div className="header__logo-container">
               <img src={logo} alt="" sizes=""/>
            </div>
            <div className="header__search-bar">
                <ProfileBox image="../../img/imagen-perfil-default.jpg" username="No login"/>
            </div>
        </div>
    );
}