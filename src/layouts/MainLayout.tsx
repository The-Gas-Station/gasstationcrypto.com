import React, {
  ReactNode,
  useCallback,
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
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
import WalletModal from '../components/walletModal';

import useGASTokenPrice from '../hooks/useGASTokenPrice';

import InfoDropdown from './main/InfoDropdown';
import AddToken from './main/AddToken';
import { ColorModeSwitcher } from './main/ColorModeSwitcher';

import { ReactComponent as SvgMenuOpen } from '../assets/menu-open.svg';
import { ReactComponent as SvgMenuClose } from '../assets/menu-close.svg';

import { ReactComponent as SvgLogoIcon } from '../assets/gas.svg';
import { ReactComponent as SvgLogoFull } from '../assets/logo-full.svg';

import { ReactComponent as SvgHome } from '../assets/Nozzle.svg';
import { ReactComponent as SvgRewards } from '../assets/Pump.svg';
import { ReactComponent as SvgNFPs } from '../assets/NFP.svg';
import { ReactComponent as SvgUtility } from '../assets/Utility.svg';

import { ReactComponent as SvgWallet } from '../assets/wallet.svg';
import { ReactComponent as SvgFuelcan } from '../assets/fuelcan.svg';

import { ReactComponent as SvgGitbook } from '../assets/gitbook.svg';
import { ReactComponent as SvgTwitter } from '../assets/twitter.svg';
import { ReactComponent as SvgDiscord } from '../assets/discord.svg';
import { ReactComponent as SvgTelegram } from '../assets/telegram.svg';
import crystl from '../assets/crystl-crystl.svg';
import reactjs from '../assets/reactjs-icon.svg';
import bootstrap from '../assets/getbootstrap-icon.svg';
import nodejs from '../assets/nodejs-icon.svg';
import ethersjs from '../assets/ethersjs-logo.svg';
import apelabs from '../assets/apelabs.png';
import pss from '../assets/pss.svg';
import Slider from 'react-slick';

// import FtmToken from '../assets/tokens/ftm.png';
// import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type ContextType = {
  setIsWalletModalOpen: (isWalletModalOpen: boolean) => void;
};

const LayoutContext = createContext<ContextType>({
  setIsWalletModalOpen: () => undefined,
});

