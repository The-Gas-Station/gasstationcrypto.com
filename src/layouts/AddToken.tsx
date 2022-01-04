import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useEthers from '../library/hooks/useEthers';
import { useMemo } from 'react';
import { CHAIN_INFO } from '../configs';
import { ReactComponent as SvgToken } from '../assets/token.svg';
import '../scss/token.scss';

const onClick = async (chainId: number) => {
  const chainInfo = CHAIN_INFO[chainId];
  const tokenAddress = chainInfo.gasTokenAddress?.replace('evm:', '');
  if (!tokenAddress) return;
  const tokenImage = 'https://www.gasstationcrypto.com/images/tokens/gas.png';
  const walletWatchAssetParams = {
    type: 'ERC20',
    options: {
      address: tokenAddress,
      symbol: chainInfo.gasTokenName,
      decimals: 18,
      image: tokenImage,
    },
  };
  try {
    await (window as any).ethereum.request({
      method: 'wallet_watchAsset',
      params: walletWatchAssetParams,
    });
  } catch (error) {
    console.log(error);
  }
};

const AddToken = ({ collapsed = false }) => {
  const { currentChainId: viewingChainId } = useWeb3ConnectionsContext();
  const { chainId: connectedChainId } = useEthers();
  return useMemo(() => {
    const chainsUnmatch = viewingChainId !== connectedChainId;
    if (chainsUnmatch) return null;
    return (
      <div
        className="mx-4 token-btn d-flex align-items-center add-wallet-token"
        onClick={() => {
          onClick(connectedChainId);
        }}
      >
        <SvgToken />
        {!collapsed && <span>Add Token to Wallet</span>}
      </div>
    );
  }, [viewingChainId, connectedChainId]);
};

export default AddToken;
