import React, { useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import stakedBanner from '../assets/banner.svg';
import earnedBanner from '../assets/earned.svg';

export const SharesChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);
  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

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
      <div className="d-flex flex-row">
        <p className="col">
          <span className="text-white1">Pool Info</span>
        </p>

        <p className="col">
          <span className="text-white1">STAKE</span>
        </p>

        <p className="col">
          <span className="text-white1">$Available Balance$</span>
        </p>

        <p className="col">
          <span className="text-white1">$LIQUIDITY$</span>
        </p>

        <p className="col">
          <span className="text-white1">$APR$</span>
        </p>

        <p className="col">
          <span className="text-white1">$STAKED$</span>
        </p>

        <p className="col">
          <span className="text-white1">$Earned$</span>
        </p>

        <p className="col">
          <span className="text-white1">$ACTIONS$</span>
        </p>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
      <div className="card-list-row">
        <div className="d-flex flex-row card-list-row">
          <div className="col">
            <p>
              <img
                src="https://via.placeholder.com/50x50"
                className="circle-img"
              />
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">STAKE</span>
              <br />
              <span className="text-white1">EARN</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="green">$Available Balance$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$LIQUIDITY$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$APR$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$STAKED$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <span className="text-white1">$Earned$</span>
            </p>
          </div>
          <div className="col text">
            <p>
              <button className="join-btn">
                <div
                  className={`title-box ${isTxHistoryOpen ? 'open' : ''}`}
                  onClick={toggleShow}
                >
                  <span className=" d-lg-block">
                    {isTxHistoryOpen ? 'Close' : 'Expand'}
                  </span>
                </div>
              </button>
            </p>
          </div>
        </div>
        <MDBCollapse show={isTxHistoryOpen}>
          <div className="d-flex flex-row justify-content-center">
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={stakedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">STAKE</button>
            </div>
            <div className="col-lg-1" />
            <div className="col-lg-3">
              <div className="d-flex flex-row card-list-row">
                <img src={earnedBanner} />
                <div className="d-flex flex-column">
                  <span className="text-white1 text-box">ASSET</span>
                </div>
                <div className="col" />
                <div className="d-flex flex-column">
                  <span className="text-green text-box">$AMOUNT$</span>
                </div>
              </div>
              <button className="join-btn">HARVEST</button>
            </div>
          </div>
        </MDBCollapse>
      </div>
    </>
  );
};

export default SharesChainPage;
