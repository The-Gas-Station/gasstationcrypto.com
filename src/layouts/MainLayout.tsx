import { ReactNode, useCallback, useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  MDBNavbar,
  MDBBtn,
  MDBScrollbar,
  MDBContainer,
} from 'mdb-react-ui-kit';

import useLocalStorage from '../library/hooks/useLocalStorage';
import useEthers from '../library/hooks/useEthers';
import shortenString from '../library/helpers/shortenString';
import numeral from 'numeral';

import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

import { ReactComponent as SvgMenuOpen } from '../assets/menu-open.svg';
import { ReactComponent as SvgMenuClose } from '../assets/menu-close.svg';

import { ReactComponent as SvgLogoIcon } from '../assets/logo-icon.svg';
import { ReactComponent as SvgLogoFull } from '../assets/logo-full.svg';

import { ReactComponent as SvgHome } from '../assets/home.svg';
import { ReactComponent as SvgRewards } from '../assets/rewards.svg';
import { ReactComponent as SvgNFPs } from '../assets/nfps.svg';

import { ReactComponent as SvgWallet } from '../assets/wallet.svg';

import { ReactComponent as SvgFuelcan } from '../assets/fuelcan.svg';

import { ReactComponent as SvgTwitter } from '../assets/twitter.svg';
import { ReactComponent as SvgDiscord } from '../assets/discord.svg';
import { ReactComponent as SvgTelegram } from '../assets/telegram.svg';
import { ReactComponent as SvgReddit } from '../assets/reddit.svg';

export const MainLayout = () => {
  const { activateBrowserWallet, active, account } = useEthers();

  const [storage, setStorage] = useLocalStorage('sideNav', true);
  const [sideOpen, setSideOpen] = useState(storage);

  useEffect(() => {
    setStorage(sideOpen);
  }, [sideOpen]);

  const toggleSide = () => {
    setSideOpen(!sideOpen);
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
  ];

  const socialLinks = [
    {
      label: 'Twitter',
      route: '/',
      icon: SvgTwitter,
    },
    {
      label: 'Discord',
      route: '/',
      icon: SvgDiscord,
    },
    {
      label: 'Telegram',
      route: '/',
      icon: SvgTelegram,
    },
    {
      label: 'Reddit',
      route: '/',
      icon: SvgReddit,
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

  return (
    <>
      <MDBNavbar
        fixed="top"
        style={{
          height: 66,
        }}
      >
        <div
          className="d-flex justify-content-between align-self-stretch mx-3"
          style={{ height: 50 }}
        >
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
          <div className="d-flex align-items-center" style={{ minWidth: 170 }}>
            <SvgLogoIcon
              style={{
                width: 48,
                height: 48,
              }}
              className="mx-3"
            />{' '}
            <SvgLogoFull />
          </div>
        </div>
      </MDBNavbar>
      <div
        style={{ marginTop: 66, height: 'calc(100vh - 66px)' }}
        className="d-flex"
      >
        <MDBSideNav
          backdrop={false}
          mode="side"
          slim={!sideOpen}
          relative
          className="h-100"
        >
          <MDBScrollbar sidenav tag="ul" suppressScrollX>
            <MDBSideNavMenu>
              {headerLinks.map((link) => (
                <MDBSideNavItem className="m-2" key={link.route}>
                  <ActiveLink to={link.route}>
                    <link.icon
                      className="px-1"
                      style={{ minWidth: 30, minHeight: 30 }}
                    />
                    {sideOpen && (
                      <span style={{ minWidth: 160 }}>{link.label}</span>
                    )}
                  </ActiveLink>
                </MDBSideNavItem>
              ))}
            </MDBSideNavMenu>
          </MDBScrollbar>
          <div className="d-flex flex-column justify-content-between fixed-bottom">
            {sideOpen ? (
              <>
                <MDBBtn
                  outline
                  color="connect"
                  className={`mx-4 d-flex align-items-center justify-content-between ${
                    active ? '' : 'not-connected'
                  }`}
                  style={{ width: 252 }}
                  onClick={connect}
                >
                  <SvgWallet />
                  <span className="flex-grow">
                    {active && account
                      ? shortenString(account)
                      : 'Connect Wallet'}
                  </span>
                  <span className=""></span>
                </MDBBtn>
              </>
            ) : (
              <></>
            )}
            <hr className="mx-1" />
            <div
              className={`d-flex align-items-center ${
                sideOpen
                  ? 'justify-content-between mx-4'
                  : 'justify-content-center'
              }`}
            >
              {sideOpen ? (
                <div className="d-flex align-items-center">
                  <SvgFuelcan />{' '}
                  <span className="px-3 text-primary-color">
                    {numeral('0').format('$0.000000')}
                  </span>
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
        </MDBSideNav>
        <MDBContainer fluid className="flex-grow">
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
      className={`py-2 m-1 p-1 w-100 d-flex align-items-center d-block ${
        active ? 'active' : ''
      }`}
      style={{ height: 40 }}
      onClick={route}
    >
      {children}
    </MDBBtn>
  );
};
