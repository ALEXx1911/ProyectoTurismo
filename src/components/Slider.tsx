import { useEffect, useState } from "react";
import SliderButton from "./Slider-Button";

export default function Slider(){
    const urlImg='../../img/';
    const imagenes: string []=[urlImg+'Palacio-Real-de-Madrid.jpeg',urlImg+'Real-Alcaraz-de-Sevilla.jpeg'];
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
            </section>
            <section className="item-slider item-slider-2">
                <img src={imagenes[selectedIndex]} alt="xd" className="item-slider__image"/>
            </section>
            <section className="item-slider item-slider-3">
                <img src={imagenes[selectedIndex]} alt="xd" className="item-slider__image"/>
            </section>
        </div>
        <SliderButton functionLeft={moveToLeft} functionRight={moveToRight}/>
        </>
    );
}