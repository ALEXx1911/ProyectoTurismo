
import { useState,createContext } from 'react';
import Header from './components/Header'
import Slider from './components/Slider'
import Login from './components/Login';



type AppContext={
  username:string;
  showLogin:boolean;
  setShowLogin:(x:boolean)=>void;
}

export const AppContext=createContext<AppContext>({
  username:"No login",
  showLogin:false,
  setShowLogin:()=>{},
});
function App() {
  const [username,setUsername]=useState("No login");
  const [showLogin,setShowLogin]=useState(false);
  //Variable para controlar el estado de visibilidad de "Login".
  function handleLoginSuccess(user:string){
    setUsername(user);
    setShowLogin(false);
}
//Esta función sirve para actualizar el valor del "username" y ocultar el formulario del login
//cuando ya lo has enviado.

  return (
    <AppContext.Provider value={{username,showLogin,setShowLogin}}>
      <>
        <head>
        <link rel="stylesheet" href="../css/style.css" />
        <link rel="stylesheet" href="../css/icon-font.css"/>
        <title>turismoMadrid</title>
      </head>
      {/*Cuando el CSS se termine, se borra el "head" */}
      
      <Login active={showLogin} setActive={setShowLogin} handleLoginSuccess={handleLoginSuccess}/>
        {/*El "Login" solo se muestra cuando "showLogin" sea true.
        Para cambiar el nombre de usuario utilizamos la función "handleLoginSuccess"*/}

      <div className="main" style={{opacity:showLogin?0.3:1}}>
        <Header/>
        <div className="container-slider">
          <Slider/>
        </div>
           {/*Aquí tiene que ir los componentes del proyecto*/}
      </div>
    
    </>
    </AppContext.Provider>
  )
}

export default App