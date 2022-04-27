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
  viewport: "width=device-width,initial-scale=1",
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
  console.log(walletJson)

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
    ]
  }

  console.log(wallet)

  // console.log(request.headers.get("sec-ch-prefers-color-scheme"))

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
        <HeaderIcon />
        <ThemeProvider dark={dark} accent={wallet.accent} accentHue={wallet.accentHue}>
          <OpenSeaProvider address={wallet.address}>
            <Card>
              <Outlet context={wallet} />
            </Card>
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
