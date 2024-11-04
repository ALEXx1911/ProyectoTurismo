import { useState } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";
import Login from "./Login";

export default function Header(){
    const [username,setUsername]=useState("No login");
    const [showMenu,setShowMenu]=useState(false);
    //Variable para controlar el estado de visibilidad de "Menu".
    const [showLogin,setShowLogin]=useState(false);
    //Variable para controlar el estado de visibilidad de "Login".
    
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


    function handleLoginSuccess(user:string){
        setUsername(user);
        setShowLogin(false);
    }
    //Esta función sirve para actualizar el valor del "username" y ocultar el formulario del login
    //cuando ya lo has enviado.

    return(
        <>
        <div className="header">
            <div className="header__logo-container">
               <img className=" header__logo"src="../../img/logo.jpeg" alt="Foto del logo de la compañía"/>
               <h4 className="header__name">turismoEspaña</h4>
            </div>
       
                <form className="header__search-bar">
                    <input type="text" className="header__search-bar__input" placeholder="Buscar lugares"/>
                    <button className="header__search-bar__search-button">
                    <i className="header__icon icon-basic-magnifier"></i>
                    </button> 
                </form>
            <div className="header__profile-box">
                <ProfileBox image="../../img/imagen-perfil-default.jpg" username={username} 
                handleClickProfileBox={handleClickProfileBox}/>
            </div>
        </div>
        <Menu active={showMenu} handleClickLogin={handleClickLogin}/>
        {/*El "Menu" solo se muestra cuando "showMenu" sea true. */}
        <Login active={showLogin} handleLoginSuccess={handleLoginSuccess}/>
        {/*El "Login" solo se muestra cuando "showLogin" sea true.
        Para cambiar el nombre de usuario utilizamos la función "handleLoginSuccess"*/}
        </>
    );
}

