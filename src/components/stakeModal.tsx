import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
} from 'mdb-react-ui-kit';
import numeral from 'numeral';

import useTokenPrice from '../hooks/useTokenPrice';

import UsdcIcon from '../assets/usdc-rewards.svg';
import DoubleArrow from '../assets/double-arrow.svg';
import { Range, getTrackBackground } from 'react-range';
import { useDarkMode } from '../library/hooks/useDarkMode';

import { PoolResult } from '../hooks/Pools';

type modalOpen = {
  isStakeModalOpen: boolean;
  setIsOpen: any;
  closeStakeModal: any;
  chainId: number;
  staking: boolean;
  pool?: PoolResult;
};

export const StackModal = ({
  isStakeModalOpen,
  closeStakeModal,
  setIsOpen,
  staking,
  chainId,
  pool,
}: modalOpen) => {
  const available =
    (staking ? pool?.stakeToken.balance : pool?.stakeToken.staked) ??
    ethers.BigNumber.from(0);

  const [amount, setAmount] = useState(available);
  const { isDarkMode } = useDarkMode(true);
  const [values, setValue] = useState([100]);
  const sliderColor = isDarkMode
    ? ['#28CCAB', '#32334A']
    : ['#28CCAB', '#e7e7ed'];

  const updateValue = (e: number) => {
    setValue([e]);
    setAmount(available.mul(e).div(100));
  };

  const updateAmount = (e: any) => {
    const newAmount = parseInt(e.target.value);
    const newEtherAmount = ethers.utils.parseEther(
      `${newAmount < 0 ? 0 : newAmount}`,
    );
    setAmount(newEtherAmount);
    setValue([
      Math.min(newEtherAmount.mul(100).div(available).toNumber(), 100),
    ]);
  };

  const amountUSD = useTokenPrice(chainId, pool?.stakeToken.address, amount);

  useEffect(() => {
    setAmount(available.mul(values[0]).div(100));
  }, [pool]);

  const [actioning, setActioning] = useState(false);
  const _deposit = pool?.useDepositAction(pool);
  const _withdraw = pool?.useWithdrawAction(pool);

  const action = () => {
    setActioning(true);
    if (staking && _deposit) {
      _deposit(amount).finally(() => {
        setActioning(false);
        closeStakeModal();
      });
    } else if (!staking && _withdraw) {
      _withdraw(amount).finally(() => {
        setActioning(false);
        closeStakeModal();
      });
    }
  };

  return (
    <>
      <MDBModal
        show={isStakeModalOpen}
        className="stack-modal"
        tabIndex="-1"
        setShow={setIsOpen}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>{staking ? 'Stake' : 'Unstake'}</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeStakeModal}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div className="title">
                <h5>
                  <img src={UsdcIcon} alt="" />
                  {pool?.stakeToken.symbol}
                </h5>
                <p>
                  Balance <br />
                  <span>
                    {numeral(
                      ethers.utils.formatEther(
                        pool?.stakeToken.balance ?? ethers.BigNumber.from(0),
                      ),
                    ).format('0,0.00')}
                  </span>
                </p>
              </div>
              <div className="input-form-control">
                <label>AMOUNT TO STAKE</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="0.0"
                  onChange={updateAmount}
                  value={numeral(ethers.utils.formatEther(amount)).format(
                    '0.00',
                  )}
                />
                <span>
                  ~
                  {numeral(ethers.utils.formatEther(amountUSD)).format(
                    '$0,0.00',
                  )}
                </span>
              </div>
              <div className="stake-progress-block">
                <div className="stake-progress">
                  <Range
                    step={1}
                    min={0}
                    max={100}
                    values={values}
                    onChange={(value) => updateValue(value[0])}
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
                  <span onClick={() => updateValue(25)}>25%</span>
                  <span onClick={() => updateValue(50)}>50%</span>
                  <span onClick={() => updateValue(75)}>75%</span>
                  <span onClick={() => updateValue(100)}>MAX</span>
                </div>
              </div>
              <button className="join-btn" onClick={action}>
                {actioning
                  ? staking
                    ? 'Staking...'
                    : 'Withdrawing...'
                  : 'Confirm'}
              </button>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default StackModal;
