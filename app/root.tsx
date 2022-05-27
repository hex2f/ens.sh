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
    openseaAssets: JSON.parse(
      `[{"id":386810395,"num_sales":1,"background_color":null,"image_url":"https://lh3.googleusercontent.com/b71v37rd8HFtW02xZAau-xOxpxy4KOpYl51XjbA3QxIXKzVt7bCQcFmIo4GlXEvw8LrFZZBxHpSVDBrwwPmEdCohKew062FdlA_kEDE","image_preview_url":"https://lh3.googleusercontent.com/b71v37rd8HFtW02xZAau-xOxpxy4KOpYl51XjbA3QxIXKzVt7bCQcFmIo4GlXEvw8LrFZZBxHpSVDBrwwPmEdCohKew062FdlA_kEDE=s250","image_thumbnail_url":"https://lh3.googleusercontent.com/b71v37rd8HFtW02xZAau-xOxpxy4KOpYl51XjbA3QxIXKzVt7bCQcFmIo4GlXEvw8LrFZZBxHpSVDBrwwPmEdCohKew062FdlA_kEDE=s128","image_original_url":"ipfs://QmUoTjrsGgeMdMcC7kBmWfnzaw9B5w6y3KZZDJWXRhBgQS","animation_url":null,"animation_original_url":null,"name":"Komako Supersonic","description":"You awoke with no memory. Women rule this planet. You have arrived in the midst of a civil war. The people on this world look to you as an omen from space. Lead them on the right path. \\"I feel so free!\\"","external_link":"https://galverse.art/token/7168","asset_contract":{"address":"0x582048c4077a34e7c3799962f1f8c5342a3f4b12","asset_contract_type":"non-fungible","created_date":"2022-04-14T02:17:22.000890","name":"ShinseiGalverse","nft_version":"3.0","opensea_version":null,"owner":287151553,"schema_name":"ERC721","symbol":"GALS","total_supply":"0","description":"Shinsei Galverse is a collection of 8,888 Gals shooting across space and time to bring a project of peace to all cultures and people.\\r\\n\\r\\nWAGMAA - we're gonna make an anime! Join the team in Tokyo as we set out to turn Shinsei Galverse into a real anime production. Have your say in the story, art, and development direction of Shinsei Galverse!\\r\\n\\r\\nInspired by nostalgic showa-era anime. Made with love by Emi, Ayaka, Devin, & Jack.\\r\\n\\r\\nVisit [galverse.art](https://galverse.art) for more details.","external_link":"https://www.galverse.art/","image_url":"https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120","default_to_fiat":false,"dev_buyer_fee_basis_points":0,"dev_seller_fee_basis_points":500,"only_proxied_transfers":false,"opensea_buyer_fee_basis_points":0,"opensea_seller_fee_basis_points":250,"buyer_fee_basis_points":0,"seller_fee_basis_points":750,"payout_address":"0x0c1d9b8a7abd0c1e12d88dedbd4e5b0ef72f3abc"},"permalink":"https://opensea.io/assets/0x582048c4077a34e7c3799962f1f8c5342a3f4b12/7168","collection":{"banner_image_url":"https://lh3.googleusercontent.com/so2MC-8lei43fKI6W9dkrCSTc78HqGWylN9yi6pJoxm64mp8anTEWkr4513SQ1St-QpyBqgbaRRu-Hrq5G9XqJReq5nl-C6aAGlA4Jg=s2500","chat_url":null,"created_date":"2022-04-14T04:09:34.254398","default_to_fiat":false,"description":"Shinsei Galverse is a collection of 8,888 Gals shooting across space and time to bring a project of peace to all cultures and people.\\r\\n\\r\\nWAGMAA - we're gonna make an anime! Join the team in Tokyo as we set out to turn Shinsei Galverse into a real anime production. Have your say in the story, art, and development direction of Shinsei Galverse!\\r\\n\\r\\nInspired by nostalgic showa-era anime. Made with love by Emi, Ayaka, Devin, & Jack.\\r\\n\\r\\nVisit [galverse.art](https://galverse.art) for more details.","dev_buyer_fee_basis_points":"0","dev_seller_fee_basis_points":"500","discord_url":"https://discord.gg/Galverse","display_data":{"card_display_style":"contain"},"external_url":"https://www.galverse.art/","featured":false,"featured_image_url":"https://lh3.googleusercontent.com/vQpC7aNzx0DHnLEfStnGJsOenVlbCOAm-36-T_gFABdIdIFyHcUxp2P16kN2r9Fi9eBJiElFpQ1paU_AwkQcWE_-L917k4SV2e_JmQ=s300","hidden":false,"safelist_request_status":"approved","image_url":"https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120","is_subject_to_whitelist":false,"large_image_url":"https://lh3.googleusercontent.com/vQpC7aNzx0DHnLEfStnGJsOenVlbCOAm-36-T_gFABdIdIFyHcUxp2P16kN2r9Fi9eBJiElFpQ1paU_AwkQcWE_-L917k4SV2e_JmQ=s300","medium_username":null,"name":"Shinsei Galverse Official","only_proxied_transfers":false,"opensea_buyer_fee_basis_points":"0","opensea_seller_fee_basis_points":"250","payout_address":"0x0c1d9b8a7abd0c1e12d88dedbd4e5b0ef72f3abc","require_email":false,"short_description":null,"slug":"galverse","telegram_url":null,"twitter_username":null,"instagram_username":null,"wiki_url":null,"is_nsfw":false},"decimals":0,"token_metadata":"https://galverse.art/api/metadata/7168.json","is_nsfw":false,"owner":{"user":{"username":"leahlundqvist"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/26.png","address":"0x4b39ec3eef66f94af57b9af7e7bd216e20abb208","config":""},"sell_orders":null,"creator":{"user":{"username":"GalverseDeveloper"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/27.png","address":"0x2019222238b971fc06d34828c6ad0f43df2f6520","config":""},"traits":[{"trait_type":"Character","value":"Wild","display_type":null,"max_value":null,"trait_count":149,"order":null},{"trait_type":"Back Item","value":"Solar Bow (Sunlight Nori)","display_type":null,"max_value":null,"trait_count":54,"order":null},{"trait_type":"Eyebrows","value":"Determined","display_type":null,"max_value":null,"trait_count":651,"order":null},{"trait_type":"Energy Source","value":"Metal","display_type":null,"max_value":null,"trait_count":261,"order":null},{"trait_type":"Time","value":"Present","display_type":null,"max_value":null,"trait_count":7917,"order":null},{"trait_type":"Eyes","value":"Winged (Matcha)","display_type":null,"max_value":null,"trait_count":113,"order":null},{"trait_type":"Background","value":"Space Aurora (Moonlight)","display_type":null,"max_value":null,"trait_count":78,"order":null},{"trait_type":"Star Affinity","value":"Blue","display_type":null,"max_value":null,"trait_count":2962,"order":null},{"trait_type":"Hair (Back)","value":"High Mysterious Pony (Mizu)","display_type":null,"max_value":null,"trait_count":16,"order":null},{"trait_type":"Hair (Front)","value":"Mop (Mizu)","display_type":null,"max_value":null,"trait_count":58,"order":null},{"trait_type":"Gal Coordinates","value":"+302.383984, -44.676518","display_type":null,"max_value":null,"trait_count":1,"order":null},{"trait_type":"Mouth","value":"Frown","display_type":null,"max_value":null,"trait_count":148,"order":null},{"trait_type":"Skin Tone","value":"Asa","display_type":null,"max_value":null,"trait_count":1134,"order":null},{"trait_type":"Hair (Middle)","value":"Tuft Strands (Mizu)","display_type":null,"max_value":null,"trait_count":112,"order":null},{"trait_type":"Character","value":"Cheerful","display_type":null,"max_value":null,"trait_count":175,"order":null},{"trait_type":"Clothes","value":"Neo Tokyo Jacket (Midnight)","display_type":null,"max_value":null,"trait_count":33,"order":null}],"last_sale":{"asset":{"decimals":0,"token_id":"7168"},"asset_bundle":null,"event_type":"successful","event_timestamp":"2022-04-14T14:34:59","auction_type":null,"total_price":"389000000000000000","payment_token":{"symbol":"ETH","address":"0x0000000000000000000000000000000000000000","image_url":"https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg","name":"Ether","decimals":18,"eth_price":"1.000000000000000","usd_price":"2947.780000000000200000"},"transaction":{"block_hash":"0xe136d7f828a3c70cc791b2124ef93defd15c088e6525a05fe1b1057274525e40","block_number":"14584105","from_account":{"user":{"username":"williswav"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/2.png","address":"0x6eb534ed1329e991842b55be375abc63fe7c0e2b","config":""},"id":333974664,"timestamp":"2022-04-14T14:34:59","to_account":{"user":null,"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/28.png","address":"0x7f268357a8c2552623316e2562d90e642bb538e5","config":""},"transaction_hash":"0x66512cc3aa05d4635f614d913a32e0fc936316392624053aed00ee409ca81f7d","transaction_index":"10"},"created_date":"2022-04-14T14:35:27.862703","quantity":"1"},"top_bid":null,"listing_date":null,"is_presale":false,"transfer_fee_payment_token":null,"transfer_fee":null,"token_id":"7168"},{"id":386731596,"num_sales":0,"background_color":null,"image_url":"https://lh3.googleusercontent.com/W_iNXFgXZtic4wDgPrzIKys6Ko_HocsDDcjMiS10t7Koy3dDihWBRl7t8DHyqYn_xiaG7KM8ZMob-lPoo7Gy_k7jfAU8Titc-J13Pw","image_preview_url":"https://lh3.googleusercontent.com/W_iNXFgXZtic4wDgPrzIKys6Ko_HocsDDcjMiS10t7Koy3dDihWBRl7t8DHyqYn_xiaG7KM8ZMob-lPoo7Gy_k7jfAU8Titc-J13Pw=s250","image_thumbnail_url":"https://lh3.googleusercontent.com/W_iNXFgXZtic4wDgPrzIKys6Ko_HocsDDcjMiS10t7Koy3dDihWBRl7t8DHyqYn_xiaG7KM8ZMob-lPoo7Gy_k7jfAU8Titc-J13Pw=s128","image_original_url":"ipfs://QmTeK44xYVsqhewuf8FPVqvhTvDfV3FN2PvtZXuPBtsoHR","animation_url":null,"animation_original_url":null,"name":"Yadanar Twotinos","description":"You're shocked by the intense light of this star - unbearably bright! Was it fate that you landed in our small village? This corner of space could be great, but it's marred by brutal politics and petty rivalries. The Goddess compels you to promote cooperation! \\"Fear is temporary... regret is forever!\\"","external_link":"https://galverse.art/token/2121","asset_contract":{"address":"0x582048c4077a34e7c3799962f1f8c5342a3f4b12","asset_contract_type":"non-fungible","created_date":"2022-04-14T02:17:22.000890","name":"ShinseiGalverse","nft_version":"3.0","opensea_version":null,"owner":287151553,"schema_name":"ERC721","symbol":"GALS","total_supply":"0","description":"Shinsei Galverse is a collection of 8,888 Gals shooting across space and time to bring a project of peace to all cultures and people.\\r\\n\\r\\nWAGMAA - we're gonna make an anime! Join the team in Tokyo as we set out to turn Shinsei Galverse into a real anime production. Have your say in the story, art, and development direction of Shinsei Galverse!\\r\\n\\r\\nInspired by nostalgic showa-era anime. Made with love by Emi, Ayaka, Devin, & Jack.\\r\\n\\r\\nVisit [galverse.art](https://galverse.art) for more details.","external_link":"https://www.galverse.art/","image_url":"https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120","default_to_fiat":false,"dev_buyer_fee_basis_points":0,"dev_seller_fee_basis_points":500,"only_proxied_transfers":false,"opensea_buyer_fee_basis_points":0,"opensea_seller_fee_basis_points":250,"buyer_fee_basis_points":0,"seller_fee_basis_points":750,"payout_address":"0x0c1d9b8a7abd0c1e12d88dedbd4e5b0ef72f3abc"},"permalink":"https://opensea.io/assets/0x582048c4077a34e7c3799962f1f8c5342a3f4b12/2121","collection":{"banner_image_url":"https://lh3.googleusercontent.com/so2MC-8lei43fKI6W9dkrCSTc78HqGWylN9yi6pJoxm64mp8anTEWkr4513SQ1St-QpyBqgbaRRu-Hrq5G9XqJReq5nl-C6aAGlA4Jg=s2500","chat_url":null,"created_date":"2022-04-14T04:09:34.254398","default_to_fiat":false,"description":"Shinsei Galverse is a collection of 8,888 Gals shooting across space and time to bring a project of peace to all cultures and people.\\r\\n\\r\\nWAGMAA - we're gonna make an anime! Join the team in Tokyo as we set out to turn Shinsei Galverse into a real anime production. Have your say in the story, art, and development direction of Shinsei Galverse!\\r\\n\\r\\nInspired by nostalgic showa-era anime. Made with love by Emi, Ayaka, Devin, & Jack.\\r\\n\\r\\nVisit [galverse.art](https://galverse.art) for more details.","dev_buyer_fee_basis_points":"0","dev_seller_fee_basis_points":"500","discord_url":"https://discord.gg/Galverse","display_data":{"card_display_style":"contain"},"external_url":"https://www.galverse.art/","featured":false,"featured_image_url":"https://lh3.googleusercontent.com/vQpC7aNzx0DHnLEfStnGJsOenVlbCOAm-36-T_gFABdIdIFyHcUxp2P16kN2r9Fi9eBJiElFpQ1paU_AwkQcWE_-L917k4SV2e_JmQ=s300","hidden":false,"safelist_request_status":"approved","image_url":"https://lh3.googleusercontent.com/8-v8WDS6DOJPj3GUKcWmWlytTCP3i9QRE9K7YVayIBhhSJIlJGyMQhYx-haXZF543jwZG_EYAuXSxBfUxgLDbmbRtejsKB-P8C8Iaw=s120","is_subject_to_whitelist":false,"large_image_url":"https://lh3.googleusercontent.com/vQpC7aNzx0DHnLEfStnGJsOenVlbCOAm-36-T_gFABdIdIFyHcUxp2P16kN2r9Fi9eBJiElFpQ1paU_AwkQcWE_-L917k4SV2e_JmQ=s300","medium_username":null,"name":"Shinsei Galverse Official","only_proxied_transfers":false,"opensea_buyer_fee_basis_points":"0","opensea_seller_fee_basis_points":"250","payout_address":"0x0c1d9b8a7abd0c1e12d88dedbd4e5b0ef72f3abc","require_email":false,"short_description":null,"slug":"galverse","telegram_url":null,"twitter_username":null,"instagram_username":null,"wiki_url":null,"is_nsfw":false},"decimals":0,"token_metadata":"https://galverse.art/api/metadata/2121.json","is_nsfw":false,"owner":{"user":{"username":"leahlundqvist"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/26.png","address":"0x4b39ec3eef66f94af57b9af7e7bd216e20abb208","config":""},"sell_orders":null,"creator":{"user":{"username":"GalverseDeveloper"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/27.png","address":"0x2019222238b971fc06d34828c6ad0f43df2f6520","config":""},"traits":[{"trait_type":"Gal Coordinates","value":"+71.835063, +13.748922","display_type":null,"max_value":null,"trait_count":4,"order":null},{"trait_type":"Clothes","value":"Neo Tokyo Jacket (Yuzu)","display_type":null,"max_value":null,"trait_count":39,"order":null},{"trait_type":"Skin Tone","value":"Hinode","display_type":null,"max_value":null,"trait_count":1067,"order":null},{"trait_type":"Time","value":"Present","display_type":null,"max_value":null,"trait_count":7917,"order":null},{"trait_type":"Eyebrows","value":"Arched Thin","display_type":null,"max_value":null,"trait_count":1418,"order":null},{"trait_type":"Star Affinity","value":"Blue","display_type":null,"max_value":null,"trait_count":2962,"order":null},{"trait_type":"Mouth","value":"Uncertain (Momo)","display_type":null,"max_value":null,"trait_count":128,"order":null},{"trait_type":"Eyes","value":"Shy (Sakura)","display_type":null,"max_value":null,"trait_count":114,"order":null},{"trait_type":"Hair (Back)","value":"Messy Nape (Moonlight)","display_type":null,"max_value":null,"trait_count":13,"order":null},{"trait_type":"Hair (Front)","value":"Messy Fringe (Moonlight)","display_type":null,"max_value":null,"trait_count":19,"order":null},{"trait_type":"Energy Source","value":"Joy","display_type":null,"max_value":null,"trait_count":430,"order":null},{"trait_type":"Background","value":"Luminous Stratosphere (Ube)","display_type":null,"max_value":null,"trait_count":849,"order":null},{"trait_type":"Earrings","value":"Moon (Yuzu)","display_type":null,"max_value":null,"trait_count":54,"order":null},{"trait_type":"Headwear","value":"Officer's Cap (Rose Mizu)","display_type":null,"max_value":null,"trait_count":5,"order":null},{"trait_type":"Character","value":"Shy","display_type":null,"max_value":null,"trait_count":179,"order":null},{"trait_type":"Character","value":"Tomboy","display_type":null,"max_value":null,"trait_count":165,"order":null}],"last_sale":null,"top_bid":null,"listing_date":null,"is_presale":false,"transfer_fee_payment_token":null,"transfer_fee":null,"token_id":"2121"},{"id":307079378,"num_sales":0,"background_color":null,"image_url":"https://openseauserdata.com/files/1768b351673b137e29829e82718ef786.svg","image_preview_url":"https://openseauserdata.com/files/1768b351673b137e29829e82718ef786.svg","image_thumbnail_url":"https://openseauserdata.com/files/1768b351673b137e29829e82718ef786.svg","image_original_url":null,"animation_url":null,"animation_original_url":null,"name":"Metavatar #1027","description":"Unique pfps (on Chain) for the entire metaverse.","external_link":null,"asset_contract":{"address":"0x880509ff28915fa62cdc7b07d1ea951bd5cfe882","asset_contract_type":"non-fungible","created_date":"2022-02-13T14:08:12.948842","name":"Metavatar","nft_version":"3.0","opensea_version":null,"owner":253749966,"schema_name":"ERC721","symbol":"MVTR","total_supply":null,"description":"100% on-chain generative art pfps","external_link":"https://metavatar.app","image_url":"https://lh3.googleusercontent.com/CMAtQkzeCLGjiw3l31iOH_K7WuXQIWfCQtMHvPmwpGUkEKeJFjpcgXnpYZ_gaXR0wjflG3dqEn_VuR0Rud2zZ8Qu3Hn1tt6RWTFhaxU=s120","default_to_fiat":false,"dev_buyer_fee_basis_points":0,"dev_seller_fee_basis_points":500,"only_proxied_transfers":false,"opensea_buyer_fee_basis_points":0,"opensea_seller_fee_basis_points":250,"buyer_fee_basis_points":0,"seller_fee_basis_points":750,"payout_address":"0x0cba9bcf5188ae2556c44c54f383ee65b04c3684"},"permalink":"https://opensea.io/assets/0x880509ff28915fa62cdc7b07d1ea951bd5cfe882/1027","collection":{"banner_image_url":"https://lh3.googleusercontent.com/-vMPr0Hu1QzNqvEK1J-NqTT_xQPdx62QJ-5MJ8rZBLFfVYOa6h8FF3YswqLErlrUXKzIyrgzcfX42nA4kzSXbSxV8_O4li-ZM5KZWA=s2500","chat_url":null,"created_date":"2022-02-13T14:15:52.981670","default_to_fiat":false,"description":"100% on-chain generative art pfps","dev_buyer_fee_basis_points":"0","dev_seller_fee_basis_points":"500","discord_url":"https://discord.gg/JcGr7fUEmN","display_data":{"card_display_style":"contain"},"external_url":"https://metavatar.app","featured":false,"featured_image_url":null,"hidden":false,"safelist_request_status":"not_requested","image_url":"https://lh3.googleusercontent.com/CMAtQkzeCLGjiw3l31iOH_K7WuXQIWfCQtMHvPmwpGUkEKeJFjpcgXnpYZ_gaXR0wjflG3dqEn_VuR0Rud2zZ8Qu3Hn1tt6RWTFhaxU=s120","is_subject_to_whitelist":false,"large_image_url":null,"medium_username":null,"name":"Metavatar on-chain","only_proxied_transfers":false,"opensea_buyer_fee_basis_points":"0","opensea_seller_fee_basis_points":"250","payout_address":"0x0cba9bcf5188ae2556c44c54f383ee65b04c3684","require_email":false,"short_description":null,"slug":"metavatar-on-chain","telegram_url":null,"twitter_username":null,"instagram_username":null,"wiki_url":null,"is_nsfw":false},"decimals":0,"token_metadata":"data:application/json;base64,eyJuYW1lIjoiTWV0YXZhdGFyICMxMDI3IiwiZGVzY3JpcHRpb24iOiAiVW5pcXVlIHBmcHMgKG9uIENoYWluKSBmb3IgdGhlIGVudGlyZSBtZXRhdmVyc2UuIiwgImF0dHJpYnV0ZXMiOlt7InRyYWl0X3R5cGUiOiJCYWNrZ3JvdW5kIiwidmFsdWUiOiIjRkZDNzAwIn0seyJ0cmFpdF90eXBlIjoiTnVtYmVyIG9mIFNoYXBlcyIsInZhbHVlIjoiMiJ9LHsidHJhaXRfdHlwZSI6Ik1vZGUiLCJ2YWx1ZSI6IkRhcmsifSx7InRyYWl0X3R5cGUiOiJBbmltYXRlZCIsInZhbHVlIjoiWWVzIn0seyJ0cmFpdF90eXBlIjoiQ29udGFpbnMgQmxvYiIsInZhbHVlIjoiTm8ifV0sImltYWdlIjogImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU9EQXdJaUJvWldsbmFIUTlJamd3TUNJZ2RtbGxkMEp2ZUQwaU1DQXdJREUyTURBZ01UWXdNQ0lnWm1sc2JEMGlibTl1WlNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWlCNGJXeHVjenA0YkdsdWF6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNVGs1T1M5NGJHbHVheUlnYzNSNWJHVTlJbUp2Y21SbGNpMXlZV1JwZFhNNklEQndlQ0krUEhKbFkzUWdkMmxrZEdnOUlqRTJNREFpSUdobGFXZG9kRDBpTVRZd01DSWdabWxzYkQwaUl6QXdNREF3TUNJdlBqeHlaV04wSUhkcFpIUm9QU0l4TmpBd0lpQm9aV2xuYUhROUlqRTJNREFpSUdacGJHdzlJaU5HUmtNM01EQWlJR1pwYkd3dGIzQmhZMmwwZVQwaUxqRXhJaTgrUEdjZ1kyeHBjQzF3WVhSb1BTSjFjbXdvSTJOc2FYQXdYelV3WHpNeU55a2lQanhuSUdacGJIUmxjajBpZFhKc0tDTm1hV3gwWlhJd1gyWmZOVEJmTXpJM0tTSStQSEpsWTNRZ2VEMGlPREk0SWlCNVBTSTJPRFlpSUhkcFpIUm9QU0k0T0RjaUlHaGxhV2RvZEQwaU1USTJOaUlnWm1sc2JEMGlJMFZHTlRVek15SStQQzl5WldOMFBqeHdZWFJvSUdROUlrMDBPVFlnTnpnNUlFdzNJREV4TURZZ1REazROU0F4TVRBMklGb2lJR1pwYkd3OUlpTTVNRGREUmtZaVBqeGhibWx0WVhSbFZISmhibk5tYjNKdElHRjBkSEpwWW5WMFpVNWhiV1U5SW5SeVlXNXpabTl5YlNJZ2RIbHdaVDBpY205MFlYUmxJaUJtY205dFBTSXdJRFE1TmlBeE1EQXdJaUIwYnowaU16WXdJRFE1TmlBeE1EQXdJaUJrZFhJOUlqTXdjeUlnY21Wd1pXRjBSSFZ5UFNKcGJtUmxabWx1YVhSbElpOCtQQzl3WVhSb1Bqd3ZaejQ4TDJjK1BHY2djM1I1YkdVOUltMXBlQzFpYkdWdVpDMXRiMlJsT205MlpYSnNZWGtpUGp4eVpXTjBJSGRwWkhSb1BTSXhOakF3SWlCb1pXbG5hSFE5SWpFMk1EQWlJR1pwYkd3OUluVnliQ2dqY0dGMGRHVnliakFwSWlBdlBqeHlaV04wSUhnOUlqQWlJSGs5SWpBaUlIZHBaSFJvUFNJeE5qQXdJaUJvWldsbmFIUTlJakUyTURBaUlITjBlV3hsUFNKbWFXeHNPbWR5WVhrN0lITjBjbTlyWlRwMGNtRnVjM0JoY21WdWREc2dabWxzZEdWeU9pQjFjbXdvSTJabFZIVnlZakF5S1NJdlBqd3ZaejQ4WkdWbWN6NDhabWxzZEdWeUlHbGtQU0ptWlZSMWNtSXdNaUlnWm1sc2RHVnlWVzVwZEhNOUltOWlhbVZqZEVKdmRXNWthVzVuUW05NElpQjRQU0l3SlNJZ2VUMGlNQ1VpSUhkcFpIUm9QU0l4TURBbElpQm9aV2xuYUhROUlqRXdNQ1VpUGp4bVpWUjFjbUoxYkdWdVkyVWdZbUZ6WlVaeVpYRjFaVzVqZVQwaU1DNHpJaUJ1ZFcxUFkzUmhkbVZ6UFNJeUlpQnpaV1ZrUFNJeklpQnlaWE4xYkhROUltOTFkREVpTHo0OFptVkRiMjF3YjNOcGRHVWdhVzQ5SW05MWRERWlJR2x1TWowaVUyOTFjbU5sUjNKaGNHaHBZeUlnYjNCbGNtRjBiM0k5SW1sdUlpQnlaWE4xYkhROUltOTFkRElpTHo0OFptVkNiR1Z1WkNCcGJqMGlVMjkxY21ObFIzSmhjR2hwWXlJZ2FXNHlQU0p2ZFhReUlpQnRiMlJsUFNKdmRtVnliR0Y1SWlCeVpYTjFiSFE5SW05MWRETWlMejQ4TDJacGJIUmxjajQ4Wm1sc2RHVnlJR2xrUFNKbWFXeDBaWEl3WDJaZk5UQmZNekkzSWlCNFBTSXdJaUI1UFNJd0lpQjNhV1IwYUQwaU1UWXdNQ0lnYUdWcFoyaDBQU0l4TmpBd0lpQm1hV3gwWlhKVmJtbDBjejBpZFhObGNsTndZV05sVDI1VmMyVWlJR052Ykc5eUxXbHVkR1Z5Y0c5c1lYUnBiMjR0Wm1sc2RHVnljejBpYzFKSFFpSStQR1psUm14dmIyUWdabXh2YjJRdGIzQmhZMmwwZVQwaU1DSWdjbVZ6ZFd4MFBTSkNZV05yWjNKdmRXNWtTVzFoWjJWR2FYZ2lMejQ4Wm1WQ2JHVnVaQ0J0YjJSbFBTSnViM0p0WVd3aUlHbHVQU0pUYjNWeVkyVkhjbUZ3YUdsaklpQnBiakk5SWtKaFkydG5jbTkxYm1SSmJXRm5aVVpwZUNJZ2NtVnpkV3gwUFNKemFHRndaU0l2UGp4bVpVZGhkWE56YVdGdVFteDFjaUJ6ZEdSRVpYWnBZWFJwYjI0OUlqSTFNQ0lnY21WemRXeDBQU0psWm1abFkzUXhYMlp2Y21WbmNtOTFibVJDYkhWeVh6VXdYek15TnlJdlBqd3ZabWxzZEdWeVBqd3ZaR1ZtY3o0OEwzTjJaejQ9In0=","is_nsfw":false,"owner":{"user":{"username":"leahlundqvist"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/26.png","address":"0x4b39ec3eef66f94af57b9af7e7bd216e20abb208","config":""},"sell_orders":null,"creator":{"user":{"username":"MetavatarDeployer"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/26.png","address":"0x0cba9bcf5188ae2556c44c54f383ee65b04c3684","config":""},"traits":[{"trait_type":"Background","value":"#FFC700","display_type":null,"max_value":null,"trait_count":174,"order":null},{"trait_type":"Animated","value":"Yes","display_type":null,"max_value":null,"trait_count":125,"order":null},{"trait_type":"Mode","value":"Dark","display_type":null,"max_value":null,"trait_count":601,"order":null},{"trait_type":"Contains Blob","value":"No","display_type":null,"max_value":null,"trait_count":1143,"order":null},{"trait_type":"Number of Shapes","value":"2","display_type":null,"max_value":null,"trait_count":363,"order":null}],"last_sale":null,"top_bid":null,"listing_date":null,"is_presale":false,"transfer_fee_payment_token":null,"transfer_fee":null,"token_id":"1027"},{"id":270196828,"num_sales":0,"background_color":null,"image_url":"https://openseauserdata.com/files/f40fd27a55593fbd18175cac02adafea.svg","image_preview_url":"https://lh3.googleusercontent.com/qRICZKgwKG_rHA6Hu3Jubx2LAFA5QHbN3m_OTJlQdCXKp-JybyL6YzoQqo_RL9316pLa0Im7KIf6qxh2a1axe-3zGGylFb4AyY8R=s250","image_thumbnail_url":"https://lh3.googleusercontent.com/qRICZKgwKG_rHA6Hu3Jubx2LAFA5QHbN3m_OTJlQdCXKp-JybyL6YzoQqo_RL9316pLa0Im7KIf6qxh2a1axe-3zGGylFb4AyY8R=s128","image_original_url":"https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/0x768cbd6b21189c615c8d421def6895e57fc334c97a3955bdef603b27ae5cfb6e/image","animation_url":null,"animation_original_url":null,"name":"trans-rights.eth","description":"trans-rights.eth, an ENS name.","external_link":"https://app.ens.domains/name/trans-rights.eth","asset_contract":{"address":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","asset_contract_type":"non-fungible","created_date":"2019-05-08T21:59:29.327544","name":"ENS","nft_version":"3.0","opensea_version":null,"owner":111982386,"schema_name":"ERC721","symbol":"ENS","total_supply":null,"description":"Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.","external_link":"https://ens.domains","image_url":"https://lh3.googleusercontent.com/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ=s60","default_to_fiat":false,"dev_buyer_fee_basis_points":0,"dev_seller_fee_basis_points":0,"only_proxied_transfers":false,"opensea_buyer_fee_basis_points":0,"opensea_seller_fee_basis_points":250,"buyer_fee_basis_points":0,"seller_fee_basis_points":250,"payout_address":null},"permalink":"https://opensea.io/assets/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/53621582040153674381757646173440381154210220849992543614982629636217906199406","collection":{"banner_image_url":null,"chat_url":null,"created_date":"2019-05-08T21:59:36.282454","default_to_fiat":false,"description":"Ethereum Name Service (ENS) domains are secure domain names for the decentralized world. ENS domains provide a way for users to map human readable names to blockchain and non-blockchain resources, like Ethereum addresses, IPFS hashes, or website URLs. ENS domains can be bought and sold on secondary markets.","dev_buyer_fee_basis_points":"0","dev_seller_fee_basis_points":"0","discord_url":null,"display_data":{"card_display_style":"cover"},"external_url":"https://ens.domains","featured":false,"featured_image_url":"https://lh3.googleusercontent.com/BBj09xD7R4bBtg1lgnAAS9_TfoYXKwMtudlk-0fVljlURaK7BWcARCpkM-1LGNGTAcsGO6V1TgrtmQFvCo8uVYW_QEfASK-9j6Nr=s300","hidden":false,"safelist_request_status":"verified","image_url":"https://lh3.googleusercontent.com/0cOqWoYA7xL9CkUjGlxsjreSYBdrUBE0c6EO1COG4XE8UeP-Z30ckqUNiL872zHQHQU5MUNMNhfDpyXIP17hRSC5HQ=s60","is_subject_to_whitelist":false,"large_image_url":"https://lh3.googleusercontent.com/BBj09xD7R4bBtg1lgnAAS9_TfoYXKwMtudlk-0fVljlURaK7BWcARCpkM-1LGNGTAcsGO6V1TgrtmQFvCo8uVYW_QEfASK-9j6Nr=s300","medium_username":"the-ethereum-name-service","name":"ENS: Ethereum Name Service","only_proxied_transfers":false,"opensea_buyer_fee_basis_points":"0","opensea_seller_fee_basis_points":"250","payout_address":null,"require_email":false,"short_description":null,"slug":"ens","telegram_url":null,"twitter_username":"ensdomains","instagram_username":null,"wiki_url":null,"is_nsfw":false},"decimals":null,"token_metadata":"https://metadata.ens.domains/mainnet/0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85/53621582040153674381757646173440381154210220849992543614982629636217906199406","is_nsfw":false,"owner":{"user":{"username":"leahlundqvist"},"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/26.png","address":"0x4b39ec3eef66f94af57b9af7e7bd216e20abb208","config":""},"sell_orders":null,"creator":{"user":null,"profile_img_url":"https://storage.googleapis.com/opensea-static/opensea-profile/9.png","address":"0x4fe4e666be5752f1fdd210f4ab5de2cc26e3e0e8","config":"verified"},"traits":[{"trait_type":"Registration Date","value":1644119129,"display_type":"date","max_value":null,"trait_count":1,"order":null},{"trait_type":"Expiration Date","value":1675676081,"display_type":"date","max_value":null,"trait_count":1,"order":null},{"trait_type":"Length","value":12,"display_type":"number","max_value":null,"trait_count":41071,"order":null}],"last_sale":null,"top_bid":null,"listing_date":null,"is_presale":false,"transfer_fee_payment_token":null,"transfer_fee":null,"token_id":"53621582040153674381757646173440381154210220849992543614982629636217906199406"}]`
    )
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
