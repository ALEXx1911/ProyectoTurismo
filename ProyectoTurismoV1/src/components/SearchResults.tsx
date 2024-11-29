import { useParams, useNavigate } from "react-router-dom";
import { provincias } from "./provincias"; 
import Header from "./Header"; 
import Footer from "./Footer";

const SearchResults = () => {
  const { provincia } = useParams(); // Obtener el parámetro de la provincia de la URL
  const navigate = useNavigate(); // Hook para navegar a la página principal

  // Verificar si la provincia existe en los datos
  const provinciaData = provincia ? provincias[provincia.toLowerCase()] : null;

  // Función para manejar la redirección a la página principal
  const handleGoBack = () => {
    navigate("/"); // Redirige a la página principal
  };

  return (
    <div className="search-result">
      <Header /> {/* Incluir el Header en la página de resultados */}
  
      <div className="search-result__content">
        {/* Botón para volver a la página principal */}
        <button className="back-button" onClick={handleGoBack}>
          Volver
        </button>
  
        {provinciaData ? (
          <div>
            <img src={provinciaData.imagen} alt={provinciaData.nombre} />
            <h2>{provinciaData.nombre}</h2>
            <p>{provinciaData.descripcion}</p>
            <p><strong>Clima:</strong> {provinciaData.clima}</p>
            <p><strong>Lugares recomendados:</strong> {provinciaData.lugares.join(", ")}</p>
            <p><strong>Comida típica:</strong> {provinciaData.comida_tipica.join(", ")}</p>
            <p><strong>Festividades:</strong> {provinciaData.festividades.join(", ")}</p>
          </div>
        ) : (
          <p>No se ha encontrado la provincia.</p>
        )}
      </div>
      <Footer />
    </div>
  );
  
};

export default SearchResults;
