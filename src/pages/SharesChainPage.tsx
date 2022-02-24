import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import SharesRow from '../components/sharesComponents/SharesRow';
import SharesCard from '../components/sharesComponents/SharesCard';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgCardClubs } from 'react-icons/cg';

export const SharesChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];
  const [showFinished, setShowFinished] = useState(false);
  const [showRowView, setShowRowView] = useState(true);
  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Bridge`);
  };

  return (
    <>
      <section className="page-background-shares">
        <div className="page-banner-top-title">
          <h3>
            <img
              src={chainData.tokenImage.replace('/public/', '/')}
              alt="#"
              className="img-size"
            />{' '}
            {CHAIN_NAMES[chainId]} Shares
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
        <div className="d-flex flex-column banner-center">
          <p>
            <h4>Shares </h4>Convert Single Assets Into Bridge Liquidity Shares
          </p>
        </div>
      </section>
      <div className="spacearoundrow">
        {showRowView ? (
          <CgCardClubs
            className="text-green clickable"
            style={{ width: '35px', height: '35px', marginRight: 'auto' }}
            onClick={() => setShowRowView(false)}
          />
        ) : (
          <GiHamburgerMenu
            className="text-green clickable"
            style={{ width: '35px', height: '35px', marginRight: 'auto' }}
            onClick={() => setShowRowView(true)}
          />
        )}
        <div className="grid-live-icon d-none d-md-inline-block">
          <span
            className={showFinished ? '' : 'active'}
            onClick={() => setShowFinished(false)}
          >
            Live
          </span>
          <span
            className={showFinished ? 'active' : ''}
            onClick={() => setShowFinished(true)}
          >
            Finished
          </span>
        </div>
      </div>
      {showRowView ? <SharesRow /> : <SharesCard />}
    </>
  );
};

export default SharesChainPage;
