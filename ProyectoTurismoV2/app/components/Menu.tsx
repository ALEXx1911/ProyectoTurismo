type MenuProps={
    active:boolean;
    //handleClickLogin:()=>void;
}
export default function Menu({active}:MenuProps){
    if(active){
        return(
            <div className="menu">
                <ul className="menu__list">
                    <li className="menu__option">Iniciar sesión</li>
                    <li className="menu__option">Ajustes</li>
                    <li className="menu__option">Tus viajes</li>
                    <li className="menu__option">Ayuda</li>
                </ul>
            </div>
        );
    }
}
//Idea que tal vez se haga: Estos "<li>" tendrán NavLinks que serán futuras funciones.