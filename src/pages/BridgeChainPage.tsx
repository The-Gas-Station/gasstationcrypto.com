import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import numeral from 'numeral';

import { ethers, BigNumber } from 'ethers';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useBridge from '../hooks/useBridge';

import {
  CHAIN_NAMES,
  ChainId,
  CHAIN_ETHER,
  EXPLORER_URLS,
  RPC_URLS,
} from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';
import useEthers from '../library/hooks/useEthers';

import { BridgeTransactionModal } from '../components/bridgeComponents/BridgeTransactionModal';
import BridgeTransactionHistory from '../components/bridgeComponents/BridgeTransactionHistory';
import Countdown from '../components/Countdown';

import { useLayoutContext } from '../layouts/MainLayout';

export const BridgeChainPage = ({ chainId }: { chainId: ChainId }) => {
  const { setIsWalletModalOpen } = useLayoutContext();

  const navigate = useNavigate();
  const { account, chainId: connectedChainId } = useEthers();
  const chainData = CHAIN_INFO[chainId];

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

  const [recipient /* , setRecipient */] = useState('');

  const [waiveFeesWithTokens, setWaiveFeesWithTokens] = useState(false);
  const [waiveFeesWithNFP, setWaiveFeesWithNFP] = useState(false);

  const [selectedNFP, setSelectedNFP] = useState<
    { image: string; name: string; tokenId: number } | undefined
  >();

  const {
    useApproveAction,
    useDepositAction,
    chainGasBalance,
    tokenBalance: assetBalance,
    tokenApproved: assetApproved,
    // paused,
    // minimum,
    amountToRecieve,
    cost,
    expectedFee,
    fee,
    nfpUsed,
    nfps,
    nfpsLastUsedAt,
    tokensUsed,
    tokensLastUsedAt,
    bridgeDepositFeeError,
  } = useBridge(chainId, {
    amount,
    chainTo: chainTo?.bridgeChainId,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    token: chainData.bridgeTokens[asset.key].address,
    recipient: (recipient || account) ?? undefined,
    useTokens: waiveFeesWithTokens,
    nfpId: waiveFeesWithNFP ? selectedNFP?.tokenId : undefined,
  });

  //   console.log(
  //     paused,
  //     tokensUsed,
  //     nfpUsed,
  //     ethers.utils.formatEther(minimum),
  //     bridgeDepositFeeError,
  //     tokensLastUsedAt,
  //     nfpsLastUsedAt,
  //   );

  const [approving, setApproving] = useState(false);
  const _approve = useApproveAction();

  const approve = (amount: BigNumber) => {
    setApproving(true);
    _approve(amount).finally(() => setApproving(false));
  };

  const [depositing, setDepositing] = useState(false);
  const _deposit = useDepositAction();
  const [depositError, setDepositError] = useState('');

  const deposit = async () => {
    setDepositing(true);
    const { state, events } = await _deposit({
      amount,
      chainTo: chainTo?.bridgeChainId,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      token: chainData.bridgeTokens[asset.key].address,
      recipient: (recipient || account) ?? undefined,
      useTokens: waiveFeesWithTokens,
      nfpId: waiveFeesWithNFP ? selectedNFP?.tokenId : undefined,
    }).finally(() => setDepositing(false));

    console.log(state, events);
    if (state.status != 'None' && !state.errorMessage) {
      setIsBridgeTxOpen(true);
    } else {
      setDepositError(
        'Issue with starting transfer. Please try again or contract support for help.',
      );
    }
  };

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
                        <div className="row pt-2">
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
                                    setShowPatron(false);
                                  }}
                                >
                                  Use GAS
                                </span>
                                <span
                                  className={showPatron ? 'active' : ''}
                                  onClick={() => {
                                    setShowPatron(true);
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
                                  <p className="text-green text-center">
                                    {numeral(
                                      ethers.utils.formatEther(chainGasBalance),
                                    ).format('0.00')}
                                  </p>
                                  <p className="text-green text-center">
                                    {chainData.gasTokenName}
                                  </p>
                                  {tokensLastUsedAt * 1000 >
                                    Date.now() - 24 * 60 * 60 * 1000 && (
                                    <span className="text-pink text-center">
                                      Not available for
                                      <br />
                                      <br />
                                      <Countdown
                                        timeFrom={tokensLastUsedAt * 1000}
                                        timeTell={
                                          Date.now() - 24 * 60 * 60 * 1000
                                        }
                                      />
                                    </span>
                                  )}
                                </div>
                                <div className="d-flex flex-column savings">
                                  <span>Fees:</span>
                                  <span>
                                    <span className="text-green">
                                      {numeral(
                                        ethers.utils.formatEther(fee),
                                      ).format('0.00')}
                                    </span>
                                    {tokensUsed && (
                                      <span className="strike">
                                        {numeral(
                                          tokensUsed
                                            ? ethers.utils.formatEther(
                                                expectedFee.sub(fee),
                                              )
                                            : ethers.utils.formatEther(fee),
                                        ).format('0.00')}
                                      </span>
                                    )}
                                  </span>
                                  <span className="text-green">
                                    You will save{' '}
                                    {tokensUsed
                                      ? numeral(
                                          ethers.utils.formatEther(expectedFee),
                                        ).format('0.00')
                                      : 0}{' '}
                                    {asset?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="line-break" />
                              <div className="d-flex flex-row justify-content-center">
                                <div className="col-6">
                                  <button
                                    className="join-btn"
                                    onClick={() => {
                                      setWaiveFeesWithTokens(
                                        !waiveFeesWithTokens,
                                      );
                                      setWaiveFeesWithNFP(false);
                                    }}
                                    disabled={
                                      tokensLastUsedAt * 1000 >
                                      Date.now() - 24 * 60 * 60 * 1000
                                    }
                                  >
                                    <span className="text-white1">
                                      {tokensLastUsedAt * 1000 >
                                      Date.now() - 24 * 60 * 60 * 1000
                                        ? 'Not Available'
                                        : waiveFeesWithTokens
                                        ? 'Cancel'
                                        : 'Waive Fees'}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div
                              className={`collapse ${showPatron ? 'show' : ''}`}
                            >
                              <div className="d-flex flex-row container">
                                <div className="d-flex flex-column patron-balance">
                                  <p className="text-pink">Select A Patron</p>
                                  <div className="bridge-amount">
                                    {nfps &&
                                      nfps.map((nfp) => (
                                        <img
                                          key={`nfp-${nfp.tokenId}`}
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
                                      {nfpsLastUsedAt[selectedNFP.tokenId] *
                                        1000 >
                                        Date.now() - 24 * 60 * 60 * 1000 && (
                                        <span className="text-pink text-center">
                                          Not available for
                                          <br />
                                          <br />
                                          <Countdown
                                            timeFrom={
                                              nfpsLastUsedAt[
                                                selectedNFP.tokenId
                                              ] * 1000
                                            }
                                            timeTell={
                                              Date.now() - 24 * 60 * 60 * 1000
                                            }
                                          />
                                        </span>
                                      )}
                                      <br />
                                      <span>Fees:</span>
                                      <span>
                                        <span className="text-green">
                                          {numeral(
                                            ethers.utils.formatEther(fee),
                                          ).format('0.00')}
                                        </span>
                                        {nfpUsed && (
                                          <span className="strike">
                                            {numeral(
                                              nfpUsed
                                                ? ethers.utils.formatEther(
                                                    expectedFee.sub(fee),
                                                  )
                                                : ethers.utils.formatEther(fee),
                                            ).format('0.00')}
                                          </span>
                                        )}
                                      </span>
                                      <span className="big-right text-green">
                                        You will save{' '}
                                        {numeral(
                                          nfpUsed
                                            ? ethers.utils.formatEther(
                                                expectedFee.sub(fee),
                                              )
                                            : '0',
                                        ).format('0.00')}{' '}
                                        {asset?.name}
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
                                  <button
                                    className="join-btn"
                                    onClick={() => {
                                      setWaiveFeesWithNFP(!waiveFeesWithNFP);
                                      setWaiveFeesWithTokens(false);
                                    }}
                                    disabled={
                                      selectedNFP &&
                                      nfpsLastUsedAt[selectedNFP.tokenId] *
                                        1000 >
                                        Date.now() - 24 * 60 * 60 * 1000
                                    }
                                  >
                                    <span className="text-white1">
                                      {!selectedNFP ||
                                      nfpsLastUsedAt[selectedNFP.tokenId] *
                                        1000 >
                                        Date.now() - 24 * 60 * 60 * 1000
                                        ? 'Not Available'
                                        : waiveFeesWithNFP
                                        ? 'Cancel'
                                        : 'Waive Fees'}
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
                      <br />

                      {!account ? (
                        <div className="action-item">
                          <button className="join-btn" onClick={connect}>
                            Connect
                          </button>
                        </div>
                      ) : chainId != connectedChainId ? (
                        <div className="action-item">
                          <button className="join-btn" onClick={forceChain}>
                            Switch Chain
                          </button>
                        </div>
                      ) : (
                        <></>
                      )}

                      {amount.gt(0) &&
                      !bridgeDepositFeeError &&
                      account &&
                      chainId == connectedChainId ? (
                        amount.gt(assetBalance) ? (
                          <button
                            className="join-btn"
                            disabled={amount.gt(assetBalance)}
                          >
                            <span className=" d-lg-block">
                              You do not have enough {asset?.name}
                            </span>
                          </button>
                        ) : assetApproved.gte(amount) ? (
                          <>
                            <button
                              className="join-btn"
                              disabled={amount.gt(assetBalance) || depositing}
                              onClick={() => {
                                deposit();
                              }}
                            >
                              <span className=" d-lg-block">
                                {depositing ? 'Sending...' : 'Send'}
                              </span>
                            </button>
                            {depositError && (
                              <div className="error text-center pt-2">
                                {depositError}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="row">
                            <div className="col-md-6 col-12">
                              <button
                                className="join-btn"
                                disabled={amount.gt(assetBalance) || approving}
                                onClick={() => {
                                  approve(amount);
                                }}
                              >
                                <span className=" d-lg-block">
                                  {approving
                                    ? 'Approving...'
                                    : 'Approve Amount'}
                                </span>
                              </button>
                            </div>
                            <div className="col-md-6 col-12">
                              <button
                                className="join-btn col-md-6 col-12"
                                disabled={amount.gt(assetBalance) || approving}
                                onClick={() => {
                                  approve(ethers.constants.MaxUint256);
                                }}
                              >
                                <span className=" d-lg-block">
                                  {approving ? 'Approving...' : 'Approve Max'}
                                </span>
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <></>
                      )}
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
