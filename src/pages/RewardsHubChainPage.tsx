import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBSwitch, MDBCollapse } from 'mdb-react-ui-kit';
import { ethers } from 'ethers';
import numeral from 'numeral';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import { useBlockNumber } from '../library/providers/BlockNumberProvider';

import { CHAIN_NAMES, CHAIN_ETHER, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import useTVL from '../hooks/useTVL';
import useGASTokenMarketCap from '../hooks/useGASTokenMarketCap';
import useGASTokenRewardsInfo from '../hooks/useGASTokenRewardsInfo';
import usePools from '../hooks/usePools';
import Grid from '../assets/svg/menu.svg';
import Row from '../assets/svg/burger.svg';
import RewardsRow from '../components/RewardsHub/RowView';
import RewardsCard from '../components/RewardsHub/CardView';
import StakeModal from '../components/RewardsHub/stakeModal';
import GasIcon from '../assets/gas.svg';
import DollarIcon from '../assets/dollar.svg';
import { PoolResult } from '../hooks/Pools';
import { WrapRow } from '../styles';

export const RewardsHubChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const currentBlock = useBlockNumber(chainId) ?? 0;

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const tvl = useTVL(chainId);
  const marketCap = useGASTokenMarketCap(chainId);
  const { gasTokenBalance, accountRewards, totalRewards, gasTokenBalanceUSD } =
    useGASTokenRewardsInfo(chainId);

  const pools = usePools(chainId);

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [isCardGrid, setIsCardGrid] = useState(false);

  const [showOnlyStaked, setShowOnlyStaked] = useState(false);
  const [showFinished, setShowFinished] = useState(false);
  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };

  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [modalPool, setModalPool] = useState<PoolResult>();
  const [modalStaking, setModalStaking] = useState(false);
  const showStakeModal = (pool: PoolResult, staking: boolean) => {
    setModalPool(pool);
    setModalStaking(staking);
    setIsStakeModalOpen(true);
  };

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/hub`);
  };

  const filteredPools = useMemo(() => {
    return pools.filter((pool) => {
      let show = true;
      show =
        show &&
        showFinished ==
          (pool.usesBlocks
            ? pool.end < currentBlock
            : pool.end * 1000 < Date.now());
      show = show && (!showOnlyStaked || pool.stakeToken.staked.gt(0));

      return show;
    });
  }, [showFinished, showOnlyStaked, currentBlock, ...pools]);

  return (
    <>
      <div className="rewards-first-block">
        <div className="rewards-title-block">
          <div className="rewards-title">
            <h2>
              <img
                src={chainData.tokenImage.replace('/public/', '/')}
                alt=""
                className="me-3"
              />
              {CHAIN_NAMES[chainId]}
            </h2>
            <select
              className="custom-select d-none d-lg-block"
              onChange={switchNetwork}
            >
              <option value="">Switch Network</option>
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
          <div className="total-rewards-value">
            <select
              className="custom-select d-block d-lg-none m-0"
              onChange={switchNetwork}
            >
              <option value="">Switch Network</option>
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
            <div className="amount-details">
              <div className="amount-tvl">
                <small>TVL</small>
                <p>{numeral(ethers.utils.formatEther(tvl)).format('$0,0')}</p>
              </div>
              <div className="amount-market-cap">
                <small>USD MARKET CAP</small>
                <p>
                  {numeral(ethers.utils.formatEther(marketCap)).format('$0,0')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rewards-items">
          <div className="row">
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My Token Balance</small>
                  <p>
                    {numeral(ethers.utils.formatEther(gasTokenBalance)).format(
                      '0,0',
                    )}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={GasIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My Token Value</small>
                  <p>
                    {numeral(
                      ethers.utils.formatEther(gasTokenBalanceUSD),
                    ).format('$0,0.00')}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img src={DollarIcon} alt="" />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>My GAS Rewards</small>
                  <p>
                    {numeral(ethers.utils.formatEther(accountRewards)).format(
                      '0,0.0000',
                    )}{' '}
                    {CHAIN_ETHER[chainId]}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img
                    src={chainData.tokenImage.replace('/public/', '/')}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-6 col-sm-6 col-xl-3">
              <div className="rewards-item">
                <div className="rewards-content">
                  <small>Total GAS Rewards</small>
                  <p>
                    {numeral(ethers.utils.formatEther(totalRewards)).format(
                      '0,0.0000',
                    )}{' '}
                    {CHAIN_ETHER[chainId]}
                  </p>
                </div>
                <div className="rewards-icon">
                  <img
                    src={chainData.tokenImage.replace('/public/', '/')}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rewards-second-block">
        <div className="title-block">
          <h2>
            Fuel Tanks <span>Earn Rewards</span>
          </h2>
          <p>Stake tokens earn rewards. Lower gas, high APR, and low risk.</p>
        </div>
        <div className="title-grid-list">
          <div className="row align-items-center">
            <div className="col-md-7 col-xl-7 col-xxl-6">
              <div className="grid-block">
                <div className="d-flex d-md-none mobile-filter">
                  <span className="filter-title">Filters</span>
                  <span onClick={toggleFilter}>
                    {isFilterShow ? 'HIDE' : 'SHOW'}
                  </span>
                </div>
                <div className="grid-list-icon d-md-flex">
                  <span
                    className={isCardGrid ? '' : 'active'}
                    onClick={() => setIsCardGrid(false)}
                  >
                    <img src={Row} />
                  </span>
                  <span
                    className={isCardGrid ? 'active' : ''}
                    onClick={() => setIsCardGrid(true)}
                  >
                    <img src={Grid} />
                  </span>
                </div>
                <div className="grid-switch-icon d-none d-md-block">
                  <MDBSwitch
                    id="flexSwitchCheckDefault"
                    label="Staked only"
                    value={showOnlyStaked}
                    onClick={() => setShowOnlyStaked(!showOnlyStaked)}
                  />
                </div>
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
            </div>
            <div className="col-md-5 col-xl-5 col-xxl-6">
              <MDBCollapse show={isFilterShow} className="sort-search-wrapper">
                <div className="sort-search-block">
                  <div className="d-flex d-md-none inner-mobile-soft">
                    <div className="grid-switch-icon">
                      <MDBSwitch
                        id="flexSwitchCheckDefault"
                        label="Staked only"
                        value={showOnlyStaked}
                        onClick={() => setShowOnlyStaked(!showOnlyStaked)}
                      />
                    </div>
                    <div className="grid-live-icon">
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
                </div>
              </MDBCollapse>
            </div>
          </div>
        </div>
        {isCardGrid ? (
          <WrapRow>
            {(filteredPools ?? []).map((pool) => (
              <RewardsCard
                key={`grid-${pool.address}`}
                chainId={chainId}
                showStakeModal={showStakeModal}
                pool={pool}
              />
            ))}
          </WrapRow>
        ) : (
          <>
            {(filteredPools ?? []).map((pool) => (
              <RewardsRow
                key={`table-${pool.address}`}
                chainId={chainId}
                pool={pool}
                showStakeModal={showStakeModal}
              />
            ))}
          </>
        )}
      </div>
      <StakeModal
        key={modalPool?.address}
        isStakeModalOpen={isStakeModalOpen}
        closeStakeModal={() => setIsStakeModalOpen(false)}
        setIsOpen={setIsStakeModalOpen}
        chainId={chainId}
        pool={modalPool}
        staking={modalStaking}
      />
    </>
  );
};

export default RewardsHubChainPage;
