type SliderButtonProps={
    functionLeft : () => void;
    functionRight : () => void;
}
export default function SliderButton({functionLeft, functionRight}: SliderButtonProps){
    return(
        <>
        <div className="slider-btn button-left" onClick={functionLeft}>{"<"}</div>
        <div className="slider-btn button-right" onClick={functionRight}>{">"}</div>
        </>
    );
}