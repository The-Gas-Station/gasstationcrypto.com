import {
  ChainId,
  CHAIN_NAMES,
  LOCAL_CHAINS,
  TEST_CHAINS,
  EXPLORER_URLS,
} from '../constants/chains';

export function getExplorerAddressLink(chainId: ChainId, address: string) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
    case ChainId.BSC:
    case ChainId.BSCTestnet:
    case ChainId.Polygon:
    case ChainId.Theta:
    case ChainId.ThetaTestnet:
    case ChainId.Harmony:
    case ChainId.Palm:
    case ChainId.Fantom:
      return `${EXPLORER_URLS[chainId]}/address/${address}`;
    case ChainId.xDai:
    case ChainId.Mumbai:
    case ChainId.Moonriver:
      return `${EXPLORER_URLS[chainId]}/address/${address}/transactions`;
    default:
      console.log(
        `getExplorerAddressLink Not Supported for Chain ${getChainName(
          chainId,
        )}`,
      );
      return undefined;
  }
}

export function getExplorerTransactionLink(
  chainId: ChainId,
  transactionHash: string,
) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
    case ChainId.BSC:
    case ChainId.BSCTestnet:
    case ChainId.Polygon:
    case ChainId.Theta:
    case ChainId.ThetaTestnet:
    case ChainId.Harmony:
    case ChainId.Palm:
    case ChainId.Fantom:
      return `${EXPLORER_URLS[chainId]}/tx/${transactionHash}`;
    case ChainId.xDai:
    case ChainId.Mumbai:
    case ChainId.Moonriver:
      return `${EXPLORER_URLS[chainId]}/tx/${transactionHash}/internal-transactions`;
    default:
      console.log(
        `getExplorerTransactionLink Not Supported for Chain ${getChainName(
          chainId,
        )}`,
      );
      return undefined;
  }
}

export function getExplorerCountdownLink(
  chainId: ChainId,
  blockNumber: number,
) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
    case ChainId.BSC:
    case ChainId.BSCTestnet:
    case ChainId.Polygon:
    case ChainId.Theta:
    case ChainId.ThetaTestnet:
    case ChainId.Harmony:
    case ChainId.Palm:
    case ChainId.Fantom:
      return `${EXPLORER_URLS[chainId]}/block/countdown/${blockNumber}`;
    default:
      console.log(
        `getExplorerCountdownLink Not Supported for Chain ${getChainName(
          chainId,
        )}`,
      );
      return undefined;
  }
}

export function getChainName(chainId: ChainId) {
  return CHAIN_NAMES[chainId];
}

export function isTestChain(chainId: ChainId) {
  return TEST_CHAINS.includes(chainId);
}

export function isLocalChain(chainId: ChainId) {
  return LOCAL_CHAINS.includes(chainId);
}
