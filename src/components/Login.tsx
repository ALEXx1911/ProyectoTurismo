import { useRef, useState } from "react";
import users from "./users.json";
type LoginProps={
    active:boolean;
}

export default function Login({active}:LoginProps){
   if(active){
        type UsersType = {
            [key: string]: string; 
            // Cada clave es un nombre de usuario y el valor es la contraseña
        };
        const userRef=useRef<HTMLInputElement>(null);
        const passwordRef=useRef<HTMLInputElement>(null);

        const [visible,setVisible]=useState(true);
        const [validate,setValidate]=useState(false);

        function handleClick(event:React.MouseEvent){
            event.preventDefault();
            isValidUser();
            if(validate){
                setVisible(false);
            }else{
                setVisible(true);
                <h3 className="login-error"></h3>
            }
            

        }

        function isValidUser(){
            const user=String(userRef.current!.value);
            const password=String(passwordRef.current!.value);
            const usersData:UsersType=users;
            //Hacemos una variable "usersData" con los datos del archivo "users.json".
            if(usersData[user]===password){
                setValidate(true);
            }else{
                setValidate(false);
            }

        }
        //Esta función sirve para determinar si el usuario introducido es o no válido.

        return (
            <div className="options__login-container" style={{display:visible?"block":"none"}}>
                <form className="options__login-container-login-form">
                    <label>Introduzca su nombre de usuario: </label>
                    <input type="text"/>
                    <label>Introduzca su contraseña: </label>
                    <input type="text"/>
                    <button onClick={handleClick}>Iniciar sesión</button>
                </form>
            </div>
        );
   }
}