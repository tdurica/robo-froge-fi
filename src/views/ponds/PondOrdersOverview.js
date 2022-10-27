import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
} from "@chakra-ui/react";
// assets
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
import { timelineData } from '../../data/general.js';
import TimelineRow from '../../components/Tables/TimelineRow.js';

export default function PondOrdersOverview() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)

  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond maxH="100%">
      <PondHeader p="22px 0px 35px 14px">
        <Flex direction="column">
          <Text
            fontSize="lg"
            color={textColor}
            fontWeight="bold"
            pb=".5rem"
          >
            Orders overview
          </Text>
          <Text fontSize="sm" color="gray.400" fontWeight="normal">
            <Text fontWeight="bold" as="span" color="green.300">
              +30%
            </Text>{" "}
            this month.
          </Text>
        </Flex>
      </PondHeader>
      <PondBody ps="20px" pe="0px" mb="31px" position="relative">
        <Flex direction="column">
          {timelineData.map((row, index, arr) => {
            return (
              <TimelineRow
                key={index}
                logo={row.logo}
                title={row.title}
                date={row.date}
                color={row.color}
                index={index}
                arrLength={arr.length}
              />
            );
          })}
        </Flex>
      </PondBody>
    </Pond>
  );
}

