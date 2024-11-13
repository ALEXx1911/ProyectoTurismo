import { useContext, useState,createContext } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";
import { AppContext } from "../App";
import Search_bar from "./Search-bar";
type HeaderContext = {
    showList:boolean;
    setShowList:(x:boolean)=>void;
  };
  
  export const HeaderContext = createContext<HeaderContext>({
    showList:false,
    setShowList: () => {},
  });
export default function Header(){
    const [showMenu,setShowMenu]=useState(false);
    //Variable para controlar el estado de visibilidad de "Menu".

    const {username, showLogin,setShowLogin}=useContext(AppContext);
    //Utilizando un contexto, tomamos los valores de "username","showLogin" y "setShowLogin" de "App" para usarlos en "Header".

    const [showList,setShowList]=useState(false);
    
    function handleClickProfileBox(){
       showMenu?setShowMenu(false):setShowMenu(true);
    }
    //Función para activar el menú cuando pulso en el "ProfileBox".

    function handleClickLogin(){
        setShowMenu(false);
        showLogin?setShowLogin(false):setShowLogin(true);
    }
    //Función para activar el formulario de login cuando se pulsa en "Iniciar sesión".
    //Además, también desactiva el componente "Menu".
    function handleClickSearchbar(){
        showList===true?setShowList(false):setShowList(true);
    }
    return(
        <>
        <div className="header">
            <div className="header__logo-container">
               <img className=" header__logo"src="../../img/logo.jpeg" alt="Foto del logo de la compañía"/>
               <h4 className="header__name">turismoEspaña</h4>
            </div>
                <HeaderContext.Provider value={{showList,setShowList}}>
                <Search_bar handleClickSearchBar={handleClickSearchbar}/>
                </HeaderContext.Provider>
            <div className="header__profile-box">
                <ProfileBox image="../../img/imagen-perfil-default.jpg" username={username} 
                handleClickProfileBox={handleClickProfileBox}/>
            </div>
        </div>
        <Menu active={showMenu} handleClickLogin={handleClickLogin}/>
        {/*El "Menu" solo se muestra cuando "showMenu" sea true. */}

        {/*El "Login" solo se muestra cuando "showLogin" sea true.
        Para cambiar el nombre de usuario utilizamos la función "handleLoginSuccess"*/}
        </>
    );
}

