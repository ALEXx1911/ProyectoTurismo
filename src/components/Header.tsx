import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";
import { AppContext } from "../App";
import { provincias } from "./provincias";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el input de búsqueda
  const [filteredProvincias, setFilteredProvincias] = useState(Object.keys(provincias).sort()); // Provincias ordenadas alfabéticamente
  const [showDropdown, setShowDropdown] = useState(false); // Estado para mostrar u ocultar el desplegable

  const navigate = useNavigate(); // Hook para redirigir
  const { username, showLogin, setShowLogin } = useContext(AppContext);

  // Filtrar provincias según el término de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toUpperCase(); // Cambiar a mayúsculas
    setSearchTerm(term);

    // Filtrar provincias que coincidan con el término de búsqueda (ignorando mayúsculas/minúsculas)
    const filtered = Object.keys(provincias).filter(provincia =>
      provincia.toUpperCase().includes(term) // Compara en mayúsculas
    );
    setFilteredProvincias(filtered);
  };

  // Función para manejar el submit del formulario y redirigir
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto (recarga de la página)
    if (filteredProvincias.length === 1) {
      navigate(`/search/${filteredProvincias[0]}`); // Redirigir a la página de resultados para esa provincia
    }
  };

  // Mostrar u ocultar el desplegable al hacer clic en el input
  const handleFocusSearchInput = () => {
    setShowDropdown(true);
  };

  const handleBlurSearchInput = () => {
    // Ocultar el desplegable si el usuario hace clic fuera del input o de las opciones
    setTimeout(() => setShowDropdown(false), 200);
  };

  function handleClickProfileBox() {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  }

  function handleClickLogin() {
    setShowMenu(false);
    showLogin ? setShowLogin(false) : setShowLogin(true);
  }

  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <img className="header__logo" src="../../img/logo.jpeg" alt="Logo de la compañía" />
          <h4 className="header__name">turismoEspaña</h4>
        </div>

        <form className="header__search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="header__search-bar__input"
            placeholder="Buscar provincia"
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleFocusSearchInput}  // Mostrar desplegable al hacer clic en el input
            onBlur={handleBlurSearchInput}  // Ocultar desplegable si el usuario hace clic fuera del input
            style={{ textTransform: "uppercase" }} // Para convertir todo el texto a mayúsculas
          />
          <button className="header__search-bar__search-button">
            <i className="header__icon icon-basic-magnifier"></i>
          </button>
        </form>

        {/* Mostrar el desplegable solo si hay un término de búsqueda o si el input tiene foco */}
        {(showDropdown || searchTerm) && (
          <div className="dropdown">
            {filteredProvincias.map(provincia => (
              <div 
                key={provincia} 
                className="dropdown-item"
                onClick={() => navigate(`/search/${provincia}`)} // Redirigir al hacer clic en una provincia
              >
                {provincias[provincia].nombre}
              </div>
            ))}
          </div>
        )}

        <div className="header__profile-box">
          <ProfileBox
            image="../../img/imagen-perfil-default.jpg"
            username={username}
            handleClickProfileBox={handleClickProfileBox}
          />
        </div>
      </div>

      <Menu active={showMenu} handleClickLogin={handleClickLogin} />
    </>
  );
}
