type MenuProps={
    active:boolean;
    handleClickLogin:()=>void;
}
export default function Menu({active,handleClickLogin}:MenuProps){
    if(active){
        return(
            <div className="menu">
                <ul className="menu__list">
                    <li className="menu__option" onClick={handleClickLogin}>Iniciar sesión</li>
                    {/*La función "handleClickLogin" solo se aplica cuando plisas en "Iniciar sesión".*/}
                    <li className="menu__option">Ajustes</li>
                    <li className="menu__option">Tus viajes</li>
                    <li className="menu__option">Ayuda</li>
                </ul>
            </div>
        );
    }
}