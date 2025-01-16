import classNames from "classnames";
import { text } from "node:stream/consumers";
import React, { HTMLAttributes, ReactNode } from "react";
import type { ButtonHTMLAttributes } from "react";
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
  className?: string;
  name?: string;
};

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
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

export function DeleteButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(
        "border-2 border-yellow-200 text-red-500",
        "hover:bg-yellow-200 hover:text-white",
        className
      )}
    />
  );
}
