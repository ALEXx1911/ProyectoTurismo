import { useRef, useState } from "react";
import users from "./users.json";
type LoginProps={
    active:boolean;
    setActive:(x:boolean)=>void;
    handleLoginSuccess:(username:string)=>void;
}

export default function Login({active,setActive,handleLoginSuccess}:LoginProps){
   if(active){
        type UsersType = {
            [key: string]: string; 
            // Cada clave es un nombre de usuario y el valor es la contraseña
        };
        const userRef=useRef<HTMLInputElement>(null);
        const passwordRef=useRef<HTMLInputElement>(null);
        const [showError,setShowError]=useState(false);
        //Variable para controlar el estado de visibilidad del mensaje de error.

        function handleClick(event:React.MouseEvent){
            event.preventDefault();
            if(isValidUser()){
                const user=String(userRef.current!.value);
                handleLoginSuccess(user);
                setActive(false);
                //Utilizamos "handleLoginSuccess" para que el cambio en el nombre de usuario se cambie
                //en el "Header".
            }else{
               setShowError(true);
               //Le damos un valor "true" a "showError" para que se muestre el mensaje de error.
            }
        }

        function handleClickExit(event:React.MouseEvent){
            event.preventDefault();
            setActive(false);
        }
        //Función para salir del formulario del "Login".

        function isValidUser(){
            const user=String(userRef.current!.value);
            const password=String(passwordRef.current!.value);
            const usersData:UsersType=users;
            //Hacemos una variable "usersData" con los datos del archivo "users.json" para evitar un error de TypeScript.
            const validUser = usersData[user]===password;
            return validUser;
            //Según el resultado de "validUser", establecemos el "validate" y hacemos un "return" del valor de "validUser". 

        }
        //Esta función sirve para determinar si el usuario introducido es o no válido.
        
        return (
            <div className="login-container">
                <form className="login-container__login-form">
                <button className="login-container__login-form__button-exit" onClick={handleClickExit}>Atrás</button>
                    <h1 className="login-container__login-form__title">Iniciar sesión</h1>
                    <input type="text" ref={userRef} placeholder="Usuario"/><br/><br/>
                    <input type="password" ref={passwordRef} placeholder="Contraseña"/><br/><br/>
                    <button onClick={handleClick} className="login-container__login-form__button-submit">Iniciar sesión<span></span><span></span><span></span><span></span></button>
                </form>
                <h3 className="login-error" style={{display:showError?"block":"none"}}>Usuarios y/o contraseña no válidos.</h3>
            </div>
        );
   }
   //Solo se muestra el formulario de Login cuando "active" es "true".
}