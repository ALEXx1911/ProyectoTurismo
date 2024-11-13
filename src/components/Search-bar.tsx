import { useContext } from "react";
import { HeaderContext } from "./Header";
type Search_barProps={
    handleClickSearchBar:()=>void;
}
export default function Search_bar({handleClickSearchBar}:Search_barProps){
    const {showList}=useContext(HeaderContext);
    //Si es "true", se muestra la lista de provincias.
    return(
    <form className="header__search-bar">
        <div className="header__search-bar-container">
        <input type="text" className="header__search-bar__input" placeholder="Buscar lugares" onClick={handleClickSearchBar}/>
        <button className="header__search-bar__search-button">
        <i className="header__icon icon-basic-magnifier"></i>
        </button> 
        </div>
       {/* Aquí hay que meter el "Provincia.tsx" y al hacerle click en una de las opciones, que se ponga el texto en el "input".
        Al darle a buscar, que acceda a la página de la provincia especificada. */}

    </form>);
}