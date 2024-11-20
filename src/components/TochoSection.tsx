// TochoSection.tsx

interface TochoSectionProps {
    title: string;
    text: string;
    imageUrl: string;
    reverse?: boolean; // Para invertir el orden de la imagen y el texto si es necesario
}

export default function TochoSection({ title, text, imageUrl, reverse = false }: TochoSectionProps) {
    return (
        <div className={`tocho-section ${reverse ? "tocho-section--reverse" : ""}`}>
            <div className="tocho-section__text">
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className="tocho-section__image">
                <img src={imageUrl} alt="Section illustration" />
            </div>
        </div>
    );
}
