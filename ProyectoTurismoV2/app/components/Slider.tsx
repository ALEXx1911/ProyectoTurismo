import { useEffect, useState } from "react";

export default function Slider(){
    const urlImg='../../img/';
    const imagenes: string []=[urlImg+'imgSlider1.jpg',urlImg+'imgSlider2.avif',urlImg+'imgSlider3.avif',urlImg+'imgSlider4.avif',urlImg+'imgSlider5.jpg'];
    const [selectedIndex, setSelectedIndex]= useState(0);

    function moveToRight(){
        const nextIndex= selectedIndex >= imagenes.length-1 ? 0 : selectedIndex+1;
        setSelectedIndex(nextIndex);
    }

    /*function moveToLeft(){
        const nextIndex= selectedIndex <= 0 ? imagenes.length-1 : selectedIndex-1;
        setSelectedIndex(nextIndex);
    }*/
   //Comento la función porque no se está usando. No se borra el código por si fuera útil después.

    function handleClick(indice:number){
        setSelectedIndex(indice);
    }

    useEffect(()=>{
        const intervalo = setInterval(moveToRight,5000);
        return () => clearInterval(intervalo);
    });
    //Se ha quitado el "[]" para que las fotos cambien cada 5 segundos permanentemente.

    return(
        <>
        <div className="container-slider__carousel">
            <section className="item-slider item-slider-1">
                <img src={imagenes[selectedIndex]} alt={imagenes[selectedIndex]} className="item-slider__image"/>
                <div className="infoItem">
                    <span className="subtitle">Innumerables paisajes</span>
                    <span className="mainTitle">Descubre España con Nosotros</span>
                    <button className="botonItem hvr-sweep-to-top"><a href="#" className="linkItem">Conócelos ahora</a></button>
                </div>
            </section>
            <div className="puntos-container">
                {imagenes.map((_,index)=>
                    <div key={index} className={`punto-item punto-item${index===selectedIndex ? '-active':''}`} onClick={() => handleClick(index)}>
                        <svg fill="currentColor" width="15px" height="15px" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="127" cy="129" r="81" fillRule="evenodd"></circle> </g></svg>
                    </div>
                )}
            </div>
        </div>
        
        </>
    );
}