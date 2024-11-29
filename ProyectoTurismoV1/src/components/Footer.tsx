export default function Footer() {
    const socialIcons = [
        { name: 'Facebook', url: 'https://facebook.com', imgSrc: '../../img/facebook.png' },
        { name: 'X (Twitter)', url: 'https://x.com', imgSrc: '../../img/x.png' },
        { name: 'YouTube', url: 'https://youtube.com', imgSrc: '../../img/yt.png' },
        { name: 'Instagram', url: 'https://instagram.com', imgSrc: '../../img/ig.png' },
    ];

    return (
        <footer className="footer">
            <div className="footer__social-icons">
                <p className="footer__social-title">Siguenos en:</p>
                <div className="footer__social-grid">
                    {socialIcons.map((icon, index) => (
                        <a
                            key={index}
                            href={icon.url}
                            className="footer__icon"
                            aria-label={icon.name}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src={icon.imgSrc}
                                alt={icon.name}
                                className="footer__icon-img"
                            />
                        </a>
                    ))}
                </div>
            </div>
            <div className="footer__branding">
                <img
                    src="../../img/TurismoEspaña.png"
                    alt="Turismo España"
                    className="footer__title-image"
                />
                <img
                    src="../../img/logo.jpeg"
                    alt="Logo de España"
                    className="footer__logo"
                />
                <p className="footer__rights">©TurismoEspaña Todos los derechos reservados</p>
            </div>
            <div className="footer__links">
                <a href="" className="footer__link">Contacto</a>
                <a href="" className="footer__link">Aviso Legal</a>
                <a href="" className="footer__link">Uso de la Información</a>
                <a href="" className="footer__link">Política de Cookies</a>
            </div>
        </footer>
    );
}
