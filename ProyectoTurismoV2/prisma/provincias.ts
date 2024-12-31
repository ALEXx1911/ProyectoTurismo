import db from "~/db.server"

export function createProvinces(){
    return db.provinces.createMany({
    data:[
      {
        name: 'Álava',
        description: 'Provincia del País Vasco conocida por su rica historia y la belleza de su capital, Vitoria-Gasteiz.',
        imageUrl: '/images/alava.jpg',
        climate: 'Clima oceánico, con temperaturas suaves y lluvias durante todo el año.',
        beaches: "",
        recommendedPlaces:"Catedral de Santa María,Anillo Verde de Vitoria,Museo de Bellas Artes",
        typicalFood: "Marmitako, Txistorra, Perretxikos",
        festivities: "Fiestas de la Virgen Blanca (agosto), Semana Santa",
        ccaaName:"País-Vasco"
      },
      {
        name: "Albacete",
        description: "Provincia de Castilla-La Mancha famosa por su cuchillería y fiestas populares.",
        imageUrl: "/images/albacete.jpg",
        climate: "Clima continental, con veranos cálidos e inviernos fríos.",
        beaches: "",
        recommendedPlaces: "Catedral de San Juan Bautista, Pasaje de Lodares, Museo de la Cuchillería",
        typicalFood: "Gazpachos manchegos, Atascaburras, Miguelitos de La Roda",
        festivities: "Feria de Albacete (septiembre), Semana Santa",
        ccaaName:"Castilla-la-Mancha",
      },
      {
        name: "Alicante",
        description: "Provincia de la Comunidad Valenciana con famosas costas y ciudades como Benidorm y Calpe.",
        imageUrl: "/images/alicante.jpg",
        climate: "Clima mediterráneo, con veranos calurosos e inviernos suaves.",
        beaches: "costa de San Juan, costa del Postiguet, costa de Levante",
        recommendedPlaces: "Castillo de Santa Bárbara, Isla de Tabarca, Explanada de España",
        typicalFood: "Paella, Arroz a banda, Turrón de Jijona",
        festivities: "Hogueras de San Juan (junio), Moros y Cristianos",
        ccaaName:"Comunidad-Valenciana",
      },
      {
        name: "Almería",
        description: "Provincia andaluza conocida por sus costas, su desierto y su Alcazaba.",
        imageUrl: "/images/almeria.jpg",
        climate: "Clima semiárido, con veranos calurosos e inviernos suaves.",
        beaches: "costa de los Genoveses, costa de Mónsul, costa de las Negras",
        recommendedPlaces: "Cabo de Gata, Alcazaba de Almería, Mini Hollywood en el desierto de Tabernas",
        typicalFood: "Ajoblanco, Gurullos, Cherigan",
        festivities: "Semana Santa, Feria de Almería (agosto)",
        ccaaName:"Andalucía",
      },
      {
        name: "Ávila",
        description: "Provincia de Castilla y León famosa por sus murallas medievales y la arquitectura gótica.",
        imageUrl: "/images/avila.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Murallas de Ávila, Catedral de Ávila, Basílica de San Vicente",
        typicalFood: "Chuletón de Ávila, Yemas de Santa Teresa, Judías de El Barco",
        festivities: "Semana Santa, Fiestas de Santa Teresa (octubre)",
        ccaaName:"Castilla-León",
      },
      {
        name: "Badajoz",
        description: "Provincia de Extremadura con una rica herencia histórica y cultural.",
        imageUrl: "/images/badajoz.jpg",
        climate: "Clima mediterráneo continental, con veranos calurosos e inviernos suaves.",
        beaches: "",
        recommendedPlaces: "Alcazaba de Badajoz, Puente de Palmas, Plaza Alta",
        typicalFood: "Migas extremeñas, Cordero a la caldereta, Jamón ibérico de Dehesa de Extremadura",
        festivities: "Carnaval de Badajoz (febrero), Semana Santa",
        ccaaName:"Extremadura",
      },
      {
        name: "Islas Baleares",
        description: "Conjunto de islas mediterráneas conocidas por sus costas y su ambiente festivo.",
        imageUrl: "/images/baleares.jpg",
        climate: "Clima mediterráneo, con inviernos suaves y veranos calurosos.",
        beaches: "Cala Comte, Cala Macarella, Es Trenc",
        recommendedPlaces: "Catedral de Palma, Dalt Vila en Ibiza, Cuevas del Drach en Mallorca",
        typicalFood: "Sobrasada, Ensaimada, Caldereta de langosta",
        festivities: "Fiestas de Sant Joan (junio), Semana Santa",
        ccaaName:"Islas-Baleares",
      },
      {
        name: "Barcelona",
        description: "Provincia en la costa mediterránea de Cataluña, famosa por su arquitectura modernista y costas.",
        imageUrl: "/images/barcelona.jpg",
        climate: "Clima mediterráneo, con inviernos suaves y veranos cálidos.",
        beaches: "costa de la Barceloneta, costa de Ocata, costa de Castelldefels",
        recommendedPlaces: "Sagrada Familia, Parque Güell, Casa Batlló, Las Ramblas, Montjuïc",
        typicalFood: "Pa amb tomàquet, Escudella i carn d’olla, Butifarra con mongetes",
        festivities: "La Mercè (24 de septiembre), Sant Jordi (23 de abril), Festa Major de Gràcia (agosto)",
        ccaaName:"Cataluña",
      },
      {
        name: "Burgos",
        description: "Provincia de Castilla y León con una gran herencia histórica y paisajes naturales.",
        imageUrl: "/images/burgos.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Catedral de Burgos, Monasterio de las Huelgas, Cartuja de Miraflores, Museo de la Evolución Humana",
        typicalFood: "Morcilla de Burgos, Olla podrida, Queso de Burgos",
        festivities: "Fiestas de San Pedro y San Pablo (junio), Fiestas de San Lesmes (enero)",
        ccaaName:"Castilla-León",
      },
      {
        name: "Cádiz",
        description: "Provincia de Andalucía conocida por sus costas, carnavales y pueblos blancos.",
        imageUrl: "/images/cadiz.jpg",
        climate: "Clima mediterráneo oceánico, con veranos cálidos y suaves inviernos.",
        beaches: "costa de la Victoria, costa de Zahara de los Atunes, costa de Bolonia",
        recommendedPlaces: "Catedral de Cádiz, costa de la Caleta, Castillo de San Sebastián, Parque Natural de Doñana",
        typicalFood: "Pescaito frito, Tortillitas de camarones, Gazpacho andaluz",
        festivities: "Carnaval de Cádiz (febrero), Semana Santa, Romería del Rocío",
        ccaaName:"Andalucía",
      },
      {
        name: "Cantabria",
        description: "Región del norte de España conocida por sus paisajes verdes, costas y cuevas prehistóricas.",
        imageUrl: "/images/cantabria.jpg",
        climate: "Clima oceánico, con temperaturas moderadas y abundantes lluvias.",
        beaches: "costa de El Sardinero, costa de Oyambre, costa de Comillas",
        recommendedPlaces: "Parque Nacional de los Picos de Europa, Cueva de Altamira, Santillana del Mar, Palacio de la Magdalena",
        typicalFood: "Cocido montañés, Rabas, Sobaos y quesadas",
        festivities: "Semana Grande de Santander (julio), La Vijanera (enero), Día de Cantabria (agosto)",
        ccaaName:"Cantabria",
      },
      {
        name: "Castellón",
        description: "Provincia de la Comunidad Valenciana, famosa por sus costas, montañas y cerámica.",
        imageUrl: "/images/castellon.jpg",
        climate: "Clima mediterráneo, con veranos cálidos e inviernos suaves.",
        beaches: "costa Norte de Peñíscola, costa de Benicàssim, costa del Pinar",
        recommendedPlaces: "Peñíscola, Desierto de las Palmas, Basílica de la Mare de Déu del Lledó, Castillo de Morella",
        typicalFood: "Paella valenciana, Arroz al horno, Fideuà",
        festivities: "Fallas (marzo), Fiestas de la Magdalena (marzo), Sant Antoni (enero)",
        ccaaName: "Comunidad-Valenciana",
      },
      {
        name: "Ciudad Real",
        description: "Provincia en Castilla-La Mancha conocida por sus castillos y por ser la tierra de Don Quijote.",
        imageUrl: "/images/ciudadReal.jpg",
        climate: "Clima continental, con inviernos fríos y veranos calurosos.",
        beaches: "",
        recommendedPlaces: "Parque Nacional de Las Tablas de Daimiel, Castillo de Calatrava la Nueva, Catedral de Ciudad Real",
        typicalFood: "Gachas manchegas, Duelos y quebrantos, Migas",
        festivities: "Semana Santa, Fiestas de la Pandorga (julio), Fiesta de San Isidro (mayo)",
        ccaaName: "Castilla-La-Mancha",
      },
      {
        name: "Córdoba",
        description: "Provincia de Andalucía famosa por su Mezquita-Catedral y su histórico casco antiguo.",
        imageUrl: "/images/cordoba.jpg",
        climate: "Clima mediterráneo, con veranos muy calurosos y inviernos suaves.",
        beaches: "",
        recommendedPlaces: "Mezquita-Catedral de Córdoba, Alcázar de los Reyes Cristianos, Patios de Córdoba",
        typicalFood: "Salmorejo, Flamenquín, Rabo de toro",
        festivities: "Festival de los Patios (mayo), Cruces de Mayo, Feria de Córdoba",
        ccaaName: "Andalucía",
      },
      {
        name: "Cuenca",
        description: "Provincia de Castilla-La Mancha conocida por sus famosas Casas Colgadas y la Ciudad Encantada.",
        imageUrl: "/images/cuenca.jpg",
        climate: "Clima mediterráneo continental, con inviernos fríos y veranos templados.",
        beaches: "",
        recommendedPlaces: "Casas Colgadas de Cuenca, Ciudad Encantada, Catedral de Cuenca",
        typicalFood: "Morteruelo, Zarajos, Ajoarriero",
        festivities: "Semana Santa, San Mateo (septiembre), Fiestas de San Julián (agosto)",
        ccaaName: "Castilla-La-Mancha",
      },
      {
        name: "Gerona",
        description: "Provincia de Cataluña con preciosas costas, historia medieval y bellos paisajes.",
        imageUrl: "/images/gerona.jpg",
        climate: "Clima mediterráneo, con inviernos suaves y veranos cálidos.",
        beaches: "Cala Sa Boadella, costa de Aiguablava, costa de Tamariu",
        recommendedPlaces: "Barri Vell de Girona, Catedral de Girona, Murallas de Girona, Call Jueu",
        typicalFood: "Escudella, Butifarra, Suquet de peix",
        festivities: "Temps de Flors (mayo), Fiesta Mayor de Sant Narcís, Semana Santa",
        ccaaName: "Cataluña",
      },
      {
        name: "Granada",
        description: "Provincia andaluza famosa por la Alhambra y sus paisajes de montaña y costa.",
        imageUrl: "/images/granada.jpg",
        climate: "Clima mediterráneo con influencia continental, veranos cálidos e inviernos fríos en la sierra.",
        beaches: "costa de la Herradura, costa de Salobreña, costa de Almuñécar",
        recommendedPlaces: "Alhambra, Generalife, Sierra Nevada, Albaicín",
        typicalFood: "Tortilla del Sacromonte, Gazpacho andaluz, Remojón granadino",
        festivities: "Semana Santa, Fiesta de la Cruz (mayo), Corpus Christi",
        ccaaName: "Andalucía",
    },
    {
        name: "Guadalajara",
        description: "Provincia de Castilla-La Mancha con castillos medievales y entornos naturales espectaculares.",
        imageUrl: "/images/guadalajara.jpg",
        climate: "Clima mediterráneo continental, con inviernos fríos y veranos cálidos.",
        beaches: "",
        recommendedPlaces: "Castillo de Sigüenza, Palacio del Infantado, Parque Natural del Alto Tajo",
        typicalFood: "Cabrito asado, Migas, Morteruelo",
        festivities: "Semana Santa, Fiestas de San Vicente (enero), Fiestas de Sigüenza (agosto)",
        ccaaName: "Castilla-La-Mancha",
    },
    {
        name: "Guipúzcoa",
        description: "Provincia del País Vasco famosa por su gastronomía, paisajes verdes y costas.",
        imageUrl: "/images/guipuzcoa.jpg",
        climate: "Clima oceánico, con temperaturas suaves y lluvias durante todo el año.",
        beaches: "costa de la Concha, costa de Ondarreta, costa de Zarautz",
        recommendedPlaces: "San Sebastián, Museo Chillida-Leku, Monte Igueldo, Peine del Viento",
        typicalFood: "Pintxos, Merluza a la koskera, Txuleta",
        festivities: "Tamborrada de San Sebastián (enero), Semana Grande (agosto), Aste Nagusia",
        ccaaName: "País-Vasco",
    },
    {
        name: "Huesca",
        description: "Provincia aragonesa conocida por los Pirineos y su rica herencia medieval.",
        imageUrl: "/images/huesca.jpg",
        climate: "Clima de montaña en el norte y mediterráneo en el sur, con inviernos fríos en zonas elevadas.",
        beaches: "",
        recommendedPlaces: "Parque Nacional de Ordesa y Monte Perdido, Catedral de Huesca, Castillo de Loarre",
        typicalFood: "Chiretas, Longaniza de Graus, Crespillos",
        festivities: "Fiestas de San Lorenzo (agosto), Feria de Otoño de Biescas, Carnaval de Bielsa",
        ccaaName: "Aragón",
    },
    {
        name: "Jaén",
        description: "Provincia andaluza famosa por sus olivares y el patrimonio renacentista de Úbeda y Baeza.",
        imageUrl: "/images/jaen.jpg",
        climate: "Clima mediterráneo continental, con inviernos frescos y veranos calurosos.",
        beaches: "",
        recommendedPlaces: "Catedral de Jaén, Castillo de Santa Catalina, Parque Natural de Cazorla",
        typicalFood: "Andrajos, Galianos, Ajoatao",
        festivities: "Romería de la Virgen de la Cabeza (abril), Semana Santa, Fiestas de San Lucas (octubre)",
        ccaaName: "Andalucía",
    },
    {
        name: "León",
        description: "Provincia de Castilla y León con una rica historia y arquitectura románica.",
        imageUrl: "/images/leon.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Catedral de León, Basílica de San Isidoro, Las Médulas, Astorga",
        typicalFood: "Cecina, Botillo, Cocido maragato",
        festivities: "Semana Santa, San Froilán (octubre), Fiestas de San Juan y San Pedro (junio)",
        ccaaName: "Castilla-León",
    },
    {
        name: "Lleida",
        description: "Provincia catalana de paisajes montañosos y sitios de interés medievales.",
        imageUrl: "/images/lleida.jpg",
        climate: "Clima mediterráneo continental, con inviernos fríos y veranos calurosos.",
        beaches: "",
        recommendedPlaces: "La Seu Vella, Vall de Boí, Parque Nacional de Aigüestortes",
        typicalFood: "Escudella, Caracoles a la llauna, Embotits",
        festivities: "Fiesta Mayor de Lleida (mayo), Feria de San Miguel (septiembre), Aplec del Cargol (mayo)",
        ccaaName: "Cataluña",
    },
    {
        name: "Lugo",
        description: "Provincia gallega con costa atlántica, montañas y la famosa muralla romana de Lugo.",
        imageUrl: "/images/lugo.jpg",
        climate: "Clima oceánico, con inviernos suaves y lluvias frecuentes.",
        beaches: "costa de las Catedrales, costa de Llas, costa de Peizás",
        recommendedPlaces: "Muralla romana de Lugo, Catedral de Lugo, costa de las Catedrales",
        typicalFood: "Pulpo a la gallega, Caldo gallego, Lacón con grelos",
        festivities: "Arde Lucus (junio), Festas de San Froilán (octubre), Semana Santa",
        ccaaName: "Galicia",
    },
    {
        name: "Madrid",
        description: "Comunidad de Madrid, capital de España, famosa por su vida cultural y monumental.",
        imageUrl: "/images/madrid.jpg",
        climate: "Clima mediterráneo continental, con veranos calurosos e inviernos frescos.",
        beaches: "",
        recommendedPlaces: "Museo del Prado, Palacio Real, Parque del Retiro, Plaza Mayor",
        typicalFood: "Cocido madrileño, Bocadillo de calamares, Churros con chocolate",
        festivities: "San Isidro (15 de mayo), La Paloma (agosto), Navidad en Madrid",
        ccaaName: "Madrid",
    },
    {
        name: "Málaga",
        description: "Provincia andaluza con costas, gastronomía mediterránea y una activa vida cultural.",
        imageUrl: "/images/malaga.jpg",
        climate: "Clima mediterráneo, con veranos calurosos e inviernos suaves.",
        beaches: "costa de la Malagueta, costa de Burriana, costa del Palo",
        recommendedPlaces: "Museo Picasso, Alcazaba de Málaga, Catedral de Málaga, Caminito del Rey",
        typicalFood: "Espetos de sardinas, Ajoblanco, Porra antequerana",
        festivities: "Semana Santa, Feria de Málaga (agosto), Noche de San Juan (junio)",
        ccaaName: "Andalucía",
      
    },
    {
        name: "Murcia",
        description: "Región del sureste de España famosa por su huerta, gastronomía y costa en el Mar Menor.",
        imageUrl: "/images/murcia.jpg",
        climate: "Clima semiárido, con veranos calurosos e inviernos suaves.",
        beaches: "costa de Los Narejos, costa de La Manga, costa de Calblanque",
        recommendedPlaces: "Catedral de Murcia, Real Casino de Murcia, Mar Menor",
        typicalFood: "Zarangollo, Paparajotes, Arroz y conejo",
        festivities: "Semana Santa, Fiestas de Primavera (abril), Bando de la Huerta",
        ccaaName: "Murcia",
      
    },
    {
        name: "Navarra",
        description: "Provincia histórica conocida por los Sanfermines y sus paisajes verdes.",
        imageUrl: "/images/navarra.jpg",
        climate: "Clima variado: oceánico en el norte y mediterráneo continental en el sur.",
        beaches: "",
        recommendedPlaces: "Pamplona, Selva de Irati, Monasterio de Leyre",
        typicalFood: "Chistorra, Pimientos del piquillo, Cordero al chilindrón",
        festivities: "Sanfermines (julio), Día de Navarra (3 de diciembre), Carnaval de Ituren",
        ccaaName: "Navarra",
    },
    {
        name: "Ourense",
        description: "Provincia gallega conocida por sus aguas termales y su catedral.",
        imageUrl: "/images/ourense.jpg",
        climate: "Clima oceánico de transición, con inviernos frescos y lluvias moderadas.",
        beaches: "",
        recommendedPlaces: "Catedral de Ourense, Termas de Outariz, Puente Romano de Ourense",
        typicalFood: "Empanada gallega, Pulpo a la gallega, Bica",
        festivities: "Magosto (noviembre), Festa da Istoria en Ribadavia (agosto), Semana Santa",
        ccaaName: "Galicia",
    },
    {
        name: "Palencia",
        description: "Provincia de Castilla y León con importantes monumentos románicos y góticos.",
        imageUrl: "/images/palencia.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Catedral de Palencia, Villa Romana de La Olmeda, Canal de Castilla",
        typicalFood: "Lechazo asado, Sopa castellana, Chuletillas de cordero",
        festivities: "San Antolín (septiembre), Semana Santa, Fiestas de San Juan (junio)",
        ccaaName: "Castilla-León",
    },
    {
        name: "Pontevedra",
        description: "Provincia gallega con costa atlántica, ciudades históricas y costas hermosas.",
        imageUrl: "/images/pontevedra.jpg",
        climate: "Clima oceánico, con temperaturas suaves y lluvias abundantes.",
        beaches: "costa de Rodas (Islas Cíes), costa de Samil, costa de A Lanzada",
        recommendedPlaces: "Catedral de Tui, Ría de Arousa, Islas Cíes",
        typicalFood: "Mariscos, Pulpo a la gallega, Empanada",
        festivities: "Fiesta del Albariño (agosto), Festa da Arribada (marzo), Semana Santa",
        ccaaName: "Galicia",
      
    },
    {
        name: "La Rioja",
        description: "Región famosa por sus viñedos, arquitectura moderna de bodegas y gastronomía.",
        imageUrl: "/images/rioja.jpg",
        climate: "Clima mediterráneo continental, con veranos calurosos e inviernos frescos.",
        beaches: "",
        recommendedPlaces: "Monasterio de San Millán de la Cogolla, Bodega Marqués de Riscal, Logroño",
        typicalFood: "Patatas a la riojana, Chuletillas al sarmiento, Fardelejos",
        festivities: "San Mateo (septiembre), Batalla del Vino en Haro (junio), San Bernabé (junio)",
        ccaaName: "La-Rioja",
    },
    {
        name: "Salamanca",
        description: "Provincia castellana famosa por su universidad y arquitectura renacentista.",
        imageUrl: "/images/salamanca.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Plaza Mayor de Salamanca, Universidad de Salamanca, Catedral de Salamanca",
        typicalFood: "Hornazo, Farinato, Chanfaina",
        festivities: "Lunes de Aguas (abril), Semana Santa, Ferias y Fiestas de septiembre",
        ccaaName: "Castilla-León",
    },
    {
        name: "Segovia",
        description: "Provincia famosa por su acueducto romano y su arquitectura medieval.",
        imageUrl: "/images/segovia.jpg",
        climate: "Clima continental, con inviernos fríos y veranos moderados.",
        beaches: "",
        recommendedPlaces: "Acueducto de Segovia, Alcázar de Segovia, Catedral de Segovia",
        typicalFood: "Cochinillo asado, Judiones de La Granja, Ponche segoviano",
        festivities: "San Juan y San Pedro (junio), Día de San Frutos (octubre), Semana Santa",
        ccaaName: "Castilla-León",
    },
    {
        name: "Sevilla",
        description: "Provincia andaluza conocida por su rica herencia cultural y sus fiestas populares.",
        imageUrl: "/images/sevilla.jpg",
        climate: "Clima mediterráneo, con veranos muy calurosos e inviernos suaves.",
        beaches: "",
        recommendedPlaces: "Catedral de Sevilla, Real Alcázar, Plaza de España",
        typicalFood: "Gazpacho, Pescaito frito, Tortilla de camarones",
        festivities: "Semana Santa, Feria de Abril, Corpus Christi",
        ccaaName: "Andalucía",
    },
    {
        name: "Soria",
        description: "Provincia castellana con espacios naturales únicos y una gran herencia histórica.",
        imageUrl: "/images/soria.jpg",
        climate: "Clima continental, con inviernos fríos y veranos templados.",
        beaches: "",
        recommendedPlaces: "Cañón del Río Lobos, Iglesia de San Juan de Duero, Laguna Negra",
        typicalFood: "Torreznos, Cordero asado, Mantequilla de Soria",
        festivities: "San Juan (junio), Virgen de Agosto, Fiestas de San Saturio (octubre)",
        ccaaName: "Castilla-León",
    },
    {
        name: "Tarragona",
        description: "Provincia catalana con costas y ruinas romanas destacadas.",
        imageUrl: "/images/tarragona.jpg",
        climate: "Clima mediterráneo, con inviernos suaves y veranos cálidos.",
        beaches: "costa Larga, Cala Fonda, costa de Tamarit",
        recommendedPlaces: "Anfiteatro romano de Tarragona, Catedral de Tarragona, Delta del Ebro",
        typicalFood: "Calçots, Xató, Romesco",
        festivities: "Santa Tecla (septiembre), San Juan (junio), Fiesta Mayor de Tarragona",
        ccaaName: "Cataluña",
      
    },
    {
        name: "Teruel",
        description: "Provincia de Aragón conocida por su arquitectura mudéjar y su entorno natural.",
        imageUrl: "/images/teruel.jpg",
        climate: "Clima continental, con inviernos fríos y veranos suaves.",
        beaches: "",
        recommendedPlaces: "Plaza del Torico, Catedral de Teruel, Albarracín",
        typicalFood: "Jamón de Teruel, Migas, Caldereta de pastor",
        festivities: "Fiestas de la Vaquilla (julio), Semana Santa, Las Bodas de Isabel (febrero)",
        ccaaName: "Aragón",
    },
    {
        name: "Toledo",
        description: "Provincia histórica de Castilla-La Mancha con rica arquitectura medieval.",
        imageUrl: "/images/toledo.jpg",
        climate: "Clima mediterráneo continental, con inviernos frescos y veranos cálidos.",
        beaches: "",
        recommendedPlaces: "Alcázar de Toledo, Catedral de Toledo, Monasterio de San Juan de los Reyes",
        typicalFood: "Carcamusas, Mazapán, Perdiz estofada",
        festivities: "Corpus Christi, Semana Santa, Virgen del Sagrario (agosto)",
        ccaaName: "Castilla-La_Mancha",
    },
    {
        name: "Valencia",
        description: "Provincia de la Comunidad Valenciana famosa por sus costas, cultura y gastronomía.",
        imageUrl: "/images/valencia.jpg",
        climate: "Clima mediterráneo, con inviernos suaves y veranos cálidos.",
        beaches: "costa de la Malvarrosa, costa de El Saler, costa de la Patacona",
        recommendedPlaces: "Ciudad de las Artes y las Ciencias, L’Oceanogràfic, Lonja de la Seda",
        typicalFood: "Paella, Horchata, Fideuà",
        festivities: "Fallas (marzo), Semana Santa Marinera, Noche de San Juan (junio)",
        ccaaName: "Comunidad-Valenciana",
      
    },
    {
        name: "Valladolid",
        description: "Provincia de Castilla y León conocida por su arquitectura renacentista y su vino.",
        imageUrl: "/images/valladolid.jpg",
        climate: "Clima continental, con inviernos fríos y veranos cálidos.",
        beaches: "",
        recommendedPlaces: "Catedral de Valladolid, Plaza Mayor, Castillo de la Mota",
        typicalFood: "Lechazo asado, Sopa castellana, Queso de la zona",
        festivities: "Semana Santa, Fiesta de la Vendimia (septiembre), Fiestas de la Virgen de San Lorenzo (agosto)",
        ccaaName: "Castilla-León",
    },
    {
        name: "Vizcaya",
        description: "Provincia vasca conocida por su capital Bilbao, su costa atlántica y su cultura vasca.",
        imageUrl: "/images/vizcaya.jpg",
        climate: "Clima oceánico, con veranos frescos e inviernos suaves.",
        beaches: "costa de Sopelana, costa de Gorliz, costa de Mundaka",
        recommendedPlaces: "Museo Guggenheim, Puente Colgante de Bizkaia, Plaza Nueva de Bilbao",
        typicalFood: "Bacalao a la vizcaína, Merluza a la koskera, Txangurro",
        festivities: "Semana Grande de Bilbao, Aste Nagusia, Fiesta de San Sebastián (enero)",
        ccaaName: "País-Vasco",
      
    },
    {
        name: "Zamora",
        description: "Provincia de Castilla y León conocida por su arquitectura medieval y su paisaje natural.",
        imageUrl: "/images/zamora.jpg",
        climate: "Clima continental, con inviernos fríos y veranos cálidos.",
        beaches: "",
        recommendedPlaces: "Castillo de Zamora, Catedral de Zamora, Duero y Arribes del Duero",
        typicalFood: "Ternera de Aliste, Queso zamorano, Mantecado de Aliste",
        festivities: "Semana Santa, Fiesta de la Virgen de la Concha, Fiesta de la Moraña",
        ccaaName: "Castilla-León",
    },
    {
        name: "Zaragoza",
        description: "Provincia de Aragón famosa por su historia romana, arquitectura mudéjar y la Basílica del Pilar.",
        imageUrl: "/images/zaragoza.jpg",
        climate: "Clima semiárido, con inviernos suaves y veranos calurosos.",
        beaches: "",
        recommendedPlaces: "Basílica del Pilar, Palacio de la Aljafería, Plaza del Pilar",
        typicalFood: "Ternasco de Aragón, Borrajas, Chiretas",
        festivities: "Fiestas del Pilar (octubre), Semana Santa, Feria de la Almozara",
        ccaaName: "Aragón",
    }
    ]
  });
}
//Función que crea todas las provincias y las inserta en la base de datos.

