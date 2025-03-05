import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, createCookie, createCookieSessionStorage, redirect, json } from "@remix-run/node";
import { RemixServer, NavLink, Link, Form, useNavigation, useLoaderData, useActionData, Outlet, Meta, Links, ScrollRestoration, Scripts, json as json$1, useRouteError, redirect as redirect$1, useSearchParams, useFetcher, useSubmit } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import React, { useState, useRef } from "react";
import classNames from "classnames";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import ReactModal from "react-modal";
import nodemailer from "nodemailer";
import sharp from "sharp";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function ProfileBox({ image, username, handleClickProfileBox }) {
  return /* @__PURE__ */ jsxs("div", { className: "header__profile-box", onClick: handleClickProfileBox, children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        className: "header__profile-box__image",
        src: image,
        alt: "Foto de perfil para cuando no hay una sesión iniciada"
      }
    ),
    /* @__PURE__ */ jsx("h4", { className: "header__profile-box__username", children: username })
  ] });
}
function Menu({ active, isUserLogged }) {
  if (active) {
    return /* @__PURE__ */ jsx("div", { className: "menu", children: /* @__PURE__ */ jsxs("ul", { className: "menu__list", children: [
      /* @__PURE__ */ jsx(MenuOption, { to: "/", children: "Página principal" }),
      /* @__PURE__ */ jsx(MenuOption, { to: "provincias", children: "Todas las provincias" }),
      isUserLogged ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(MenuOption, { to: "itinerarioDeViajes", children: "Itinerario de viajes" }),
        /* @__PURE__ */ jsx(MenuOption, { to: "provinciasFavoritas", children: "Provincias Favoritas" })
      ] }) : /* @__PURE__ */ jsx(MenuOption, { to: "register", children: "Registrarse" }),
      isUserLogged ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(MenuOption, { to: "profile", children: "Editar perfil" }),
        /* @__PURE__ */ jsx(MenuOption, { to: "logout", children: "Cerrar sesión" })
      ] }) : /* @__PURE__ */ jsx(MenuOption, { to: "login", children: "Iniciar sesión" })
    ] }) });
  }
}
function MenuOption({ to, children }) {
  return /* @__PURE__ */ jsx(NavLink, { to, children: ({ isActive }) => /* @__PURE__ */ jsx(
    "li",
    {
      className: classNames(
        isActive ? "menu__option__selected" : "menu__option"
      ),
      children
    }
  ) });
}
function ErrorMessage({ className, ...props }) {
  return props.children ? /* @__PURE__ */ jsx("p", { ...props, className: classNames("text-red-600 text-lg", className) }) : null;
}
function ButtonSubmit({ children, ...props }) {
  return /* @__PURE__ */ jsxs("button", { ...props, className: "form-container__form__button-submit", children: [
    children,
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {}),
    /* @__PURE__ */ jsx("span", {})
  ] });
}
function Button({ children, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: classNames(
        "flex px-3 py-2 rounded-md justify-center",
        className
      ),
      children
    }
  );
}
function PrimaryButton({ className, isLoading, ...props }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      className: classNames(
        "text-white bg-blue-300 hover:bg-blue-800 ",
        isLoading ? "bg-red-100" : "",
        className
      )
    }
  );
}
function DeleteButton({ className, isLoading, ...props }) {
  return /* @__PURE__ */ jsx(
    Button,
    {
      ...props,
      className: classNames(
        "border-2 border-yellow-200 text-red-300",
        "hover:bg-yellow-200 hover:text-white",
        isLoading ? "border-yellow-500 text-red-600 " : "",
        className
      )
    }
  );
}
function Input({ error, className, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: classNames(
        "w-full outline-none",
        " bg-inherit focus:border-b-red-300",
        error ? "border-b-red-950" : "",
        className
      ),
      ...props
    }
  );
}
function SearchIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        }
      )
    }
  );
}
function PlusIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M12 4.5v15m7.5-7.5h-15"
        }
      )
    }
  );
}
function HeartEmpty() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        }
      )
    }
  ) });
}
function Heart() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "red",
      className: "size-6",
      children: /* @__PURE__ */ jsx("path", { d: "m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" })
    }
  ) });
}
function RightArrow() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
          clipRule: "evenodd"
        }
      )
    }
  ) });
}
function LeftArrow() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fillRule: "evenodd",
          d: "M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z",
          clipRule: "evenodd"
        }
      )
    }
  ) });
}
function DoubleRightArrow() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "size-6",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z",
            clipRule: "evenodd"
          }
        )
      ]
    }
  ) });
}
function DoubleLeftArrow() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className: "size-6",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M10.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L12.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M4.72 11.47a.75.75 0 0 0 0 1.06l7.5 7.5a.75.75 0 1 0 1.06-1.06L6.31 12l6.97-6.97a.75.75 0 0 0-1.06-1.06l-7.5 7.5Z",
            clipRule: "evenodd"
          }
        )
      ]
    }
  ) });
}
function SaveIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      width: "1em",
      height: "1em",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          fill: "currentColor",
          fillRule: "evenodd",
          d: "M3.49 6.237A2.814 2.814 0 0 1 6.283 3.75h10.742a.75.75 0 0 1 .495.186l2.76 2.424c.621.545.964 1.34.934 2.165l-.344 9.574a2.75 2.75 0 0 1-2.748 2.651H6.113a2.64 2.64 0 0 1-2.621-2.307a48 48 0 0 1-.064-11.686zm2.794-.987c-.667 0-1.228.5-1.305 1.161l-.06.52a46.6 46.6 0 0 0 .06 11.322c.074.57.56.997 1.134.997h.637V15c0-.966.784-1.75 1.75-1.75h7c.966 0 1.75.784 1.75 1.75v4.25h.873a1.25 1.25 0 0 0 1.25-1.205l.343-9.573a1.25 1.25 0 0 0-.424-.985L16.75 5.255V7.6A1.75 1.75 0 0 1 15 9.35H9A1.75 1.75 0 0 1 7.25 7.6V5.25zm2.466 0V7.6c0 .138.112.25.25.25h6a.25.25 0 0 0 .25-.25V5.25zm7 14h-7.5V15a.25.25 0 0 1 .25-.25h7a.25.25 0 0 1 .25.25z",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function XIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className: "size-6",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          d: "M6 18 18 6M6 6l12 12"
        }
      )
    }
  );
}
function Header({ username, profileImage, isUserLogged, errorMessage }) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProvincias, setFilteredProvincias] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const provincias2 = [
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Ávila",
    "Badajoz",
    "Islas Baleares",
    "Barcelona",
    "Burgos",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Gerona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huesca",
    "Jaén",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Ourense",
    "Palencia",
    "Pontevedra",
    "La Rioja",
    "Salamanca",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza"
  ];
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const handleSearchChange = (event) => {
    let term = event.target.value;
    term = term.charAt(0).toUpperCase() + term.slice(1).toLowerCase();
    setSearchTerm(term);
    const filtered = term === "" ? provincias2 : provincias2.filter(
      (province) => removeAccents(province).toUpperCase().includes(removeAccents(term).toUpperCase())
    );
    setFilteredProvincias(filtered);
  };
  const handleFocusSearchInput = () => {
    setShowDropdown(true);
  };
  const handleBlurSearchInput = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };
  const handleSelectProvince = (province) => {
    setSearchTerm(province);
    setShowDropdown(false);
  };
  function handleClickProfileBox() {
    setShowMenu(!showMenu);
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "header", children: [
      /* @__PURE__ */ jsxs("div", { className: "header__logo-container", children: [
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("img", { className: "header__logo", src: "/img/logo.jpeg", alt: "Logo de la compañía" }) }),
        /* @__PURE__ */ jsx("h4", { className: "header__name", children: "turismoEspaña" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "header__search-bar-container", children: [
        /* @__PURE__ */ jsxs(Form, { className: "header__search-bar-container__form", method: "POST", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              className: "header__search-bar-container__form__search-bar",
              autoComplete: "off",
              placeholder: "Buscar provincia",
              name: "province",
              value: searchTerm,
              onChange: handleSearchChange,
              onFocus: handleFocusSearchInput,
              onBlur: handleBlurSearchInput
            }
          ),
          /* @__PURE__ */ jsx("button", { className: "header__search-bar-container__form__search-button", children: /* @__PURE__ */ jsx(SearchIcon, {}) })
        ] }),
        /* @__PURE__ */ jsx(ErrorMessage, { className: "header__search-bar-container__form__error-message", children: errorMessage })
      ] }),
      showDropdown && /* @__PURE__ */ jsx("div", { className: "dropdown", children: filteredProvincias.length > 0 ? filteredProvincias.map((province) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "dropdown-item",
          onClick: () => handleSelectProvince(province),
          children: province
        },
        province
      )) : searchTerm === "" ? provincias2.map((province) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "dropdown-item",
          onClick: () => handleSelectProvince(province),
          children: province
        },
        province
      )) : /* @__PURE__ */ jsx("div", { className: "dropdown-item", children: "No se encontraron provincias" }) }),
      /* @__PURE__ */ jsx(
        ProfileBox,
        {
          image: typeof profileImage == "string" ? profileImage : "/img/imagen-perfil-default.jpg",
          username: typeof username == "string" ? username : "No login",
          handleClickProfileBox
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Menu, { active: showMenu, isUserLogged })
  ] });
}
function Footer() {
  const socialIcons = [
    { name: "Facebook", url: "https://facebook.com", imgSrc: "../../img/facebook.png" },
    { name: "X (Twitter)", url: "https://x.com", imgSrc: "../../img/x.png" },
    { name: "YouTube", url: "https://youtube.com", imgSrc: "../../img/yt.png" },
    { name: "Instagram", url: "https://instagram.com", imgSrc: "../../img/ig.png" }
  ];
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    /* @__PURE__ */ jsxs("div", { className: "footer__social-icons", children: [
      /* @__PURE__ */ jsx("p", { className: "footer__social-title", children: "Siguenos en:" }),
      /* @__PURE__ */ jsx("div", { className: "footer__social-grid", children: socialIcons.map((icon, index) => /* @__PURE__ */ jsx(
        "a",
        {
          href: icon.url,
          className: "footer__icon",
          "aria-label": icon.name,
          target: "_blank",
          rel: "noopener noreferrer",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: icon.imgSrc,
              alt: icon.name,
              className: "footer__icon-img"
            }
          )
        },
        index
      )) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "footer__branding", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "../../img/TurismoEspaña.png",
          alt: "Turismo España",
          className: "footer__title-image"
        }
      ),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "../../img/logo.jpeg",
          alt: "Logo de España",
          className: "footer__logo"
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "footer__rights", children: [
        "©",
        currentYear,
        " TurismoEspaña Todos los derechos reservados"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "footer__links", children: [
      /* @__PURE__ */ jsx("a", { href: "", className: "footer__link", children: "Contacto" }),
      /* @__PURE__ */ jsx("a", { href: "", className: "footer__link", children: "Aviso Legal" }),
      /* @__PURE__ */ jsx("a", { href: "", className: "footer__link", children: "Uso de la Información" }),
      /* @__PURE__ */ jsx("a", { href: "", className: "footer__link", children: "Política de Cookies" })
    ] })
  ] });
}
const db = global.db || new PrismaClient();
if (process.env.NODE_ENV === "development") global.db = db;
async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}
async function comparePasswords(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
function getUser(email) {
  return db.user.findUnique({
    where: {
      email
    }
  });
}
async function createUser(email, username, password, imageURL) {
  const passwordConHash = await hashPassword(password);
  return db.user.create({
    data: {
      email,
      name: username,
      password: passwordConHash,
      imageUrl: imageURL
    }
  });
}
async function getUserById(userId) {
  return db.user.findUnique({
    where: {
      id: userId
    }
  });
}
async function updateUser(userId, userName, imageProfileUrl) {
  if (typeof imageProfileUrl == "string") {
    return await db.user.update({
      where: {
        id: userId
      },
      data: {
        name: userName,
        imageUrl: imageProfileUrl
      }
    });
  }
  return await db.user.update({
    where: {
      id: userId
    },
    data: {
      name: userName
    }
  });
}
if (!process.env.AUTH_COOKIE_SECRET) {
  throw new Error("AUTH_COOKIE_SECRET is not set");
}
const sessionCookie = createCookie("session__cookie", {
  secrets: [process.env.AUTH_COOKIE_SECRET],
  httpOnly: true,
  secure: true
});
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: sessionCookie
});
async function getCurrentUser(request) {
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  const userId = session.get("userId");
  if (userId == null) {
    return null;
  }
  return getUserById(userId);
}
async function userLoggedRequired(request) {
  const user = await getCurrentUser(request);
  if (user == null) {
    throw redirect("/login");
  }
  return user;
}
async function userNotLoggedRequired(request) {
  const user = await getCurrentUser(request);
  if (user !== null) {
    throw redirect("/");
  }
}
async function provinceToFavorites(userId, provinceId) {
  const user = await getUserById(userId);
  if (user == null) {
    return json({ errors: { user: "El usuario no existe." } });
  }
  return await db.user.update({
    where: {
      id: userId
    },
    data: {
      provinces: {
        connect: {
          id: provinceId
        }
      }
    }
  });
}
async function deleteProvinceFromFavorites(userId, provinceId) {
  const user = await getUserById(userId);
  if (user == null) {
    return json({ errors: { user: "El usuario no existe." } });
  }
  return await db.user.update({
    where: {
      id: userId
    },
    data: {
      provinces: {
        disconnect: {
          id: provinceId
        }
      }
    }
  });
}
async function getUserFavoriteProvinces(userId) {
  await getUserById(userId);
  return db.provinces.findMany({
    where: {
      users: {
        some: { id: userId }
      }
    }
  });
}
function getAllProvincies(nskip) {
  const pageskip = nskip < 0 ? 1 : nskip;
  return db.provinces.findMany({
    skip: (pageskip - 1) * 8,
    take: 8,
    orderBy: {
      nameNoAccent: "asc"
    }
  });
}
function getTotalPages() {
  return db.provinces.count();
}
async function getProvinceByName(provinceName) {
  return await db.provinces.findUnique({
    where: {
      name: provinceName
    }
  });
}
async function getProvinceById(provinceId) {
  return db.provinces.findUnique({
    where: {
      id: provinceId
    }
  });
}
function validateForm(formData, zodSchema, successFn, errorsFn) {
  const result = zodSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    const errors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path.join(".");
      errors[path] = issue.message;
    });
    return errorsFn(errors);
  }
  return successFn(result.data);
}
const meta = () => {
  return [
    { title: "TurismoEspaña" },
    { name: "description", content: "" }
  ];
};
const links = () => [
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  {
    rel: "stylesheet",
    href: "../css/style.css"
  },
  {
    rel: "shortcut icon",
    href: "../img/image-favicon.png",
    type: "image/x-icon"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const loader$9 = async ({ request }) => {
  const user = await getCurrentUser(request);
  if (user == null) {
    return json$1({
      isUserLogged: false
    });
  }
  return json$1({
    isUserLogged: true,
    username: user.name,
    profile_image: user.imageUrl
  });
};
const searchProvinceSchema = z.object({
  province: z.string().min(1, "No se ha introducido ninguna provincia.")
});
const action$6 = async ({ request }) => {
  const formData = await request.formData();
  return validateForm(
    formData,
    searchProvinceSchema,
    async (data) => {
      const province = await getProvinceByName(data.province);
      if (province !== null) {
        const url = new URL(request.url);
        url.pathname = `/provincias/${province == null ? void 0 : province.id}`;
        return redirect$1(url.toString());
      }
      return json$1({
        errors: {
          province: "Se ha introducido una provincia que no existe."
        }
      });
    },
    (errors) => json$1({ errors })
  );
};
function App() {
  var _a;
  const navigation = useNavigation();
  const isLoading = navigation.state == "loading";
  const loaderData = useLoaderData();
  const username = loaderData == null ? void 0 : loaderData.username;
  const profileImage = loaderData == null ? void 0 : loaderData.profile_image;
  const userIsLogged = loaderData.isUserLogged;
  const actionData = useActionData();
  const errorMessage = (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.province;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    isLoading ? /* @__PURE__ */ jsx("div", { className: "bull-gif-container", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "bull-gif-container__bull-gif",
        src: "/img/torocorriendo.gif",
        alt: ""
      }
    ) }) : null,
    /* @__PURE__ */ jsx(
      Header,
      {
        username,
        profileImage,
        isUserLogged: userIsLogged,
        errorMessage
      }
    ),
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
function ErrorBoundary$1() {
  const error = useRouteError();
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "UTF-8" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("title", { children: "Vaya..." })
    ] }),
    /* @__PURE__ */ jsx("body", { className: "h-4/5", children: /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-mono my-4", children: "Vaya..." }),
      /* @__PURE__ */ jsx("p", { className: "font-light", children: "Si estás viendo esta página es porque se ha producido un error inesperado." }),
      error instanceof Error ? /* @__PURE__ */ jsx("p", { className: "my-4 font-bold", children: error.message }) : null,
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Volver a la página principal" })
    ] }) })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary: ErrorBoundary$1,
  Layout,
  action: action$6,
  default: App,
  links,
  loader: loader$9,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function setSearchParamsString(searchParams, changes) {
  const newSearchParams = new URLSearchParams(searchParams);
  for (const [key, value] of Object.entries(changes)) {
    if (value === void 0) {
      newSearchParams.delete(key);
      continue;
    }
    newSearchParams.set(key, String(value));
  }
  return Array.from(newSearchParams.entries()).map(([key, value]) => value ? `${key}=${encodeURI(value)}` : key).join("&");
}
function ProvincieCard({
  id,
  imageUrl,
  name,
  info,
  climate,
  beaches,
  places,
  food,
  festivities,
  successFunction,
  logged,
  inFav
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: classNames(
        "border-2 border-red-400 rounded-md shadow-2xl",
        "grid grid-cols-3 grid-rows-3 object-cover overflow-hidden",
        "card"
      ),
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl,
            alt: "xd",
            className: classNames(
              "object-cover h-full col-start-1 col-end-4 row-start-1 row-end-3 w-full py-3 px-20 rounded-3xl",
              "image:px-3"
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: classNames(
              "row-start-3 row-end-4 col-start-1 col-end-4",
              "md:col-start-1 md:col-end-4 md:row-start-3 md:row-end-4 md:mx-2 md:mb-1",
              "text-start relative px-10 image:px-3"
            ),
            children: [
              /* @__PURE__ */ jsx("h4", { className: "font-bold text-xl text-center mb-1 titulo", children: name }),
              /* @__PURE__ */ jsx("p", { children: info }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Clima: " }),
                climate
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Lugares Recomendados: " }),
                places
              ] }),
              beaches ? /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Playas: " }),
                beaches
              ] }) : "",
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Comida típica: " }),
                food
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold", children: "Festividades: " }),
                festivities
              ] }),
              logged ? /* @__PURE__ */ jsx("div", { className: "absolute top-[1rem] right-2", children: inFav ? /* @__PURE__ */ jsx("button", { onClick: () => successFunction(id), children: /* @__PURE__ */ jsx(Heart, {}) }) : /* @__PURE__ */ jsx("button", { onClick: () => successFunction(id), children: /* @__PURE__ */ jsx(HeartEmpty, {}) }) }) : ""
            ]
          }
        )
      ]
    }
  );
}
function ProvincePagination({ currentPage, totalPages }, { searchParams }) {
  const islastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-4 items-center my-4", children: [
    !isFirstPage ? /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(PaginationItem, { to: { search: setSearchParamsString(searchParams, { page: 1 }) }, children: /* @__PURE__ */ jsx(DoubleLeftArrow, {}) }),
      /* @__PURE__ */ jsx(PaginationItem, { to: { search: setSearchParamsString(searchParams, { page: currentPage - 1 }) }, children: /* @__PURE__ */ jsx(LeftArrow, {}) })
    ] }) : "",
    /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold", children: [
      "Página ",
      currentPage,
      " de ",
      totalPages
    ] }),
    !islastPage ? /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
      /* @__PURE__ */ jsx(PaginationItem, { to: { search: setSearchParamsString(searchParams, { page: currentPage + 1 }) }, children: /* @__PURE__ */ jsx(RightArrow, {}) }),
      /* @__PURE__ */ jsx(PaginationItem, { to: { search: setSearchParamsString(searchParams, { page: totalPages }) }, children: /* @__PURE__ */ jsx(DoubleRightArrow, {}) })
    ] }) : ""
  ] });
}
function PaginationItem({ to, children }) {
  return /* @__PURE__ */ jsx(Link, { to, children: /* @__PURE__ */ jsx("div", { className: "bg-white p-1 rounded-xl transition-all ease-in-out  duration-250 hover:scale-110 hover:bg-[#252122] hover:text-white", children }) });
}
function ProvincieDetail({
  name,
  imageUrl,
  detaildes,
  desparrafo,
  detailfest,
  festparrafo,
  festUrl,
  detailfood,
  foodparrafo,
  foodUrl,
  detailsite,
  siteparrafo,
  siteUrl
}) {
  return /* @__PURE__ */ jsxs("div", { className: "max-w-6xl mx-auto p-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl font-extrabold text-center text-gray-900 mb-6", children: name }),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imageUrl,
        alt: name,
        className: "w-full h-96 object-cover rounded-xl shadow-lg mb-8 transition-transform duration-300 hover:scale-105 hover:brightness-110"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-900 border-b-2 pb-2", children: "Descripción" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed mt-4", children: detaildes }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed", children: desparrafo })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-900 border-b-2 pb-2", children: "Festividades" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: festUrl,
          alt: "Festividades",
          className: "w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed mt-4", children: detailfest }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed", children: festparrafo })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-900 border-b-2 pb-2", children: "Comida Típica" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: foodUrl,
          alt: "Comida típica",
          className: "w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed mt-4", children: detailfood }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed", children: foodparrafo })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-900 border-b-2 pb-2", children: "Lugares de Interés" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: siteUrl,
          alt: "Lugares de interés",
          className: "w-full h-80 object-cover rounded-xl shadow-lg mt-6 transition-transform duration-300 hover:scale-105 hover:brightness-110"
        }
      ),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed mt-4", children: detailsite }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-800 leading-relaxed", children: siteparrafo })
    ] })
  ] });
}
const loader$8 = async ({ request }) => {
  const user = await userLoggedRequired(request);
  const provincesFavorites = await getUserFavoriteProvinces(user.id);
  return json({
    provinces: provincesFavorites
  });
};
function provincesFavoritas() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    data.provinces.length == 0 ? /* @__PURE__ */ jsx("h2", { className: "text-red-600 text-lg text-center p-36 uppercase", children: "No se ha añadido ninguna provincia a favoritos" }) : null,
    data.provinces.map(
      (province) => /* @__PURE__ */ jsx(
        ProvincieCard,
        {
          imageUrl: province.imageUrl,
          name: province.name,
          info: province.description,
          climate: province.climate,
          places: province.recommendedPlaces,
          food: province.typicalFood,
          festivities: province.festivities,
          beaches: province.beaches
        },
        province.id
      )
    )
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: provincesFavoritas,
  loader: loader$8
}, Symbol.toStringTag, { value: "Module" }));
function createItinerario() {
  return db.itinerario.create({
    data: {
      destino: "Destino",
      comida: "Comida",
      ocio: "Ocio",
      viaje: "Viaje"
    }
  });
}
function getAllItinerario(query) {
  return db.itinerario.findMany({
    where: {
      destino: {
        contains: query ?? ""
      }
    },
    take: 8,
    orderBy: {
      createdAt: "desc"
    }
  });
}
function deleteItinerario(itinerariId) {
  return db.itinerario.delete({
    where: {
      id: itinerariId
    }
  });
}
function saveItinerarioName(itinerario, itinerarioName, itinerarioComida, itinerarioOcio, itinerarioViaje) {
  return db.itinerario.update({
    where: {
      id: itinerario
    },
    data: {
      destino: itinerarioName,
      comida: itinerarioComida,
      ocio: itinerarioOcio,
      viaje: itinerarioViaje
    }
  });
}
const loader$7 = async ({ request }) => {
  await userLoggedRequired(request);
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const itinerarioTablas = await getAllItinerario(q);
  return json({ itinerarioTablas });
};
const deleteItinerarioSchema = z.object({
  itinerarioID: z.string()
});
const saveItinerarioNameSchema = z.object({
  itinerarioID: z.string(),
  itinerarioName: z.string().min(1, "El nombre del itinerario esta en blanco"),
  itinerarioComida: z.string().min(1, "El nombre del itinerario esta en blanco"),
  itinerarioOcio: z.string().min(1, "El nombre del itinerario esta en blanco"),
  itinerarioViaje: z.string().min(1, "El nombre del itinerario esta en blanco")
});
const action$5 = async ({ request }) => {
  await userLoggedRequired(request);
  const formData = await request.formData();
  switch (formData.get("_action")) {
    case "createItinerario": {
      return createItinerario();
    }
    case "deleteItinerario": {
      return validateForm(
        formData,
        deleteItinerarioSchema,
        (data) => deleteItinerario(data.itinerarioID),
        (errors) => json({ errors })
      );
    }
    case "saveItinerarioName": {
      return validateForm(
        formData,
        saveItinerarioNameSchema,
        (data) => saveItinerarioName(
          data.itinerarioID,
          data.itinerarioName,
          data.itinerarioComida,
          data.itinerarioOcio,
          data.itinerarioViaje
        ),
        (errors) => json({ errors })
      );
    }
    default: {
      return json({ error: "Acción no válida" }, { status: 400 });
    }
  }
};
function ItinerarioDeViajes() {
  var _a, _b;
  const data = useLoaderData();
  useSearchParams();
  const createItinerarioFetcher = useFetcher();
  const navigation = useNavigation();
  const containerRef = React.useRef(null);
  (_a = navigation.formData) == null ? void 0 : _a.has("q");
  const isCreatingItinerario = ((_b = createItinerarioFetcher.formData) == null ? void 0 : _b.get("_action")) === "createItinerario";
  React.useEffect(() => {
    if (!isCreatingItinerario && containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [isCreatingItinerario]);
  return /* @__PURE__ */ jsx("div", { className: " flex flex-col items-center", children: /* @__PURE__ */ jsxs("div", { className: "bg-yellow-50 w-full md:w-[70%] m-7 rounded-lg", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl text-blue-300 font-semibold uppercase mt-6 text-center ", children: "ITINERARIO DE VIAJES" }),
    /* @__PURE__ */ jsx(createItinerarioFetcher.Form, { method: "post", children: /* @__PURE__ */ jsxs(
      PrimaryButton,
      {
        name: "_action",
        value: "createItinerario",
        className: " w-full md:w-fit md:mx-16",
        isLoading: isCreatingItinerario,
        children: [
          /* @__PURE__ */ jsx(PlusIcon, {}),
          /* @__PURE__ */ jsx("span", { className: "pl-2", children: isCreatingItinerario ? "Creando itinerario..." : "Crear itinerario" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(
      "ul",
      {
        ref: containerRef,
        className: classNames(
          "flex-col gap-8 overflow-x-auto mt-4 pb-4",
          "snap-x snap-mandatory",
          isCreatingItinerario ? "bg-red-100" : ""
        ),
        children: data.itinerarioTablas.map((itinerario) => /* @__PURE__ */ jsx(Itinerario, { itinerario }, itinerario.id))
      }
    )
  ] }) });
}
function Itinerario({ itinerario }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  const deleteItinerarioFetcher = useFetcher();
  const saveItinerarioNameFetcher = useFetcher();
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (!form) return;
      const inputs = Array.from(
        form.querySelectorAll("input")
      );
      const index = inputs.indexOf(e.currentTarget);
      if (index >= 0 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    }
  };
  const isDeletingItinerario = ((_a = deleteItinerarioFetcher.formData) == null ? void 0 : _a.get("_action")) === "deleteItinerario" && ((_b = deleteItinerarioFetcher.formData) == null ? void 0 : _b.get("itinerarioID")) === itinerario.id;
  return isDeletingItinerario ? null : /* @__PURE__ */ jsxs(
    "li",
    {
      className: classNames(
        "border-2 border-red-300 rounded-md p-4",
        "my-6 mx-16 grid"
      ),
      children: [
        /* @__PURE__ */ jsxs(
          saveItinerarioNameFetcher.Form,
          {
            method: "post",
            className: "grid grid-cols-[1fr_auto] gap-4 items-center",
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    name: "itinerarioName",
                    defaultValue: itinerario.destino,
                    placeholder: "Destino",
                    autoComplete: "off",
                    className: "text-2xl font-extrabold ",
                    onKeyDown: handleKeyDown,
                    tabIndex: 1
                  }
                ),
                /* @__PURE__ */ jsx(ErrorMessage, { children: (_d = (_c = saveItinerarioNameFetcher.data) == null ? void 0 : _c.errors) == null ? void 0 : _d.itinerarioName })
              ] }),
              /* @__PURE__ */ jsx("button", { name: "_action", value: "saveItinerarioName", type: "submit", children: /* @__PURE__ */ jsx(SaveIcon, {}) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    name: "itinerarioComida",
                    defaultValue: itinerario.comida,
                    placeholder: "Comida",
                    autoComplete: "off",
                    className: "text-2xl font-extrabold",
                    onKeyDown: handleKeyDown,
                    tabIndex: 2
                  }
                ),
                /* @__PURE__ */ jsx(ErrorMessage, { children: (_f = (_e = saveItinerarioNameFetcher.data) == null ? void 0 : _e.errors) == null ? void 0 : _f.itinerarioComida })
              ] }),
              /* @__PURE__ */ jsx("button", { name: "_action", value: "itinerarioComida", type: "submit", children: /* @__PURE__ */ jsx(SaveIcon, {}) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    name: "itinerarioOcio",
                    defaultValue: itinerario.ocio,
                    placeholder: "Ocio",
                    autoComplete: "off",
                    className: "text-2xl font-extrabold",
                    onKeyDown: handleKeyDown,
                    tabIndex: 3
                  }
                ),
                /* @__PURE__ */ jsx(ErrorMessage, { children: (_h = (_g = saveItinerarioNameFetcher.data) == null ? void 0 : _g.errors) == null ? void 0 : _h.itinerarioOcio })
              ] }),
              /* @__PURE__ */ jsx("button", { name: "_action", value: "itinerarioOcio", type: "submit", children: /* @__PURE__ */ jsx(SaveIcon, {}) }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    type: "text",
                    name: "itinerarioViaje",
                    defaultValue: itinerario.viaje,
                    placeholder: "Viaje",
                    autoComplete: "off",
                    className: "text-2xl font-extrabold",
                    onKeyDown: handleKeyDown,
                    tabIndex: 4
                  }
                ),
                /* @__PURE__ */ jsx(ErrorMessage, { children: (_j = (_i = saveItinerarioNameFetcher.data) == null ? void 0 : _i.errors) == null ? void 0 : _j.itinerarioViaje })
              ] }),
              /* @__PURE__ */ jsx("button", { name: "_action", value: "itinerarioViaje", type: "submit", children: /* @__PURE__ */ jsx(SaveIcon, {}) }),
              /* @__PURE__ */ jsx("input", { type: "hidden", name: "itinerarioID", value: itinerario.id }),
              /* @__PURE__ */ jsx(ErrorMessage, { className: "pl-2", children: (_l = (_k = saveItinerarioNameFetcher.data) == null ? void 0 : _k.errors) == null ? void 0 : _l.itinerarioID })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(deleteItinerarioFetcher.Form, { method: "post", className: "pt-4", children: [
          /* @__PURE__ */ jsx("input", { type: "hidden", name: "itinerarioID", value: itinerario.id }),
          /* @__PURE__ */ jsx(ErrorMessage, { className: "pb-2", children: (_n = (_m = deleteItinerarioFetcher.data) == null ? void 0 : _m.errors) == null ? void 0 : _n.itinerarioID }),
          /* @__PURE__ */ jsx(
            DeleteButton,
            {
              className: "w-full",
              name: "_action",
              value: "deleteItinerario",
              children: "Eliminar itinerario"
            }
          )
        ] })
      ]
    }
  );
}
function ErrorBoundary() {
  return /* @__PURE__ */ jsx("div", { className: "text-red-500 p-4 text-center", children: "¡Algo salió mal! Por favor intenta nuevamente." });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  action: action$5,
  default: ItinerarioDeViajes,
  loader: loader$7
}, Symbol.toStringTag, { value: "Module" }));
async function sendEmail(message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  try {
    const info = await transporter.sendMail(message);
    console.log("Correo enviado exitosamente:", info.response);
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}
function generateLoginValidateCode() {
  const code = Math.floor(1e5 + Math.random() * 9e5);
  const createdAt = Date.now();
  const validateCode = {
    code,
    createdAt
  };
  return validateCode;
}
async function sendCodeEmail(userId, code) {
  const user = await getUserById(userId);
  if (!user) {
    return;
  }
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const message = {
    from: `TurismoEspaña <${process.env.EMAIL_FROM}>`,
    to: user.email,
    subject: "Código de verificación para iniciar sesión",
    html: `
        <!DOCTYPE html>
        <html lang="es">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Correo de verificación TurismoEspaña</title>
          </head>
          <body
            style="font-family: Arial, sans-serif; background-color: #f4f7fa; margin: 0; padding: 0.05rem; color: #333;"
          >
            <div
              style="max-width: 600px; margin: 20px auto; background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
            >
              <h1
                style="text-align: center; font-size: 28px; color: #333; font-weight: bold; margin-bottom: 20px;"
              >
                ¡Hola, ${user.name}!
              </h1>
    
              <p
                style="font-size: 16px; color: #555; line-height: 1.5; margin-bottom: 20px;"
              >
                Este es tu correo de verificación para acceder a tu cuenta de
                <strong>TurismoEspaña</strong>. Tu código de verificación para iniciar
                sesión es el siguiente:
              </p>
    
              <h2
                style="text-align: center; font-size: 30px; color: #007bff; background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 0;"
              >
                ${code}
              </h2>
    
              <p
                style="font-size: 14px; color: #777; line-height: 1.5; margin-top: 20px;"
              >
                Este código es válido por un tiempo limitado. No lo compartas con
                nadie.
              </p>
    
              <p
                style="font-size: 14px; color: #777; line-height: 1.5;"
              >
                Si no solicitaste este código, puedes ignorar este mensaje sin
                ningún problema.
              </p>
    
              <p
                style="font-size: 16px; color: #555; text-align: left; margin-top: 20px;"
              >
                Saludos,<br />
                El equipo de soporte de <strong>TurismoEspaña</strong>.
              </p>
    
              <p
                style="text-align: center; font-size: 14px; color: rgba(0, 0, 0, 0.54); margin-top: 20px;"
              >
                © ${currentYear} TurismoEspaña. Todos los derechos reservados.
              </p>
            </div>
          </body>
        </html>
      `
  };
  return await sendEmail(message);
}
async function validateLoginCode(request, codeConfirmation) {
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  const code = session.get("code");
  const codeExpiresAt = code.createdAt + 5 * 60 * 1e3;
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return redirect("/");
  }
  const user = await getUserById(userId);
  if (!user) {
    return redirect("/");
  }
  if (Date.now() > codeExpiresAt) {
    session.unset("code");
    return json({ errors: { code: "El código de validación ha expirado. Ya mismo le enviamos otro." } }, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
  if (code.code !== codeConfirmation.code) {
    return json({ errors: { code: "El código introducido no es válido." } });
  } else {
    session.unset("code");
    session.set("userId", void 0);
    session.set("username", void 0);
    session.set("userId", user.id);
    session.set("username", user.name);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
}
const loader$6 = async ({ request }) => {
  await userNotLoggedRequired(request);
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  if (!userId) {
    return redirect("/");
  }
  const user = await getUserById(userId);
  if (!user) {
    return redirect("/");
  }
  const cookieHeader = request.headers.get("cookie");
  const session = await getSession(cookieHeader);
  if (!session.get("code")) {
    const code = generateLoginValidateCode();
    if (process.env.NODE_ENV === "production") {
      await sendCodeEmail(user.id, code.code);
    } else {
      console.log("Código de validación: ", code.code);
    }
    session.set("code", code);
  }
  return json({
    user: {
      name: user.name,
      email: user.email
    }
  }, {
    headers: {
      "Set-Cookie": await commitSession(session)
    }
  });
};
async function action$4({ request }) {
  await userNotLoggedRequired(request);
  const formData = await request.formData();
  const codeFromForm = formData.get("codeConfirm");
  if (!/^\d{6}$/.test(codeFromForm)) {
    return json({ errors: { code: "El código debe ser un número de 6 dígitos." } });
  }
  const codeConfirm = {
    code: parseInt(codeFromForm, 10),
    createdAt: Date.now()
  };
  return await validateLoginCode(request, codeConfirm);
}
if (typeof window !== "undefined") {
  ReactModal.setAppElement("body");
}
function ValidateUser() {
  var _a;
  const data = useLoaderData();
  const actionData = useActionData();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const handleChange = (index, value) => {
    var _a2;
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) {
      (_a2 = inputsRef.current[index + 1]) == null ? void 0 : _a2.focus();
    }
  };
  const handleKeyDown = (index, event) => {
    var _a2, _b, _c;
    if (event.key === "Backspace" && !code[index] && index > 0) {
      (_a2 = inputsRef.current[index - 1]) == null ? void 0 : _a2.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      (_b = inputsRef.current[index - 1]) == null ? void 0 : _b.focus();
    }
    if (event.key === "ArrowRight" && index < code.length - 1) {
      (_c = inputsRef.current[index + 1]) == null ? void 0 : _c.focus();
    }
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      let newValue = parseInt(code[index] || "0", 10);
      newValue = event.key === "ArrowUp" ? Math.min(newValue + 1, 9) : Math.max(newValue - 1, 0);
      handleChange(index, newValue.toString());
    }
  };
  const submit = useSubmit();
  const handleSubmit = (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    const formData = new FormData(e.target);
    formData.set("codeConfirm", fullCode);
    submit(formData, { method: "post" });
  };
  return /* @__PURE__ */ jsx(ReactModal, { isOpen: true, className: "modal", children: /* @__PURE__ */ jsxs("div", { className: "modal__container", children: [
    /* @__PURE__ */ jsxs("div", { className: "modal__container__header", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/login",
          replace: true,
          className: "modal__container__header__link",
          children: /* @__PURE__ */ jsx(XIcon, {})
        }
      ),
      /* @__PURE__ */ jsxs("h1", { className: "modal__container__header__title", children: [
        "Hola, ",
        data == null ? void 0 : data.user.name,
        ". Verifique que es usted"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "post", className: "modal__container__form", onSubmit: (e) => handleSubmit(e), children: [
      /* @__PURE__ */ jsxs("h2", { className: "modal__container__form__header", children: [
        "Introduzca el código que hemos enviado a ",
        data == null ? void 0 : data.user.email
      ] }),
      /* @__PURE__ */ jsx("div", { className: "modal__container__form__container space-x-2", children: code.map((value, index) => /* @__PURE__ */ jsx(
        "input",
        {
          ref: (el) => inputsRef.current[index] = el,
          type: "text",
          value,
          name: "code",
          autoComplete: "off",
          defaultValue: "",
          maxLength: 1,
          inputMode: "numeric",
          pattern: "[0-9]*",
          className: "modal__container__form__container__input",
          onChange: (e) => handleChange(index, e.target.value),
          onKeyDown: (e) => handleKeyDown(index, e),
          onFocus: (e) => e.target.select()
        },
        index
      )) }),
      /* @__PURE__ */ jsx(ErrorMessage, { children: (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.code }),
      /* @__PURE__ */ jsx(ButtonSubmit, { children: "Enviar" })
    ] })
  ] }) });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$4,
  default: ValidateUser,
  loader: loader$6
}, Symbol.toStringTag, { value: "Module" }));
const loader$5 = async ({ request }) => {
  const url = new URL(request.url);
  let page = Number(url.searchParams.get("page")) || 1;
  const totalPages = await getTotalPages() / 8;
  const user = await getCurrentUser(request);
  const userFavsProvincies = await getUserFavoriteProvinces((user == null ? void 0 : user.id) || "");
  const data = userFavsProvincies.map((province2) => province2.name);
  if (page <= 0) {
    page = 1;
  }
  if (page > totalPages) {
    page = Math.round(totalPages);
  }
  const province = await getAllProvincies(page);
  return json({
    province,
    page,
    totalPages,
    isLoggedIn: user !== null,
    data
  });
};
const action$3 = async ({ request, params }) => {
  const actionData = await request.formData();
  const user = await getCurrentUser(request);
  switch (actionData.get("_action")) {
    case "addToFavorite": {
      provinceToFavorites((user == null ? void 0 : user.id) ? user.id : "", String(actionData.get("provinceId")));
    }
    case "deleteFromFavorite": {
      deleteProvinceFromFavorites((user == null ? void 0 : user.id) ? user.id : "", String(actionData.get("provinceId")));
    }
    default:
      return null;
  }
};
function provincias() {
  const { province, page, totalPages, isLoggedIn, data } = useLoaderData();
  const addToFavoriteFetcher = useFetcher();
  const deleteFromFavoriteFetcher = useFetcher();
  const addToFavorite = (provinceId) => addToFavoriteFetcher.submit({
    _action: "addToFavorite",
    provinceId
  }, { method: "post" });
  const deleteFromFavorite = (provinceId) => deleteFromFavoriteFetcher.submit({
    _action: "deleteFromFavorite",
    provinceId
  }, { method: "post" });
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-4xl text-red-600 font-semibold uppercase mt-6 text-center", children: "Provincias de España" }),
    /* @__PURE__ */ jsx("div", { className: "my-6 mx-16 grid grid-cols-[repeat(auto-fit,minmax(600px,1fr))] gap-3 w-[90%]", children: province.map((provincia) => {
      return /* @__PURE__ */ jsx(
        ProvincieCard,
        {
          id: provincia.id,
          imageUrl: provincia.imageUrl,
          name: provincia.name,
          info: provincia.description,
          climate: provincia.climate,
          places: provincia.recommendedPlaces,
          food: provincia.typicalFood,
          festivities: provincia.festivities,
          beaches: provincia.beaches,
          logged: isLoggedIn,
          inFav: data.includes(provincia.name),
          successFunction: data.includes(provincia.name) ? deleteFromFavorite : addToFavorite
        },
        provincia.id
      );
    }) }),
    /* @__PURE__ */ jsx(ProvincePagination, { currentPage: page, totalPages: Math.round(totalPages) })
  ] }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$3,
  default: provincias,
  loader: loader$5
}, Symbol.toStringTag, { value: "Module" }));
const loader$4 = async ({ params }) => {
  const provinceId = params == null ? void 0 : params.id;
  if (typeof provinceId === "string") {
    const province = await getProvinceById(provinceId);
    if (!province) {
      return redirect("/");
    }
    return json(province);
  }
  return redirect("/");
};
function Province() {
  const data = useLoaderData();
  if (!data) {
    return /* @__PURE__ */ jsx("h2", { className: "text-center text-red-600 text-lg", children: "No se encontró la provincia" });
  }
  return /* @__PURE__ */ jsx("div", { className: "container mx-auto p-6", children: /* @__PURE__ */ jsx(
    ProvincieDetail,
    {
      name: data.name,
      imageUrl: data.imageUrl,
      detaildes: data.detaildes,
      desparrafo: data.desparrafo,
      detailfest: data.detailfest,
      festparrafo: data.festparrafo,
      festUrl: data.festUrl,
      detailfood: data.detailfood,
      foodparrafo: data.foodparrafo,
      foodUrl: data.foodUrl,
      detailsite: data.detailsite,
      siteparrafo: data.siteparrafo,
      siteUrl: data.siteUrl
    }
  ) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Province,
  loader: loader$4
}, Symbol.toStringTag, { value: "Module" }));
const loader$3 = async ({ request }) => {
  await userNotLoggedRequired(request);
  return null;
};
const registerSchema = z.object({
  email: z.string().email("Se ha introducido un email inválido."),
  username: z.string().min(5, "El nombre de usuario requiere al menos de 5 caracteres."),
  password: z.string().min(5, "La contraseña tiene que ser de al menos 5 caracteres.")
});
const action$2 = async ({ request }) => {
  const formData = await request.formData();
  return validateForm(
    formData,
    registerSchema,
    async ({ email, username, password }) => {
      const user = await getUser(email);
      if (user == null) {
        const image = formData.get("image-profile");
        try {
          if (image && typeof image === "object" && "arrayBuffer" in image) {
            const imageBuffer = await image.arrayBuffer();
            const resolvedImage = await sharp(Buffer.from(imageBuffer)).toBuffer();
            const base64Image = `data:image/jpeg;base64,${resolvedImage.toString("base64")}`;
            await createUser(email, username, password, base64Image);
            return redirect("/login");
          }
        } catch (error) {
          const defaultFile = "/img/imagen-perfil-default.jpg";
          await createUser(email, username, password, defaultFile);
          return redirect("/login");
        }
      } else {
        return json({ errors: { email: "El usuario introducido ya existe." } });
      }
    },
    (errors) => json({
      errors,
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password")
    }, { status: 403 })
  );
};
function register() {
  var _a, _b, _c;
  const actionData = useActionData();
  const defaultFile = "/img/imagen-perfil-default.jpg";
  const [imageSrc, setImageSrc] = useState(defaultFile);
  const submit = useSubmit();
  return /* @__PURE__ */ jsxs("div", { className: "form-container", children: [
    /* @__PURE__ */ jsxs(
      Form,
      {
        className: "form-container__form",
        method: "POST",
        encType: "multipart/form-data",
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            submit(formData, { method: "post", replace: true });
          }
        },
        children: [
          /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("button", { className: "form-container__form__button-exit", children: "Atrás" }) }),
          /* @__PURE__ */ jsx("h1", { className: "form-container__form__title", children: "Registro" }),
          /* @__PURE__ */ jsxs("div", { className: "form-container__form__image-container", children: [
            /* @__PURE__ */ jsx("img", { src: imageSrc, alt: "" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                name: "image-profile",
                id: "image-profile",
                accept: "image/*",
                onChange: (e) => {
                  var _a2;
                  const profileImage = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                  if (profileImage) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      var _a3;
                      if (((_a3 = event.target) == null ? void 0 : _a3.result) && typeof event.target.result === "string") {
                        setImageSrc(event.target.result);
                      }
                    };
                    reader.readAsDataURL(profileImage);
                  } else {
                    setImageSrc(defaultFile);
                  }
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                className: "form-container__form__image-container__label",
                htmlFor: "image-profile",
                children: "Cambiar foto"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("input", { type: "email", name: "email", placeholder: "Email", defaultValue: actionData == null ? void 0 : actionData.email }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("input", { type: "text", name: "username", placeholder: "Nombre de usuario", defaultValue: actionData == null ? void 0 : actionData.username }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("input", { type: "password", name: "password", placeholder: "Contraseña" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx(ButtonSubmit, { children: "Registrarse" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email }),
    /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.username }),
    /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_c = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _c.password }),
    /* @__PURE__ */ jsx(Link, { className: "form-container__message", to: "../login", children: "¿Ya tiene una cuenta? Inicie sesión ahora" })
  ] });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$2,
  default: register,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const profileSchema = z.object({
  username: z.string().min(5, "El nombre de usuario requiere al menos de 5 caracteres.")
});
const loader$2 = async ({ request }) => {
  const user = await userLoggedRequired(request);
  return json({
    user: {
      "username": user.name,
      "profileImage": user.imageUrl
    }
  });
};
const action$1 = async ({ request }) => {
  const user = await userLoggedRequired(request);
  const formData = await request.formData();
  const image = formData.get("image-profile");
  return validateForm(
    formData,
    profileSchema,
    async (data) => {
      try {
        if (image && typeof image === "object" && "arrayBuffer" in image) {
          const imageBuffer = await image.arrayBuffer();
          const resolvedImage = await sharp(Buffer.from(imageBuffer)).toBuffer();
          const base64Image = `data:image/jpeg;base64,${resolvedImage.toString("base64")}`;
          await updateUser(user.id, data.username, base64Image);
          return redirect("/");
        }
      } catch (error) {
        await updateUser(user.id, data.username);
        return redirect("/");
      }
    },
    (errors) => json({ errors, username: formData.get("username") })
  );
};
function Profile() {
  var _a;
  const data = useLoaderData();
  const actionData = useActionData();
  const imageDefault = data.user.profileImage;
  const [imageSrc, setImageSrc] = useState(imageDefault);
  return /* @__PURE__ */ jsxs("div", { className: "form-container", children: [
    /* @__PURE__ */ jsxs(Form, { className: "form-container__form", method: "POST", encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("button", { className: "form-container__form__button-exit", children: "Atrás" }) }),
      /* @__PURE__ */ jsx("h1", { className: "form-container__form__title", children: "Editar perfil" }),
      /* @__PURE__ */ jsxs("div", { className: "form-container__form__image-container", children: [
        /* @__PURE__ */ jsx("img", { src: imageSrc, alt: "" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "file",
            name: "image-profile",
            id: "image-profile",
            accept: "image/*",
            onChange: (e) => {
              var _a2;
              const profileImage = (_a2 = e.target.files) == null ? void 0 : _a2[0];
              if (profileImage) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  var _a3;
                  if (((_a3 = event.target) == null ? void 0 : _a3.result) && typeof event.target.result === "string") {
                    setImageSrc(event.target.result);
                  }
                };
                reader.readAsDataURL(profileImage);
              } else {
                const imageNotSelected = "/img/imagen-perfil-default.jpg";
                setImageSrc(imageNotSelected);
              }
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "form-container__form__image-container__label",
            htmlFor: "image-profile",
            children: "Cambiar foto"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("input", { type: "text", name: "username", placeholder: "Nombre de usuario", defaultValue: data == null ? void 0 : data.user.username }),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(ButtonSubmit, { onClick: (event) => {
        if (!confirm("¿Estás seguro de que desea aplicar los cambios?")) {
          event.preventDefault();
        }
      }, children: "Guardar cambios" })
    ] }),
    /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.username })
  ] });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: Profile,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const items = [
  {
    id: 1,
    imageUrl: "../../img/alhambra.jpg",
    title: "Cultura Y Arte",
    description: "Cultura de España",
    buttonText: "Mas Detalles"
  },
  {
    id: 2,
    imageUrl: "../../img/jamon.png",
    title: "Gastronomía",
    description: "La mejor gastronomía del mundo",
    buttonText: "Mas Detalles"
  },
  {
    id: 3,
    imageUrl: "../../img/playa.jpg",
    title: "Playas Y Costas",
    description: "Playas y costas para veranear",
    buttonText: "Mas Detalles"
  }
];
const Acordeon = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };
  const handleMouseLeave = () => {
    setActiveIndex(null);
  };
  return /* @__PURE__ */ jsx("section", { className: "acordeon", children: /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("h2", { className: "acordeon__headline", children: "Descubre España" }),
    /* @__PURE__ */ jsx("ul", { className: "acordeon__list", children: items.map((item, index) => /* @__PURE__ */ jsx(
      "li",
      {
        className: `acordeon__item ${activeIndex === index ? "acordeon__item--active" : ""}`,
        style: { backgroundImage: `url(${item.imageUrl})` },
        onMouseEnter: () => handleMouseEnter(index),
        onMouseLeave: handleMouseLeave,
        children: activeIndex === index && /* @__PURE__ */ jsxs("div", { className: "acordeon__content", children: [
          /* @__PURE__ */ jsx(
            "h3",
            {
              className: "acordeon__title",
              style: {
                color: "white",
                fontWeight: "800",
                fontSize: "1.8rem",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)"
              },
              children: item.title
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "acordeon__description",
              style: {
                color: "white",
                fontWeight: "600",
                fontSize: "1rem",
                textShadow: "1px 1px 4px rgba(0, 0, 0, 0.7)"
              },
              children: item.description
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "acordeon__button",
              style: {
                backgroundColor: "#d6001c",
                color: "white",
                border: "2px solid #d6001c",
                padding: "0.5rem 1rem",
                fontSize: "1rem",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background-color 0.3s, border-color 0.3s"
              },
              onMouseEnter: (e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "yellow";
                e.currentTarget.style.borderColor = "yellow";
              },
              onMouseLeave: (e) => {
                e.currentTarget.style.backgroundColor = "#d6001c";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "#d6001c";
              },
              children: item.buttonText
            }
          )
        ] })
      },
      item.id
    )) })
  ] }) });
};
function Slider() {
  const urlImg = "../../img/";
  const imagenes = [urlImg + "imgSlider1.jpg", urlImg + "imgSlider2.avif", urlImg + "imgSlider3.avif", urlImg + "imgSlider4.avif", urlImg + "imgSlider5.jpg"];
  useState(0);
  return /* @__PURE__ */ jsxs(
    Swiper,
    {
      className: classNames(
        "w-full",
        "container-slider"
      ),
      modules: [Pagination, Autoplay, Navigation],
      pagination: {
        clickable: true
      },
      autoplay: {
        delay: 5e3,
        disableOnInteraction: false
      },
      navigation: true,
      loop: true,
      lazyPreloadPrevNext: 1,
      centeredSlides: true,
      slidesPerView: 1,
      resizeObserver: false,
      children: [
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(SliderItem, { imgUrl: imagenes[0], titulo: "Descubre España con Nosotros", subtitulo: "Innumerables paisajes" }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(SliderItem, { imgUrl: imagenes[1], titulo: "La esencia de la naturaleza", subtitulo: "Biodiversidad única" }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(SliderItem, { imgUrl: imagenes[2], titulo: "Vibrantes ciudades nocturnas", subtitulo: "Actividad incluso de noche" }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(SliderItem, { imgUrl: imagenes[3], titulo: "Paraíso frente al mar", subtitulo: "Maravillosas playas" }) }),
        /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx(SliderItem, { imgUrl: imagenes[4], titulo: "Historia y cultura en cada paso", subtitulo: "Explora sitios históricos" }) })
      ]
    }
  );
}
function SliderItem({ imgUrl, titulo, subtitulo }) {
  return /* @__PURE__ */ jsxs("div", { className: "w-full h-full overflow-hidden m-auto", children: [
    /* @__PURE__ */ jsx("img", { src: imgUrl, alt: "xd", className: "w-full h-full object-cover" }),
    /* @__PURE__ */ jsxs("div", { className: classNames(
      "flex flex-col items-center absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2",
      "text-white text-center text-2xl font-semibold md:text-4xl"
    ), children: [
      /* @__PURE__ */ jsx("span", { className: "text-base", children: subtitulo }),
      /* @__PURE__ */ jsx("span", { className: "mainTitle", children: titulo }),
      /* @__PURE__ */ jsx("button", { className: classNames(
        "text-xl w-32 h-12 mt-4 translate-y-0 bg-[rgba(0,0,0,0.35)]",
        "hvr-sweep-to-top"
      ), children: "Navegar" })
    ] })
  ] });
}
function TochoSection({ title, text, imageUrl, reverse = false }) {
  return /* @__PURE__ */ jsxs("div", { className: `tocho-section ${reverse ? "tocho-section--reverse" : ""}`, children: [
    /* @__PURE__ */ jsxs("div", { className: "tocho-section__text", children: [
      /* @__PURE__ */ jsx("h2", { children: title }),
      /* @__PURE__ */ jsx("p", { children: text })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "tocho-section__image", children: /* @__PURE__ */ jsx("img", { src: imageUrl, alt: "Section illustration" }) })
  ] });
}
function Tocho() {
  const urlImg = "../../img/";
  return /* @__PURE__ */ jsxs("div", { className: "tocho", children: [
    /* @__PURE__ */ jsx(
      TochoSection,
      {
        title: "Evoluciona tu paladar: Un viaje por los sabores de España",
        text: "La gastronomía española es un festín para los sentidos. Desde los aromas inconfundibles del azafrán en la paella valenciana hasta la explosión de sabores de unas tapas bien servidas, cada rincón del país cuenta una historia a través de sus platos. España es tierra de mercados vibrantes, bodegas ancestrales y cocinas de vanguardia que han conquistado el mundo. Aquí, tradición e innovación se entrelazan para deleitar al viajero con una experiencia culinaria única. Prepara tu paladar para una aventura inolvidable entre texturas, colores y sabores que solo España puede ofrecer.",
        imageUrl: urlImg + "tapas.jpg"
      }
    ),
    /* @__PURE__ */ jsx(
      TochoSection,
      {
        title: "Latidos del arte y la cultura: España, musa de generaciones",
        text: "En España, cada rincón cuenta historias que trascienden siglos, desde las pinturas rupestres de Altamira hasta los modernos trazos de Picasso. Es un país donde la arquitectura es poesía en piedra, como lo demuestran la Alhambra o la Sagrada Familia. La música, desde el flamenco apasionado hasta las zarzuelas, vibra en el corazón de su gente. Las tradiciones, festivales y costumbres pintan un mosaico cultural rico y diverso, invitándote a descubrir un legado que sigue vivo en cada gesto, danza y obra de arte.",
        imageUrl: urlImg + "flamenco.jpg",
        reverse: true
      }
    ),
    /* @__PURE__ */ jsx(
      TochoSection,
      {
        title: "Horizontes de sol y sal: La magia de las costas españolas",
        text: "España es sinónimo de playas de ensueño y costas llenas de vida. Desde las calas escondidas del Mediterráneo hasta las interminables playas doradas del Atlántico, cada costa tiene su propio encanto. Descubre la brisa salada que acaricia la Costa Brava, el ritmo vibrante de las Baleares o la serenidad de las Rías Gallegas. Sumérgete en aguas cristalinas, pasea por pintorescos pueblos costeros y siente cómo el sol y el mar se convierten en parte de ti. En España, las costas no son solo destinos; son puertas hacia la felicidad.",
        imageUrl: urlImg + "costa.jpg"
      }
    )
  ] });
}
function Index() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "container-slider", children: /* @__PURE__ */ jsx(Slider, {}) }),
    /* @__PURE__ */ jsx("div", { className: "Acordeon", children: /* @__PURE__ */ jsx(Acordeon, {}) }),
    /* @__PURE__ */ jsx("div", { className: "tocho", id: "tocho-section", children: /* @__PURE__ */ jsx(Tocho, {}) })
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
const loader$1 = async ({ request }) => {
  await userLoggedRequired(request);
  const cookie = request.headers.get("cookie");
  const session = await getSession(cookie);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session)
    }
  });
};
function Logout() {
  return null;
}
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Logout,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const formSchema = z.object({
  email: z.string().email("Se ha introducido un email inválido."),
  password: z.string()
});
const loader = async ({ request }) => {
  await userNotLoggedRequired(request);
  return null;
};
const action = async ({ request }) => {
  await userNotLoggedRequired(request);
  const formData = await request.formData();
  return validateForm(
    formData,
    formSchema,
    async ({ email, password }) => {
      const user = await getUser(email);
      if (user == null) {
        return json$1({ errors: { email: "El usuario o la contraseña no son correctos." } });
      }
      const passwordHashed = user.password;
      const passwordIsCorrect = await comparePasswords(password, passwordHashed);
      if (passwordIsCorrect) {
        return redirect$1(`/login/validateUser?userId=${user.id}`);
      }
      return json$1({ errors: { email: "El usuario o la contraseña no son correctos." } });
    },
    (errors) => json$1({ errors, email: formData.get("email"), username: formData.get("username") }, { status: 403 })
  );
};
function login() {
  var _a, _b;
  const actionData = useActionData();
  const submit = useSubmit();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsxs("div", { className: "form-container", children: [
      /* @__PURE__ */ jsxs(
        Form,
        {
          className: "form-container__form",
          method: "POST",
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const form = e.currentTarget;
              const formData = new FormData(form);
              submit(formData, { method: "post", replace: true });
            }
          },
          children: [
            /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx("button", { className: "form-container__form__button-exit", children: "Atrás" }) }),
            /* @__PURE__ */ jsx("h1", { className: "form-container__form__title", children: "Iniciar sesión" }),
            /* @__PURE__ */ jsx("input", { type: "email", name: "email", placeholder: "Email", defaultValue: actionData == null ? void 0 : actionData.email }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("input", { type: "password", name: "password", placeholder: "Contraseña" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx(ButtonSubmit, { children: "Iniciar sesión" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_a = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _a.email }),
      /* @__PURE__ */ jsx(ErrorMessage, { className: "form-container__form-error", children: (_b = actionData == null ? void 0 : actionData.errors) == null ? void 0 : _b.username }),
      /* @__PURE__ */ jsx(Link, { className: "form-container__message", to: "../register", children: "¿Aún no tiene cuenta? Regístrese ahora" })
    ] })
  ] });
}
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: login,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cn2oKMzw.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/components-Drm0OdQ5.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DjFRDfbu.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js", "/assets/forms-CvZqWo5f.js", "/assets/icons-B63PWRLh.js"], "css": ["/assets/root-D1-X_NKg.css"] }, "routes/provinciasFavoritas": { "id": "routes/provinciasFavoritas", "parentId": "root", "path": "provinciasFavoritas", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/provinciasFavoritas-9FYGFs09.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/provinces-CWDqPaVO.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js", "/assets/icons-B63PWRLh.js"], "css": [] }, "routes/itinerarioDeViajes": { "id": "routes/itinerarioDeViajes", "parentId": "root", "path": "itinerarioDeViajes", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/itinerarioDeViajes-CZbLh5Oo.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/index-CHD5LLT7.js", "/assets/icons-B63PWRLh.js", "/assets/forms-CvZqWo5f.js", "/assets/components-Drm0OdQ5.js"], "css": [] }, "routes/login.validateUser": { "id": "routes/login.validateUser", "parentId": "routes/login", "path": "validateUser", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login.validateUser-Cvzu8YX8.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/components-Drm0OdQ5.js", "/assets/forms-CvZqWo5f.js", "/assets/icons-B63PWRLh.js", "/assets/index-CHD5LLT7.js"], "css": [] }, "routes/provincias._index": { "id": "routes/provincias._index", "parentId": "root", "path": "provincias", "index": true, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/provincias._index-CtSaJ5Bt.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/provinces-CWDqPaVO.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js", "/assets/icons-B63PWRLh.js"], "css": [] }, "routes/provincias.$id": { "id": "routes/provincias.$id", "parentId": "root", "path": "provincias/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/provincias._id-B1irO6rf.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/provinces-CWDqPaVO.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js", "/assets/icons-B63PWRLh.js"], "css": [] }, "routes/register": { "id": "routes/register", "parentId": "root", "path": "register", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/register-Da78wntS.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/forms-CvZqWo5f.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js"], "css": [] }, "routes/profile": { "id": "routes/profile", "parentId": "root", "path": "profile", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/profile-7iQMKS2K.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/forms-CvZqWo5f.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BkUqoylE.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/index-CHD5LLT7.js"], "css": ["/assets/_index-BwXjGcf2.css"] }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/logout-CSxRPO1x.js", "imports": [], "css": [] }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/login-BoD8pVUZ.js", "imports": ["/assets/jsx-runtime-DQs7YwYB.js", "/assets/forms-CvZqWo5f.js", "/assets/components-Drm0OdQ5.js", "/assets/index-CHD5LLT7.js"], "css": [] } }, "url": "/assets/manifest-705506c0.js", "version": "705506c0" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/provinciasFavoritas": {
    id: "routes/provinciasFavoritas",
    parentId: "root",
    path: "provinciasFavoritas",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/itinerarioDeViajes": {
    id: "routes/itinerarioDeViajes",
    parentId: "root",
    path: "itinerarioDeViajes",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/login.validateUser": {
    id: "routes/login.validateUser",
    parentId: "routes/login",
    path: "validateUser",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/provincias._index": {
    id: "routes/provincias._index",
    parentId: "root",
    path: "provincias",
    index: true,
    caseSensitive: void 0,
    module: route4
  },
  "routes/provincias.$id": {
    id: "routes/provincias.$id",
    parentId: "root",
    path: "provincias/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/register": {
    id: "routes/register",
    parentId: "root",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/profile": {
    id: "routes/profile",
    parentId: "root",
    path: "profile",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
