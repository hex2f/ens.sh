var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toESM(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/leahlundqvist/Code/ensh/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_node = require("@remix-run/node");
var import_react2 = require("@remix-run/react");

// app/components/card.tsx
function Card({ children }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: `
      card
      bg-white
      dark:bg-black
      z-10
      relative
      rounded-3xl
      w-xl
    `
  }, children);
}

// app/styles/app.css
var app_default = "/build/_assets/app-6NMVXP3W.css";

// app/utilities/accentHue.ts
function accentHue(accentHex) {
  let r = 0, g = 0, b = 0;
  if (accentHex.length == 4) {
    r = Number("0x" + accentHex[1] + accentHex[1]);
    g = Number("0x" + accentHex[2] + accentHex[2]);
    b = Number("0x" + accentHex[3] + accentHex[3]);
  } else if (accentHex.length == 7) {
    r = Number("0x" + accentHex[1] + accentHex[2]);
    g = Number("0x" + accentHex[3] + accentHex[4]);
    b = Number("0x" + accentHex[5] + accentHex[6]);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0;
  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = (g - b) / delta % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0)
    h += 360;
  return h;
}

// app/utilities/gradientAccent.ts
function gradientAccent(dark, accentHex) {
  const h = accentHue(accentHex);
  if (dark) {
    return `repeat url("/noise-dark.png"), radial-gradient(50% 50% at 50% 50%,hsl(${h}, 35%, 20%) 0,hsl(${h}, 50%, 3%) 100%)`;
  } else {
    return `repeat url("/noise.png"), radial-gradient(50% 50% at 50% 50%,hsl(${h}, 55%, 90%) 0,rgba(255,255,255,1) 100%)`;
  }
}

// app/utilities/icons.ts
var icons = {
  link: { viewBox: "0 0 24 24", body: `<path d="M8.465,11.293c1.133-1.133,3.109-1.133,4.242,0L13.414,12l1.414-1.414l-0.707-0.707c-0.943-0.944-2.199-1.465-3.535-1.465 S7.994,8.935,7.051,9.879L4.929,12c-1.948,1.949-1.948,5.122,0,7.071c0.975,0.975,2.255,1.462,3.535,1.462 c1.281,0,2.562-0.487,3.536-1.462l0.707-0.707l-1.414-1.414l-0.707,0.707c-1.17,1.167-3.073,1.169-4.243,0 c-1.169-1.17-1.169-3.073,0-4.243L8.465,11.293z"></path><path d="M12,4.929l-0.707,0.707l1.414,1.414l0.707-0.707c1.169-1.167,3.072-1.169,4.243,0c1.169,1.17,1.169,3.073,0,4.243 l-2.122,2.121c-1.133,1.133-3.109,1.133-4.242,0L10.586,12l-1.414,1.414l0.707,0.707c0.943,0.944,2.199,1.465,3.535,1.465 s2.592-0.521,3.535-1.465L19.071,12c1.948-1.949,1.948-5.122,0-7.071C17.121,2.979,13.948,2.98,12,4.929z"></path>` },
  opensea: { viewBox: "0 0 90 90", body: `<path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z"/>` },
  twitter: { viewBox: "0 0 512 512", body: `<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>` },
  github: { viewBox: "0 0 496 512", body: `<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>` }
};
function getIcon(name) {
  return icons[name] ?? icons.link;
}

