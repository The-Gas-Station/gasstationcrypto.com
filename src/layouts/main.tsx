import React, { useState } from "react";
import { ChakraProvider, Box, Icon, IconButton } from "@chakra-ui/react";
import { Link, useRouteMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { theme } from "./main-theme";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { ReactComponent as SvgShrinkSidebar } from "../assets/shrink-sidebar.svg";
import { ReactComponent as SvgLinkHome } from "../assets/link-home.svg";
import { ReactComponent as SvgLinkHub } from "../assets/link-hub.svg";
import { ReactComponent as SvgLinkNfp } from "../assets/link-nfp.svg";

type Props = {
  children: JSX.Element;
};

export const Main = ({ children }: Props) => {
  const [sideOpen, setSideOpen] = useState(true);

  const headerLinks = [
    {
      label: "Home",
      route: "/",
      icon: <SvgLinkHome />,
    },
    {
      label: "Hub",
      route: "/hub",
      icon: <SvgLinkHub />,
    },
    {
      label: "Non Fungible Patrons",
      route: "/nfp",
      icon: <SvgLinkNfp />,
    },
  ];

  return (
    <ChakraProvider theme={theme}>
      <Box display="flex">
        <Box as="header" display="flex" h="100vh">
          <Box
            as={motion.div}
            animate={sideOpen ? "open" : "closed"}
            variants={{ open: { width: "18rem" }, closed: { width: "3rem" } }}
            transitionTimingFunction="ease"
            display="flex"
            flexDir="column"
          >
            <div>
              <IconButton
                aria-label="Shrink Side"
                onClick={() => setSideOpen(!sideOpen)}
                m="1"
              >
                <SvgShrinkSidebar />
              </IconButton>
            </div>
            {headerLinks.map((link) => (
              <Box as={ActiveLink} to={link.route}>
                <Icon>{link.icon}</Icon>
                {sideOpen && link.label}
              </Box>
            ))}

            <Box flex="1 1 0%"></Box>

            <Box>
              <hr />
              <ColorModeSwitcher />
            </Box>
          </Box>
        </Box>
        <Box w="full">
          <Box display="flex" bgColor="gray.600" color="gray.200">
            <Box flex="1 1 0%">info bar</Box>
          </Box>

          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
};

type LinkProps = {
  to: string;
  children: JSX.Element;
};

const ActiveLink = ({ to, children }: LinkProps) => {
  let match = useRouteMatch({ path: to, exact: true });

  return (
    <Box
      as={Link}
      to={to}
      bgColor={match ? "green.400" : "inherit"}
      display="flex"
      justifyItems="center"
      p="1"
      fontSize="2xl"
    >
      {children}
    </Box>
  );
};
