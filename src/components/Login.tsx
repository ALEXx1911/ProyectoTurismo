import { createContext, useRef, useState } from "react";
import users from "./users.json";
type LoginProps={
    active:boolean;
    handleLoginSuccess:(username:string)=>void;
}

type visibleProps={
    visible:boolean;
    setVisible:(x:boolean)=>void;
}

export default function Login({active,handleLoginSuccess}:LoginProps){
   if(active){
        type UsersType = {
            [key: string]: string; 
            // Cada clave es un nombre de usuario y el valor es la contraseña
        };
        const userRef=useRef<HTMLInputElement>(null);
        const passwordRef=useRef<HTMLInputElement>(null);

        const [visible,setVisible]=useState(true);
        const [validate,setValidate]=useState(false);

        const [showError,setShowError]=useState(false);
        //Variable para controlar el estado de visibilidad del mensaje de error.

        function handleClick(event:React.MouseEvent){
            event.preventDefault();
            isValidUser();
            if(validate){
                const user=String(userRef.current!.value);
                setVisible(false);
                handleLoginSuccess(user);
                //Utilizamos "handleLoginSuccess" para que el cambio en el nombre de usuario se cambie
                //en el "Header".
            }else{
                setVisible(true);
               setShowError(true);
               //Le damos un valor "true" a "showError" para que se muestre el mensaje de error.
            }
        }

        function handleClickExit(event:React.MouseEvent){
            event.preventDefault();
            setVisible(false);
        }
        //Función para salir del formulario del "Login".

        function isValidUser(){
            const user=String(userRef.current!.value);
            const password=String(passwordRef.current!.value);
            const usersData:UsersType=users;
            //Hacemos una variable "usersData" con los datos del archivo "users.json" para evitar un error de TypeScript.
            if(usersData[user]===password){
                setValidate(true);
            }else{
                setValidate(false);
            }

        }
        //Esta función sirve para determinar si el usuario introducido es o no válido.
        
        return (
            <div className="login-container" style={{display:visible?"block":"none"}}>
                <form className="login-container__login-form">
                <button className="login__container__login-form__button-exit" onClick={handleClickExit}>Atrás</button>
                    <h1 className="login-container__login-form__title">Iniciar sesión</h1>
                    <label>Introduzca su nombre de usuario: </label>
                    <input type="text" ref={userRef}/><br/><br/>
                    <label>Introduzca su contraseña: </label>
                    <input type="password" ref={passwordRef}/><br/><br/>
                    <button onClick={handleClick}>Iniciar sesión</button>
                </form>
                <h3 className="login-error" style={{display:showError?"block":"none"}}>Usuarios y/o contraseña no válidos.</h3>
            </div>
        );
   }
   //Solo se muestra el formulario de Login cuando "active" es "true".
}