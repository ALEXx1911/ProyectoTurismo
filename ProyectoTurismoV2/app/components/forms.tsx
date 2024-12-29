import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement>{};

export function ErrorMessage({className,...props}:ErrorMessageProps){
    return props.children ? (
        <p {...props} className={classNames("text-red-600 text-lg",className)}/>
    ): null;
}
//Es una función que crea un tipo de párrafo por defecto para los mensajes de error.

type ButtonSubmitProps={
    children:ReactNode;
}

export function ButtonSubmit({children}:ButtonSubmitProps){
    return (
    <button className="form-container__form__button-submit">
        {children}<span></span><span></span><span></span><span></span>
    </button>);
}
//Se hace un componente del botón de enviar los formularios.