export async function connectCategoriesWithProvinces(){
  const provincesWithCategories = [
    { name: "Álava", categories: ["sierra"] },
    { name: "Albacete", categories: ["sierra"] },
    { name: "Alicante", categories: ["costa"] },
    { name: "Almería", categories: ["costa"] },
    { name: "Ávila", categories: ["sierra"] },
    { name: "Badajoz", categories: ["sierra"] },
    { name: "Islas Baleares", categories: ["islas"] },
    { name: "Barcelona", categories: ["costa"] },
    { name: "Burgos", categories: ["sierra"] },
    { name: "Cádiz", categories: ["costa"] },
    { name: "Cantabria", categories: ["costa"] },
    { name: "Castellón", categories: ["costa"] },
    { name: "Ciudad Real", categories: ["sierra"] },
    { name: "Córdoba", categories: ["sierra"] },
    { name: "Cuenca", categories: ["sierra"] },
    { name: "Gerona", categories: ["costa"] },
    { name: "Granada", categories: ["costa"] },
    { name: "Guadalajara", categories: ["sierra"] },
    { name: "Guipúzcoa", categories: ["costa"] },
    { name: "Huesca", categories: ["sierra"] },
    { name: "Jaén", categories: ["sierra"] },
    { name: "León", categories: ["sierra"] },
    { name: "Lleida", categories: ["sierra"] },
    { name: "Lugo", categories: ["costa"] },
    { name: "Madrid", categories: ["sierra"] },
    { name: "Málaga", categories: ["costa"] },
    { name: "Murcia", categories: ["costa"] },
    { name: "Navarra", categories: ["sierra"] },
    { name: "Ourense", categories: ["sierra"] },
    { name: "Palencia", categories: ["sierra"] },
    { name: "Pontevedra", categories: ["costa"] },
    { name: "La Rioja", categories: ["sierra"] },
    { name: "Salamanca", categories: ["sierra"] },
    { name: "Segovia", categories: ["sierra"] },
    { name: "Sevilla", categories: ["sierra"] },
    { name: "Soria", categories: ["sierra"] },
    { name: "Tarragona", categories: ["costa"] },
    { name: "Teruel", categories: ["sierra"] },
    { name: "Toledo", categories: ["sierra"] },
    { name: "Valencia", categories: ["costa"] },
    { name: "Valladolid", categories: ["sierra"] },
    { name: "Vizcaya", categories: ["costa"] },
    { name: "Zamora", categories: ["sierra"] },
    { name: "Zaragoza", categories: ["sierra"] },
  ];
  //Asignamos la categoría para cada provincia.
  
  await Promise.all(
  //Usamos "Promise.all" para hacer todas las operaciones en paralelo, mejorando la eficiencia. Aunque
  //"Promise.all" va a esperar que todas las promesas se resuelvan antes de seguir con el programa. Si
  //alguna de las promesas falla, "Promise.all" rechazará toda la operación y lanzará un error.
    provincesWithCategories.map(async (province) => {
      const provinceInDatabase = await db.provinces.findUnique({
        where: { name: province.name },
      });
      //Sacamos la provincia de la base de datos.
      
      if (provinceInDatabase) {
        await db.provinces.update({
          where: { id: provinceInDatabase.id },
          data: {
            categories: {
  
              connect: province.categories.map((categoryName) => ({
                name: categoryName,
              })),
            },
          },
        });
        //Creamos las relaciones correspondientes usando "connect".
      }
    })
    //Hacemos todas estas operaciones para cada provincia de "provincesWithCategories".
  );
}
//Esta función sirve para crear todas las provincias e insertarlas en la base de datos. También
//crea las relaciones correspondientes con la estanterías de "categories".



