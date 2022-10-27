import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
  Table, Tbody, Th, Thead, Tr, Portal,
} from '@chakra-ui/react';
// assets
import peopleImage from "assets/img/people-image.png";
import frog009 from "assets/img/stock-frogs/darkbg/square/009.jpg";
// Custom components
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from 'react';
// react icons
import { BsArrowRight } from "react-icons/bs";
import { useWeb3React } from '@web3-react/core';
import stx from 'stx/stx.js';
import addr from 'data/addresses.js';
import { olaToObject } from '../../helpers/deep.js';
import IconBox from '../../components/Icons/IconBox.js';

export default function PondRockets() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)
  const overlayRef = React.useRef();


  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond maxHeight="290.5px" p="1rem">
      <PondBody
        p="0px"
        backgroundImage={peopleImage}
        bgPosition="center"
        bgRepeat="no-repeat"
        w="100%"
        h={{ sm: "200px", lg: "100%" }}
        bgSize="cover"
        position="relative"
        borderRadius="15px"
      >
        <Box
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
          w="100%"
          position="absolute"
          h="inherit"
          borderRadius="inherit"
          ref={overlayRef}
        ></Box>
        <Portal containerRef={overlayRef}>
          <Flex
            flexDirection="column"
            color="white"
            p="1.5rem 1.2rem 0.3rem 1.2rem"
            lineHeight="1.6"
          >
            <Text fontSize="xl" fontWeight="bold" pb=".3rem">
              Work with the rockets
            </Text>
            <Text fontSize="sm" fontWeight="normal" w={{ lg: "92%" }}>
              Wealth creation is a revolutionary recent positive-sum game.
              It is all about who takes the opportunity first.
            </Text>
            <Spacer />
          </Flex>
        </Portal>
      </PondBody>
    </Pond>
  );
}

