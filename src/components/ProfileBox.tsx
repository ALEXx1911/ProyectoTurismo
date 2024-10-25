import { createContext } from "react";

type ProfileBoxProps={
    image:string;
    username: string;
}
/*const ProfileBoxContext=createContext<ProfileBoxProps>({


    
});*/
export default function ProfileBox({image,username}:ProfileBoxProps){
    return (
        <div className="header__profile-box">
            <img src={image} alt="Foto de perfil para cuando no hay una sesión iniciada"/>
            <span>{username}</span>
        </div>
    );
}