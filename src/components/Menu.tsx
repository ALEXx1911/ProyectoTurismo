type MenuProps={
    active:boolean;
    handleClickLogin:()=>void;
}
export default function Menu({active,handleClickLogin}:MenuProps){
    if(active){
        return(
            <div className="menu">
                <li className="menu__list">
                    <ul onClick={handleClickLogin}>Iniciar sesión</ul>
                    {/*La función "handleClickLogin" solo se aplica cuando pulsas en "Iniciar sesión".*/}
                    <ul>Ajustes</ul>
                </li>
            </div>
        );
    }
}