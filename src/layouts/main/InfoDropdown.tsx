import React, { useEffect, useState } from 'react';
import {
  MDBSideNavItem,
  MDBSideNavMenu,
  MDBSideNavLink,
  MDBSideNavCollapse,
  MDBIcon,
} from 'mdb-react-ui-kit';

import { ReactComponent as SvgInfo } from '../../assets/Info.svg';

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
    {infoLinks.map((link, i) => (
      <a
        key={i}
        href={link.href}
        target="_blank"
        className="d-flex d-block sidenav-item m-2"
        role="button"
      >
        <span>
          {link.label} <MDBIcon fas icon="external-link-alt" size="xs" />
        </span>
      </a>
    ))}
  </>
);

const InfoDropdown = ({
  sideOpen,
  setDropdownCollapse,
}: {
  sideOpen: boolean;
  setDropdownCollapse: (collapse: boolean) => void;
}) => {
  const [infoDropdownExpanded, setInfoDropdownExpanded] = useState(sideOpen);

  useEffect(() => {
    setDropdownCollapse(infoDropdownExpanded);
  }, [infoDropdownExpanded]);

  useEffect(() => {
    if (!sideOpen) {
      setInfoDropdownExpanded(sideOpen);
    }
  }, [sideOpen]);

  return (
    <MDBSideNavMenu>
      <MDBSideNavItem>
        <MDBSideNavLink
          icon="angle-down"
          shouldBeExpanded={infoDropdownExpanded}
          onClick={() => setInfoDropdownExpanded(!infoDropdownExpanded)}
          className="sidenav-item m-2"
        >
          <SvgInfo className="" style={{ minWidth: 24, minHeight: 24 }} />
          {sideOpen && <span>Info</span>}
        </MDBSideNavLink>
        <MDBSideNavCollapse show={infoDropdownExpanded}>
          <InfoLinks />
        </MDBSideNavCollapse>
      </MDBSideNavItem>
    </MDBSideNavMenu>
  );
};

export default InfoDropdown;
