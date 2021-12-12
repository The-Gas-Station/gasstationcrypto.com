import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

import { NFPInterface } from '../constants';
import { ERC20Interface } from '../library/constants/abi';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useTokenAllowance from '../library/hooks/useTokenAllowance';
import useTokenBalance from '../library/hooks/useTokenBalance';
import useTokenDecimals from '../library/hooks/useTokenDecimals';
import { useContractCalls } from '../library/hooks/useContractCall';
import useContractFunction from '../library/hooks/useContractFunction';
import { ChainId } from '../library/constants/chains';

import { CHAIN_INFO } from '../configs';

export function useNFP(chainId: ChainId) {
  const { currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

  const rarityIds = [1, 2, 3];

  const [
    _rarity1Price,
    _rarity2Price,
    _rarity3Price,
    _rarity1AmountMinted,
    _rarity2AmountMinted,
    _rarity3AmountMinted,
    _rarity1AmountTotal,
    _rarity2AmountTotal,
    _rarity3AmountTotal,
    _usdc,
  ] =
    useContractCalls(chainId, [
      ...rarityIds.map(
        (rarity) =>
          chainData.nfpAddress && {
            abi: NFPInterface,
            address: chainData.nfpAddress.substring(4),
            method: 'getPatronRarityPrice',
            args: [rarity],
          },
      ),
      ...rarityIds.map(
        (rarity) =>
          chainData.nfpAddress && {
            abi: NFPInterface,
            address: chainData.nfpAddress.substring(4),
            method: 'amountMinted',
            args: [rarity],
          },
      ),
      ...rarityIds.map(
        (rarity) =>
          chainData.nfpAddress && {
            abi: NFPInterface,
            address: chainData.nfpAddress.substring(4),
            method: 'amountTotal',
            args: [rarity],
          },
      ),
      chainData.nfpAddress && {
        abi: NFPInterface,
        address: chainData.nfpAddress.substring(4),
        method: 'usdc',
        args: [],
      },
    ]) ?? [];

  const [rarities, usdc] = [
    {
      [rarityIds[0]]: {
        price: _rarity1Price ? _rarity1Price[0] : BigNumber.from(0),
        minted: _rarity1AmountMinted ? _rarity1AmountMinted[0] : 0,
        total: _rarity1AmountTotal ? _rarity1AmountTotal[0] : 0,
        canAfford: true,
        needsApproval: true,
      },
      [rarityIds[1]]: {
        price: _rarity2Price ? _rarity2Price[0] : BigNumber.from(0),
        minted: _rarity2AmountMinted ? _rarity2AmountMinted[0] : 0,
        total: _rarity2AmountTotal ? _rarity2AmountTotal[0] : 0,
        canAfford: true,
        needsApproval: true,
      },
      [rarityIds[2]]: {
        price: _rarity3Price ? _rarity3Price[0] : BigNumber.from(0),
        minted: _rarity3AmountMinted ? _rarity3AmountMinted[0] : 0,
        total: _rarity3AmountTotal ? _rarity3AmountTotal[0] : 0,
        canAfford: true,
        needsApproval: true,
      },
    },
    _usdc ? _usdc[0] : undefined,
  ];

  const decimals = useTokenDecimals(chainId, usdc) ?? 18;

  let balance =
    useTokenBalance(chainId, usdc, currentAccount) ?? BigNumber.from(0);

  if (balance && decimals) {
    balance = balance.mul(BigNumber.from(10).pow(18 - decimals));
  }

  let approved =
    useTokenAllowance(
      chainId,
      usdc,
      currentAccount,
      chainData.nfpAddress?.substring(4),
    ) ?? BigNumber.from(0);

  if (approved && decimals) {
    approved = approved.mul(BigNumber.from(10).pow(18 - decimals));
  }

  rarityIds.forEach((rarity) => {
    if (rarities[rarity].price && decimals) {
      rarities[rarity].price = rarities[rarity].price.mul(
        BigNumber.from(10).pow(18 - decimals),
      );
    }

    rarities[rarity].canAfford = rarities[rarity].price.lte(balance);
    rarities[rarity].needsApproval = rarities[rarity].price.gt(approved);
  });

  const actions = {
    useApproveAction: (): ((rarity: number) => Promise<void>) => {
      try {
        const contract = usdc ? new Contract(usdc, ERC20Interface) : undefined;

        const approve = useContractFunction(contract as any, 'approve');

        return (rarity: number) =>
          approve.send(
            chainData.nfpAddress?.substring(4),
            rarities[rarity].price.div(BigNumber.from(10).pow(18 - decimals)),
          );
      } catch (_) {}

      return () => Promise.reject();
    },
    useMintAction: (): ((rarity: number) => Promise<void>) => {
      try {
        const contract = chainData.nfpAddress
          ? new Contract(chainData.nfpAddress.substring(4), NFPInterface)
          : undefined;

        const deposit = useContractFunction(contract as any, 'buyPatron');

        return (rarity: number) => deposit.send(rarity);
      } catch (_) {}

      return () => Promise.reject();
    },
  };

  return {
    ...actions,
    rarityIds,
    rarities,
    usdcBalance: balance,
    usdcApproved: approved,
  };
}

export default useNFP;
