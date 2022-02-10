import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBCollapse } from 'mdb-react-ui-kit';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import ExchangeIcon from '../assets/exchange.svg';
import ForwardIcon from '../assets/forward.svg';
import ConvertIcon from '../assets/convert.svg';
import ExchangeImg from '../assets/exchange-icon.svg';
import Cryptocurrencies from '../assets/cryptocurrencies.svg';
import Plus from '../assets/plus.svg';
import Minus from '../assets/minus.svg';
import ArrowGroup from '../assets/arrow-group.svg';
import Lock from '../assets/lock.svg';
import locker from '../assets/locker.svg';
import DoubleArrow from '../assets/double-arrow.svg';
import LockIcon from '../assets/lock-color.svg';
import Uplode from '../assets/uplode.svg';
import AngleDown from '../assets/angle-down.svg';
import { Range, getTrackBackground } from 'react-range';
import { useDarkMode } from '../library/hooks/useDarkMode';
import { FileUploader } from 'react-drag-drop-files';
import { TxHistory } from '../components/txHistory';

const fileTypes = ['xlsx', 'xls', 'csv', 'txt'];
export const UtilitiesChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();

  const chainData = CHAIN_INFO[chainId];

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/utilities`);
  };
  const [showFinished, setShowFinished] = useState(false);
  const [isTxHistoryOpen, setIsTxHistoryOpen] = useState(false);
  const toggleShowShow = () => setIsTxHistoryOpen(!isTxHistoryOpen);
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  const [isMiningShow, setIsMiningShow] = useState(false);
  const toggleMining = () => setIsMiningShow(!isMiningShow);
  const [isBulkShow, setIsBulkShow] = useState(false);
  const toggleBulk = () => setIsBulkShow(!isBulkShow);
  const [isTokenShow, setIsTokenShow] = useState(false);
  const toggleToken = () => setIsTokenShow(!isTokenShow);
  const [isCardGride, setIsCardGride] = useState(false);
  // const [isLive, setIsLive] = useState(false);
  // const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    // setFile(file);
    console.log(file);
  };
  const { isDarkMode } = useDarkMode(true);
  const [values, setValue] = useState([50]);
  console.log('range-values', values);
  const sliderColor = isDarkMode
    ? ['#28CCAB', '#32334A']
    : ['#28CCAB', '#e7e7ed'];
  return (
    <>
      <section className="page-background">
        <div className="page-banner-top-title">
          <h3>
            <img src={chainData.tokenImage.replace('/public/', '/')} alt="#" />{' '}
            {CHAIN_NAMES[chainId]} Utilities
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
          <h4>Utilities</h4>
          <p>
            This page is still underconstruction. This is just a preview of some
            of the items coming soon.
          </p>
        </div>
      </section>
      <div className="rewards-second-block utility-block">
        <div className={`utility-collapse ${showShow ? 'open' : ''}`}>
          <div className="title-block">
            <h2 className="mb-0">
              <img src={ExchangeIcon} alt="" className="me-2 me-lg-4" />
              Convert Assets <span>to Shares</span>
            </h2>
            <div
              className={`title-box ${showShow ? 'open' : ''}`}
              onClick={toggleShow}
            >
              <span className="d-none d-lg-block">
                {showShow ? 'Hide' : 'Details'}
              </span>
            </div>
          </div>
          <MDBCollapse show={showShow}>
            <div className="inner-content">
              <div className="row justify-content-center">
                <div className="col-md-7 col-lg-7 d-none d-md-block">
                  <h4 className="title-msg">Bridge Tokens</h4>
                  <div className="convert-grid-block">
                    <div className="row justify-content-center card-list">
                      <div className="col-lg-3 d-none d-md-block">
                        <p>Please Select Your Networks</p>
                      </div>
                      <div className="col-lg-9 d-none d-md-block">
                        <span className="top-title">Sending Network</span>
                        <div className="convert-inner">
                          <select className="select">
                            <option value="">Select A Network</option>
                          </select>
                        </div>
                        <div className="convert-list-block">
                          <span className="top-title">Receiving Network</span>
                          <div className="convert-inner">
                            <select className="select">
                              <option value="">Select A Network</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row justify-content-center card-list">
                      <div className="col-lg-3 d-none d-md-block">
                        <p>Select Your Asset</p>
                      </div>
                      <div className="col-lg-9 d-none d-md-block">
                        <span className="top-title">Assets</span>
                        <br />
                        <select className="select">
                          <option value="">Select Asset</option>
                        </select>
                      </div>
                    </div>
                    <br />
                    <div className="row justify-content-center card-list">
                      <div className="col-lg-3 d-none d-md-block">
                        <p>Recipient</p>
                      </div>
                      <div className="col-lg-9 d-none d-md-block">
                        <div className="convert-inner">
                          <span className="top-title">Destination Address</span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="0x......."
                          />
                          <label>
                            <input type="checkbox" />
                            Send To $CONNECTED ADDRESS$
                          </label>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div className="row justify-content-center card-list">
                      <div className="col-lg-3 d-none d-md-block">
                        <p>Amount</p>
                      </div>
                      <div className="col-lg-9 d-none d-md-block">
                        <div className="convert-inner">
                          <span className="top-title">
                            Enter Amount To Send
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter An Amount"
                          />
                          <div className="row justify-content-center">
                            <button className="bridge-btn">
                              <span className="text">25%</span>
                            </button>
                            <button className="bridge-btn">
                              <span className="text">50%</span>
                            </button>
                            <button className="bridge-btn">
                              <span className="text">75%</span>
                            </button>
                            <button className="bridge-btn">
                              <span className="text">MAX</span>
                            </button>
                          </div>
                        </div>
                        <div className="line-break" />
                        <div className="row justify-content-center">
                          <div className="col bridge-amount">
                            <span className="text-left">SERVICE FEE</span>
                            <span className="subtext-left">Estimated Fee</span>
                          </div>
                          <div className="col bridge-amount">
                            <span className="subtext-right">0.05%</span>
                            <span className="subtext-right">$$$</span>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className={`title-box waiveFee  ${
                              isTxHistoryOpen ? 'open' : ''
                            }`}
                            onClick={toggleShowShow}
                          >
                            <span className="d-none d-lg-block">
                              {isTxHistoryOpen ? 'Close' : 'Waive Fee?'}
                            </span>
                          </div>
                        </div>
                        <MDBCollapse show={showShow}>
                          <div className="col bridge-amount">
                            <div className="d-none d-md-inline-block fee-box">
                              <span className="subtext-left">Void Fees</span>
                              <div className="row justify-content-center">
                                <div className="grid-live-icon">
                                  <span
                                    className={showFinished ? '' : 'active'}
                                    onClick={() => setShowFinished(false)}
                                  >
                                    Use GAS
                                  </span>
                                  <span
                                    className={showFinished ? 'active' : ''}
                                    onClick={() => setShowFinished(true)}
                                  >
                                    Use Patron
                                  </span>
                                </div>
                              </div>
                              <br />
                              <div className="row justify-content-center">
                                <div className="col bridge-amount">
                                  <span className="small-left">
                                    Token Balance
                                  </span>
                                  <span className="big-left">Waiver</span>
                                </div>
                                <div className="col bridge-amount">
                                  <span className="small-right">
                                    700,000,000 bscGAS
                                  </span>
                                  <span className="big-right">$2.22</span>
                                </div>
                              </div>
                              <div className="footer">
                                <button className="apply">
                                  <span className="text">Waive Fees</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </MDBCollapse>
                      </div>
                    </div>
                    <br />
                    <div className="row justify-content-center card-list">
                      <div className="col-lg-3 d-none d-md-block">
                        <p>Send</p>
                      </div>
                      <div className="col-lg-9 d-none d-md-block">
                        <span className="top-title">What You Recieve</span>
                        <div className="bridge-amount">
                          <div className="fee-box">
                            <h5>Output</h5>
                          </div>
                          <button className="join-btn">
                            <span className="text">SEND</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 col-lg-3 d-none d-md-block">
                  <h4 className="title-msg">Transaction History</h4>
                  <div
                    className={`utility-collapse ${
                      isTxHistoryOpen ? 'open' : ''
                    }`}
                  >
                    <div className="card-list">
                      <button className="join-btn">
                        <div
                          className={`title-box ${
                            isTxHistoryOpen ? 'open' : ''
                          }`}
                          onClick={toggleShow}
                        >
                          <span className="d-none d-lg-block">
                            {isTxHistoryOpen ? 'Hide History' : 'Show History'}
                          </span>
                        </div>
                      </button>
                    </div>
                    <TxHistory
                      isTxHistoryOpen={isTxHistoryOpen}
                      setIsOpen={setIsTxHistoryOpen}
                      closeTxHistory={() => setIsTxHistoryOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MDBCollapse>
        </div>
        <div className={`utility-collapse ${isMiningShow ? 'open' : ''}`}>
          <div className="title-block">
            <h2 className="mb-0">
              <img src={ExchangeImg} alt="" className="me-2 me-lg-4" />
              Mining <span>Pass</span>
            </h2>
            <div
              className={`title-box ${isMiningShow ? 'open' : ''}`}
              onClick={toggleMining}
            >
              <span className="d-none d-lg-block">
                {isMiningShow ? 'Hide' : 'Details'}
              </span>
            </div>
          </div>
          <MDBCollapse show={isMiningShow}>
            <div className="inner-content">
              <div className="row">
                <div className="col-lg-4">
                  <div className="card-img text-center mb-3 mb-lg-0">
                    <img src={Cryptocurrencies} alt="" />
                  </div>
                </div>
                <div className="col-lg-4 position-relative">
                  <div className="dec-text">
                    Mining Passes are ERC-721 Tokens that passively grant GAS
                    Tokens to the holder every day! These passes are also spent
                    on entry for premium fuel tanks, which offer even greater
                    rewards!
                  </div>
                  <div className="read-more d-block d-lg-none">
                    READ MORE
                    <img src={AngleDown} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mining-block">
                    <span className="title">
                      How many MINING passes would you like?
                    </span>
                    <div className="plus-minus-block">
                      <span className="plus-minus-icon">
                        <img src={Minus} alt="" />
                      </span>
                      <span className="count-text">3</span>
                      <span className="plus-minus-icon">
                        <img src={Plus} alt="" />
                      </span>
                    </div>
                    <div className="cost-title">
                      <span>Cost:</span>0.25 BNB + Gas
                    </div>
                  </div>
                  <button className="join-btn">Mint Mining Pass</button>
                </div>
              </div>
            </div>
          </MDBCollapse>
        </div>
        <div className={`utility-collapse ${isBulkShow ? 'open' : ''}`}>
          <div className="title-block">
            <h2 className="mb-0">
              <img src={ArrowGroup} alt="" className="me-2 me-lg-4" />
              Bulk Sender
            </h2>
            <div
              className={`title-box ${isBulkShow ? 'open' : ''}`}
              onClick={toggleBulk}
            >
              <span className="d-none d-lg-block">
                {isBulkShow ? 'Hide' : 'Details'}
              </span>
            </div>
          </div>
          <MDBCollapse show={isBulkShow}>
            <div className="inner-content">
              <div className="row g-lg-5">
                <div className="col-lg-4 position-relative">
                  <div className="dec-text">
                    Send ANY Token To ANY Amount of Receipients! Combine all of
                    your outgoing transfers into one transaction!
                  </div>
                  <div className="read-more d-block d-lg-none">
                    READ MORE
                    <img src={AngleDown} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="convert-block">
                    <span>
                      <b>Step 1</b>
                      Specify Token
                    </span>
                    <select className="custom-select">
                      <option value="">Select or Import token address</option>
                    </select>
                    <button className="join-btn connect-btn">
                      CONNECT TO WALLET
                    </button>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="convert-block mt-5 mt-lg-0">
                    <div className="two-title">
                      <span>
                        <b>Step 2</b>
                        Addresses with amounts
                      </span>
                      <p>Insert Manually</p>
                    </div>
                    <div className="uplode-block">
                      <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={fileTypes}
                        children={
                          <div className="uplode-img-block">
                            <img src={Uplode} alt="" className="mb-3" />
                            <p>Drop your files here or click to upload</p>
                          </div>
                        }
                      />
                      <div className="img-uplode-title">
                        <span>Accepted: CSV / Excel / Txt</span>
                        <p>See Example</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MDBCollapse>
        </div>
        <div className={`utility-collapse ${isTokenShow ? 'open' : ''}`}>
          <div className="title-block">
            <h2 className="mb-0">
              <img src={Lock} alt="" className="me-2 me-lg-4" />
              Token <span>Locker</span>
            </h2>
            <div
              className={`title-box ${isTokenShow ? 'open' : ''}`}
              onClick={toggleToken}
            >
              <span className="d-none d-lg-block">
                {isTokenShow ? 'Hide' : 'Details'}
              </span>
            </div>
          </div>
          <MDBCollapse show={isTokenShow}>
            <div className="inner-content">
              <div className="row g-lg-5">
                <div className="col-lg-4">
                  <div className="card-img text-center">
                    <img src={locker} alt="" />
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="dec-text">
                    Safely and Securely lock any ERC-20 or ERC-721 Token for any
                    duration of time! Only the creator of the lock can withdraw
                    the locked tokens after expiration, therefore all risk is
                    eliminated!
                  </div>
                  <div className="project-list">
                    <div className="project-item">
                      <h3>
                        16 Projects <span>Total</span>
                      </h3>
                    </div>
                    <div className="project-item">
                      <h3>
                        $5,000,000 <span>Market Cap</span>
                      </h3>
                    </div>
                    <div className="project-item">
                      <h3>
                        $50,00.000 <span>Liquidity locked</span>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="convert-block token-inner">
                    <div className="input-form-control">
                      <label>Specify Token</label>
                      <select className="custom-select">
                        <option value="">Select token to lock</option>
                      </select>
                    </div>
                    <div className="input-form-control">
                      <label>NUMBER OF TOKENS TO LOCK</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="0.0"
                      />
                      <span>~ 0.0 USD +55%</span>
                    </div>
                    <div className="lock-stake-block">
                      <div className="stake-progress-block">
                        <div className="stake-progress">
                          <Range
                            step={1}
                            min={0}
                            max={100}
                            values={values}
                            onChange={(value) => setValue(value)}
                            renderTrack={({ props, children }) => (
                              <div
                                onMouseDown={props.onMouseDown}
                                onTouchStart={props.onTouchStart}
                                style={{
                                  ...props.style,
                                  height: '36px',
                                  display: 'flex',
                                  width: '100%',
                                }}
                              >
                                <div
                                  ref={props.ref}
                                  className="rangebar-line"
                                  style={{
                                    height: '4px',
                                    width: '100%',
                                    borderRadius: '4px',
                                    background: getTrackBackground({
                                      values: values,
                                      colors: sliderColor,
                                      min: 0,
                                      max: 100,
                                    }),
                                    alignSelf: 'center',
                                  }}
                                >
                                  {children}
                                </div>
                              </div>
                            )}
                            renderThumb={({ props }) => (
                              <>
                                <div className="range-thumb" {...props}>
                                  <div className="range-thumb-icon">
                                    <img src={DoubleArrow} alt="" />
                                  </div>
                                  <output className="price-count" id="output">
                                    {values[0]}%
                                  </output>
                                </div>
                              </>
                            )}
                          />
                        </div>
                        <div className="stake-prices">
                          <span onClick={() => setValue([25])}>25%</span>
                          <span onClick={() => setValue([50])}>50%</span>
                          <span onClick={() => setValue([75])}>75%</span>
                          <span onClick={() => setValue([100])}>MAX</span>
                        </div>
                      </div>
                      <button className="join-btn back-btn d-flex d-lg-none">
                        Confirm
                      </button>
                      <div className="lock-icon d-none d-lg-block">
                        <img src={LockIcon} alt="" />
                        Lock
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MDBCollapse>
        </div>
      </div>
    </>
  );
};

export default UtilitiesChainPage;
