import classNames from "classnames";
import { HTMLAttributes } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement>{};

export function ErrorMessage({className,...props}:ErrorMessageProps){
    return props.children ? (
        <p {...props} className={classNames("text-red-600 text-lg",className)}/>
    ): null;
}
//Es una función que crea un tipo de párrafo por defecto para los mensajes de error.