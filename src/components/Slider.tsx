import { useState } from "react";
import SliderButton from "./Slider-Button";

export default function Slider(){
    const urlImg='../../img/';
    const imagenes: string []=[urlImg+'Palacio-Real-de-Madrid.jpeg',urlImg+'Real-Alcaraz-de-Sevilla.jpeg'];
    const [selectedIndex, setSelectedIndex]= useState(0);
    return(
        <>
        <section className="slider-carousel">
        <section className="item-list">
            <img src={imagenes[selectedIndex]} alt="xd" className="img-ite"/>
        </section>
        </section>
        <SliderButton />
        </>
    );
}