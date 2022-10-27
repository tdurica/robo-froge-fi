import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
  Table, Tbody, Th, Thead, Tr,
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
import LineChart from '../../components/Charts/LineChart.js';

export default function PondSalesOverview() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)


  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <PondHeader mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            Sales Overview
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400">
            <Text as="span" color="green.400" fontWeight="bold">
              (+5%) more
            </Text>{" "}
            in 2021
          </Text>
        </Flex>
      </PondHeader>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        <LineChart />
      </Box>
    </Pond>
  );
}

