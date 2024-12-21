import { useState } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";

type HeaderProps={
  username:string | undefined;
}

export default function Header({username}:HeaderProps) {
  const [showMenu,setShowMenu]=useState(false);
  //Variable que controla la visibilidad del menú.
  function handleClickProfileBox(){
    showMenu?setShowMenu(false):setShowMenu(true);
  }
  
  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <img className="header__logo" src="../../img/logo.jpeg" alt="Logo de la compañía" />
          <h4 className="header__name">turismoEspaña</h4>
        </div>

        <form className="header__search-bar" method="POST">
          <input
            type="text"
            className="header__search-bar__input"
            placeholder="Buscar provincia"
          />
        </form>
        <ProfileBox
          image="../../img/imagen-perfil-default.jpg"
          username={typeof username=="string"?username:"No login"}
          //Si el "username" es de tipo "string" es porque hay un usuario con la sesión iniciada.
          handleClickProfileBox={handleClickProfileBox}
        />
      </div>
      <Menu active={showMenu}/>
    </>
  );
}
