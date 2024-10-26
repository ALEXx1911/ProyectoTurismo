type ProfileBoxProps={
    image:string;
    username: string;
}
/*const ProfileBoxContext=createContext<ProfileBoxProps>({


    
});*/
export default function ProfileBox({image,username}:ProfileBoxProps){
    return (
        <div className="header__profile-box">
            <img  className="header__profile-box__image" src={image} alt="Foto de perfil para cuando no hay una sesión iniciada"/>
            <h4>
                <span className="header__profile-box__username">{username}</span>
            </h4>
        </div>
    );
}