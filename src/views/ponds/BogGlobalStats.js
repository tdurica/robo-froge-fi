import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
  Table, Tbody, Th, Thead, Tr,
  Stat, StatLabel, StatNumber, StatHelpText,
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

export default function BogGlobalStats() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)

  const iconTeal = "green.300"
  const iconBoxInside = "white"

  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
      <Pond minH="83px">
        <PondBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Today's Money
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor}>
                  $53,000
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color="green.400"
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  +55%
                </StatHelpText>
              </Flex>
            </Stat>
            <IconBox as={Box} h={"45px"} w={"45px"} bg={iconTeal}>
              <WalletIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
        </PondBody>
      </Pond>
      <Pond minH="83px">
        <PondBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Today's Users
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor}>
                  2,300
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color="green.400"
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  +5%
                </StatHelpText>
              </Flex>
            </Stat>
            <IconBox as={Box} h={"45px"} w={"45px"} bg={iconTeal}>
              <GlobeIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
        </PondBody>
      </Pond>
      <Pond minH="83px">
        <PondBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat>
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                New Clients
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor}>
                  +3,020
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color="red.500"
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  -14%
                </StatHelpText>
              </Flex>
            </Stat>
            <Spacer />
            <IconBox as={Box} h={"45px"} w={"45px"} bg={iconTeal}>
              <DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
        </PondBody>
      </Pond>
      <Pond minH="83px">
        <PondBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                Total Sales
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={textColor} fontWeight="bold">
                  $173,000
                </StatNumber>
                <StatHelpText
                  alignSelf="flex-end"
                  justifySelf="flex-end"
                  m="0px"
                  color="green.400"
                  fontWeight="bold"
                  ps="3px"
                  fontSize="md"
                >
                  +8%
                </StatHelpText>
              </Flex>
            </Stat>
            <IconBox as={Box} h={"45px"} w={"45px"} bg={iconTeal}>
              <CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />
            </IconBox>
          </Flex>
        </PondBody>
      </Pond>
    </SimpleGrid>
  );
}

