export enum ChainId {
  Localhost = 1337,
  Hardhat = 31337,
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Goerli = 5,
  Kovan = 42,
  BSC = 56,
  BSCTestnet = 97,
  xDai = 100,
  Polygon = 137,
  Mumbai = 80001,
  Theta = 361,
  ThetaTestnet = 365,
  Moonriver = 1285,
  Harmony = 1666600000,
  Palm = 11297108109,
  Fantom = 250,
}

export const CHAIN_NAMES = {
  [ChainId.Localhost]: 'Localhost',
  [ChainId.Hardhat]: 'Hardhat',
  [ChainId.Mainnet]: 'Mainnet',
  [ChainId.Ropsten]: 'Ropsten',
  [ChainId.Kovan]: 'Kovan',
  [ChainId.Rinkeby]: 'Rinkeby',
  [ChainId.Goerli]: 'Goerli',
  [ChainId.BSC]: 'BSC',
  [ChainId.BSCTestnet]: 'BSCTestnet',
  [ChainId.xDai]: 'xDai',
  [ChainId.Polygon]: 'Polygon',
  [ChainId.Mumbai]: 'Mumbai',
  [ChainId.Theta]: 'Theta',
  [ChainId.ThetaTestnet]: 'ThetaTestnet',
  [ChainId.Moonriver]: 'Moonriver',
  [ChainId.Harmony]: 'Harmony',
  [ChainId.Palm]: 'Palm',
  [ChainId.Fantom]: 'Fantom',
};

export const CHAIN_ETHER: { [chainId: number]: string } = {
  [ChainId.Mainnet]: 'ETH',
  [ChainId.BSC]: 'BNB',
  [ChainId.Polygon]: 'MATIC',
  [ChainId.Fantom]: 'FTM',
};

export const BLOCKS_PER_YEAR = {
  [ChainId.BSC]: (60 / 3) * 60 * 24 * 365,
  [ChainId.Polygon]: (60 / 2) * 60 * 24 * 365,
  [ChainId.Fantom]: 60 * 60 * 24 * 365,
};

export const WRAPPED_ETHER_ADDRESSES = {
  [ChainId.BSC]: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  [ChainId.Polygon]: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  [ChainId.Fantom]: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
};

export const RPC_URLS = {
  [ChainId.BSC]: [
    'https://bsc-dataseed.binance.org',
    'https://bsc-dataseed1.binance.org',
    'https://bsc-dataseed2.binance.org',
    'https://bsc-dataseed3.binance.org',
    'https://bsc-dataseed4.binance.org',
  ],
  [ChainId.Polygon]: ['https://polygon-rpc.com'],
  [ChainId.Fantom]: ['https://rpc.ftm.tools'],
};

export const EXPLORER_URLS = {
  [ChainId.Localhost]: 'Localhost',
  [ChainId.Hardhat]: 'Hardhat',
  [ChainId.Mainnet]: 'https://etherscan.io',
  [ChainId.Ropsten]: 'https://ropsten.etherscan.io',
  [ChainId.Kovan]: 'https://kovan.etherscan.io',
  [ChainId.Rinkeby]: 'https://rinkeby.etherscan.io',
  [ChainId.Goerli]: 'https://goerli.etherscan.io',
  [ChainId.BSC]: 'https://bscscan.com',
  [ChainId.BSCTestnet]: 'https://testnet.bscscan.com',
  [ChainId.xDai]: 'https://blockscout.com/poa/xdai',
  [ChainId.Polygon]: 'https://polygonscan.com',
  [ChainId.Mumbai]: 'https://explorer-mumbai.maticvigil.com',
  [ChainId.Theta]: 'https://explorer.thetatoken.org',
  [ChainId.ThetaTestnet]: 'https://testnet-explorer.thetatoken.org',
  [ChainId.Moonriver]: 'https://blockscout.moonriver.moonbeam.network',
  [ChainId.Harmony]: 'https://explorer.harmony.one',
  [ChainId.Palm]: 'https://explorer.palm.io',
  [ChainId.Fantom]: 'https://ftmscan.com',
};

export const MULTICALL_ADDRESSES = {
  [ChainId.Mainnet]: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  [ChainId.Ropsten]: '0x53c43764255c17bd724f74c4ef150724ac50a3ed',
  [ChainId.Rinkeby]: '0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821',
  [ChainId.Goerli]: '0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e',
  [ChainId.Kovan]: '0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a',
  [ChainId.BSC]: '0x41263cba59eb80dc200f3e2544eda4ed6a90e76c',
  [ChainId.BSCTestnet]: '0xae11C5B5f29A6a25e955F0CB8ddCc416f522AF5C',
  [ChainId.xDai]: '0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a',
  [ChainId.Polygon]: '0x11ce4B23bD875D7F5C6a31084f55fDe1e9A87507',
  [ChainId.Mumbai]: '0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc',
  [ChainId.Theta]: '0xe2ec58a54f3ab2714eddbae87533793011f1e14e',
  [ChainId.ThetaTestnet]: '0xf822bf2e728e264c58d7618022addd9cbc780350',
  [ChainId.Moonriver]: '0xa9177F8d98DAaB74C24715Ba0A81b73654710523',
  [ChainId.Harmony]: '0xFE4980f62D708c2A84D3929859Ea226340759320',
  [ChainId.Palm]: '0x99a73dfE34578348fb81BD078201C0BA84E9c840',
  [ChainId.Fantom]: '0xdc85396592f0F466224390771C861EE3957a3ff4',
};

export const TEST_CHAINS = [
  ChainId.Ropsten,
  ChainId.Kovan,
  ChainId.Rinkeby,
  ChainId.BSCTestnet,
  ChainId.Goerli,
  ChainId.Mumbai,
  ChainId.ThetaTestnet,
  ChainId.Localhost,
  ChainId.Hardhat,
];

export const LOCAL_CHAINS = [ChainId.Localhost, ChainId.Hardhat];
