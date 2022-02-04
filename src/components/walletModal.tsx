import React, { useState } from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBCollapse,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { ReactComponent as SvgSearch } from '../assets/search.svg';
import WalletSelect from '../assets/wallet-select.png';
import Coinbase from '../assets/coinbase.png';
import Metamask from '../assets/metamask.png';
import useEthers from '../library/hooks/useEthers';

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
  const [showShow, setShowShow] = useState(false);

  const toggleShow = () => setShowShow(!showShow);

  const { activateBrowserWallet, activateWalletConnect } = useEthers();

  const connect = async (connector: 'metamask' | 'walletconnect') => {
    const _connector =
      connector === 'metamask' ? activateBrowserWallet : activateWalletConnect;
    try {
      await _connector((e) => {
        console.log(e);
      }, true);
    } catch (e) {
      console.log(e);
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
            <MDBModalBody>
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
            </MDBModalBody>
            <MDBModalFooter>
              <div className="wallet-item-block">
                <span className="title">Select a Wallet</span>
                <div className="wallet-items">
                  <div
                    className="wallet-item"
                    onClick={() => connect('metamask')}
                  >
                    <img src={Metamask} alt="" />
                    <p>Meta Mask</p>
                  </div>
                  <div
                    className="wallet-item"
                    onClick={() => connect('walletconnect')}
                  >
                    <img src={WalletSelect} alt="" />
                    <p>Wallet Connect</p>
                  </div>
                  <div className="wallet-item">
                    <img src={Coinbase} alt="" />
                    <p>Meta Mask</p>
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
