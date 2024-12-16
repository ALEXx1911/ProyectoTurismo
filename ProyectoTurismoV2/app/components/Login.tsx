import { Form } from "@remix-run/react";
import { Link } from "react-router-dom";

export default function Login(){

        return (
            <div className="login-container">
                <Form className="login-container__login-form">
                <button className="login-container__login-form__button-exit"><Link to="/">Atrás</Link></button>
                    <h1 className="login-container__login-form__title">Iniciar sesión</h1>
                    <input type="text" placeholder="Usuario"/><br/><br/>
                    <input type="password" placeholder="Contraseña"/><br/><br/>
                    <button className="login-container__login-form__button-submit">Iniciar sesión<span></span><span></span><span></span><span></span></button>
                </Form>
                {/*<h3 className="login-error" style={{display:showError?"block":"none"}}>Usuarios y/o contraseña no válidos.</h3>*/}
            </div>
        );
   }
   //Solo se muestra el formulario de Login cuando "active" es "true"