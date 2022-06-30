import { useState } from "react"
import type { OpenSeaAsset } from "~/contexts/OpenSeaContext"
import { useTheme } from "~/contexts/ThemeContext"

export default function ImageToken({ asset, i }: { asset: OpenSeaAsset, i: number }) {
  const { accentHue } = useTheme()
  const [loaded, setLoaded] = useState(false)
  return (
    <a href={asset.permalink} target="_blank" rel="noreferrer">
      <div className="w-full overflow-hidden rounded-2xl relative group z-30 cursor-pointer aspect-square bg-slate-100 dark:bg-slate-800 fadeIn" style={{ animationDelay: `${50*(i%3 + Math.floor(i/3))}ms` }}>
        {
          asset.animation_url
            ? <video src={asset.animation_url} onPlay={() => setLoaded(true)} autoPlay loop muted playsInline className={`inset-0 w-full h-full object-fill transition-opacity ${!loaded && 'opacity-0'}`} />
            : <img src={asset.image_url?.endsWith('.svg') ? asset.image_url : (asset.image_preview_url ?? asset.image_url)} onLoad={() => setLoaded(true)} alt={asset.name} className={`object-fill w-full h-full transition-opacity ${!loaded && 'opacity-0'}`} />
        }
        <div className="absolute top-0 left-0 p-2 h-full w-full z-20 flex flex-col justify-end translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all pointer-events-none" style={{ background: `hsla(${accentHue}, 30%, 40%, 80%)` }}>
          <span className="font-bold text-sm text-ellipsis text-white whitespace-nowrap overflow-hidden mb-0.5 ml-0.5 translate-y-0.5 group-hover:translate-y-0 transition-transform">{asset.name}</span>
          <div className="flex items-center">
            <img src={asset.collection.image_url} alt={asset.collection.name} className="h-6 w-6 rounded-full mr-1" />
            <span className="font-bold text-xs text-ellipsis text-white opacity-80 whitespace-nowrap overflow-hidden">{asset.collection.name}</span>
          </div>
        </div>
      </div>
    </a>
  )
}
