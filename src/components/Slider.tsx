import { useState } from "react";
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

    return(
        <>
        <section className="slider-carousel">
        <section className="item-list">
            <img src={imagenes[selectedIndex]} alt="xd" className="img-ite"/>
        </section>
        </section>
        <SliderButton functionLeft={moveToLeft} functionRight={moveToRight}/>
        </>
    );
}