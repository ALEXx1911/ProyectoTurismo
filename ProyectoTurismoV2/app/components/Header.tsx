import { useState } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";

export default function Header() {
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

        <form className="header__search-bar">
          <input
            type="text"
            className="header__search-bar__input"
            placeholder="Buscar provincia"
            style={{ textTransform: "uppercase" }} // Para convertir todo el texto a mayúsculas
          />
          <button className="header__search-bar__search-button" type="submit">
            <i className="header__icon icon-basic-magnifier"></i>
          </button>
        </form>
        <ProfileBox
          image="../../img/imagen-perfil-default.jpg"
          username="No Login"
          handleClickProfileBox={handleClickProfileBox}
        />
      </div>
      <Menu active={showMenu}/>
    </>
  );
}