export const MainLayout = () => {
  const navigate = useNavigate();

  const { readOnlyChainIds } = useConfig();
  const { currentChainId, setCurrentChainId } = useWeb3ConnectionsContext();
  // const { activateBrowserWallet, account } = useEthers();
  const { account } = useEthers();
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
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
  const [infoDropdownExpanded, setInfoDropdownExpanded] = useState(false);

  useEffect(() => {
    setStorage(slimMode);
  }, [slimMode]);

  const toggleSide = () => {
    setInfoDropdownExpanded(!sideOpen);
    setSlimMode(!sideOpen);
  };

  const sideOpen = slimMode || infoDropdownExpanded;

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

  // const connect = async () => {
  //   try {
  //     await activateBrowserWallet((e) => {
  //       console.log(e);
  //     }, true);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const settings = {
    dots: false,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: 'ease-out',
    infinite: true,
    variableWidth: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
                  <span
                    className="text-body"
                    style={{ cursor: !account ? 'pointer' : 'unset' }}
                    onClick={() => {
                      !account && setIsWalletModalOpen(true);
                    }}
                  >
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
                  <SvgWallet />
                </div>
              </div>
            </div>
            <div
              className={`row inner-content d-none d-lg-flex
              ${isMobile ? 'd-none d-lg-block' : ''}`}
            >
              <div className={isMobile ? 'col-md-9' : 'col-lg-9 col-xl-9'}>
                <div className="amount-sections amount-sections-scroll">
                  <Slider {...settings}>
                    <div className="news">
                      <div className="header">Meme Contest</div>
                      <div className="date">2/01-2/12</div>
                      <div className="body-text">
                        <a href="https://discord.gg/vaaZ2mrYaq">
                          Submit your original GAS Meme in Discord!
                        </a>
                      </div>
                    </div>
                    <div className="news">
                      <div className="header">Fuel Alert</div>
                      <div className="date">2/10</div>
                      <div className="body-text">
                        New Fuel Tanks on Moonriver/Avalanche/Cronos!
                      </div>
                    </div>
                    <div className="news">
                      <div className="header">Tax Break</div>
                      <div className="date">2/18/22</div>
                      <div className="body-text">movrGAS New Tax is 19%</div>
                    </div>
                    <div className="news">
                      <div className="header">Tax Break</div>
                      <div className="date">2/18/22</div>
                      <div className="body-text">avaxGAS New Tax is 19%</div>
                    </div>
                    <div className="news">
                      <div className="header">$10 Daily Giveaway</div>
                      <div className="date">Every Day in Discord</div>
                      <div className="body-text">
                        We're giving away $10 in GAS Every Day of the Year! Join
                        our Discord to learn more.
                      </div>
                    </div>
                    <div className="news">
                      <div className="header">Tax Break</div>
                      <div className="date">2/24/22</div>
                      <div className="body-text">croGAS New Tax is 19%</div>
                    </div>
                    <div className="news">
                      <div className="date"></div>
                      <div className="header">Follow Us On Twitter</div>
                      <div className="body-text">
                        <a href="https://twitter.com/gasstation_cryp">
                          Never Miss An Update!
                        </a>
                      </div>
                    </div>
                    <div className="news">
                      <div className="header">Built With</div>
                      <div className="body-flex">
                        <div className="d-flex flex-row">
                          <img
                            src={nodejs}
                            className="img"
                            data-mdb-toggle="tooltip"
                            title="Node.js"
                          />
                          <img
                            src={reactjs}
                            className="img"
                            data-mdb-toggle="tooltip"
                            title="React.js"
                          />
                          <img
                            src={ethersjs}
                            className="img"
                            data-mdb-toggle="tooltip"
                            title="Ethers.js"
                          />
                          <img
                            src={bootstrap}
                            className="img"
                            data-mdb-toggle="tooltip"
                            title="Bootstrap"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="news">
                      <div className="header">Partners</div>
                      <div className="body-flex">
                        <div className="d-flex flex-row">
                          <a href="https://crystl.finance">
                            <img
                              src={crystl}
                              className="img"
                              data-mdb-toggle="tooltip"
                              title="Crystl.Finance"
                            />
                          </a>
                          <a href="https://www.primatesocialsociety.com/">
                            <img
                              src={pss}
                              className="img"
                              data-mdb-toggle="tooltip"
                              title="Primate Social Society"
                            />
                          </a>
                          <a href="https://www.apelabs.education/">
                            <img
                              src={apelabs}
                              className="img"
                              data-mdb-toggle="tooltip"
                              title="Apelabs DeFi Education"
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
              <div className={isMobile ? 'col-md-3' : 'col-lg-3 col-xl-3'}>
                <div className="meta-mask-block">
                  <div className="custom-select-box flex-row py-0">
                    <div className="text-right">
                      <span
                        className="text-body"
                        style={{ cursor: !account ? 'pointer' : 'unset' }}
                        onClick={() => {
                          !account && setIsWalletModalOpen(true);
                        }}
                      >
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
                      <SvgWallet />
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
          slimCollapsed={!infoDropdownExpanded}
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
                setDropdownCollapse={setInfoDropdownExpanded}
              />
            </div>

            <div className="d-flex flex-column justify-content-between align-self-end">
              {sideOpen ? (
                <>
                  <hr className="mx-1" />
                  <MDBBtn
                    outline
                    color="connect"
                    className={`mx-4 d-flex align-items-center justify-content-between
                    ${account ? '' : 'not-connected'}`}
                    style={{
                      width: 252,
                      cursor: !account ? 'pointer' : 'unset',
                    }}
                    // onClick={connect}
                    onClick={() => {
                      !account && setIsWalletModalOpen(true);
                    }}
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
          <LayoutContext.Provider value={{ setIsWalletModalOpen }}>
            <Outlet />
          </LayoutContext.Provider>
        </MDBContainer>
      </div>
      <WalletModal
        isWalletModalOpen={isWalletModalOpen}
        setIsOpen={setIsWalletModalOpen}
        closeWalletModal={() => setIsWalletModalOpen(false)}
      />
    </>
  );
};

export function useLayoutContext() {
  return useContext(LayoutContext);
}

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
