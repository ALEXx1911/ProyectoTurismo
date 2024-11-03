type SliderButtonProps={
    functionLeft : () => void;
    functionRight : () => void;
}
export default function SliderButton({functionLeft, functionRight}: SliderButtonProps){
    return(
        <>
        <div className="btn-left" onClick={functionLeft}>a</div>
        <div className="btn-right" onClick={functionRight}>b</div>
        </>
    );
}