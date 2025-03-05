import { useState } from "react";
import ProfileBox from "./ProfileBox";
import Menu from "./Menu";
import { Form, Link } from "@remix-run/react";
import { ErrorMessage } from "./forms";
import { SearchIcon } from "./icons";

type HeaderProps = {
  username: string | undefined;
  profileImage: string | undefined;
  isUserLogged: boolean;
  errorMessage: any;
}

export default function Header({ username, profileImage, isUserLogged, errorMessage }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredProvincias, setFilteredProvincias] = useState<string[]>([]); 
  const [showDropdown, setShowDropdown] = useState(false); 

  const provincias = [
    "Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Islas Baleares", "Barcelona", 
    "Burgos", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", 
    "Granada", "Guadalajara", "Guipúzcoa", "Huesca", "Jaén", "León", "Lleida", "Lugo", "Madrid", 
    "Málaga", "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "La Rioja", "Salamanca", 
    "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", 
    "Vizcaya", "Zamora", "Zaragoza"
  ];

  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let term = event.target.value;
    term = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase(); 
    setSearchTerm(term);

    const filtered = term === "" 
      ? provincias 
      : provincias.filter((province) => 
          removeAccents(province).toUpperCase().includes(removeAccents(term).toUpperCase()) 
        );
    setFilteredProvincias(filtered); 
  };

  const handleFocusSearchInput = () => {
    setShowDropdown(true);
  };

  const handleBlurSearchInput = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  const handleSelectProvince = (province: string) => {
    setSearchTerm(province); 
    setShowDropdown(false); 
  };

  function handleClickProfileBox() {
    setShowMenu(!showMenu); 
  }

  return (
    <>
      <div className="header">
        <div className="header__logo-container">
          <Link to="/"><img className="header__logo" src="/img/logo.jpeg" alt="Logo de la compañía" /></Link>
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
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocusSearchInput}
              onBlur={handleBlurSearchInput}
            />
            <button className="header__search-bar-container__form__search-button"><SearchIcon /></button>
          </Form>
          <ErrorMessage className="header__search-bar-container__form__error-message">
            {errorMessage}
          </ErrorMessage>
        </div>

        {}
        {showDropdown && ( 
          <div className="dropdown">
            {filteredProvincias.length > 0 ? (
              filteredProvincias.map((province) => (
                <div
                  key={province}
                  className="dropdown-item"
                  onClick={() => handleSelectProvince(province)} 
                >
                  {province}
                </div>
              ))
            ) : searchTerm === "" ? (
            
              provincias.map((province) => (
                <div
                  key={province}
                  className="dropdown-item"
                  onClick={() => handleSelectProvince(province)} 
                >
                  {province}
                </div>
              ))
            ) : (
              <div className="dropdown-item">No se encontraron provincias</div>
            )}
          </div>
        )}

        <ProfileBox
          image={typeof profileImage == "string" ? profileImage : "/img/imagen-perfil-default.jpg"}
          username={typeof username == "string" ? username : "No login"}
          handleClickProfileBox={handleClickProfileBox}
        />
      </div>

      <Menu active={showMenu} isUserLogged={isUserLogged} />
    </>
  );
}