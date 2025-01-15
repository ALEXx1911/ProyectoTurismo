import classNames from "classnames";
import React, { HTMLAttributes, ReactNode } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames("text-red-600 text-lg", className)} />
  ) : null;
}
//Es una función que crea un tipo de párrafo por defecto para los mensajes de error.

type ButtonSubmitProps = {
  children: ReactNode;
};

export function ButtonSubmit({ children }: ButtonSubmitProps) {
  return (
    <button className="form-container__form__button-submit">
      {children}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}
//Se hace un componente del botón de enviar los formularios.

//Una funcion de botton para enviar form, se usara para crear provincias
type ButtonProps = {
  children: React.ReactNode;
  className?: String;
};

export function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex px-3 py-2 rounded-md justify-center",
        className
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(
        "text-white bg-red-400 hover:bg-red-400 ",
        className
      )}
    />
  );
}
