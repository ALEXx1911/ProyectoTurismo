// Tocho.tsx
import React from "react";
import TochoSection from "./TochoSection.tsx";

export default function Tocho() {
    const urlImg: string = '../../img/';
    return (
        <div className="tocho">
            <TochoSection
                title="First featurette heading. It’ll blow your mind."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
                imageUrl={ urlImg+'Palacio-Real-de-Madrid.jpeg'}
            />
            <TochoSection
                title="Oh yeah, it’s that good. See for yourself."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
                imageUrl={ urlImg+'Palacio-Real-de-Madrid.jpeg'}
                reverse={true} // Aquí invertimos el orden de la imagen y el texto
            />
            <TochoSection
                title="And lastly, this one. Checkmate."
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
                imageUrl={ urlImg+'Palacio-Real-de-Madrid.jpeg'}
            />
        </div>
    );
}
