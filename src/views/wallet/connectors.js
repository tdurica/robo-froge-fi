import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { NetworkConnector } from '@web3-react/network-connector'
import { Web3Provider } from '@ethersproject/providers';

// import { FortmaticConnector } from './Fortmatic'
// export const fortmatic = new FortmaticConnector({
//   apiKey: FORMATIC_KEY ?? '',
//   chainId: 1 // mainnet only
// })

// export const portis = new PortisConnector({
//   dAppId: PORTIS_ID ?? '',
//   networks: [1] // mainnet only
// })
const INFURA_KEY = '0eaa508254d64389be2f25787cc66181'

export const SupportedChainId = {
  MAINNET: 1,
    ROPSTEN: 3,
    RINKEBY: 4,
    GOERLI: 5,
    KOVAN: 42,

    ARBITRUM_ONE: 42161,
    ARBITRUM_RINKEBY: 421611,

    OPTIMISM: 10,
    OPTIMISTIC_KOVAN: 69,

    POLYGON: 137,
    POLYGON_MUMBAI: 80001,
}

export const CHAIN_IDS_TO_NAMES = {
  [SupportedChainId.MAINNET]: 'mainnet',
  [SupportedChainId.ROPSTEN]: 'ropsten',
  [SupportedChainId.RINKEBY]: 'rinkeby',
  [SupportedChainId.GOERLI]: 'goerli',
  [SupportedChainId.KOVAN]: 'kovan',
  [SupportedChainId.POLYGON]: 'polygon',
  [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
  [SupportedChainId.OPTIMISM]: 'optimism',
  [SupportedChainId.OPTIMISTIC_KOVAN]: 'optimistic_kovan',
}

export const INFURA_NETWORK_URLS = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ROPSTEN]: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.KOVAN]: `https://kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISM]: `https://optimism-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.OPTIMISTIC_KOVAN]: `https://optimism-kovan.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_ONE]: `https://arbitrum-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.ARBITRUM_RINKEBY]: `https://arbitrum-rinkeby.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.POLYGON]: `https://polygon-mainnet.infura.io/v3/${INFURA_KEY}`,
  [SupportedChainId.POLYGON_MUMBAI]: `https://polygon-mumbai.infura.io/v3/${INFURA_KEY}`,
}

const SUPPORTED_CHAIN_IDS = [1, 4, 3, 42, 5, 56, 97, 1337]
function getApiUrl(provider, network){
  const ALCHEMY_API_KEY = "cWCtBK24kbl-oSybYisKWNUXwSft1BRA";
  const INFURA_API_KEY = "0eaa508254d64389be2f25787cc66181";
  if(provider==='alchemy'){return `https://eth-${network}.alchemyapi.io/v2/${ALCHEMY_API_KEY}`}
  if(provider==='infura') {return `https://${network}.infura.io/v3/${INFURA_API_KEY}`}
  if(provider==='infuraMainnet') {return `https://mainnet.infura.io/v3/0eaa508254d64389be2f25787cc66181`}
  if(provider==='geth') {return `http://localhost:8545`}
}
export default function getLibrary(provider) {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'number'
      ? provider.chainId
      : typeof provider.chainId === 'string'
        ? parseInt(provider.chainId)
        : 'any'
  )
  library.pollingInterval = 15_000
  return library
}
export const network = new NetworkConnector({
  urls: INFURA_NETWORK_URLS,
  defaultChainId: 1,
})
let networkLibrary/* : Web3Provider | undefined */
export function getNetworkLibrary()/* : Web3Provider */ {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}
// export const network = new NetworkConnector({
//   urls: { 1: getApiUrl('infura', 'mainnet') },
//   defaultChainId: 1,
//   // pollingInterval: 15000,
//   // requestTimeoutMs: 10000,
// })

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42]
});


export const walletconnect = new WalletConnectConnector({
  rpcUrl: getApiUrl('infura', 'mainnet'),
  infuraId: "0eaa508254d64389be2f25787cc66181",
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: 15000,
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});

export const walletlink = new WalletLinkConnector({
  url: getApiUrl('infura', 'mainnet'),
  appName: "web3-react-fr",
  supportedChainIds: [1, 3, 4, 5, 42],
});
export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink,
  network:network,
};
