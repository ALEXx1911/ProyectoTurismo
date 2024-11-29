// Tocho.tsx
import TochoSection from "./TochoSection.tsx";

export default function Tocho() {
    const urlImg: string = '../../img/';
    return (
        <div className="tocho">
            <TochoSection
                title="Evoluciona tu paladar: Un viaje por los sabores de España"
                text="La gastronomía española es un festín para los sentidos. Desde los aromas inconfundibles del azafrán en la paella valenciana hasta la explosión de sabores de unas tapas bien servidas, cada rincón del país cuenta una historia a través de sus platos. España es tierra de mercados vibrantes, bodegas ancestrales y cocinas de vanguardia que han conquistado el mundo. Aquí, tradición e innovación se entrelazan para deleitar al viajero con una experiencia culinaria única. Prepara tu paladar para una aventura inolvidable entre texturas, colores y sabores que solo España puede ofrecer."
                imageUrl={ urlImg+'tapas.jpg'}
            />
            <TochoSection
                title="Latidos del arte y la cultura: España, musa de generaciones"
                text="En España, cada rincón cuenta historias que trascienden siglos, desde las pinturas rupestres de Altamira hasta los modernos trazos de Picasso. Es un país donde la arquitectura es poesía en piedra, como lo demuestran la Alhambra o la Sagrada Familia. La música, desde el flamenco apasionado hasta las zarzuelas, vibra en el corazón de su gente. Las tradiciones, festivales y costumbres pintan un mosaico cultural rico y diverso, invitándote a descubrir un legado que sigue vivo en cada gesto, danza y obra de arte."
                imageUrl={ urlImg+'flamenco.jpg'}
                reverse={true} // Aquí invertimos el orden de la imagen y el texto
            />
            <TochoSection
                title="Horizontes de sol y sal: La magia de las costas españolas"
                text="España es sinónimo de playas de ensueño y costas llenas de vida. Desde las calas escondidas del Mediterráneo hasta las interminables playas doradas del Atlántico, cada costa tiene su propio encanto. Descubre la brisa salada que acaricia la Costa Brava, el ritmo vibrante de las Baleares o la serenidad de las Rías Gallegas. Sumérgete en aguas cristalinas, pasea por pintorescos pueblos costeros y siente cómo el sol y el mar se convierten en parte de ti. En España, las costas no son solo destinos; son puertas hacia la felicidad."
                imageUrl={ urlImg+'costa.jpg'}
            />
        </div>
    );
}
