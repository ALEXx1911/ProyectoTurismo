import ProfileBox from "./ProfileBox";

/*type headerProps={
   imageProfile?:string;
}*/
//Le tenemos que pasar un componente que en este caso va a ser ProfileBox
export default function Header(){
    return(
        <div className="header">
            <div className="header__logo-container">
               <img className=" header__logo"src="../../img/logo.jpeg" alt="Foto del logo de la compañía"/>
               <h4 className="header__name">turismoMadrid</h4>
            </div>
       
                <form className="header__search-bar">
                    <input type="text" className="header__search-bar__input" placeholder="Buscar lugares"/>
                    <button className="header__search-bar__search-button">
                    <i className="header__icon icon-basic-magnifier"></i>
                    </button> 
                </form>
            <div className="header__profile-box">
                <ProfileBox image="../../img/imagen-perfil-default.jpg" username="No has iniciado sesión"/>
            </div>
        </div>
    );
}

