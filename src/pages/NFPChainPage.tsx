import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ethers } from 'ethers';
import numeral from 'numeral';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useNFP from '../hooks/useNFP';
import useMyNFPs from '../hooks/useMyNFPs';
import useEthers from '../library/hooks/useEthers';
import useJSONResult from '../library/hooks/useJSONResult';

import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  RPC_URLS,
  EXPLORER_URLS,
} from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import { useLayoutContext } from '../layouts/MainLayout';

export const NFPChainPage = ({ chainId }: { chainId: ChainId }) => {
  const { setIsWalletModalOpen } = useLayoutContext();
  const { account, chainId: connectedChainId } = useEthers();
  const navigate = useNavigate();

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const { useApproveAction, useMintAction, rarities } = useNFP(chainId);
  const myNFPs = useMyNFPs();

  let rareImage = '/images/nfp-buyme.png';

  const rareMetadata = chainData.nfpGitHubBaseURL
    ? useJSONResult(
        `${chainData.nfpGitHubBaseURL}metadata/2/${
          rarities[2].minted + 1
        }/index.json`,
      )
    : undefined;

  if (rarities[2].minted && rarities[2].total && rarities[2].total > 0) {
    if (rarities[2].minted < rarities[2].total) {
      if (chainData.nfpGitHubBaseURL && rareMetadata && rareMetadata.image) {
        rareImage = rareMetadata.image;
      }
    } else {
      rareImage = '/images/nfp-soldout.png';
    }
  }

  let legendaryImage = '/images/nfp-buyme.png';

  const legendaryMetadata = chainData.nfpGitHubBaseURL
    ? useJSONResult(
        `${chainData.nfpGitHubBaseURL}metadata/3/${
          rarities[3].minted + 1
        }/index.json`,
      )
    : undefined;

  if (rarities[3].minted && rarities[3].total && rarities[3].total > 0) {
    if (rarities[3].minted < rarities[3].total) {
      if (
        chainData.nfpGitHubBaseURL &&
        legendaryMetadata &&
        legendaryMetadata.image
      ) {
        legendaryImage = legendaryMetadata.image;
      }
    } else {
      legendaryImage = '/images/nfp-soldout.png';
    }
  }

  const [approving, setApproving] = useState([false, false, false]);
  const _approve = useApproveAction();

  const approve = (rarity: number) => {
    setApproving((prev) => {
      prev[rarity - 1] = true;
      return prev;
    });
    _approve(rarity).finally(() =>
      setApproving((prev) => {
        prev[rarity - 1] = false;
        return prev;
      }),
    );
  };

  const [minting, setMinting] = useState([false, false, false]);
  const _mint = useMintAction();

  const mint = (rarity: number) => {
    setMinting((prev) => {
      prev[rarity - 1] = true;
      return prev;
    });
    _mint(rarity).finally(() =>
      setMinting((prev) => {
        prev[rarity - 1] = false;
        return prev;
      }),
    );
  };

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/nfp`);
  };

  const connect = () => {
    setIsWalletModalOpen(true);
  };

  const forceChain = async () => {
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (e: any) {
      if (e.code == 4902) {
        await (window as any).ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: CHAIN_NAMES[chainId],
              nativeCurrency: {
                name: CHAIN_ETHER[chainId],
                symbol: CHAIN_ETHER[chainId],
                decimals: 18,
              },
              rpcUrls: RPC_URLS[chainId],
              blockExplorerUrls: [EXPLORER_URLS[chainId]],
            },
          ],
        });
      }
    }
  };

  return (
    <>
      <section className="page-background">
        <div className="page-banner-top-title">
          <h3>
            <img src={chainData.tokenImage.replace('/public/', '/')} alt="#" />{' '}
            {CHAIN_NAMES[chainId]} Non-Fungible Patrons
          </h3>
          <select onChange={switchNetwork}>
            <option>Switch Network</option>
            {(readOnlyChainIds || []).map((_chainId) => {
              return (
                _chainId != chainId &&
                CHAIN_INFO[_chainId].launched && (
                  <option key={`switch-chain-${_chainId}`} value={_chainId}>
                    {CHAIN_NAMES[_chainId]}
                  </option>
                )
              );
            })}
          </select>
        </div>
        <div className="nfp-banner-center-text">
          <h4>Gas Station’s exclusive NFT assets</h4>
          <p>
            Non-Fungible Patrons (NFPs) give you ultimate perks on Gas Station’s
            Bridge. Like free transactions on the bridge or earning a pool of
            bridge transaction fees.
          </p>
        </div>
      </section>
      <section className="nfp-card">
        <div className="row g-xxl-5 d-flex align-items-stretch">
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box h-100 d-flex flex-column">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Common</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      {rarities[1].minted}
                      <span>/{rarities[1].total}</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src="/images/nfps.gif" />
                <div className="price-block">
                  <h2>
                    {numeral(
                      ethers.utils.formatEther(rarities[1].price),
                    ).format('$0,0')}{' '}
                    <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img
                    src={chainData.tokenImage.replace('/public/', '/')}
                    style={{ maxHeight: 40 }}
                  />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc flex-fill">
                Common patrons are algorithmically generate NFTs. Own one to
                enjoy free transfers on Gas Station Bridge.
              </p>
              <div className="btn-blocks d-flex justify-content-center">
                {!account ? (
                  <button className="custom-btn flex-fill" onClick={connect}>
                    Connect
                  </button>
                ) : chainId != connectedChainId ? (
                  <button className="custom-btn flex-fill" onClick={forceChain}>
                    Switch Chain
                  </button>
                ) : (
                  <button
                    className="custom-btn flex-fill"
                    disabled={
                      rarities[1].minted >= rarities[1].total ||
                      !rarities[1].canAfford
                    }
                    onClick={() =>
                      rarities[1].needsApproval ? approve(1) : mint(1)
                    }
                  >
                    {rarities[1].minted < rarities[1].total
                      ? !rarities[1].canAfford
                        ? 'Not Enough USDC'
                        : rarities[1].needsApproval
                        ? approving[0]
                          ? 'Approving...'
                          : 'Approve USDC'
                        : minting[0]
                        ? 'Minting...'
                        : 'Mint a Common'
                      : 'Sold Out'}
                  </button>
                )}
                {/* <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button> */}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box h-100 d-flex flex-column">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Rare</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      {rarities[2].minted}
                      <span>/{rarities[2].total}</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src={rareImage} />
                <div className="price-block">
                  <h2>
                    {numeral(
                      ethers.utils.formatEther(rarities[2].price),
                    ).format('$0,0')}{' '}
                    <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img
                    src={chainData.tokenImage.replace('/public/', '/')}
                    style={{ maxHeight: 40 }}
                  />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc flex-fill">
                Rare Patrons are original hand-drawn illustrations. They collect
                dividends from service fees in the ecosystem along with granting
                transfer access at no cost.
              </p>
              <div className="btn-blocks d-flex justify-content-center">
                {!account ? (
                  <button className="custom-btn flex-fill" onClick={connect}>
                    Connect
                  </button>
                ) : chainId != connectedChainId ? (
                  <button className="custom-btn flex-fill" onClick={forceChain}>
                    Switch Chain
                  </button>
                ) : (
                  <button
                    className="custom-btn flex-fill"
                    disabled={
                      rarities[2].minted >= rarities[2].total ||
                      !rarities[2].canAfford
                    }
                    onClick={() =>
                      rarities[2].needsApproval ? approve(2) : mint(2)
                    }
                  >
                    {rarities[2].minted < rarities[2].total
                      ? !rarities[2].canAfford
                        ? 'Not Enough USDC'
                        : rarities[2].needsApproval
                        ? approving[1]
                          ? 'Approving...'
                          : 'Approve USDC'
                        : minting[1]
                        ? 'Minting...'
                        : 'Mint a Rare'
                      : 'Sold Out'}
                  </button>
                )}
                {/* <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button> */}
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-lg-4">
            <div className="card-box h-100 d-flex flex-column">
              <div className="card-top-title-price">
                <div className="left">
                  <h3>Legendary</h3>
                  <h5>Patrons</h5>
                </div>
                <div className="right">
                  <div className="numbers-price">
                    <h4>
                      {rarities[3].minted}
                      <span>/{rarities[3].total}</span>
                    </h4>
                    <p>minted/Total</p>
                  </div>
                </div>
              </div>
              <div className="image-box">
                <img src={legendaryImage} />
                <div className="price-block">
                  <h2>
                    {numeral(
                      ethers.utils.formatEther(rarities[3].price),
                    ).format('$0,0')}{' '}
                    <small>USDC</small>
                  </h2>
                  <small>CURRENT PRICE</small>
                  <img
                    src={chainData.tokenImage.replace('/public/', '/')}
                    style={{ maxHeight: 40 }}
                  />
                </div>
              </div>
              <span className="drow-line"></span>
              <p className="desc flex-fill">
                Legendary Patrons are original hand-drawn, animated & extremely
                limited illustrations. They collect large portions of dividends
                from service fees in the ecosystem along with granting transfer
                access at no cost.
              </p>
              <div className="btn-blocks d-flex justify-content-center">
                {!account ? (
                  <button className="custom-btn flex-fill" onClick={connect}>
                    Connect
                  </button>
                ) : chainId != connectedChainId ? (
                  <button className="custom-btn flex-fill" onClick={forceChain}>
                    Switch Chain
                  </button>
                ) : (
                  <button
                    className="custom-btn flex-fill"
                    disabled={
                      rarities[3].minted >= rarities[3].total ||
                      !rarities[3].canAfford
                    }
                    onClick={() =>
                      rarities[3].needsApproval ? approve(3) : mint(3)
                    }
                  >
                    {rarities[3].minted < rarities[3].total
                      ? !rarities[3].canAfford
                        ? 'Not Enough USDC'
                        : rarities[3].needsApproval
                        ? approving[2]
                          ? 'Approving...'
                          : 'Approve USDC'
                        : minting[2]
                        ? 'Minting...'
                        : 'Mint a Legendary'
                      : 'Sold Out'}
                  </button>
                )}
                {/* <button className="custom-btn-2">
                  <img src={binicons} />
                  <span> Search Open Sea</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="collection-list px-15">
        <div className="title-main">
          <h5>My NFP Collection</h5>
          <p>We’re showing all NFPs in your current wallet.</p>
        </div>
        <div className="row">
          {myNFPs.map((metadata, i) => (
            <div key={i} className="col-4 col-sm-4 col-md-4 col-lg-3">
              <div className="card-items">
                <img src={metadata.image} />
                <div className="card-item-details">
                  <h2>{metadata.name.replace(` #${metadata.tokenId}`, '')}</h2>
                  <small> #{metadata.tokenId}</small>
                  <img
                    src={CHAIN_INFO[metadata.chainId].tokenImage.replace(
                      '/public/',
                      '/',
                    )}
                    style={{ maxHeight: 40 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default NFPChainPage;
