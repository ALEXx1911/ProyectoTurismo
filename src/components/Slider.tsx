import { useEffect, useState } from "react";
import SliderButton from "./Slider-Button";

export default function Slider(){
    const urlImg='../../img/';
    const imagenes: string []=[urlImg+'imgSlider1.jpg',urlImg+'imgSlider2.avif',urlImg+'imgSlider3.avif',urlImg+'imgSlider4.avif',urlImg+'imgSlider5.jpg'];
    const [selectedIndex, setSelectedIndex]= useState(0);

    function moveToRight(){
        const nextIndex= selectedIndex >= imagenes.length-1 ? 0 : selectedIndex+1;
        setSelectedIndex(nextIndex);
    }

    function moveToLeft(){
        const nextIndex= selectedIndex <= 0 ? imagenes.length-1 : selectedIndex-1;
        setSelectedIndex(nextIndex);
    }
    useEffect(()=>{
        const intervalo = setInterval(moveToRight,5000);
        return () => clearInterval(intervalo);
    });

    return(
        <>
        <div className="container-slider__carousel">
            <section className="item-slider item-slider-1">
                <img src={imagenes[selectedIndex]} alt="xd" className="item-slider__image"/>
                <div className="infoItem">
                <span className="subtitle">Lo mejor de lo mejor</span>
                <span className="mainTitle">Descubre España con Nosotros</span>
                <button className="botonItem"><a href="#" className="linkItem">Conocerlo ahora</a></button>
                </div>
            </section>
        </div>
        <SliderButton functionLeft={moveToLeft} functionRight={moveToRight}/>
        </>
    );
}