// route:/Users/leahlundqvist/Code/ensh/app/root.tsx
function links() {
  return [
    { rel: "stylesheet", href: "/inter/inter.css" },
    { rel: "stylesheet", href: app_default }
  ];
}
var meta = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1"
});
var ETH_ADDR_REGEX = /^0x[a-fA-F0-9]{40}$/;
var loader = async ({ request, context, params }) => {
  var _a;
  const subdomains = (_a = request.headers.get("host")) == null ? void 0 : _a.split(".").slice(0, -2);
  console.log(subdomains);
  if (!subdomains || subdomains.length <= 0) {
    throw new Response("Wallet not found", {
      status: 404
    });
  }
  if (ETH_ADDR_REGEX.test(subdomains[0])) {
    const balance = await fetch(`https://blockscout.com/eth/mainnet/api?module=account&action=balance&address=${subdomains[0]}`);
    const balanceJson = await balance.json();
    console.log(balanceJson);
  }
  return (0, import_node.json)({
    accent: "#fc0394",
    accentHue: accentHue("#fc0394"),
    ens: "trans-rights.eth",
    address: "0x4b39ec3eef66f94af57b9af7e7bd216e20abb208",
    avatar: "https://pbs.twimg.com/profile_images/1517593953964642304/9-UrDOMV_400x400.png",
    balance: 0.011674162115510514,
    socialLinks: [
      { icon: getIcon("opensea"), name: "OpenSea", url: "https://opensea.io/0x4b39ec3eef66f94af57b9af7e7bd216e20abb208" },
      { icon: getIcon("twitter"), name: "Twitter", url: "https://twitter.com/leahlundqvist" },
      { icon: getIcon("github"), name: "Github", url: "https://github.com/leahlundqvist" }
    ],
    featuredTokens: [
      {
        name: "Komako Supersonic",
        image: "https://lh3.googleusercontent.com/b71v37rd8HFtW02xZAau-xOxpxy4KOpYl51XjbA3QxIXKzVt7bCQcFmIo4GlXEvw8LrFZZBxHpSVDBrwwPmEdCohKew062FdlA_kEDE=w600",
        collection: {
          name: "Shinsei Galverse",
          image: "https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120"
        }
      },
      {
        name: "Yadanar Twotinos",
        image: "https://lh3.googleusercontent.com/W_iNXFgXZtic4wDgPrzIKys6Ko_HocsDDcjMiS10t7Koy3dDihWBRl7t8DHyqYn_xiaG7KM8ZMob-lPoo7Gy_k7jfAU8Titc-J13Pw=w600",
        collection: {
          name: "Shinsei Galverse",
          image: "https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120"
        }
      },
      {
        name: "Metavatar #1027",
        image: "https://openseauserdata.com/files/1768b351673b137e29829e82718ef786.svg",
        collection: {
          name: "Metavatar on-chain",
          image: "https://lh3.googleusercontent.com/CMAtQkzeCLGjiw3l31iOH_K7WuXQIWfCQtMHvPmwpGUkEKeJFjpcgXnpYZ_gaXR0wjflG3dqEn_VuR0Rud2zZ8Qu3Hn1tt6RWTFhaxU=s120"
        }
      },
      {
        name: "trans-rights.eth",
        image: "https://openseauserdata.com/files/f40fd27a55593fbd18175cac02adafea.svg",
        collection: {
          name: "ENS: Ethereum Name Service",
          image: "https://lh3.googleusercontent.com/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ=s60"
        }
      }
    ]
  });
};
function App() {
  const wallet = (0, import_react2.useLoaderData)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react2.Meta, null), /* @__PURE__ */ React.createElement(import_react2.Links, null)), /* @__PURE__ */ React.createElement("body", {
    style: { fontFamily: "Inter" }
  }, /* @__PURE__ */ React.createElement(Card, null, /* @__PURE__ */ React.createElement(import_react2.Outlet, {
    context: wallet
  })), /* @__PURE__ */ React.createElement(import_react2.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react2.Scripts, null), /* @__PURE__ */ React.createElement(import_react2.LiveReload, null), /* @__PURE__ */ React.createElement("div", {
    id: "gradient-background",
    style: {
      background: gradientAccent(false, wallet.accent),
      width: "200vw",
      height: "200vh",
      transform: "translate(-50vw, -100vh)",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 0
    }
  })));
}

// route:/Users/leahlundqvist/Code/ensh/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
var import_react3 = require("@remix-run/react");

