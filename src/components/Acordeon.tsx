import React, { useState } from 'react';

interface AcordeonItem {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
}

const items: AcordeonItem[] = [
  {
    id: 1,
    imageUrl: '../../img/alhambra.jpg',
    title: 'Cultura Y Arte',
    description: "Cultura de España",
    buttonText: 'Mas Detalles',
  },
  {
    id: 2,
    imageUrl: '../../img/jamon.png',
    title: 'Gastronomía',
    description: 'La mejor gastronomía del mundo',
    buttonText: 'Mas Detalles',
  },
  {
    id: 3,
    imageUrl: '../../img/playa.jpg',
    title: 'Playas Y Costas',
    description: 'Playas y costas para veranear',
    buttonText: 'Mas Detalles',
  },
];

const Acordeon: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const handleMouseEnter = (index: number) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleButtonClick = () => {
    // Navegar a la ruta principal con el ancla '#tocho-section'
  };

  return (
    <section className="acordeon">
      <div className="container">
        <h2 className="acordeon__headline">Descubre España</h2>
        <ul className="acordeon__list">
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`acordeon__item ${
                activeIndex === index ? 'acordeon__item--active' : ''
              }`}
              style={{ backgroundImage: `url(${item.imageUrl})` }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {activeIndex === index && (
                <div className="acordeon__content">
                  <h3
                    className="acordeon__title"
                    style={{
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '1.8rem',
                      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="acordeon__description"
                    style={{
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '1rem',
                      textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7)',
                    }}
                  >
                    {item.description}
                  </p>
                  <button
                    className="acordeon__button"
                    style={{
                      backgroundColor: '#d6001c',
                      color: 'white',
                      border: '2px solid #d6001c',
                      padding: '0.5rem 1rem',
                      fontSize: '1rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'yellow';
                      e.currentTarget.style.borderColor = 'yellow';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#d6001c';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#d6001c';
                    }}
                  >
                    {item.buttonText}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Acordeon;
