import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  //   MDBModalBody,
  //   MDBCollapse,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

import { ConnectorNames } from '../../library/providers/Web3ConnectionsProvider';
import useEthers from '../../library/hooks/useEthers';

import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector';
import {} from '@web3-react/abstract-connector';

// import { ReactComponent as SvgSearch } from '../assets/search.svg';
import Metamask from '../../assets/wallets/metamask.png';
import WalletConnect from '../../assets/wallets/wallet-connect.png';
import WalletLink from '../../assets/wallets/wallet-link.png';
import DeFiConnect from '../../assets/wallets/defi-connect.svg';

type modalOpen = {
  isWalletModalOpen: boolean;
  setIsOpen: any;
  closeWalletModal: any;
};

export const WalletModal = ({
  isWalletModalOpen,
  setIsOpen,
  closeWalletModal,
}: modalOpen) => {
  //   const [showShow, setShowShow] = useState(false);

  //   const toggleShow = () => setShowShow(!showShow);

  const {
    error,
    activateBrowserWallet,
    activateWalletConnect,
    activateWalletLink,
    activateDeFiConnect,
  } = useEthers();

  const [connectError, setConnectError] = useState(error);

  let errorMessage = '';

  if (connectError) {
    if (connectError instanceof NoEthereumProviderError) {
      errorMessage =
        'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
    } else if (connectError instanceof UnsupportedChainIdError) {
      errorMessage = "You're connected to an unsupported network.";
    } else if (
      connectError instanceof UserRejectedRequestErrorInjected ||
      connectError instanceof UserRejectedRequestErrorWalletConnect ||
      connectError.message == 'User denied account authorization' ||
      connectError.message == 'User close QRCode Modal'
    ) {
      errorMessage = 'Please authorize this website to access your wallet.';
    } else {
      console.error(connectError);
      errorMessage =
        'An unknown error occurred. Check the console for more details.';
    }
  }

  const connect = async (connector: ConnectorNames) => {
    let _connector:
      | ((
          onError?: (error: Error) => void,
          throwErrors?: boolean,
        ) => Promise<void>)
      | undefined;

    switch (connector) {
      case ConnectorNames.Injected:
        _connector = activateBrowserWallet;
        break;
      case ConnectorNames.WalletConnect:
        _connector = activateWalletConnect;
        break;
      case ConnectorNames.WalletLink:
        _connector = activateWalletLink;
        break;
      case ConnectorNames.DeFiConnect:
        _connector = activateDeFiConnect;
        break;
    }

    if (_connector) {
      try {
        await _connector(undefined, true)
          .then(() => setIsOpen(false))
          .catch(setConnectError);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <MDBModal
        show={isWalletModalOpen}
        className="wallet-modal"
        setShow={setIsOpen}
      >
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Connect a Wallet</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={closeWalletModal}
              ></MDBBtn>
            </MDBModalHeader>
            {/* <MDBModalBody>
              <div className="filter-name-wrapper">
                <span>Filter</span>
                <div className="filter-name-block">
                  <ul className="filter-name">
                    <li className={showShow ? '' : 'active'}>ALL</li>
                    <li>BSC</li>
                    <li>MATIC</li>
                    <li>FTM</li>
                  </ul>
                  <div className="filter-search">
                    <div
                      className={`search-icon ${showShow ? 'active' : ''}`}
                      onClick={toggleShow}
                    >
                      <SvgSearch />
                    </div>
                  </div>
                </div>
                <MDBCollapse show={showShow}>
                  <div className="search-input">
                    <SvgSearch />
                    <input type="text" placeholder="Search Networks" />
                  </div>
                </MDBCollapse>
              </div>
            </MDBModalBody> */}
            <MDBModalFooter>
              {errorMessage ? (
                <>
                  <div className="w-100 text-center alert alert-danger mt-3">
                    {errorMessage}
                  </div>
                  <br />
                </>
              ) : (
                <></>
              )}
              <div className="wallet-item-block">
                <span className="title">Select a Wallet</span>
                <div className="wallet-items">
                  <div
                    className="wallet-item"
                    onClick={() => connect(ConnectorNames.Injected)}
                  >
                    <img src={Metamask} alt="" />
                    <p>Meta Mask</p>
                  </div>
                  <div
                    className="wallet-item"
                    onClick={() => connect(ConnectorNames.WalletConnect)}
                  >
                    <img src={WalletConnect} alt="" />
                    <p>Wallet Connect</p>
                  </div>
                  <div
                    className="wallet-item"
                    onClick={() => connect(ConnectorNames.WalletLink)}
                  >
                    <img src={WalletLink} alt="" />
                    <p>Coinbase</p>
                  </div>
                  <div
                    className="wallet-item"
                    onClick={() => connect(ConnectorNames.DeFiConnect)}
                  >
                    <img src={DeFiConnect} alt="" />
                    <p>Crypto.com</p>
                  </div>
                </div>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
};

export default WalletModal;
