import classNames from "classnames";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';

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

    /*useEffect(()=>{
        const intervalo = setInterval(moveToRight,5000);
        return () => clearInterval(intervalo);
    });*/
    //Se ha quitado el "[]" para que las fotos cambien cada 5 segundos permanentemente.

    return(
        <Swiper className={classNames(
            "w-full",
            "container-slider"
        )}
            modules={[Pagination,Autoplay,Navigation]}
            pagination={{
                clickable:true,
            }}
            autoplay={{
                delay:5000,
                disableOnInteraction:false,
            }}
            navigation={true}
            loop={true}
            lazyPreloadPrevNext={1}
            centeredSlides={true}
            slidesPerView={1}
            resizeObserver={false}
            >
            <SwiperSlide>
                <SliderItem imgUrl={imagenes[0]} titulo="Descubre España con Nosotros" subtitulo="Innumerables paisajes"></SliderItem>
            </SwiperSlide>
            <SwiperSlide>
                <SliderItem imgUrl={imagenes[1]} titulo="La esencia de la naturaleza" subtitulo="Biodiversidad única"></SliderItem>
            </SwiperSlide>
            <SwiperSlide>
                <SliderItem imgUrl={imagenes[2]} titulo="Vibrantes ciudades nocturnas" subtitulo="Actividad incluso de noche"></SliderItem>
            </SwiperSlide>
            <SwiperSlide>
                <SliderItem imgUrl={imagenes[3]} titulo="Paraíso frente al mar" subtitulo="Maravillosas playas"></SliderItem>
            </SwiperSlide>
            <SwiperSlide>
                <SliderItem imgUrl={imagenes[4]} titulo="Historia y cultura en cada paso" subtitulo="Explora sitios históricos"></SliderItem>
            </SwiperSlide>
        </Swiper>
    );
}
type SliderItemProps = {
    imgUrl : string,
    titulo: string,
    subtitulo:string,
}
function SliderItem({imgUrl,titulo,subtitulo}:SliderItemProps){
    return(
        <div className="w-full h-full overflow-hidden m-auto">
            <img src={imgUrl} alt="xd" className="w-full h-full object-cover"/>
            <div className={classNames("flex flex-col items-center absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2",
                "text-white text-center text-2xl font-semibold md:text-4xl"
            )}>
                <span className="text-base">{subtitulo}</span>
                <span className="mainTitle">{titulo}</span>
                <button className={classNames(
                    "text-xl w-32 h-12 mt-4 translate-y-0 bg-[rgba(0,0,0,0.35)]",
                    "hvr-sweep-to-top"
                )}>
                    Navegar
                </button>
            </div>
                
        </div>
    )
}