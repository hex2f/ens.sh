import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Card from "./components/card";
import styles from "./styles/app.css"
import type Wallet from "./wallet";
import getIcon from "./utilities/icons";
import accentHue from "./utilities/accentHue";
import ThemeProvider from "./contexts/ThemeContext";
import GradientBackground from "./components/GradientBackground";
import HexagonClipPath from "./components/clippaths/hexagon";
import HeaderIcon from "./components/HeaderIcon";
import type { OpenSeaAsset } from "./contexts/OpenSeaContext";
import OpenSeaProvider from "./contexts/OpenSeaContext";
import type { SocialLink } from "./wallet";
import gradientAccent from "./utilities/gradientAccent";

export function links() {
  return [
    { rel: "stylesheet", href: '/inter/inter.css' },
    { rel: "stylesheet", href: styles }
  ]
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
});

export const headers: HeadersFunction = () => ({
  'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
})

const SocialMap = {
  'com.github': (v: string) => ({ icon: getIcon('github'), name: 'GitHub', url: `https://github.com/${v}` }),
  'com.twitter': (v: string) => ({ icon: getIcon('twitter'), name: 'Twitter', url: `https://twitter.com/${v}` }),
  'com.discord': (v: string) => ({ icon: getIcon('link'), name: 'Discord', url: `https://discord.gg/${v}` }),
  'email': (v: string) => ({ icon: getIcon('email'), name: 'Email', url: `mailto:${v}` }),
  'url': (v: string) => ({ icon: getIcon('link'), name: 'Website', url: v })
} as { [key: string]: (v: string) => SocialLink }

export const loader: LoaderFunction = async ({ request, context, params }) => {
  const url = new URL(request.url);
  const screenshot = url.searchParams.get("screenshot") === 'true';
  console.log({ url, screenshot, a: url.searchParams.get("screenshot")  })

  const subdomains = request.headers.get("host")?.split('.').slice(0, -2)
  console.log(subdomains)
  if (!subdomains || subdomains.length <= 0) {
    throw new Response("Wallet not found", {
      status: 404,
    });
  }
  let walletJson
  try {
    const walletRes = await fetch(`http://${request.headers.get("host")}/wallet.json`)
    walletJson = await walletRes.json()
  } catch (e) {
    console.log(e)
    throw new Response("Failed to fetch wallet", {
      status: 500,
    });
  }
  const wallet: Wallet = {
    accent: walletJson.accent, // "#" + [...Array(6)].map(() => (~~(Math.random() * 16)).toString(16)).join(''),
    accentHue: accentHue(walletJson.accent),
    ens: walletJson.ens,
    address: walletJson.address,
    avatar: walletJson.avatar,
    balance: Number(walletJson.balance),// 0.011674162115510514,
    socialLinks: [
      { icon: getIcon("opensea"), name: 'OpenSea', url: `https://opensea.io/${walletJson.address}` },
      ...Object.entries(walletJson.textRecords ?? {}).map(([k, v]) => (k in SocialMap ? SocialMap[k] : SocialMap['url'])(v as string))
    ],
    openseaAssets: []
    // screenshot ? (await (async () => {
    //   try {
    //     const response = await fetch(`https://api.opensea.io/api/v1/assets?format=json&owner=${walletJson.address}`, { headers: { 'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36', 'cookie': '_gcl_au=1.1.926189489.1649934354; _fbp=fb.1.1649934354766.1135975112; _ga=GA1.2.1665557202.1649934354; csrftoken=LHDDqR64kvtDCKHrrLGqe16f1Ksrw25SdbWdVbmvKh3TaKLbjTw4ipScy6WAoBRO; amp_ddd6ec=_WFHhRChGfmv0riIMAUOLs.MHg0YjM5ZWMzZWVmNjZmOTRhZjU3YjlhZjdlN2JkMjE2ZTIwYWJiMjA4..1g14dhmae.1g14dj7r6.6c.68.ck; _ga_9VSBF2K4BX=GS1.1.1650541404.19.0.1650541404.0; __cf_bm=QQq.kD4CfHvO51_aYXmHEuXq1lqSoZCzTOLH24v256k-1651176969-0-AZjJWuy6dYJdd6ejyOjtneqC2U+Yha8yaV2HGmW0UJw/Tyv5x2XvZj4p4TE3KPdtyZsqRQYzzNjNiuWZrqliLXU=' } })
    //     const data = await response.json()
    //     return data.assets as OpenSeaAsset[]
    //   } catch (e) { console.log(e) }
    // })()) : undefined
  }

  return json({
    wallet,
    dark: request.headers.get("Sec-CH-Prefers-Color-Scheme") === "dark",
  })
};

export default function App() {
  const { wallet, dark = false } = useLoaderData<{ wallet: Wallet, dark: boolean }>()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <style>{`
          :root {
            --gradient-light: ${gradientAccent(false, wallet.accentHue)};
            --gradient-dark: ${gradientAccent(true, wallet.accentHue)};
          }
          @media (prefers-color-scheme: dark) {
            .gradient-bg { background: var(--gradient-dark); }
          }
          @media (prefers-color-scheme: light), @media (prefers-color-scheme: no-preference) {
            .gradient-bg { background: var(--gradient-light); }
          }
        `}</style>
        <title>{wallet.ens}</title>
      </head>
      <body>
        <HexagonClipPath />
        <ThemeProvider dark={dark} accent={wallet.accent} accentHue={wallet.accentHue}>
          <OpenSeaProvider address={wallet.address}>
            <Outlet context={wallet} />
          </OpenSeaProvider>
          <GradientBackground />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
