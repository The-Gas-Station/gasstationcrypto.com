import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import NetworkInfo from '../components/NetworkInfo';
import { CHAIN_NAMES } from '../library/constants/chains';

export const Test = () => {
  const { readOnlyChainIds } = useConfig();
  const { currentAccount, currentChainId } = useWeb3ConnectionsContext();

  return (
    <div className="d-flex flex-row">
      <div className="p-2">
        Chain: {CHAIN_NAMES[currentChainId]} Address: {currentAccount}
      </div>
      <div>
        {readOnlyChainIds?.map((chainId) => (
          <NetworkInfo chainId={chainId} key={chainId} />
        ))}
      </div>
    </div>
  );
};

export default Test;
