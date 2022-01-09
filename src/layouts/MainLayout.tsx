import React, { ReactNode, useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBNavbar,
  MDBBtn,
  MDBContainer,
} from 'mdb-react-ui-kit';

import { ethers } from 'ethers';

import { useConfig } from '../library/providers/ConfigProvider';
import { useWeb3ConnectionsContext } from '../library/providers/Web3ConnectionsProvider';
import useLocalStorage from '../library/hooks/useLocalStorage';
import useEthers from '../library/hooks/useEthers';
import shortenString from '../library/helpers/shortenString';

import { CHAIN_NAMES, ChainId } from '../library/constants/chains';
import { CHAIN_INFO } from '../configs';

import useGASTokenPrice from '../hooks/useGASTokenPrice';

import InfoDropdown from './main/InfoDropdown';
import AddToken from './main/AddToken';
import { ColorModeSwitcher } from './main/ColorModeSwitcher';

import { ReactComponent as SvgMenuOpen } from '../assets/menu-open.svg';
import { ReactComponent as SvgMenuClose } from '../assets/menu-close.svg';

import { ReactComponent as SvgLogoIcon } from '../assets/gas.svg';
import { ReactComponent as SvgLogoFull } from '../assets/logo-full.svg';

import { ReactComponent as SvgHome } from '../assets/home.svg';
import { ReactComponent as SvgRewards } from '../assets/rewards.svg';
import { ReactComponent as SvgNFPs } from '../assets/nfps.svg';
import { ReactComponent as SvgUtility } from '../assets/utility.svg';

import { ReactComponent as SvgWallet } from '../assets/wallet.svg';
import { ReactComponent as SvgFuelcan } from '../assets/fuelcan.svg';

import { ReactComponent as SvgGitbook } from '../assets/gitbook.svg';
import { ReactComponent as SvgTwitter } from '../assets/twitter.svg';
import { ReactComponent as SvgDiscord } from '../assets/discord.svg';
import { ReactComponent as SvgTelegram } from '../assets/telegram.svg';

