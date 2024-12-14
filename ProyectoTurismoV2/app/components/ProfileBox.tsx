type ProfileBoxProps={
    image:string;
    username: string;
    handleClickProfileBox:()=>void;
    //La función "handleClickProfileBox" es simplemente para utilizar "handleClickProfileBox" de "Header.tsx".
}
export default function ProfileBox({image,username,handleClickProfileBox}:ProfileBoxProps){
    return (
        <div className="header__profile-box" onClick={handleClickProfileBox}>
            <img  className="header__profile-box__image" src={image} 
            alt="Foto de perfil para cuando no hay una sesión iniciada"/>
            <h4 className="header__profile-box__username">
                {username}
            </h4>
        </div>
    );
}
//Componente que muestra la foto de perfil y el nombre del usuario.


//Por ahora no vamos a mostrar el Login.
//El tema de poner usuarios se hará más adelante.