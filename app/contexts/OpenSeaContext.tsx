import React, { createContext, useEffect } from "react"

export interface OpenSeaAsset {
  animation_url?: string
  image_preview_url?: string
  image_url?: string
  name: string
  permalink: string
  collection: {
    image_url: string
    name: string

  }
}

export interface IOpenSeaContext {
  assets: OpenSeaAsset[];
}

export const OpenSeaContext = createContext<IOpenSeaContext>({
  assets: [],
});

export const useOpenSea = () => React.useContext(OpenSeaContext);

export default function OpenSeaProvider({ children, address }: React.PropsWithChildren<{ address: string }>) {
  const [assets, setAssets] = React.useState<OpenSeaAsset[]>([]);
  
  useEffect(() => {
    const fetchAssets = async () => {
      const response = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address}`);
      const data = await response.json();
      setAssets(data.assets);
      console.log(data.assets)
    }
    fetchAssets();
  }, [address])

  return (
    <OpenSeaContext.Provider value={{ assets }}>
      {children}
    </OpenSeaContext.Provider>
  );
}