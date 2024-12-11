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
  //const [showMenu, setShowMenu] = useState(false);
  const navigation=useNavigation();
  const isLoading=navigation.state=="loading";
  console.log(navigation.state);
//const [showLogin,setShowLogin]=useState(false);
/*function handleClickProfileBox() {
  showMenu ? setShowMenu(false) : setShowMenu(true);
}*/
  return (
    <div className="app-container">
      <div className="app-container__app">
        <Header />
        <Outlet />
        <Footer/>
      </div>
      {isLoading ?
        <div className="app-container__profile-box__bull-gif-container">
          <img className="app-container__profile-box__bull-gif-container__bull-gif" src="../../img/torocorriendo.gif" 
          alt="" />
        </div>:""}
        {/*Se va a ver un GIF de un toro corriendo cuando se esté cargando algo. */}
      <ProfileBox
          image="../../img/imagen-perfil-default.jpg"
          username="No Login"
      />
    </div>
  );
}
//El "Header" y el "Footer" siempre se van a mostrar. También se mostrará el GIF del toro siempre y cuando se esté cargando algo.



