// import { Provider as AppStateProvider, atom, useAtom } from "jotai";
import { Box, ChakraProvider, Grid, Portal, useDisclosure, useStyleConfig } from '@chakra-ui/react';
// import Configurator from "views/app/Configurator.js";
import AppFooter from "views/navs/AppFooter.js";
// Layout components
import AppNav from "views/navs/AppNav.js";
import AppSidebar from "views/navs/AppSidebar.js";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useRouteMatch } from 'react-router-dom';
// Custom Chakra theme
// import theme from "theme/theme.js";
// Custom components
// import { appNavDrawerOpenAtom, signatureAtom, w3rLibraryAtom } from './services/atoms.js';
import { createWeb3ReactRoot, useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";
import { connectors } from 'views/wallet/connectors.js';
import { useDeviceMode } from './theme/foundations/breakpoints.js';
import { desktopSidebarWidth } from 'data/constants.js';
import { useW3Store,useCrawlStore } from 'services';
import { useMutationObservable } from './hooks/useMutationObservable.js';

function scrollbarVisible(element) {
  return element.scrollHeight > element.clientHeight;
}
export default function AppLayout(props) {
  const { variant, children, ...rest } = props;

  const [scrollVis, setScrollVis] = useState('0');
  const appMainRef = useRef(null);
  const onAppMainMutation = useCallback((mutationList) => {
    if(scrollbarVisible(appMainRef.current)){setScrollVis('1');
    }else{setScrollVis('0');}}, [setScrollVis]);
  useMutationObservable(appMainRef.current, onAppMainMutation);

  const getLibrary = (provider) => {
    const library = new ethers.providers.Web3Provider(provider);
    library.pollingInterval = 8000; // frequency provider is polling
    return library;
  };
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  const [isMobile, isDesktop] = useDeviceMode()

  // const route = useRoutes()
  return (
    <>
      {/* <AppSidebar/> */}
      <Portal>
        <AppNav/>
      </Portal>
      <AppSidebar/>
      <Box id='AppMain' ref={appMainRef}
           sx={{
             height: '100%',
             overflowY: "scroll",
             overflowX: "hidden",
             marginLeft:isDesktop?desktopSidebarWidth:'0',
             paddingRight:isDesktop?'10px':'1px',
             paddingTop:'60px',
             display: 'flex',
             flexDirection: 'column',
             flexBasis: '100vh',
             backgroundColor: `rgba(17,22,35,${scrollVis})`,//brand.bg
             justifyContent: 'space-between',
             "&::-webkit-scrollbar": {
               width: "6px",
               backgroundColor: 'inherit',
             },
             "&::-webkit-scrollbar-track": {
               width: "2px",
               backgroundColor: 'inherit',
             },
             "&::-webkit-scrollbar-thumb": {
               background: "green.700",
               borderRadius: "24px",
             },
           }}>
          <Outlet/>
      </Box>
    </>
  );
}
