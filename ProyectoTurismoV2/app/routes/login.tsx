import { ActionFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

export const action:ActionFunction=async({request})=>{
    
}
//Aquí vamos a hacer todo el proceso de validación para que se haga la validación.

export default function Login(){

    return (
        <div className="login-container">
            <Form className="login-container__login-form">
                <Link to="/"><button className="login-container__login-form__button-exit">Atrás</button></Link>
                <h1 className="login-container__login-form__title">Iniciar sesión</h1>
                <input type="email" name="user_email" placeholder="Email"/><br/><br/>
                <input type="text" name="username" placeholder="Nombre de usuario"/><br/><br/>
                {/*<input type="password" placeholder="Contraseña"/><br/><br/>*/}
                <button className="login-container__login-form__button-submit">Iniciar sesión<span></span><span></span><span></span><span></span></button>
            </Form>
            {/*<h3 className="login-error" style={{display:showError?"block":"none"}}>Usuarios y/o contraseña no válidos.</h3>*/}
        </div>
    );
}
