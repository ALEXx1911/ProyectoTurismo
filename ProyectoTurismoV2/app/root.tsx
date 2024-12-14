import {
  Links,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

//import "./tailwind.css";
//import "../css/style.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProfileBox from "./components/ProfileBox";
import Menu from "./components/Menu";
import { useState } from "react";

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

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const navigation=useNavigation();
  const isLoading=navigation.state=="loading";
//const [showLogin,setShowLogin]=useState(false);
/*function handleClickProfileBox() {
  showMenu ? setShowMenu(false) : setShowMenu(true);
}*/

return (
    <>
       {isLoading ?
        <div className="bull-gif-container">
          <img className="bull-gif-container__bull-gif" src="../../img/torocorriendo.gif" 
          alt="" />
        </div>:""}
        {/*Se va a ver un GIF de un toro corriendo cuando se esté cargando algo. */}

        <Header />
        {!showMenu && <Menu/>}
        <Outlet />
        <Footer/>
    </>
  );
}
//El "Header", el "Footer" y el "ProfileBox" siempre se van a mostrar. También se mostrará el GIF del toro siempre y cuando se esté cargando algo.



