import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
} from "@chakra-ui/react";
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
import BarChart from '../../components/Charts/BarChart.js';
import IconBox from '../../components/Icons/IconBox.js';

export default function PondActiveUsers() {
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
    <Pond p="16px">
      <PondBody>
        <Flex direction="column" w="100%">
          <BarChart />
          <Flex direction="column" alignSelf="flex-start"
                mt="24px" mb="36px">
            <Text
              fontSize="lg" color={textColor}
              fontWeight="bold" mb="6px"
            >
              Active Users
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text as="span" color="green.400" fontWeight="bold">
                (+23%)
              </Text>{" "}
              than last week
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <Flex direction="column">
              <Flex alignItems="center">
                <IconBox as={Box} h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                  <WalletIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                </IconBox>
                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                  Users
                </Text>
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                32,984
              </Text>
              <Progress colorScheme="green" borderRadius="12px" h="5px" value={20}/>
            </Flex>
            <Flex direction="column">
              <Flex alignItems="center">
                <IconBox as={Box} h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                  <RocketIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                </IconBox>
                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                  Clicks
                </Text>
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                2.42m
              </Text>
              <Progress
                colorScheme="green"
                borderRadius="12px"
                h="5px"
                value={90}
              />
            </Flex>
            <Flex direction="column">
              <Flex alignItems="center">
                <IconBox as={Box} h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                  <CartIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                </IconBox>
                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                  Sales
                </Text>
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                2,400$
              </Text>
              <Progress colorScheme="green" borderRadius="12px" h="5px" value={30}/>
            </Flex>
            <Flex direction="column">
              <Flex alignItems="center">
                <IconBox as={Box} h={"30px"} w={"30px"} bg={iconTeal} me="6px">
                  <StatsIcon h={"15px"} w={"15px"} color={iconBoxInside} />
                </IconBox>
                <Text fontSize="sm" color="gray.400" fontWeight="semibold">
                  Items
                </Text>
              </Flex>
              <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
                320
              </Text>
              <Progress colorScheme="green" borderRadius="12px" h="5px" value={50}/>
            </Flex>
          </SimpleGrid>
        </Flex>
      </PondBody>
    </Pond>
  );
}

