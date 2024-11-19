export default function Footer() {
    const socialIcons = [
        { name: 'Facebook', url: 'https://facebook.com', imgSrc: '../../img/facebook-icon.png' },
        { name: 'X (Twitter)', url: 'https://x.com', imgSrc: '../../img/x-icon.png' },
        { name: 'YouTube', url: 'https://youtube.com', imgSrc: '../../img/youtube-icon.png' },
        { name: 'Instagram', url: 'https://instagram.com', imgSrc: '../../img/instagram-icon.png' },
        { name: 'TikTok', url: 'https://tiktok.com', imgSrc: '../../img/tiktok-icon.png' },
    ];

    return (
        <footer className="footer">
            <div className="footer__social-icons">
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
            <div className="footer__branding">
                <h1 className="footer__title">Turismo<span>España</span></h1>
                <img
                    src="../../img/España-logo.png"
                    alt="Logo de España"
                    className="footer__logo"
                />
                <p className="footer__rights">Todos los derechos reservados</p>
            </div>
            <div className="footer__links">
                <a href="/contacto" className="footer__link">Contacto</a>
                <a href="/conocenos" className="footer__link">Conócenos</a>
                <a href="/aviso-legal" className="footer__link">Aviso Legal</a>
                <a href="/uso-informacion" className="footer__link">Uso de la Información</a>
                <a href="/politica-cookies" className="footer__link">Política de Cookies</a>
            </div>
        </footer>
    );
}
