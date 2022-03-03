import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import numeral from 'numeral';

import { ethers } from 'ethers';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useBridge from '../hooks/useBridge';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import { BridgeTransactionModal } from '../components/bridgeComponents/BridgeTransactionModal';
import BridgeTransactionHistory from '../components/bridgeComponents/BridgeTransactionHistory';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const navigate = useNavigate();
  const { currentAccount } = useWeb3ConnectionsContext();
  const chainData = CHAIN_INFO[chainId];

  const availableChains = Object.keys(CHAIN_INFO)
    .map((cId) => parseInt(cId))
    .filter((cId) => cId != chainId && CHAIN_INFO[cId].bridgeChainId)
    .map((cId) => CHAIN_INFO[cId]);

  const [chainTo, setChainTo] = useState(
    availableChains.length > 0 ? availableChains[0] : undefined,
  );

  const availableAssets: {
    name: string;
    address: string;
    icon: string;
    key: string;
  }[] = useMemo(() => {
    if (chainTo) {
      let currentChainBridgeTokens = Object.keys(chainData.bridgeTokens ?? {});
      if (!process.env.NODE_ENV || process.env.NODE_ENV != 'development') {
        currentChainBridgeTokens = currentChainBridgeTokens.filter(
          (tokenKey) => tokenKey != 'mock',
        );
      }
      return Object.keys(chainTo.bridgeTokens ?? {})
        .filter((tokenKey) => currentChainBridgeTokens.includes(tokenKey))
        .map((tokenKey) => ({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...chainTo.bridgeTokens[tokenKey],
          key: tokenKey,
        }));
    }

    return [];
  }, [chainId, chainTo]);

  const [asset, setAsset] = useState(
    availableAssets.length > 0 ? availableAssets[0] : undefined,
  );

  const [amount, setAmount] = useState(ethers.BigNumber.from(0));
  const [value, setValue] = useState(0);

  const [recipient, setRecipient] = useState('');

  const [selectedNFP, setSelectedNFP] = useState<
    { image: string; name: string; tokenId: number } | undefined
  >();

  const {
    chainGasPriceUsed,
    tokenPriceUsed,
    tokenBalance: assetBalance,
    amountToRecieve,
    cost,
    expectedFee,
    fee,
    nfpUsed,
    nfps,
    nfpsLastUsedAt,
    tokensUsed,
    bridgeDepositFeeError,
  } = useBridge(chainId, {
    amount,
    chainTo: chainTo?.bridgeChainId,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    token: chainData.bridgeTokens[asset.key].address,
    recipient: recipient || currentAccount,
    useTokens: false,
    nfpId: selectedNFP?.tokenId,
  });

  //   console.log(
  //     ethers.utils.formatEther(chainGasPriceUsed ?? 0),
  //     ethers.utils.formatEther(tokenPriceUsed ?? 0),
  //     ethers.utils.formatEther(amountToRecieve),
  //     ethers.utils.formatEther(cost),
  //     ethers.utils.formatEther(fee),
  //     nfpUsed,
  //     tokensUsed,
  //     bridgeDepositFeeError,
  //   );

  const updateValue = (e: number) => {
    setValue(e);
    setAmount(assetBalance.mul(e).div(100));
  };

  const updateAmount = (e: any) => {
    const newAmount = parseInt(e.target.value);
    const newEtherAmount = ethers.utils.parseEther(
      `${newAmount < 0 ? 0 : newAmount}`,
    );
    setAmount(newEtherAmount);
    setValue(
      assetBalance.gt(0)
        ? Math.min(newEtherAmount.mul(100).div(assetBalance).toNumber(), 100)
        : 0,
    );
  };

  const [showGAS, setShowGAS] = useState(false);
  const [showPatron, setShowPatron] = useState(false);
  const [waiveFee, setWaiveFee] = useState(false);
  const toggleWaiveFee = () => setWaiveFee(!waiveFee);
  const [useGAS, setUseGAS] = useState(false);
  const [usePatron, setUsePatron] = useState(false);

  const [isBridgeTxOpen, setIsBridgeTxOpen] = useState(false);

  const { readOnlyChainIds } = useConfig();
  const { setCurrentChainId } = useWeb3ConnectionsContext();

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    navigate(`/${CHAIN_NAMES[newChainId]}/Bridge`);
  };

  return (
    <>
      <section className="page-background-bridge">
        <div className="bridge-banner-img" />
        <div className="isolate">
          <div className="page-banner-top-title">
            <h3>
              <img
                src={chainData.tokenImage.replace('/public/', '/')}
                alt="#"
                className="img-size"
              />{' '}
              {CHAIN_NAMES[chainId]} Bridge
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
        </div>
      </section>
      <div className="row justify-content-center row-flex">
        <div className="col-lg-6">
          <h4 className="title-3">Bridge Tokens</h4>
          <div className="convert-grid-block">
            <div className="d-flex flex-column justify-content-center card-body1">
              <h4 className="text-green">Select A Network</h4>
              <div className="row">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-row dropdown">
                    <select
                      className="item-1"
                      onChange={(e: any) =>
                        setChainTo(availableChains[e.target.value])
                      }
                    >
                      {availableChains.map((chainInfo, i) => {
                        return (
                          <option key={`chainTo-chain-${i}`} value={i}>
                            {CHAIN_NAMES[chainInfo.chainId]}
                          </option>
                        );
                      })}
                    </select>
                    {chainTo && (
                      <img
                        src={chainTo.tokenImage.replace('/public/', '/')}
                        className="avatar"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="white-space" />
            {chainTo && (
              <>
                <div className="d-flex flex-column justify-content-center card-body1">
                  <h4 className="text-green">Select Your Asset</h4>
                  <div className="row">
                    <div className="d-flex flex-row">
                      <div className="d-flex flex-row dropdown">
                        <select
                          className="item-1"
                          onChange={(e: any) =>
                            setAsset(availableAssets[e.target.value])
                          }
                        >
                          {availableAssets.map((assetInfo, i) => {
                            return (
                              <option key={`chainTo-asset-${i}`} value={i}>
                                {assetInfo.name}
                              </option>
                            );
                          })}
                        </select>
                        {asset && (
                          <img
                            src={asset.icon.replace('/public/', '/')}
                            className="avatar"
                          />
                        )}
                      </div>
                    </div>
                    {bridgeDepositFeeError == 'token not available' ? (
                      <div className="error text-center">
                        Token is currently paused.
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="white-space" />
                {/*<div className="row justify-content-center card-body1">
              <div className="col-lg-3  d-md-block">
                <p>Recipient</p>
              </div>
              <div className="col-lg-9  d-md-block">
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
          <br />*/}
                <div className="d-flex flex-column justify-content-center card-body1">
                  <h4 className="text-green">Amount To Send</h4>
                  <br />
                  <div className="row">
                    <div className="d-flex flex-column  d-md-block">
                      <div className="convert-inner">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="0.00"
                          onChange={updateAmount}
                          value={numeral(
                            ethers.utils.formatEther(amount),
                          ).format('0.00')}
                        />
                        <div className="row">
                          <div className="bridge-amount col-lg-6">
                            <span className="subtext-left">0%</span>
                          </div>
                          <div className="bridge-amount col-lg-6">
                            <span className="subtext-right text-green">
                              100%
                            </span>
                          </div>
                          <div className="range">
                            <input
                              type="range"
                              className="form-range"
                              id="customRange1"
                              value={value}
                              step={1}
                              min={0}
                              max={100}
                              onChange={(e: any) => updateValue(e.target.value)}
                            />
                          </div>
                        </div>
                        {bridgeDepositFeeError == 'invalid input' ? (
                          <div className="error text-center">
                            Amount too small.
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="line-break" />
                      <div className="row justify-content-center">
                        <div className="col bridge-amount">
                          {cost && cost.gt(0) ? (
                            <span className="text-left">SERVICE COST</span>
                          ) : (
                            <></>
                          )}
                          <span className="text-left">SERVICE FEE</span>
                          <span className="subtext-left">Estimated Fee</span>
                        </div>
                        <div className="col bridge-amount">
                          {cost && cost.gt(0) ? (
                            <span className="subtext-right">
                              {numeral(ethers.utils.formatEther(cost)).format(
                                '0.00',
                              )}
                            </span>
                          ) : (
                            <></>
                          )}
                          <span className="subtext-right">
                            {numeral(
                              (amount && amount.gt(0)
                                ? fee.mul(1000000).div(amount).toNumber()
                                : 5000) / 1000000,
                            ).format('0.000%')}
                          </span>
                          <span className="subtext-right">
                            {numeral(ethers.utils.formatEther(fee)).format(
                              '0.00',
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className={`title-box waiveFee  ${
                            waiveFee ? 'open' : ''
                          }`}
                          onClick={toggleWaiveFee}
                        >
                          <span className=" d-lg-block">
                            {waiveFee ? 'Close' : 'Waive Fee?'}
                          </span>
                        </div>
                      </div>
                      <div className={`collapse ${waiveFee ? 'show' : ''}`}>
                        <div className="col bridge-amount">
                          <div className=" d-md-inline-block fee-box">
                            <span className="subtext-left">Void Fees</span>
                            <div className="d-flex flex-row justify-content-center">
                              <div className="grid-live-icon">
                                <span
                                  className={showGAS ? 'active' : ''}
                                  onClick={() => {
                                    setShowGAS(true);
                                    setUseGAS(true);
                                    setUsePatron(false);
                                    setShowPatron(false);
                                  }}
                                >
                                  Use GAS
                                </span>
                                <span
                                  className={showPatron ? 'active' : ''}
                                  onClick={() => {
                                    setShowPatron(true);
                                    setUsePatron(true);
                                    setUseGAS(false);
                                    setShowGAS(false);
                                  }}
                                >
                                  Use Patron
                                </span>
                              </div>
                            </div>
                            <br />
                            <div
                              className={`collapse ${showGAS ? 'show' : ''}`}
                            >
                              <div className="d-flex flex-row container">
                                <div className="d-flex flex-column patron-balance">
                                  <p className="text-pink">Token Balance</p>
                                  <p className="text-green">
                                    $connectedNetwork$GAS
                                  </p>
                                </div>
                                <div className="d-flex flex-column savings">
                                  <span>Fees:</span>
                                  <span>
                                    <span className="text-green">$0.00 </span>
                                    <span className="strike">$2.22</span>
                                  </span>
                                  <span className="text-green">
                                    You Saved $2.22
                                  </span>
                                </div>
                              </div>
                              <div className="line-break" />
                              <div className="d-flex flex-row justify-content-center">
                                <div className="col-6">
                                  <button className="join-btn">
                                    <span className="text-white1">
                                      Waive Fees
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`collapse ${usePatron ? 'show' : ''}`}
                            >
                              <div className="d-flex flex-row container">
                                <div className="d-flex flex-column patron-balance">
                                  <p className="text-pink">Select A Patron</p>
                                  <div className="bridge-amount">
                                    {nfps &&
                                      nfps.map((nfp) => (
                                        <img
                                          key={nfp.tokenId}
                                          src={nfp.image}
                                          onClick={() => setSelectedNFP(nfp)}
                                        />
                                      ))}
                                  </div>
                                </div>
                                <div className="d-flex flex-column bridge-amount savings">
                                  {selectedNFP ? (
                                    <>
                                      <img src={selectedNFP.image} />
                                      <br />
                                      <span>{selectedNFP.name}</span>
                                      <span className="text-pink">
                                        $COOLDOWN TIMER$
                                      </span>
                                      <br />
                                      <span>Fees:</span>
                                      <span>
                                        <span className="text-green">
                                          $0.00{' '}
                                        </span>
                                        <span className="strike">$2.22</span>
                                      </span>
                                      <span className="big-right text-green">
                                        You Saved{' '}
                                        {nfpUsed
                                          ? numeral(
                                              ethers.utils.formatEther(fee),
                                            ).format('0.00')
                                          : 0}
                                      </span>
                                    </>
                                  ) : (
                                    <>No NFP Selected</>
                                  )}
                                </div>
                              </div>

                              <div className="line-break" />
                              <div className="d-flex flex-row justify-content-center">
                                <div className="col-6">
                                  <button className="join-btn">
                                    <span className="text-white1">
                                      Waive Fees
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="white-space" />
                <div className="d-flex flex-column justify-content-center card-body1">
                  <h4 className="text-green">Send</h4>
                  <div className="d-flex flex-column d-md-block">
                    <div className="bridge-amount">
                      <div className="output-box">
                        <h5>
                          {numeral(
                            ethers.utils.formatEther(amountToRecieve),
                          ).format('0.00')}{' '}
                          {asset?.name}
                        </h5>
                      </div>
                      <button className="join-btn">
                        <div
                          onClick={() => {
                            setIsBridgeTxOpen(true);
                          }}
                        >
                          <span className=" d-lg-block">Send</span>
                        </div>
                      </button>
                    </div>
                    <BridgeTransactionModal
                      isBridgeTxOpen={isBridgeTxOpen}
                      setIsOpen={setIsBridgeTxOpen}
                      closeBridgeTx={() => setIsBridgeTxOpen(false)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <h4 className="title-2">Transaction History</h4>
          <div className="vh-100">
            <BridgeTransactionHistory />
          </div>
        </div>
      </div>
    </>
  );
};

export default BridgeChainPage;
