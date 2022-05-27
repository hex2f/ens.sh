import { useOutletContext } from "@remix-run/react";
import type Wallet from "~/wallet";

// import { FaEthereum } from "@react-icons/all-files/fa/FaEthereum";
import WebGLMeshGradient from "~/components/WebGLMeshGradient";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Fragment } from "react";
import HeaderIcon from "~/components/HeaderIcon";

export const loader: LoaderFunction = async ({ request, context, params,  }) => {
  console.log({context})
  // const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}`);
  // const data = await response.json();
  // setAssets(data.assets);
  // console.log(data.assets)
  return json({})
}

export default function Index() {
  const wallet = useOutletContext<Wallet>()

  return (
    <Fragment>
      <HeaderIcon className="absolute right-3 top-3 z-20 h-16 w-16 opacity-90" />

      <div className="h-full w-full z-10 flex flex-row">
        <div className="flex flex-col items-center justify-center p-8 px-12">
          <div className="flex gap-8 items-center relative">
            <div style={{ clipPath: 'url(#hex-hw-shapeclip-clipconfig)', height: 188, width: 200, minWidth: 200, overflow: 'hidden' }}>
              {wallet.avatar.length > 0 && <img src={wallet.avatar} alt={''} className="absolute -top-1.5"/>}
              <WebGLMeshGradient appear={() => {}} className="absolute" style={{ height: 188, width: 200 }}/>
            </div>
            <div>
              <p className="text-5xl dark:text-gray-50 font-bold cursor-pointer" onClick={() => navigator.clipboard.writeText(wallet.ens)}>{wallet.ens}</p>
              <span className="text-xl text-gray-400 cursor-pointer mt-1" onClick={() => navigator.clipboard.writeText(wallet.address)}>{wallet.address}</span>
              {/* <span className="text-gray-400 text-xl flex items-center mt-2">
                <FaEthereum className="mr-1" />
                <span>{wallet.balance.toFixed(4)}</span>
              </span> */}
              
              {wallet.openseaAssets && wallet.openseaAssets.length > 0 && <div className="relative h-12 gap-3 mt-3">
                {wallet.openseaAssets.slice(0, 10).map((asset, i) => (
                  <div key={asset.permalink} className="absolute top-0 h-24 w-24" style={{ left: `${i*2.5}rem`, zIndex: wallet.openseaAssets!.length - i }}>
                    <div className="w-full overflow-hidden rounded-2xl relative group z-30 cursor-pointer aspect-square shadow-lg">
                      <img src={asset.image_thumbnail_url ?? asset.image_preview_url ?? asset.image_url} alt={asset.name} className={`object-fill w-full h-full`} />
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
