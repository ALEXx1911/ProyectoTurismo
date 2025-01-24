import { useState } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";
import { Form } from "@remix-run/react";
import { ErrorMessage } from "./forms";
import { SearchIcon } from "./icons";

type HeaderProps={
  username:string | undefined;
  profileImage: string | undefined;
  isUserLogged:boolean;
  errorMessage:any;
}

export default function Header({username,profileImage,isUserLogged,errorMessage}:HeaderProps) {
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

      <div className="header__search-bar-container">
        <Form className="header__search-bar-container__form" method="POST">
          <input
            type="text"
            className="header__search-bar-container__form__search-bar"
            autoComplete="off"
            placeholder="Buscar provincia"
            name="province"
          />
          <button className="header__search-bar-container__form__search-button"><SearchIcon /></button>
        </Form>
        <ErrorMessage className="header__search-bar-container__form__error-message">
          {errorMessage}
        </ErrorMessage>
       </div>
        <ProfileBox
          image={typeof profileImage=="string"?profileImage:"/img/imagen-perfil-default.jpg"}
          username={typeof username=="string"?username:"No login"}
          //Si el "username" es de tipo "string" es porque hay un usuario con la sesión iniciada.
          handleClickProfileBox={handleClickProfileBox}
        />
      </div>
      <Menu active={showMenu} isUserLogged={isUserLogged}/>
    </>
  );
}
