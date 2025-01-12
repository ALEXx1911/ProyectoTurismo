import {
  json,
  Link,
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { LoaderFunction } from "react-router-dom";
import { getCurrentUser } from "./utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "TurismoEspaña" },
    { name: "description", content: "" },
  ];
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "../css/style.css",
  },
  {
    rel:"shortcut icon",
    href:"../img/image-favicon.png",
    type:"image/x-icon"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export const loader:LoaderFunction=async({request})=>{
  const user= await getCurrentUser(request);
  if(user==null){
    return json({
      isUserLogged:false
    });
  }
  return json({
    isUserLogged:true,
    username:user.name,
    profile_image:user.imageUrl
  });
}
//Controlamos que el usuario tenga la sesión iniciada con "isUserLogged", cuyo valor cambia según
//el usuario tenga o no la sesión iniciada. Si el usuario está logueado, se devuelve también su 
//nombre de usuario y la URL de su imagen de perfil.
export default function App() {
  const navigation=useNavigation();
  const isLoading=navigation.state=="loading";
  const loaderData=useLoaderData<typeof loader>();
  const username=loaderData?.username;
  //Sacamos el "username" del "loader".
  const profileImage=loaderData?.profile_image;
  //Sacamos la imagen de perfil del usuario del "loader" si es que existe.
  const userIsLogged=loaderData.isUserLogged;
  //Sacamos el valor de "isUserLogged" del "loader".
  return (
    <>
       {isLoading ?
        <div className="bull-gif-container">
          <img className="bull-gif-container__bull-gif" src="../../img/torocorriendo.gif" 
          alt=""/>
        </div>:null}
        {/*Se va a ver un GIF de un toro corriendo cuando se esté cargando algo.*/}
        <Header username={username} profileImage={profileImage} isUserLogged={userIsLogged}/>
        <Outlet />
        <Footer/>
    </>
  );
}
//El "Header" y el "Footer" siempre se van a mostrar. También se mostrará el GIF del toro siempre y 
//cuando se esté cargando algo.

export function ErrorBoundary(){
  const error=useRouteError();
  return(
    <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <Meta/>
      <Links/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Vaya...</title>
    </head>
    <body className="h-4/5">
      <div className="p-4">
        <h1 className="text-2xl font-mono my-4">Vaya...</h1>
        <p className="font-light">Si estás viendo esta página es porque se ha producido un error inesperado.</p>
        {error instanceof Error?(
          <p className="my-4 font-bold">{error.message}</p>
        ):null}
        <Link to="/">Volver a la página principal</Link>
      </div>
    </body> 
    </html>
  );
}
//Función para el control de los errores.
