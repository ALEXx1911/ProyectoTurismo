
import Header from './components/Header'
import Slider from './components/Slider'

function App() {

  return (
    <>
    <head>
      <link rel="stylesheet" href="../css/style.css" />
      <link rel="stylesheet" href="../css/icon-font.css"/>
      <title>turismoMadrid</title>
    </head>
    <div className="main">
      <Header/>
    </div>
    <div className="container-slider">
      <Slider/>
    </div>
    {/*Aquí tiene que ir los componentes del proyecto*/}
    </>
  )
}

export default App