// app/components/clippaths/hexagon.tsx
var hexagon_default = `path("M193.248 69.51C185.95 54.1634 177.44 39.4234 167.798 25.43L164.688 20.96C160.859 15.4049 155.841 10.7724 149.998 7.3994C144.155 4.02636 137.633 1.99743 130.908 1.46004L125.448 1.02004C108.508 -0.340012 91.4873 -0.340012 74.5479 1.02004L69.0879 1.46004C62.3625 1.99743 55.8413 4.02636 49.9981 7.3994C44.155 10.7724 39.1367 15.4049 35.3079 20.96L32.1979 25.47C22.5561 39.4634 14.0458 54.2034 6.74789 69.55L4.39789 74.49C1.50233 80.5829 0 87.2441 0 93.99C0 100.736 1.50233 107.397 4.39789 113.49L6.74789 118.43C14.0458 133.777 22.5561 148.517 32.1979 162.51L35.3079 167.02C39.1367 172.575 44.155 177.208 49.9981 180.581C55.8413 183.954 62.3625 185.983 69.0879 186.52L74.5479 186.96C91.4873 188.32 108.508 188.32 125.448 186.96L130.908 186.52C137.638 185.976 144.163 183.938 150.006 180.554C155.85 177.17 160.865 172.526 164.688 166.96L167.798 162.45C177.44 148.457 185.95 133.717 193.248 118.37L195.598 113.43C198.493 107.337 199.996 100.676 199.996 93.93C199.996 87.1841 198.493 80.5229 195.598 74.43L193.248 69.51Z")`;

// route:/Users/leahlundqvist/Code/ensh/app/routes/index.tsx
var import_FaEthereum = require("@react-icons/all-files/fa/FaEthereum");
function Index() {
  const wallet = (0, import_react3.useOutletContext)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-center justify-center border-r border-r-gray-100 p-8"
  }, /* @__PURE__ */ React.createElement("div", {
    style: { clipPath: hexagon_default, width: 200, height: 188 },
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("img", {
    src: wallet.avatar,
    alt: "Wallet Avatar",
    className: "-translate-y-1.5"
  })), /* @__PURE__ */ React.createElement("span", {
    className: "text-lg font-bold"
  }, wallet.ens), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center text-sm text-gray-400"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "mr-2"
  }, wallet.address.slice(0, 5), "..", wallet.address.slice(-3)), /* @__PURE__ */ React.createElement(import_FaEthereum.FaEthereum, null), /* @__PURE__ */ React.createElement("span", null, wallet.balance.toFixed(3))), /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-2 justify-center w-full mt-4"
  }, wallet.socialLinks.map((link) => /* @__PURE__ */ React.createElement(SocialButton, {
    key: link.url,
    accent: wallet.accent,
    link
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col px-6 pt-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-cols-3 gap-3"
  }, wallet.featuredTokens.map((token) => /* @__PURE__ */ React.createElement(ImageToken, {
    key: token.name,
    nft: token,
    accentHue: wallet.accentHue
  })))));
}
function SocialButton({ link, accent }) {
  return /* @__PURE__ */ React.createElement("a", {
    href: link.url,
    className: `p-3 h-12 w-12 flex items-center justify-center rounded-xl border border-white border-opacity-10`,
    style: { backgroundColor: accent + "11", boxSizing: "border-box" }
  }, /* @__PURE__ */ React.createElement("svg", {
    stroke: "currentColor",
    fill: "currentColor",
    "stroke-width": "0",
    viewBox: link.icon.viewBox,
    className: "text-2xl",
    style: { color: accent },
    height: "1em",
    width: "1em",
    xmlns: "http://www.w3.org/2000/svg",
    dangerouslySetInnerHTML: { __html: link.icon.body }
  }));
}
function ImageToken({ nft, accentHue: accentHue2 }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "h-full w-full overflow-hidden rounded-2xl relative group z-30 cursor-pointer"
  }, /* @__PURE__ */ React.createElement("img", {
    src: nft.image,
    alt: nft.name,
    className: "object-fill w-full"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-0 p-2 h-full w-full z-20 flex flex-col justify-end translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all pointer-events-none",
    style: { background: `hsla(${accentHue2}, 30%, 40%, 80%)` }
  }, /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-sm text-ellipsis text-white whitespace-nowrap overflow-hidden mb-0.5 ml-0.5 translate-y-0.5 group-hover:translate-y-0 transition-transform"
  }, nft.name), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("img", {
    src: nft.collection.image,
    alt: nft.collection.name,
    className: "h-6 w-6 rounded-full mr-1"
  }), /* @__PURE__ */ React.createElement("span", {
    className: "font-bold text-xs text-ellipsis text-white opacity-80 whitespace-nowrap overflow-hidden"
  }, nft.collection.name))));
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { "version": "25b70d6f", "entry": { "module": "/build/entry.client-M4WSQU75.js", "imports": ["/build/_shared/chunk-JTV7YXFB.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-JMBH6KZV.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-D6QB432O.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-25B70D6F.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map
