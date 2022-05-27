import { useOutletContext } from "@remix-run/react";
import type Wallet from "~/wallet";

import { FaEthereum } from "@react-icons/all-files/fa/FaEthereum";
import SocialButton from "~/components/SocialButton";
import ImageToken from "~/components/ImageToken";
import WebGLMeshGradient from "~/components/WebGLMeshGradient";
import { Fragment, useEffect, useRef, useState } from "react";
import { useOpenSea } from "~/contexts/OpenSeaContext";
import Card from "~/components/card";
import HeaderIcon from "~/components/HeaderIcon";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = ({ parentsData }) => {
  console.log(parentsData.root.wallet.address)
  return ({
    charset: "utf-8",
    viewport: "width=device-width,initial-scale=1",
    'og:image': `https://${parentsData.root.wallet.address}.ens.sh/social.png`,
    'og:title': `[Ξ ${parentsData.root.wallet.balance.toFixed(2)}] ${parentsData.root.wallet.ens ?? parentsData.root.wallet.address}`
  })
}

export default function Index() {
  const wallet = useOutletContext<Wallet>()
  const opensea = useOpenSea()
  const [avatarLoaded, setAvatarLoaded] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)
  const imageref = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageref.current && imageref.current.complete) {
        setAvatarLoaded(true)
        clearInterval(interval)
      }
    }, 250)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Fragment>
      <HeaderIcon />
      <Card>
        <div className="md:flex md:flex-row md:h-xl md:max-h-xl">
          <div className="flex flex-col items-center justify-center md:border-r border-r-gray-100 dark:border-r-gray-800 p-8 px-12">
            <div className="relative mb-4">
              <div className={`transition-all duration-500 ${avatarLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} style={{ clipPath: 'url(#hex-hw-shapeclip-clipconfig)', height: 188, width: 200, overflow: 'hidden' }}>
                { wallet.avatar.length > 0 && !avatarFailed
                  ? <img ref={imageref} src={wallet.avatar} onLoad={() => setAvatarLoaded(true)} onError={() => { setAvatarFailed(true); setAvatarLoaded(true); }} alt={'Wallet Avatar'} className="-translate-y-1.5"/>
                  : <WebGLMeshGradient appear={() => setAvatarLoaded(true)} style={{ height: 188, width: 200 }}/>
                }
              </div>
            </div>
            <span className="text-lg dark:text-gray-50 font-bold cursor-pointer" onClick={() => navigator.clipboard.writeText(wallet.ens)}>{wallet.ens}</span>
            <div className="flex items-center text-sm text-gray-400">
              <span className="mr-2 cursor-pointer" onClick={() => navigator.clipboard.writeText(wallet.address)}>{wallet.address.slice(0, 5)}..{wallet.address.slice(-3)}</span>
              <FaEthereum />
              <span>{wallet.balance.toFixed(3)}</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center w-full mt-4 md:max-w-[12rem]">
              {wallet.socialLinks.map((link) => (
                <SocialButton key={link.url} link={link} />
              ))}
            </div>
          </div>
          <div className="md:flex md:flex-1 md:flex-col px-6 pt-6 pb-6 md:overflow-y-scroll">
            <div className="grid grid-cols-3 gap-3">
              {opensea.assets.map((asset, i) => (
                <ImageToken key={asset.permalink} asset={asset} i={i} />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}
