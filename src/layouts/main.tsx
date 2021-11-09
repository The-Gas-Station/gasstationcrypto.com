import { useState, useEffect } from 'react';
import { Box, Button, Icon, IconButton } from '@chakra-ui/react';
import { Link, useRouteMatch } from 'react-router-dom';
import { motion } from 'framer-motion';
import useLocalStorage from '../library/hooks/useLocalStorage';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import {
  FaLessThanEqual,
  FaGreaterThanEqual,
  FaHome,
  FaHubspot,
  FaPatreon,
} from 'react-icons/fa';
import { ReactComponent as SvgLogoIcon } from '../assets/logo-icon.svg';
import { ReactComponent as SvgLogoFull } from '../assets/logo-full.svg';
import useEthers from '../library/hooks/useEthers';

type Props = {
  children: JSX.Element;
};

export const Main = ({ children }: Props) => {
  const { activateBrowserWallet } = useEthers();

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
      icon: <FaHome />,
    },
    {
      label: 'Hub',
      route: '/hub',
      icon: <FaHubspot />,
    },
    {
      label: 'Non Fungible Patrons',
      route: '/nfp',
      icon: <FaPatreon />,
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
      <Box justifyItems="l" display="flex">
        <Box as="header" display="flex" h="100vh">
          <Box
            as={motion.div}
            animate={sideOpen ? 'open' : 'closed'}
            variants={{ open: { width: '18rem' }, closed: { width: '4rem' } }}
            px={sideOpen ? '4' : '2'}
            display="flex"
            position={{ base: 'fixed', md: 'relative' }}
            bgColor={{ base: 'black', md: 'inherit' }}
            top="0"
            bottom="0"
            flexDir="column"
          >
            <Box display="flex" py="4">
              <IconButton
                aria-label="Shrink Side"
                onClick={() => toggleSide()}
                variant="ghost"
                m="1"
              >
                {sideOpen ? <FaLessThanEqual /> : <FaGreaterThanEqual />}
              </IconButton>
              {sideOpen && (
                <>
                  <Box as={SvgLogoIcon} px="2" /> <SvgLogoFull />
                </>
              )}
            </Box>
            {headerLinks.map((link) => (
              <ActiveLink to={link.route} sideOpen={sideOpen} key={link.route}>
                <>
                  <Icon fontSize="2xl">{link.icon}</Icon>
                  <Box pl="2">{sideOpen && link.label}</Box>
                </>
              </ActiveLink>
            ))}

            <Box flex="1 1 0%"></Box>

            <Box>
              <Button size="sm" variant="outline" onClick={connect}>
                Connect
              </Button>
              <hr />
              <ColorModeSwitcher />
            </Box>
          </Box>
        </Box>
        <Box w="full" ml={{ base: '3rem', md: '0' }}>
          <Box display="flex" bgColor="gray.600" color="gray.200">
            <Box flex="1 1 0%">info bar</Box>
          </Box>

          {children}
        </Box>
      </Box>
    </>
  );
};

type LinkProps = {
  to: string;
  sideOpen: boolean;
  children: JSX.Element;
};

const ActiveLink = ({ to, sideOpen, children }: LinkProps) => {
  const match = useRouteMatch({ path: to, exact: true });
  let variant = 'ghost';
  if (match && sideOpen) variant = 'gradient';
  else if (match) variant = 'solid';

  return (
    <Button as={Link} to={to} variant={variant} p="1" justifyContent="left">
      {children}
    </Button>
  );
};