// import FtmToken from '../assets/tokens/ftm.png';
import Metamask from '../assets/wallets/metamask.png';
// import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const MainLayout = () => {
  const navigate = useNavigate();

  const { readOnlyChainIds } = useConfig();
  const { currentChainId, setCurrentChainId } = useWeb3ConnectionsContext();
  const { activateBrowserWallet, account } = useEthers();

  const gasTokenPrice = useGASTokenPrice(currentChainId);

  const switchNetwork = (e: any) => {
    const newChainId: ChainId = parseInt(e.target.value);
    setCurrentChainId(newChainId);
    if (window.location.hash.includes('/hub')) {
      navigate(`/${CHAIN_NAMES[newChainId]}/hub`);
    }
  };

  const [storage, setStorage] = useLocalStorage('sideNav', true);
  const [slimMode, setSlimMode] = useState(storage);
  const [infoDropdownCollapse, setInfoDropdownCollapse] = useState(false);

  useEffect(() => {
    setStorage(slimMode);
  }, [slimMode]);

  const toggleSide = () => {
    setInfoDropdownCollapse(!sideOpen);
    setSlimMode(!sideOpen);
  };

  const sideOpen = slimMode || infoDropdownCollapse;

  const headerLinks = [
    {
      label: 'Home',
      route: '/',
      icon: SvgHome,
    },
    {
      label: 'Rewards Hub',
      route: '/hub',
      icon: SvgRewards,
    },
    {
      label: 'Non Fungible Patrons',
      route: '/nfp',
      icon: SvgNFPs,
    },
    {
      label: (
        <>
          Utilities{' '}
          <i>
            <small>BETA</small>
          </i>
        </>
      ),
      route: '/utility',
      icon: SvgUtility,
    },
  ];

  const socialLinks = [
    {
      label: 'Gitbook',
      route: 'https://gasstationcrypto.gitbook.io/the-crypto-gas-station/',
      icon: SvgGitbook,
    },
    {
      label: 'Twitter',
      route: 'https://twitter.com/GasStation_cryp',
      icon: SvgTwitter,
    },
    {
      label: 'Discord',
      route: 'https://discord.gg/vaaZ2mrYaq',
      icon: SvgDiscord,
    },
    {
      label: 'Telegram',
      route: 'https://t.me/TheGasStation_Crypto',
      icon: SvgTelegram,
    },
  ];

  const connect = async () => {
    try {
      await activateBrowserWallet((e) => {
        console.log(e);
      }, true);
    } catch (e) {
      console.log(e);
    }
  };

  //   const settings = {
  //     dots: false,
  //     arrows: false,
  //     autoplay: true,
  //     speed: 2000,
  //     autoplaySpeed: 2000,
  //     cssEase: 'ease-out',
  //     infinite: true,
  //     variableWidth: true,
  //     slidesToShow: 4,
  //     slidesToScroll: 1,
  //     responsive: [
  //       {
  //         breakpoint: 1600,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //           infinite: true,
  //         },
  //       },
  //       {
  //         breakpoint: 1440,
  //         settings: {
  //           slidesToShow: 3,
  //           slidesToScroll: 1,
  //           infinite: true,
  //         },
  //       },
  //       {
  //         breakpoint: 1200,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //           infinite: true,
  //         },
  //       },
  //       {
  //         breakpoint: 600,
  //         settings: {
  //           slidesToShow: 2,
  //           slidesToScroll: 1,
  //           initialSlide: 1,
  //         },
  //       },
  //       {
  //         breakpoint: 480,
  //         settings: {
  //           slidesToShow: 1,
  //           slidesToScroll: 1,
  //         },
  //       },
  //     ],
  //   };

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const isMobile: boolean = width <= 991;

  return (
    <>
      <MDBNavbar fixed="top">
        <div className="menu-amount-sections">
          <div className={`menu-icon ${!sideOpen ? 'is-closed' : 'is-open'}`}>
            <MDBBtn
              onClick={toggleSide}
              rippleCentered
              tag="a"
              color="none"
              className="p-2 d-flex align-items-center justify-content-center"
              style={{ minWidth: 42, minHeight: 50 }}
            >
              {sideOpen ? <SvgMenuOpen /> : <SvgMenuClose />}
            </MDBBtn>
            <div className="logo-block">
              <div className="d-block d-lg-none">
                <SvgLogoIcon
                  style={{
                    width: 48,
                    height: 48,
                  }}
                />
              </div>
              <div className="d-none d-lg-flex">
                {sideOpen ? (
                  <>
                    <SvgLogoIcon
                      style={{
                        width: 48,
                        height: 48,
                      }}
                    />
                    <div className="d-none d-lg-block ms-3">
                      <SvgLogoFull />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <div className="right-content">
            <div className="meta-mask-block d-flex d-lg-none">
              <div className="custom-select-box flex-row py-0">
                <div className="text-right">
                  <span className="text-fantom">
                    {account ? shortenString(account) : 'Connect Wallet'}
                  </span>
                  <select
                    className="custom-select"
                    onChange={switchNetwork}
                    value={currentChainId}
                  >
                    {(readOnlyChainIds || []).map((_chainId) => {
                      return (
                        _chainId == currentChainId &&
                        CHAIN_INFO[_chainId].launched && (
                          <option
                            key={`switch-chain-${_chainId}`}
                            value={_chainId}
                          >
                            {CHAIN_NAMES[_chainId]}
                          </option>
                        )
                      );
                    })}
                    {(readOnlyChainIds || []).map((_chainId) => {
                      return (
                        _chainId != currentChainId &&
                        CHAIN_INFO[_chainId].launched && (
                          <option
                            key={`switch-chain-${_chainId}`}
                            value={_chainId}
                          >
                            {CHAIN_NAMES[_chainId]}
                          </option>
                        )
                      );
                    })}
                  </select>
                </div>
                <div className="metamask-img">
                  <img src={Metamask} alt="icons" />
                </div>
              </div>
            </div>
            <div
              className={`row inner-content d-none d-lg-flex
              ${isMobile ? 'd-none d-lg-block' : ''}`}
            >
              <div className={isMobile ? 'col-md-9' : 'col-lg-9 col-xl-9'}>
                {/* <div className="amount-sections amount-sections-scroll">
                  <Slider {...settings}>
                    <div className="amount-row">
                      <div className="amount-col p-0 text-white">
                        <img src={FtmToken} alt="ftm" style={{ width: 24 }} />
                      </div>
                      <div className="amount-col text-white">
                        <span className="text-fantom">Fantom</span>
                        <span className="text-fantom">
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 7C3 7.13261 3.05268 7.25979 3.14645 7.35355C3.24021 7.44732 3.36739 7.5 3.5 7.5H9.293L7.146 9.646C7.05211 9.73989 6.99937 9.86722 6.99937 10C6.99937 10.1328 7.05211 10.2601 7.146 10.354C7.23989 10.4479 7.36722 10.5006 7.5 10.5006C7.63278 10.5006 7.76011 10.4479 7.854 10.354L10.854 7.354C10.9006 7.30755 10.9375 7.25238 10.9627 7.19163C10.9879 7.13089 11.0009 7.06577 11.0009 7C11.0009 6.93423 10.9879 6.86911 10.9627 6.80837C10.9375 6.74762 10.9006 6.69245 10.854 6.646L7.854 3.646C7.76011 3.55211 7.63278 3.49937 7.5 3.49937C7.36722 3.49937 7.23989 3.55211 7.146 3.646C7.05211 3.73989 6.99937 3.86722 6.99937 4C6.99937 4.13278 7.05211 4.26011 7.146 4.354L9.293 6.5H3.5C3.36739 6.5 3.24021 6.55268 3.14645 6.64645C3.05268 6.74021 3 6.86739 3 7ZM0.5 14C0.367392 14 0.240215 13.9473 0.146447 13.8536C0.0526785 13.7598 0 13.6326 0 13.5V0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0C0.632608 0 0.759785 0.0526784 0.853553 0.146447C0.947321 0.240215 1 0.367392 1 0.5V13.5C1 13.6326 0.947321 13.7598 0.853553 13.8536C0.759785 13.9473 0.632608 14 0.5 14Z"
                              fill="#00B39C"
                            />
                          </svg>
                          GAS
                        </span>
                      </div>
                      <div className="amount-col">
                        <span className="sub-text">APR</span>
                        <span className="amount-text">$234%</span>
                      </div>
                      <div className="amount-col text-white">
                        <span className="sub-text">STAKED</span>
                        <span className="amount-text">$128,980,000</span>
                      </div>
                    </div>
                    <div className="amount-row">
                      <div className="amount-col p-0 text-white">
                        <img src={FtmToken} alt="ftm" style={{ width: 24 }} />
                      </div>
                      <div className="amount-col text-white">
                        <span className="text-fantom">Fantom</span>
                        <span className="text-fantom">
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 7C3 7.13261 3.05268 7.25979 3.14645 7.35355C3.24021 7.44732 3.36739 7.5 3.5 7.5H9.293L7.146 9.646C7.05211 9.73989 6.99937 9.86722 6.99937 10C6.99937 10.1328 7.05211 10.2601 7.146 10.354C7.23989 10.4479 7.36722 10.5006 7.5 10.5006C7.63278 10.5006 7.76011 10.4479 7.854 10.354L10.854 7.354C10.9006 7.30755 10.9375 7.25238 10.9627 7.19163C10.9879 7.13089 11.0009 7.06577 11.0009 7C11.0009 6.93423 10.9879 6.86911 10.9627 6.80837C10.9375 6.74762 10.9006 6.69245 10.854 6.646L7.854 3.646C7.76011 3.55211 7.63278 3.49937 7.5 3.49937C7.36722 3.49937 7.23989 3.55211 7.146 3.646C7.05211 3.73989 6.99937 3.86722 6.99937 4C6.99937 4.13278 7.05211 4.26011 7.146 4.354L9.293 6.5H3.5C3.36739 6.5 3.24021 6.55268 3.14645 6.64645C3.05268 6.74021 3 6.86739 3 7ZM0.5 14C0.367392 14 0.240215 13.9473 0.146447 13.8536C0.0526785 13.7598 0 13.6326 0 13.5V0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0C0.632608 0 0.759785 0.0526784 0.853553 0.146447C0.947321 0.240215 1 0.367392 1 0.5V13.5C1 13.6326 0.947321 13.7598 0.853553 13.8536C0.759785 13.9473 0.632608 14 0.5 14Z"
                              fill="#00B39C"
                            />
                          </svg>
                          GAS
                        </span>
                      </div>
                      <div className="amount-col">
                        <span className="sub-text">APR</span>
                        <span className="amount-text">$234%</span>
                      </div>
                      <div className="amount-col text-white">
                        <span className="sub-text">STAKED</span>
                        <span className="amount-text">$128,980,000</span>
                      </div>
                    </div>
                    <div className="amount-row">
                      <div className="amount-col p-0 text-white">
                        <img src={FtmToken} alt="ftm" style={{ width: 24 }} />
                      </div>
                      <div className="amount-col text-white">
                        <span className="text-fantom">Fantom</span>
                        <span className="text-fantom">
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 7C3 7.13261 3.05268 7.25979 3.14645 7.35355C3.24021 7.44732 3.36739 7.5 3.5 7.5H9.293L7.146 9.646C7.05211 9.73989 6.99937 9.86722 6.99937 10C6.99937 10.1328 7.05211 10.2601 7.146 10.354C7.23989 10.4479 7.36722 10.5006 7.5 10.5006C7.63278 10.5006 7.76011 10.4479 7.854 10.354L10.854 7.354C10.9006 7.30755 10.9375 7.25238 10.9627 7.19163C10.9879 7.13089 11.0009 7.06577 11.0009 7C11.0009 6.93423 10.9879 6.86911 10.9627 6.80837C10.9375 6.74762 10.9006 6.69245 10.854 6.646L7.854 3.646C7.76011 3.55211 7.63278 3.49937 7.5 3.49937C7.36722 3.49937 7.23989 3.55211 7.146 3.646C7.05211 3.73989 6.99937 3.86722 6.99937 4C6.99937 4.13278 7.05211 4.26011 7.146 4.354L9.293 6.5H3.5C3.36739 6.5 3.24021 6.55268 3.14645 6.64645C3.05268 6.74021 3 6.86739 3 7ZM0.5 14C0.367392 14 0.240215 13.9473 0.146447 13.8536C0.0526785 13.7598 0 13.6326 0 13.5V0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0C0.632608 0 0.759785 0.0526784 0.853553 0.146447C0.947321 0.240215 1 0.367392 1 0.5V13.5C1 13.6326 0.947321 13.7598 0.853553 13.8536C0.759785 13.9473 0.632608 14 0.5 14Z"
                              fill="#00B39C"
                            />
                          </svg>
                          GAS
                        </span>
                      </div>
                      <div className="amount-col">
                        <span className="sub-text">APR</span>
                        <span className="amount-text">$234%</span>
                      </div>
                      <div className="amount-col text-white">
                        <span className="sub-text">STAKED</span>
                        <span className="amount-text">$128,980,000</span>
                      </div>
                    </div>
                    <div className="amount-row">
                      <div className="amount-col p-0 text-white">
                        <img src={FtmToken} alt="ftm" style={{ width: 24 }} />
                      </div>
                      <div className="amount-col text-white">
                        <span className="text-fantom">Fantom</span>
                        <span className="text-fantom">
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 7C3 7.13261 3.05268 7.25979 3.14645 7.35355C3.24021 7.44732 3.36739 7.5 3.5 7.5H9.293L7.146 9.646C7.05211 9.73989 6.99937 9.86722 6.99937 10C6.99937 10.1328 7.05211 10.2601 7.146 10.354C7.23989 10.4479 7.36722 10.5006 7.5 10.5006C7.63278 10.5006 7.76011 10.4479 7.854 10.354L10.854 7.354C10.9006 7.30755 10.9375 7.25238 10.9627 7.19163C10.9879 7.13089 11.0009 7.06577 11.0009 7C11.0009 6.93423 10.9879 6.86911 10.9627 6.80837C10.9375 6.74762 10.9006 6.69245 10.854 6.646L7.854 3.646C7.76011 3.55211 7.63278 3.49937 7.5 3.49937C7.36722 3.49937 7.23989 3.55211 7.146 3.646C7.05211 3.73989 6.99937 3.86722 6.99937 4C6.99937 4.13278 7.05211 4.26011 7.146 4.354L9.293 6.5H3.5C3.36739 6.5 3.24021 6.55268 3.14645 6.64645C3.05268 6.74021 3 6.86739 3 7ZM0.5 14C0.367392 14 0.240215 13.9473 0.146447 13.8536C0.0526785 13.7598 0 13.6326 0 13.5V0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0C0.632608 0 0.759785 0.0526784 0.853553 0.146447C0.947321 0.240215 1 0.367392 1 0.5V13.5C1 13.6326 0.947321 13.7598 0.853553 13.8536C0.759785 13.9473 0.632608 14 0.5 14Z"
                              fill="#00B39C"
                            />
                          </svg>
                          GAS
                        </span>
                      </div>
                      <div className="amount-col">
                        <span className="sub-text">APR</span>
                        <span className="amount-text">$234%</span>
                      </div>
                      <div className="amount-col text-white">
                        <span className="sub-text">STAKED</span>
                        <span className="amount-text">$128,980,000</span>
                      </div>
                    </div>
                    <div className="amount-row">
                      <div className="amount-col p-0 text-white">
                        <img src={FtmToken} alt="ftm" style={{ width: 24 }} />
                      </div>
                      <div className="amount-col text-white">
                        <span className="text-fantom">Fantom</span>
                        <span className="text-fantom">
                          <svg
                            width="11"
                            height="14"
                            viewBox="0 0 11 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3 7C3 7.13261 3.05268 7.25979 3.14645 7.35355C3.24021 7.44732 3.36739 7.5 3.5 7.5H9.293L7.146 9.646C7.05211 9.73989 6.99937 9.86722 6.99937 10C6.99937 10.1328 7.05211 10.2601 7.146 10.354C7.23989 10.4479 7.36722 10.5006 7.5 10.5006C7.63278 10.5006 7.76011 10.4479 7.854 10.354L10.854 7.354C10.9006 7.30755 10.9375 7.25238 10.9627 7.19163C10.9879 7.13089 11.0009 7.06577 11.0009 7C11.0009 6.93423 10.9879 6.86911 10.9627 6.80837C10.9375 6.74762 10.9006 6.69245 10.854 6.646L7.854 3.646C7.76011 3.55211 7.63278 3.49937 7.5 3.49937C7.36722 3.49937 7.23989 3.55211 7.146 3.646C7.05211 3.73989 6.99937 3.86722 6.99937 4C6.99937 4.13278 7.05211 4.26011 7.146 4.354L9.293 6.5H3.5C3.36739 6.5 3.24021 6.55268 3.14645 6.64645C3.05268 6.74021 3 6.86739 3 7ZM0.5 14C0.367392 14 0.240215 13.9473 0.146447 13.8536C0.0526785 13.7598 0 13.6326 0 13.5V0.5C0 0.367392 0.0526785 0.240215 0.146447 0.146447C0.240215 0.0526784 0.367392 0 0.5 0C0.632608 0 0.759785 0.0526784 0.853553 0.146447C0.947321 0.240215 1 0.367392 1 0.5V13.5C1 13.6326 0.947321 13.7598 0.853553 13.8536C0.759785 13.9473 0.632608 14 0.5 14Z"
                              fill="#00B39C"
                            />
                          </svg>
                          GAS
                        </span>
                      </div>
                      <div className="amount-col">
                        <span className="sub-text">APR</span>
                        <span className="amount-text">$234%</span>
                      </div>
                      <div className="amount-col text-white">
                        <span className="sub-text">STAKED</span>
                        <span className="amount-text">$128,980,000</span>
                      </div>
                    </div>
                  </Slider>
                </div> */}
              </div>
              <div className={isMobile ? 'col-md-3' : 'col-lg-3 col-xl-3'}>
                <div className="meta-mask-block">
                  <div className="custom-select-box flex-row py-0">
                    <div className="text-right">
                      <span className="text-fantom">
                        {account ? shortenString(account) : 'Connect Wallet'}
                      </span>
                      <select
                        className="custom-select"
                        onChange={switchNetwork}
                        value={currentChainId}
                      >
                        {(readOnlyChainIds || []).map((_chainId) => {
                          return (
                            _chainId == currentChainId &&
                            CHAIN_INFO[_chainId].launched && (
                              <option
                                key={`switch-chain-${_chainId}`}
                                value={_chainId}
                              >
                                {CHAIN_NAMES[_chainId]}
                              </option>
                            )
                          );
                        })}
                        {(readOnlyChainIds || []).map((_chainId) => {
                          return (
                            _chainId != currentChainId &&
                            CHAIN_INFO[_chainId].launched && (
                              <option
                                key={`switch-chain-${_chainId}`}
                                value={_chainId}
                              >
                                {CHAIN_NAMES[_chainId]}
                              </option>
                            )
                          );
                        })}
                      </select>
                    </div>
                    <div className="metamask-img">
                      <img src={Metamask} alt="icons" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MDBNavbar>
      <div
        style={{ marginTop: 75, height: 'calc(100vh - 75px)' }}
        className="d-flex"
      >
        <MDBSideNav
          backdrop={false}
          slim={isMobile ? false : !sideOpen}
          slimCollapsed={!infoDropdownCollapse}
          isOpen={isMobile ? sideOpen : true}
          mode={isMobile ? 'over' : 'side'}
          relative
          closeOnEsc={false}
          className="h-100"
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <div
              className="flex-grow-1"
              style={{ overflowX: 'hidden', overflowY: 'auto' }}
            >
              <MDBSideNavMenu>
                {headerLinks.map((link) => (
                  <MDBSideNavItem className="m-2" key={link.route}>
                    <ActiveLink to={link.route}>
                      <link.icon
                        className=""
                        style={{ minWidth: 24, minHeight: 24 }}
                      />
                      {sideOpen && (
                        <span style={{ minWidth: 160 }}>{link.label}</span>
                      )}
                    </ActiveLink>
                  </MDBSideNavItem>
                ))}
              </MDBSideNavMenu>
              <InfoDropdown
                sideOpen={sideOpen}
                setDropdownCollapse={setInfoDropdownCollapse}
              />
            </div>

            <div className="d-flex flex-column justify-content-between align-self-end">
              <hr className="mx-1" />
              {sideOpen ? (
                <>
                  <MDBBtn
                    outline
                    color="connect"
                    className={`mx-4 d-flex align-items-center justify-content-between
                    ${account ? '' : 'not-connected'}`}
                    style={{ width: 252 }}
                    onClick={connect}
                  >
                    <SvgWallet />
                    <span className="flex-grow">
                      {account ? shortenString(account) : 'Connect Wallet'}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="4" fill="#FDBF16" />
                    </svg>
                  </MDBBtn>
                  <AddToken />
                </>
              ) : (
                <></>
              )}
              <hr className="mx-1" />
              <div
                className={`d-flex align-items-center justify-content-center
                ${sideOpen ? '' : ''}`}
              >
                {sideOpen ? (
                  <div className="d-flex align-items-center">
                    {CHAIN_INFO[currentChainId].chartAddress ? (
                      <a
                        href={CHAIN_INFO[currentChainId].chartAddress}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SvgFuelcan />{' '}
                        <span className="px-3 text-primary-color">
                          $
                          {ethers.utils
                            .formatEther(gasTokenPrice)
                            .substring(0, 13)}
                        </span>
                      </a>
                    ) : (
                      <>
                        <SvgFuelcan />{' '}
                        <span className="px-3 text-primary-color">
                          $
                          {ethers.utils
                            .formatEther(gasTokenPrice)
                            .substring(0, 13)}
                        </span>
                      </>
                    )}
                  </div>
                ) : (
                  <></>
                )}
                <ColorModeSwitcher />
              </div>
              <div className="d-flex align-items-center justify-content-center flex-wrap my-2">
                {socialLinks.map((link) => (
                  <MDBBtn
                    tag="a"
                    href={link.route}
                    color="none"
                    className="m-1 p-1"
                    style={{ color: '#55acee' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={link.label}
                  >
                    <link.icon />
                  </MDBBtn>
                ))}
              </div>
            </div>
          </div>
        </MDBSideNav>
        <MDBContainer fluid className="flex-grow scrollView">
          <Outlet />
        </MDBContainer>
      </div>
    </>
  );
};

export default MainLayout;

type LinkProps = {
  to: string;
  children: ReactNode;
};

const ActiveLink = ({ to, children }: LinkProps) => {
  const active = useLocation().pathname == to;
  const navigate = useNavigate();

  const route = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [to, navigate],
  );

  return (
    <MDBBtn
      href={to}
      color="none"
      className={`w-100 d-flex align-items-center d-block
      ${active ? 'active' : ''}`}
      onClick={route}
    >
      {children}
    </MDBBtn>
  );
};
