import React from 'react';
import { ReactNode, useCallback, useState, useEffect } from 'react';
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

  const [sideNav, setSidenavStorage] = useLocalStorage('sideNav', true);
  const [slimMode, setSlimMode] = useState(sideNav === false);
  const [infoDropdownCollapse, setInfoDropdownCollapse] = useState(false);

  const sideOpen = !slimMode;
  const infoDropdownOpen = sideOpen && infoDropdownCollapse;

  useEffect(() => {
    setSidenavStorage(sideOpen);
  });

  const toggleSide = () => {
    setSlimMode(!slimMode);
    setSidenavStorage(!slimMode);
  };

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
              <div className={isMobile ? 'col-md-9' : 'col-lg-9 col-xl-9'} />
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
          slimCollapsed={isMobile ? false : !sideOpen}
          hidden={isMobile ? !sideOpen : false}
          relative
          closeOnEsc={false}
        >
          <div className="d-flex flex-column justify-content-between">
            <div
              className="flex-grow-1"
              style={{
                overflowX: 'hidden',
                ...(!isMobile && { overflowY: 'auto' }),
              }}
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
                sideOpen={infoDropdownOpen}
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
