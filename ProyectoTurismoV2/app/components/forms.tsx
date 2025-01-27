import classNames from "classnames";
import { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {}

export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return props.children ? (
    <p {...props} className={classNames("text-red-600 text-lg", className)} />
  ) : null;
}
//Es una función que crea un tipo de párrafo por defecto para los mensajes de error.

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export function ButtonSubmit({ children, ...props }: ButtonProps) {
  return (
    <button {...props} className="form-container__form__button-submit">
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

export function PrimaryButton({ className, isLoading, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(
        "text-white bg-red-400 hover:bg-red-400 ",
        isLoading ? "bg-red-100" : "",
        className
      )}
    />
  );
}

export function DeleteButton({ className, isLoading, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(
        "border-2 border-yellow-200 text-red-500",
        "hover:bg-yellow-200 hover:text-white",
        isLoading ? "border-yellow-500 text-red-600 " : "",
        className
      )}
    />
  );
}
