import { useState, createContext } from 'react';
import Header from './components/Header';
import Slider from './components/Slider';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchResults from './components/SearchResults'; // Ruta para los resultados de búsqueda
import Tocho from "./components/Tocho";

// Definición del contexto
type AppContext = {
  username: string;
  showLogin: boolean;
  setShowLogin: (x: boolean) => void;
};

export const AppContext = createContext<AppContext>({
  username: "No login",
  showLogin: false,
  setShowLogin: () => {},
});

function App() {
  const [username, setUsername] = useState("No login");
  const [showLogin, setShowLogin] = useState(false);

  // Función para manejar el inicio de sesión
  function handleLoginSuccess(user: string) {
    setUsername(user);
    setShowLogin(false);
  }

  return (
    <AppContext.Provider value={{ username, showLogin, setShowLogin }}>
      <Router>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={
            <>
              <head>
                <link rel="stylesheet" href="../css/style.css" />
                <link rel="stylesheet" href="../css/icon-font.css" />
                <title>turismoMadrid</title>
              </head>
              
              {/* Login solo se muestra cuando "showLogin" es true */}
              <Login active={showLogin} setActive={setShowLogin} handleLoginSuccess={handleLoginSuccess} />
              
              <div className="main" style={{ opacity: showLogin ? 0.3 : 1 }}>
                {/* El Header siempre se muestra en la página principal */}
                <Header />
                <div className="container-slider">
                  <Slider />
                </div>
                <div className="tocho">
                  <Tocho />
                </div>
              </div>
            </>
          } />
          
          {/* Ruta para la página de resultados de búsqueda */}
          <Route path="/search" element={<SearchResults />} />
          
          {/* Ruta dinámica para los detalles de la provincia */}
          <Route path="/search/:provincia" element={<SearchResults />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
