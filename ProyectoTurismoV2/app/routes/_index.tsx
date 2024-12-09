import Acordeon from "~/components/Acordeon";
import Slider from "~/components/Slider";
import Tocho from "~/components/Tocho";

export default function Index() {
  return (
    <div>
       <div className="container-slider">
          <Slider/>
       </div>
       <div className='Acordeon'>
          <Acordeon />
       </div>
       <div className="tocho" id="tocho-section">
          <Tocho/>
        </div>
    </div>
  );

}
//*Nota: Vamos a utilizar "NavLinks" para que la página no se recargue.
//Esta es la página principal.