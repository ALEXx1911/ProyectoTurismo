type SliderButtonProps={
    functionLeft : () => void;
    functionRight : () => void;
}
export default function SliderButton({functionLeft, functionRight}: SliderButtonProps){
    return(
        <>
        <div className="slider-btn button-left" onClick={functionLeft}>a</div>
        <div className="slider-btn button-right" onClick={functionRight}>b</div>
        </>
    );
}