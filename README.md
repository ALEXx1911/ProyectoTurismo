# 🇪🇸 Proyecto Turismo España V2

Aplicación web de turismo para explorar las provincias de España. Proyecto desarrollado con Remix, React, Prisma y TailwindCSS.
Actualmente en la versión 2.

## 📋 Descripción

Esta aplicación permite a los usuarios:
- 🔍 **Buscar y explorar** las 50 provincias de España
- 📍 **Ver información detallada** sobre clima, playas, gastronomía, festividades y lugares recomendados
- ⭐ **Guardar provincias favoritas** (requiere autenticación)
- 🗺️ **Crear itinerarios de viaje** personalizados
- 👤 **Sistema de autenticación** con registro y login
- 📧 **Magic links** para autenticación por email

## 🛠️ Tecnologías

- **Framework**: [Remix](https://remix.run/)
- **Frontend**: React 18, TailwindCSS
- **Backend**: Node.js, Prisma ORM
- **Base de datos**: SQLite
- **Autenticación**: Cookies seguras + bcryptjs
- **Email**: Nodemailer
- **Estilos**: SASS + TailwindCSS
- **Componentes**: Swiper para sliders

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd ProyectoTurismoV2
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

**IMPORTANTE**: Copia el archivo `.env.sample` a `.env`:

```bash
cp .env.sample .env
```

**Genera secretos seguros** para `AUTH_COOKIE_SECRET` y `MAGIC_LINK_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Ejecuta el comando dos veces para generar dos secretos diferentes y reemplaza los valores en tu archivo `.env`:

```env
DATABASE_URL="file:./dev.db"
AUTH_COOKIE_SECRET=<tu-secret-generado-1>
MAGIC_LINK_SECRET=<tu-secret-generado-2>
ORIGIN=http://localhost:3000
EMAIL_FROM=turismoespana.contacto@gmail.com
EMAIL_USER=turismoespana.contacto@gmail.com
```

#### 🔐 ¿Por qué necesito estos secretos?

- **`AUTH_COOKIE_SECRET`**: Clave secreta para cifrar las cookies de sesión de usuario. Protege la información de autenticación.
- **`MAGIC_LINK_SECRET`**: Clave para generar y validar los enlaces mágicos de autenticación por email.

### 4. Configurar la base de datos

Ejecuta las migraciones de Prisma:

```bash
npx prisma migrate dev --name init
```

### 5. Poblar la base de datos (IMPORTANTE)

**⚠️ ESTE PASO ES OBLIGATORIO** para que el buscador de provincias funcione correctamente:

```bash
npx prisma seed
```

Este comando creará:
- Las 50 provincias de España con toda su información
- Un usuario de prueba (`ejemplo@gmail.com` / `ejemplo`)
- Categorías para clasificar las provincias

## 💻 Desarrollo

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Compilar SASS en modo watch

Si necesitas modificar los estilos SASS:

```bash
npm run sass
```

## 📦 Producción

### Compilar para producción

```bash
npm run build
```

### Ejecutar en modo producción

```bash
npm start
```

## 🗄️ Base de datos

### Ver la base de datos con Prisma Studio

```bash
npx prisma studio
```

### Resetear la base de datos

```bash
npx prisma migrate reset
```

Esto borrará todos los datos y ejecutará automáticamente el seed.

## 👥 Usuario de prueba

Después de ejecutar `npx prisma seed`, puedes usar estas credenciales:

- **Email**: `ejemplo@gmail.com`
- **Contraseña**: `ejemplo`

## 🐛 Solución de problemas

### Error: "AUTH_COOKIE_SECRET is not set"

- Asegúrate de tener el archivo `.env` (no `.env.sample`) en la raíz del proyecto
- Verifica que `AUTH_COOKIE_SECRET` esté definido en `.env`

### El buscador no muestra provincias

- Ejecuta el seed: `npx prisma seed`
- Verifica que la base de datos se creó: `npx prisma studio`

### Error al instalar dependencias

- Asegúrate de tener Node.js 18+ instalado
- Borra `node_modules` y `package-lock.json`, luego ejecuta `npm install` de nuevo

## � Colaboradores

Este proyecto ha sido desarrollado por:

- **Jheferson Cartagena** - [GitHub](https://github.com/ALEXx1911)
- **Roberto Martínez** - [GitHub](https://github.com/Ninjawarsgamine)
- **Anthony Guanga** - [GitHub](https://github.com/AnthonyGuanga)
- **Daniel Calvo** - [Github](https://github.com/danicf18)
- **Guti** - [Github](https://github.com/Gutah71)

## 📝 Licencia

Proyecto educativo para clase.
