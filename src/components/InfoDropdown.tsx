import React, { useState } from 'react';
import {
  MDBSideNavItem,
  MDBSideNavMenu,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBIcon,
} from 'mdb-react-ui-kit';

const infoLinks = [
  {
    label: 'Documents',
    href: 'https://gasstationcrypto.gitbook.io/the-crypto-gas-station/',
  },
  {
    label: 'Whitepaper',
    href: 'https://github.com/The-Gas-Station/documents_public/blob/main/The%20Gas%20Station%20White%20Paper.pdf',
  },
  {
    label: 'Token Information',
    href: 'https://gasstationcrypto.gitbook.io/the-crypto-gas-station/information/ecosystem/products/our-tokens/tokenomics',
  },
  {
    label: 'FAQ',
    href: 'https://gasstationcrypto.gitbook.io/the-crypto-gas-station/frequently-asked-questions/',
  },
  {
    label: 'Community',
    href: 'https://discord.gg/vaaZ2mrYaq',
  },
  {
    label: 'Contact',
    href: 'https://t.me/TheGasStation_Crypto',
  },
];

const InfoLinks = () => (
  <>
    {infoLinks.map((link, index) => (
      <MDBSideNavLink key={index} className="sidenav-item">
        <a
          href={link.href}
          target="_blank"
          className="ripple ripple-surface"
          color="none"
        >
          <span>{link.label}</span>
        </a>
      </MDBSideNavLink>
    ))}
  </>
);

const InfoDropdown = () => {
  const [infoDropdownCollapse, setInfoDropdownCollapse] = useState(true);
  return (
    <MDBSideNavMenu>
      <MDBSideNavItem className="m-2">
        <MDBSideNavLink
          icon="angle-down"
          shouldBeExpanded={infoDropdownCollapse}
          onClick={() => setInfoDropdownCollapse(!infoDropdownCollapse)}
          className="sidenav-item"
        >
          <MDBIcon fas icon="info-circle" className="fa-fw me-3" />
          <span>Info</span>
        </MDBSideNavLink>
        <MDBSideNavCollapse show={infoDropdownCollapse}>
          <InfoLinks />
        </MDBSideNavCollapse>
      </MDBSideNavItem>
    </MDBSideNavMenu>
  );
};

export default InfoDropdown;
