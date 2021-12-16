import React, { useState } from 'react';
import { MDBCollapse } from 'mdb-react-ui-kit';
import BscIcon from '../assets/bsc.png';
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

const fileTypes = ['xlsx', 'xls', 'csv', 'txt'];
export const UtilityPage = () => {
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
  };
  const { isDarkMode } = useDarkMode(true);
  const [values, setValue] = useState([50]);
  console.log('range-values', values);
  const sliderColor = isDarkMode
    ? ['#28CCAB', '#32334A']
    : ['#28CCAB', '#e7e7ed'];
  return (
    <>
      <div className="rewards-first-block utility-wrapper">
        <div className="rewards-title-block mb-0">
          <div className="rewards-title">
            <h2>
              <img src={BscIcon} alt="" className="me-3" />
              Binance Smart Chain
            </h2>
            <select className="custom-select d-none d-lg-block">
              <option value="">Switch Network</option>
            </select>
          </div>
        </div>
      </div>
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
              <div className="row g-lg-5">
                <div className="col-lg-4 position-relative">
                  <div className="dec-text">
                    I'm baby unicorn vinyl beard, hashtag fingerstache etsy XOXO
                    four loko salvia lo-fi you probably haven't heard of them.
                    Tumblr authentic meh yr, quinoa sartorial taxidermy street.
                  </div>
                  <div className="read-more d-block d-lg-none">
                    READ MORE
                    <img src={AngleDown} alt="" />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <div className="convert-block">
                    <div className="d-none d-md-block">
                      <span className="top-title">
                        <img src={ForwardIcon} alt="" className="me-2" />
                        Convert To
                      </span>
                      <div className="convert-inner">
                        <select className="custom-select">
                          <option value="">Select or add token address</option>
                        </select>
                        <div className="or-btn">OR</div>
                      </div>
                      <button className="join-btn">Convert to Shares</button>
                    </div>
                    <div className="tab-list d-block d-md-none">
                      <div className="grid-list-icon">
                        <span
                          className={isCardGride ? '' : 'active'}
                          onClick={() => setIsCardGride(false)}
                        >
                          <svg
                            className="me-2 me-sm-3"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 0.666992V4.66699C2 4.66699 0 8.76699 0 14.667C1.04 10.707 4 8.66699 8 8.66699H10V12.667L16 6.34699L10 0.666992Z"
                              fill="#A0AEC0"
                            />
                          </svg>
                          Convert to
                        </span>
                        <span
                          className={isCardGride ? 'active' : ''}
                          onClick={() => setIsCardGride(true)}
                        >
                          Convert From
                          <svg
                            className="ms-2 ms-sm-3"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M6 15.333V11.333C14 11.333 16 7.23301 16 1.33301C14.96 5.29301 12 7.33301 8 7.33301H6V3.33301L0 9.65301L6 15.333Z"
                              fill="#A0AEC0"
                            />
                          </svg>
                        </span>
                      </div>
                      {isCardGride ? (
                        <div className="convert-grid-block">
                          <span className="top-title">
                            ConvertING tokens to shares
                          </span>
                          <div className="convert-inner">
                            <select className="custom-select">
                              <option value="">
                                Select or add token address
                              </option>
                            </select>
                            <div className="or-btn d-none d-lg-none">OR</div>
                          </div>
                          <button className="join-btn">
                            Convert Tokens to Shares
                          </button>
                        </div>
                      ) : (
                        <div className="convert-list-block">
                          <span className="top-title">
                            ConvertING TOKENS FROM SHARES
                          </span>
                          <div className="convert-inner">
                            <select className="custom-select">
                              <option value="">
                                Select or add token address
                              </option>
                            </select>
                          </div>
                          <button className="join-btn">
                            Convert Tokens from Shares
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-4 d-none d-md-block">
                  <div className="convert-block">
                    <span className="top-title">
                      <img src={ConvertIcon} alt="" className="me-2" />
                      Convert Back
                    </span>
                    <select className="custom-select">
                      <option value="">Select or add token address</option>
                    </select>
                    <button className="join-btn back-btn">
                      Convert Back to Assets
                    </button>
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
                    I'm baby unicorn vinyl beard, hashtag fingerstache etsy XOXO
                    four loko salvia lo-fi you probably haven't heard of them.
                    Tumblr authentic meh yr, quinoa sartorial taxidermy street.
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
                    I'm baby unicorn vinyl beard, hashtag fingerstache etsy XOXO
                    four loko salvia lo-fi you probably haven't heard of them.
                    Tumblr authentic meh yr, quinoa sartorial taxidermy street.
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
                    I'm baby unicorn vinyl beard, hashtag fingerstache etsy XOXO
                    four loko salvia lo-fi you probably haven't heard of them.
                    Tumblr authentic meh yr, quinoa sartorial taxidermy street.
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

export default UtilityPage;
