import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink, Center,
  Flex,
  Link,
} from '@chakra-ui/react';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import AppNavControls from "./AppNavControls.js";
import { sxGlassBg } from '../bits/UtilityTags.js';
import { NavLink } from 'react-router-dom';
import { CISVG_FrogeNavBack } from '../../assets/FrogeBrand.js';
// import { useAtom } from 'jotai';
// import { appNavDrawerOpenAtom } from '../../services/atoms.js';


export default function AppNav(props) {
  const [scrolled, setScrolled] = useState(false);
  // const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)
  // const [get_fixedRightDist, set_fixedRightDist] = useState('10px')

  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let navbarColor = "transparent";
  let navbarBg = "none";
  let navbarBorder = "transparent";
  let paddingX = "15px";


  return (
    <Box position="fixed" w='100vw' top="0" left="0" right="0">
      <NavLink to='/'><CISVG_FrogeNavBack sx={{fontSize: "39", position:'absolute',top:'.6rem',left:{ base: '.6rem', md: '12.2rem' } }} /></NavLink>
      <Center id="__AppNavbar" position="absolute" top="10px" right="24px" display="flex">
        <Box ms="auto" w={{ base: '100%', md: 'unset' }}>
          <AppNavControls/>
        </Box>
    </Center>
    </Box>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {width,height};
}
