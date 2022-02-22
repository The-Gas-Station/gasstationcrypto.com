import { useState } from 'react';
import {
  IoArrowDown,
  IoChevronDown,
  IoCog,
  IoInformationCircleOutline,
} from 'react-icons/io5';
export const SwapCard = () => {
  const [showSlippageSettings, setShowSlippageSettings] = useState(false);
  const toggleSlippageSettings = () =>
    setShowSlippageSettings(!showSlippageSettings);
  return (
    <>
      <div className="swapcard">
        <div className="swaprow">
          <h4 className="title-6">
            From <img src="https://via.placeholder.com/40x40" />
          </h4>
          <div className="swaprowinner">
            <input type="text" />
            <button>
              <img src="https://via.placeholder.com/15x15" />
              <p>CRO</p>{' '}
              <p>
                <IoChevronDown />
              </p>
            </button>
          </div>
        </div>
        <div className="flex-row d-flex justify-content-center text-green">
          <IoArrowDown />
        </div>

        <div className="swaprow">
          <h4 className="title-7">
            To <img src="https://via.placeholder.com/40x40" />
          </h4>
          <div className="swaprowinner">
            <input type="text" />
            <button>
              <img src="https://via.placeholder.com/15x15" />
              <p>croGAS</p>
              <p>
                <IoChevronDown />
              </p>
            </button>
          </div>
        </div>
        <div className="slippage">
          <div className="l">Slippage Tolerance</div>
          <div className="r" onClick={() => toggleSlippageSettings()}>
            Auto
          </div>
          <IoCog className="img" onClick={() => toggleSlippageSettings()} />
        </div>
        {showSlippageSettings ? (
          <div className="slippageSettings">
            <div className="inner">
              <p>Transaction Settings</p>
              <span>
                Slippage Tolerance <IoInformationCircleOutline />
              </span>
              <div className="btn-row">
                <div className="smbutton">1%</div>
                <div className="smbutton">5%</div>
                <div className="smbutton">Auto</div>
                <div className="bigbutton">
                  <input type="text" placeholder="20.0" />%
                </div>
              </div>
              <span>
                Transaction Deadline <IoInformationCircleOutline />
              </span>
              <div className="flex-row d-flex">
                <div className="bigbutton1">
                  <input type="text" placeholder="20" />
                </div>
                <span>Minutes</span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="swap">
          <button>Swap</button>
        </div>
        <div className="connectedDex">
          Currently Connected To: ApeSwap - Binance Smart Chain
        </div>
      </div>
    </>
  );
};
export default SwapCard;
