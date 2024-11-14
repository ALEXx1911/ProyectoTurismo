// provincias.ts
export interface Provincia {
  nombre: string;
  descripcion: string;
  clima: string; // Manteniendo el tipo original para "clima"
  lugares: string[];
  playas: string[]; // Siempre un array, incluso si no tiene playas
  comida_tipica: string[];
  festividades: string[];
  imagen: string;
}

// Datos de las provincias
export const provincias: Record<string, Provincia> = {
  alava: {
    nombre: 'Álava',
    descripcion: 'Provincia del País Vasco conocida por su rica historia y la belleza de su capital, Vitoria-Gasteiz.',
    clima: 'Clima oceánico, con temperaturas suaves y lluvias durante todo el año.',
    lugares: ['Catedral de Santa María', 
      'Anillo Verde de Vitoria', 
      'Museo de Bellas Artes'],
    playas: [], // Si no tiene playas, se deja como un array vacío
    comida_tipica: ['Marmitako', 'Txistorra', 'Perretxikos'],
    festividades: ['Fiestas de la Virgen Blanca (agosto)', 'Semana Santa'],
    imagen: '/images/alava.jpg',
  },
  albacete: {
    nombre: 'Albacete',
    descripcion: 'Provincia de Castilla-La Mancha famosa por su cuchillería y fiestas populares.',
    clima: 'Clima continental, con veranos cálidos e inviernos fríos.',
    lugares: ['Catedral de San Juan Bautista', 
      'Pasaje de Lodares', 
      'Museo de la Cuchillería'],
    playas: [], // No tiene playas
    comida_tipica: ['Gazpachos manchegos', 'Atascaburras', 'Miguelitos de La Roda'],
    festividades: ['Feria de Albacete (septiembre)', 'Semana Santa'],
    imagen: '/images/albacete.jpg',
  },
    alicante: {
      nombre: 'Alicante',
      descripcion: 'Provincia de la Comunidad Valenciana con famosas playas y ciudades como Benidorm y Calpe.',
      clima: 'Clima mediterráneo, con veranos calurosos e inviernos suaves.',
      lugares: ['Castillo de Santa Bárbara', 
        'Isla de Tabarca', 
        'Explanada de España'],
      playas: ['Playa de San Juan', 'Playa del Postiguet', 'Playa de Levante'],
      comida_tipica: ['Paella', 'Arroz a banda', 'Turrón de Jijona'],
      festividades: ['Hogueras de San Juan (junio)', 'Moros y Cristianos'],
      imagen: '/images/alicante.jpg',
    },
    almeria: {
      nombre: 'Almería',
      descripcion: 'Provincia andaluza conocida por sus playas, su desierto y su Alcazaba.',
      clima: 'Clima semiárido, con veranos calurosos e inviernos suaves.',
      lugares: ['Cabo de Gata', 
        'Alcazaba de Almería', 
        'Mini Hollywood en el desierto de Tabernas'],
      playas: ['Playa de los Genoveses', 'Playa de Mónsul', 'Playa de las Negras'],
      comida_tipica: ['Ajoblanco', 'Gurullos', 'Cherigan'],
      festividades: ['Semana Santa', 'Feria de Almería (agosto)'],
      imagen: '/images/almeria.jpg',
    },
    avila: {
      nombre: 'Ávila',
      descripcion: 'Provincia de Castilla y León famosa por sus murallas medievales y la arquitectura gótica.',
      clima: 'Clima continental, con inviernos fríos y veranos suaves.',
      lugares: ['Murallas de Ávila', 
        'Catedral de Ávila', 
        'Basílica de San Vicente'],
      playas: [],
      comida_tipica: ['Chuletón de Ávila', 'Yemas de Santa Teresa', 'Judías de El Barco'],
      festividades: ['Semana Santa', 'Fiestas de Santa Teresa (octubre)'],
      imagen: '/images/avila.jpg',
    },
    badajoz: {
      nombre: 'Badajoz',
      descripcion: 'Provincia de Extremadura con una rica herencia histórica y cultural.',
      clima: 'Clima mediterráneo continental, con veranos calurosos e inviernos suaves.',
      lugares: ['Alcazaba de Badajoz', 
        'Puente de Palmas', 
        'Plaza Alta'],
      playas: [],
      comida_tipica: ['Migas extremeñas', 'Cordero a la caldereta', 'Jamón ibérico de Dehesa de Extremadura'],
      festividades: ['Carnaval de Badajoz (febrero)', 'Semana Santa'],
      imagen: '/images/badajoz.jpg',
    },
    baleares: {
      nombre: 'Islas Baleares',
      descripcion: 'Conjunto de islas mediterráneas conocidas por sus playas y su ambiente festivo.',
      clima: 'Clima mediterráneo, con inviernos suaves y veranos calurosos.',
      lugares: ['Catedral de Palma', 
        'Dalt Vila en Ibiza', 
        'Cuevas del Drach en Mallorca'],
      playas: ['Cala Comte', 'Cala Macarella', 'Es Trenc'],
      comida_tipica: ['Sobrasada', 'Ensaimada', 'Caldereta de langosta'],
      festividades: ['Fiestas de Sant Joan (junio)', 'Semana Santa'],
      imagen: '/images/baleares.jpg',
    },
    barcelona: {
        nombre: 'Barcelona',
        descripcion: 'Provincia en la costa mediterránea de Cataluña, famosa por su arquitectura modernista y playas.',
        clima: 'Clima mediterráneo, con inviernos suaves y veranos cálidos.',
        lugares: [
          'Sagrada Familia',
          'Parque Güell',
          'Casa Batlló',
          'Las Ramblas',
          'Montjuïc',
        ],
        playas: ['Playa de la Barceloneta', 'Playa de Ocata', 'Playa de Castelldefels'],
        comida_tipica: ['Pa amb tomàquet', 'Escudella i carn d’olla', 'Butifarra con mongetes'],
        festividades: ['La Mercè (24 de septiembre)', 'Sant Jordi (23 de abril)', 'Festa Major de Gràcia (agosto)'],
        imagen: '/images/barcelona.jpg',
      },
      burgos: {
        nombre: 'Burgos',
        descripcion: 'Provincia de Castilla y León con una gran herencia histórica y paisajes naturales.',
        clima: 'Clima continental, con inviernos fríos y veranos suaves.',
        lugares: [
          'Catedral de Burgos',
          'Monasterio de las Huelgas',
          'Cartuja de Miraflores',
          'Museo de la Evolución Humana',
        ],
        playas: [],
        comida_tipica: ['Morcilla de Burgos', 'Olla podrida', 'Queso de Burgos'],
        festividades: ['Fiestas de San Pedro y San Pablo (junio)', 'Fiestas de San Lesmes (enero)'],
        imagen: '/images/burgos.jpg',
      },
      cadiz: {
        nombre: 'Cádiz',
        descripcion: 'Provincia de Andalucía conocida por sus playas, carnavales y pueblos blancos.',
        clima: 'Clima mediterráneo oceánico, con veranos cálidos y suaves inviernos.',
        lugares: [
          'Catedral de Cádiz',
          'Playa de la Caleta',
          'Castillo de San Sebastián',
          'Parque Natural de Doñana',
        ],
        playas: ['Playa de la Victoria', 'Playa de Zahara de los Atunes', 'Playa de Bolonia'],
        comida_tipica: ['Pescaito frito', 'Tortillitas de camarones', 'Gazpacho andaluz'],
        festividades: ['Carnaval de Cádiz (febrero)', 'Semana Santa', 'Romería del Rocío'],
        imagen: '/images/cadiz.jpg',
      },
      cantabria: {
        nombre: 'Cantabria',
        descripcion: 'Región del norte de España conocida por sus paisajes verdes, playas y cuevas prehistóricas.',
        clima: 'Clima oceánico, con temperaturas moderadas y abundantes lluvias.',
        lugares: [
          'Parque Nacional de los Picos de Europa',
          'Cueva de Altamira',
          'Santillana del Mar',
          'Palacio de la Magdalena',
        ],
        playas: ['Playa de El Sardinero', 'Playa de Oyambre', 'Playa de Comillas'],
        comida_tipica: ['Cocido montañés', 'Rabas', 'Sobaos y quesadas'],
        festividades: ['Semana Grande de Santander (julio)', 'La Vijanera (enero)', 'Día de Cantabria (agosto)'],
        imagen: '/images/cantabria.jpg',
      },
      castellon: {
        nombre: 'Castellón',
        descripcion: 'Provincia de la Comunidad Valenciana, famosa por sus playas, montañas y cerámica.',
        clima: 'Clima mediterráneo, con veranos cálidos e inviernos suaves.',
        lugares: [
          'Peñíscola',
          'Desierto de las Palmas',
          'Basílica de la Mare de Déu del Lledó',
          'Castillo de Morella',
        ],
        playas: ['Playa Norte de Peñíscola', 'Playa de Benicàssim', 'Playa del Pinar'],
        comida_tipica: ['Paella valenciana', 'Arroz al horno', 'Fideuà'],
        festividades: ['Fallas (marzo)', 'Fiestas de la Magdalena (marzo)', 'Sant Antoni (enero)'],
        imagen: '/images/castellon.jpg',
      },
      ciudadReal: {
        nombre: 'Ciudad Real',
        descripcion: 'Provincia en Castilla-La Mancha conocida por sus castillos y por ser la tierra de Don Quijote.',
        clima: 'Clima continental, con inviernos fríos y veranos calurosos.',
        lugares: [
          'Parque Nacional de Las Tablas de Daimiel',
          'Castillo de Calatrava la Nueva',
          'Catedral de Ciudad Real',
        ],
        playas: [],
        comida_tipica: ['Gachas manchegas', 'Duelos y quebrantos', 'Migas'],
        festividades: ['Semana Santa', 'Fiestas de la Pandorga (julio)', 'Fiesta de San Isidro (mayo)'],
        imagen: '/images/ciudadReal.jpg',
      },
      cordoba: {
        nombre: 'Córdoba',
        descripcion: 'Provincia de Andalucía famosa por su Mezquita-Catedral y su histórico casco antiguo.',
        clima: 'Clima mediterráneo, con veranos muy calurosos y inviernos suaves.',
        lugares: [
          'Mezquita-Catedral de Córdoba',
          'Alcázar de los Reyes Cristianos',
          'Patios de Córdoba',
        ],
        playas: [],
        comida_tipica: ['Salmorejo', 'Flamenquín', 'Rabo de toro'],
        festividades: ['Festival de los Patios (mayo)', 'Cruces de Mayo', 'Feria de Córdoba'],
        imagen: '/images/cordoba.jpg',
      },
      cuenca: {
        nombre: 'Cuenca',
        descripcion: 'Provincia de Castilla-La Mancha conocida por sus famosas Casas Colgadas y la Ciudad Encantada.',
        clima: 'Clima mediterráneo continental, con inviernos fríos y veranos templados.',
        lugares: [
          'Casas Colgadas de Cuenca',
          'Ciudad Encantada',
          'Catedral de Cuenca',
        ],
        playas: [],
        comida_tipica: ['Morteruelo', 'Zarajos', 'Ajoarriero'],
        festividades: ['Semana Santa', 'San Mateo (septiembre)', 'Fiestas de San Julián (agosto)'],
        imagen: '/images/cuenca.jpg',
      },
      gerona: {
        nombre: 'Gerona',
        descripcion: 'Provincia de Cataluña con preciosas playas, historia medieval y bellos paisajes.',
        clima: 'Clima mediterráneo, con inviernos suaves y veranos cálidos.',
        lugares: [
          'Barri Vell de Girona',
          'Catedral de Girona',
          'Murallas de Girona',
          'Call Jueu',
        ],
        playas: ['Cala Sa Boadella', 'Playa de Aiguablava', 'Playa de Tamariu'],
        comida_tipica: ['Escudella', 'Butifarra', 'Suquet de peix'],
        festividades: ['Temps de Flors (mayo)', 'Fiesta Mayor de Sant Narcís', 'Semana Santa'],
        imagen: '/images/gerona.jpg',
      },
      granada: {
        nombre: 'Granada',
        descripcion: 'Provincia andaluza famosa por la Alhambra y sus paisajes de montaña y playa.',
        clima: 'Clima mediterráneo con influencia continental, veranos cálidos e inviernos fríos en la sierra.',
        lugares: [
          'Alhambra',
          'Generalife',
          'Sierra Nevada',
          'Albaicín',
        ],
        playas: ['Playa de la Herradura', 'Playa de Salobreña', 'Playa de Almuñécar'],
        comida_tipica: ['Tortilla del Sacromonte', 'Gazpacho andaluz', 'Remojón granadino'],
        festividades: ['Semana Santa', 'Fiesta de la Cruz (mayo)', 'Corpus Christi'],
        imagen: '/images/granada.jpg',
      },
      guadalajara: {
        nombre: 'Guadalajara',
        descripcion: 'Provincia de Castilla-La Mancha con castillos medievales y entornos naturales espectaculares.',
        clima: 'Clima mediterráneo continental, con inviernos fríos y veranos cálidos.',
        lugares: [
          'Castillo de Sigüenza',
          'Palacio del Infantado',
          'Parque Natural del Alto Tajo',
        ],
        playas: [],
        comida_tipica: ['Cabrito asado', 'Migas', 'Morteruelo'],
        festividades: ['Semana Santa', 'Fiestas de San Vicente (enero)', 'Fiestas de Sigüenza (agosto)'],
        imagen: '/images/guadalajara.jpg',
      },
      guipuzcoa: {
        nombre: 'Guipúzcoa',
        descripcion: 'Provincia del País Vasco famosa por su gastronomía, paisajes verdes y playas.',
        clima: 'Clima oceánico, con temperaturas suaves y lluvias durante todo el año.',
        lugares: [
          'San Sebastián',
          'Museo Chillida-Leku',
          'Monte Igueldo',
          'Peine del Viento',
        ],
        playas: ['Playa de la Concha', 'Playa de Ondarreta', 'Playa de Zarautz'],
        comida_tipica: ['Pintxos', 'Merluza a la koskera', 'Txuleta'],
        festividades: ['Tamborrada de San Sebastián (enero)', 'Semana Grande (agosto)', 'Aste Nagusia'],
        imagen: '/images/guipuzcoa.jpg',
      },
      huesca: {
        nombre: 'Huesca',
        descripcion: 'Provincia aragonesa conocida por los Pirineos y su rica herencia medieval.',
        clima: 'Clima de montaña en el norte y mediterráneo en el sur, con inviernos fríos en zonas elevadas.',
        lugares: [
          'Parque Nacional de Ordesa y Monte Perdido',
          'Catedral de Huesca',
          'Castillo de Loarre',
        ],
        playas: [],
        comida_tipica: ['Chiretas', 'Longaniza de Graus', 'Crespillos'],
        festividades: ['Fiestas de San Lorenzo (agosto)', 'Feria de Otoño de Biescas', 'Carnaval de Bielsa'],
        imagen: '/images/huesca.jpg',
      },
      jaen: {
        nombre: 'Jaén',
        descripcion: 'Provincia andaluza famosa por sus olivares y el patrimonio renacentista de Úbeda y Baeza.',
        clima: 'Clima mediterráneo continental, con inviernos frescos y veranos calurosos.',
        lugares: [
          'Catedral de Jaén',
          'Castillo de Santa Catalina',
          'Parque Natural de Cazorla',
        ],
        playas: [],
        comida_tipica: ['Andrajos', 'Galianos', 'Ajoatao'],
        festividades: ['Romería de la Virgen de la Cabeza (abril)', 'Semana Santa', 'Fiestas de San Lucas (octubre)'],
        imagen: '/images/jaen.jpg',
      },
      leon: {
        nombre: 'León',
        descripcion: 'Provincia de Castilla y León con una rica historia y arquitectura románica.',
        clima: 'Clima continental, con inviernos fríos y veranos suaves.',
        lugares: [
          'Catedral de León',
          'Basílica de San Isidoro',
          'Las Médulas',
          'Astorga',
        ],
        playas: [],
        comida_tipica: ['Cecina', 'Botillo', 'Cocido maragato'],
        festividades: ['Semana Santa', 'San Froilán (octubre)', 'Fiestas de San Juan y San Pedro (junio)'],
        imagen: '/images/leon.jpg',
      },
      lleida: {
        nombre: 'Lleida',
        descripcion: 'Provincia catalana de paisajes montañosos y sitios de interés medievales.',
        clima: 'Clima mediterráneo continental, con inviernos fríos y veranos calurosos.',
        lugares: [
          'La Seu Vella',
          'Vall de Boí',
          'Parque Nacional de Aigüestortes',
        ],
        playas: [],
        comida_tipica: ['Escudella', 'Caracoles a la llauna', 'Embotits'],
        festividades: ['Fiesta Mayor de Lleida (mayo)', 'Feria de San Miguel (septiembre)', 'Aplec del Cargol (mayo)'],
        imagen: '/images/lleida.jpg',
      },
      lugo: {
        nombre: 'Lugo',
        descripcion: 'Provincia gallega con costa atlántica, montañas y la famosa muralla romana de Lugo.',
        clima: 'Clima oceánico, con inviernos suaves y lluvias frecuentes.',
        lugares: [
          'Muralla romana de Lugo',
          'Catedral de Lugo',
          'Playa de las Catedrales',
        ],
        playas: ['Playa de las Catedrales', 'Playa de Llas', 'Playa de Peizás'],
        comida_tipica: ['Pulpo a la gallega', 'Caldo gallego', 'Lacón con grelos'],
        festividades: ['Arde Lucus (junio)', 'Festas de San Froilán (octubre)', 'Semana Santa'],
        imagen: '/images/lugo.jpg',
      },
      madrid: {
        nombre: 'Madrid',
        descripcion: 'Comunidad de Madrid, capital de España, famosa por su vida cultural y monumental.',
        clima: 'Clima mediterráneo continental, con veranos calurosos e inviernos frescos.',
        lugares: [
          'Museo del Prado',
          'Palacio Real',
          'Parque del Retiro',
          'Plaza Mayor',
        ],
        playas: [],
        comida_tipica: ['Cocido madrileño', 'Bocadillo de calamares', 'Churros con chocolate'],
        festividades: ['San Isidro (15 de mayo)', 'La Paloma (agosto)', 'Navidad en Madrid'],
        imagen: '/images/madrid.jpg',
      },
      malaga: {
        nombre: 'Málaga',
        descripcion: 'Provincia andaluza con playas, gastronomía mediterránea y una activa vida cultural.',
        clima: 'Clima mediterráneo, con veranos calurosos e inviernos suaves.',
        lugares: [
          'Museo Picasso',
          'Alcazaba de Málaga',
          'Catedral de Málaga',
          'Caminito del Rey',
        ],
        playas: ['Playa de la Malagueta', 'Playa de Burriana', 'Playa del Palo'],
        comida_tipica: ['Espetos de sardinas', 'Ajoblanco', 'Porra antequerana'],
        festividades: ['Semana Santa', 'Feria de Málaga (agosto)', 'Noche de San Juan (junio)'],
        imagen: '/images/malaga.jpg',
      },
      murcia: {
        nombre: 'Murcia',
        descripcion: 'Región del sureste de España famosa por su huerta, gastronomía y costa en el Mar Menor.',
        clima: 'Clima semiárido, con veranos calurosos e inviernos suaves.',
        lugares: [
          'Catedral de Murcia',
          'Real Casino de Murcia',
          'Mar Menor',
        ],
        playas: ['Playa de Los Narejos', 'Playa de La Manga', 'Playa de Calblanque'],
        comida_tipica: ['Zarangollo', 'Paparajotes', 'Arroz y conejo'],
        festividades: ['Semana Santa', 'Fiestas de Primavera (abril)', 'Bando de la Huerta'],
        imagen: '/images/murcia.jpg',
      },
      navarra: {
        nombre: 'Navarra',
        descripcion: 'Provincia histórica conocida por los Sanfermines y sus paisajes verdes.',
        clima: 'Clima variado: oceánico en el norte y mediterráneo continental en el sur.',
        lugares: [
          'Pamplona',
          'Selva de Irati',
          'Monasterio de Leyre',
        ],
        playas: [],
        comida_tipica: ['Chistorra', 'Pimientos del piquillo', 'Cordero al chilindrón'],
        festividades: ['Sanfermines (julio)', 'Día de Navarra (3 de diciembre)', 'Carnaval de Ituren'],
        imagen: '/images/navarra.jpg',
      },
      ourense: {
        nombre: 'Ourense',
        descripcion: 'Provincia gallega conocida por sus aguas termales y su catedral.',
        clima: 'Clima oceánico de transición, con inviernos frescos y lluvias moderadas.',
        lugares: [
          'Catedral de Ourense',
          'Termas de Outariz',
          'Puente Romano de Ourense',
        ],
        playas: [],
        comida_tipica: ['Empanada gallega', 'Pulpo a la gallega', 'Bica'],
        festividades: ['Magosto (noviembre)', 'Festa da Istoria en Ribadavia (agosto)', 'Semana Santa'],
        imagen: '/images/ourense.jpg',
      },
      palencia: {
        nombre: 'Palencia',
        descripcion: 'Provincia de Castilla y León con importantes monumentos románicos y góticos.',
        clima: 'Clima continental, con inviernos fríos y veranos suaves.',
        lugares: [
          'Catedral de Palencia',
          'Villa Romana de La Olmeda',
          'Canal de Castilla',
        ],
        playas: [],
        comida_tipica: ['Lechazo asado', 'Sopa castellana', 'Chuletillas de cordero'],
        festividades: ['San Antolín (septiembre)', 'Semana Santa', 'Fiestas de San Juan (junio)'],
        imagen: '/images/palencia.jpg',
      },
      pontevedra: {
        nombre: 'Pontevedra',
        descripcion: 'Provincia gallega con costa atlántica, ciudades históricas y playas hermosas.',
        clima: 'Clima oceánico, con temperaturas suaves y lluvias abundantes.',
        lugares: [
          'Catedral de Tui',
          'Ría de Arousa',
          'Islas Cíes',
        ],
        playas: ['Playa de Rodas (Islas Cíes)', 'Playa de Samil', 'Playa de A Lanzada'],
        comida_tipica: ['Mariscos', 'Pulpo a la gallega', 'Empanada'],
        festividades: ['Fiesta del Albariño (agosto)', 'Festa da Arribada (marzo)', 'Semana Santa'],
        imagen: '/images/pontevedra.jpg',
      },
      rioja: {
        nombre: 'La Rioja',
        descripcion: 'Región famosa por sus viñedos, arquitectura moderna de bodegas y gastronomía.',
        clima: 'Clima mediterráneo continental, con veranos calurosos e inviernos frescos.',
        lugares: [
          'Monasterio de San Millán de la Cogolla',
          'Bodega Marqués de Riscal',
          'Logroño',
        ],
        playas: [],
        comida_tipica: ['Patatas a la riojana', 'Chuletillas al sarmiento', 'Fardelejos'],
        festividades: ['San Mateo (septiembre)', 'Batalla del Vino en Haro (junio)', 'San Bernabé (junio)'],
        imagen: '/images/rioja.jpg',
      },
      salamanca: {
        nombre: 'Salamanca',
        descripcion: 'Provincia castellana famosa por su universidad y arquitectura renacentista.',
        clima: 'Clima continental, con inviernos fríos y veranos suaves.',
        lugares: [
          'Plaza Mayor de Salamanca',
          'Universidad de Salamanca',
          'Catedral de Salamanca',
        ],
        playas: [],
        comida_tipica: ['Hornazo', 'Farinato', 'Chanfaina'],
        festividades: ['Lunes de Aguas (abril)', 'Semana Santa', 'Ferias y Fiestas de septiembre'],
        imagen: '/images/salamanca.jpg',
      },
      segovia: {
        nombre: 'Segovia',
        descripcion: 'Provincia famosa por su acueducto romano y su arquitectura medieval.',
        clima: 'Clima continental, con inviernos fríos y veranos moderados.',
        lugares: [
          'Acueducto de Segovia',
          'Alcázar de Segovia',
          'Catedral de Segovia',
        ],
        playas: [],
        comida_tipica: ['Cochinillo asado', 'Judiones de La Granja', 'Ponche segoviano'],
        festividades: ['San Juan y San Pedro (junio)', 'Día de San Frutos (octubre)', 'Semana Santa'],
        imagen: '/images/segovia.jpg',
      },
      sevilla: {
        nombre: 'Sevilla',
        descripcion: 'Provincia andaluza conocida por su rica herencia cultural y sus fiestas populares.',
        clima: 'Clima mediterráneo, con veranos muy calurosos e inviernos suaves.',
        lugares: [
          'Catedral de Sevilla',
          'Real Alcázar',
          'Plaza de España',
        ],
        playas:[],
        comida_tipica: ['Gazpacho', 'Pescaito frito', 'Tortilla de camarones'],
        festividades: ['Semana Santa', 'Feria de Abril', 'Corpus Christi'],
        imagen: '/images/sevilla.jpg',
      },
      soria: {
        nombre: 'Soria',
        descripcion: 'Provincia castellana con espacios naturales únicos y una gran herencia histórica.',
        clima: 'Clima continental, con inviernos fríos y veranos templados.',
        lugares: [
          'Cañón del Río Lobos',
          'Iglesia de San Juan de Duero',
          'Laguna Negra',
        ],
        playas: [],
        comida_tipica: ['Torreznos', 'Cordero asado', 'Mantequilla de Soria'],
        festividades: ['San Juan (junio)', 'Virgen de Agosto', 'Fiestas de San Saturio (octubre)'],
        imagen: '/images/soria.jpg',
      },
      tarragona: {
        nombre: 'Tarragona',
        descripcion: 'Provincia catalana con playas y ruinas romanas destacadas.',
        clima: 'Clima mediterráneo, con inviernos suaves y veranos cálidos.',
        lugares: [
          'Anfiteatro romano de Tarragona',
          'Catedral de Tarragona',
          'Delta del Ebro',
        ],
        playas: ['Playa Larga', 'Cala Fonda', 'Playa de Tamarit'],
        comida_tipica: ['Calçots', 'Xató', 'Romesco'],
        festividades: ['Santa Tecla (septiembre)', 'San Juan (junio)', 'Fiesta Mayor de Tarragona'],
        imagen: '/images/tarragona.jpg',
      },
      teruel: {
        nombre: 'Teruel',
        descripcion: 'Provincia de Aragón conocida por su arquitectura mudéjar y su entorno natural.',
        clima: 'Clima continental, con inviernos fríos y veranos suaves.',
        lugares: [
          'Plaza del Torico',
          'Catedral de Teruel',
          'Albarracín',
        ],
        playas: [],
        comida_tipica: ['Jamón de Teruel', 'Migas', 'Caldereta de pastor'],
        festividades: ['Fiestas de la Vaquilla (julio)', 'Semana Santa', 'Las Bodas de Isabel (febrero)'],
        imagen: '/images/teruel.jpg',
      },
      toledo: {
        nombre: 'Toledo',
        descripcion: 'Provincia histórica de Castilla-La Mancha con rica arquitectura medieval.',
        clima: 'Clima mediterráneo continental, con inviernos frescos y veranos cálidos.',
        lugares: [
          'Alcázar de Toledo',
          'Catedral de Toledo',
          'Monasterio de San Juan de los Reyes',
        ],
        playas: [],
        comida_tipica: ['Carcamusas', 'Mazapán', 'Perdiz estofada'],
        festividades: ['Corpus Christi', 'Semana Santa', 'Virgen del Sagrario (agosto)'],
        imagen: '/images/toledo.jpg',
      },
      valencia: {
        nombre: 'Valencia',
        descripcion: 'Provincia de la Comunidad Valenciana famosa por sus playas, cultura y gastronomía.',
        clima: 'Clima mediterráneo, con inviernos suaves y veranos cálidos.',
        lugares: [
          'Ciudad de las Artes y las Ciencias',
          'L’Oceanogràfic',
          'Lonja de la Seda',
        ],
        playas: ['Playa de la Malvarrosa', 'Playa de El Saler', 'Playa de la Patacona'],
        comida_tipica: ['Paella', 'Horchata', 'Fideuà'],
        festividades: ['Fallas (marzo)', 'Semana Santa Marinera', 'Noche de San Juan (junio)'],
        imagen: '/images/valencia.jpg',
      },
      valladolid: {
        nombre: 'Valladolid',
        descripcion: 'Provincia de Castilla y León conocida por su arquitectura renacentista y su vino.',
        clima: 'Clima continental, con inviernos fríos y veranos cálidos.',
        lugares: [
          'Catedral de Valladolid',
          'Plaza Mayor',
          'Castillo de la Mota',
        ],
        playas: [],
        comida_tipica: ['Lechazo asado', 'Sopa castellana', 'Queso de la zona'],
        festividades: ['Semana Santa', 'Fiesta de la Vendimia (septiembre)', 'Fiestas de la Virgen de San Lorenzo (agosto)'],
        imagen: '/images/valladolid.jpg',
      },
      vizcaya: {
        nombre: 'Vizcaya',
        descripcion: 'Provincia vasca conocida por su capital Bilbao, su costa atlántica y su cultura vasca.',
        clima: 'Clima oceánico, con veranos frescos e inviernos suaves.',
        lugares: [
          'Museo Guggenheim',
          'Puente Colgante de Bizkaia',
          'Plaza Nueva de Bilbao',
        ],
        playas: ['Playa de Sopelana', 'Playa de Gorliz', 'Playa de Mundaka'],
        comida_tipica: ['Bacalao a la vizcaína', 'Merluza a la koskera', 'Txangurro'],
        festividades: ['Semana Grande de Bilbao', 'Aste Nagusia', 'Fiesta de San Sebastián (enero)'],
        imagen: '/images/vizcaya.jpg',
      },
      zamora: {
        nombre: 'Zamora',
        descripcion: 'Provincia de Castilla y León conocida por su arquitectura medieval y su paisaje natural.',
        clima: 'Clima continental, con inviernos fríos y veranos cálidos.',
        lugares: [
          'Castillo de Zamora',
          'Catedral de Zamora',
          'Duero y Arribes del Duero',
        ],
        playas: [],
        comida_tipica: ['Ternera de Aliste', 'Queso zamorano', 'Mantecado de Aliste'],
        festividades: ['Semana Santa', 'Fiesta de la Virgen de la Concha', 'Fiesta de la Moraña'],
        imagen: '/images/zamora.jpg',
      },
      zaragoza: {
        nombre: 'Zaragoza',
        descripcion: 'Provincia de Aragón famosa por su historia romana, arquitectura mudéjar y la Basílica del Pilar.',
        clima: 'Clima semiárido, con inviernos suaves y veranos calurosos.',
        lugares: [
          'Basílica del Pilar',
          'Palacio de la Aljafería',
          'Plaza del Pilar',
        ],
        playas: [],
        comida_tipica: ['Ternasco de Aragón', 'Borrajas', 'Chiretas'],
        festividades: ['Fiestas del Pilar (octubre)', 'Semana Santa', 'Feria de la Almozara'],
        imagen: '/images/zaragoza.jpg',
      },
    };
  
  export default provincias;
  