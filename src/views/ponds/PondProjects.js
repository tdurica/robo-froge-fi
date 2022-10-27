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
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { dashboardTableData } from '../../data/general.js';
import DashboardTableRow from '../../components/Tables/DashboardTableRow.js';

export default function PondProjects() {
  const textColor = "white"
  const w3r = useWeb3React()
  // const [_getConfig, set_getConfig] = useState(cfgInit)


  useEffect(async ()=>{

    // set_getConfig(olaToObject(await stx({
    //   from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
    //   abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
      <PondHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text
            fontSize="lg"
            color={textColor}
            fontWeight="bold"
            pb=".5rem"
          >
            Projects
          </Text>
          <Flex align="center">
            <Icon
              as={IoCheckmarkDoneCircleSharp}
              color="green.300"
              w={4}
              h={4}
              pe="3px"
            />
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              <Text fontWeight="bold" as="span">
                30 done
              </Text>{" "}
              this month.
            </Text>
          </Flex>
        </Flex>
      </PondHeader>
      <Table variant="simple" color={textColor}>
        <Thead>
          <Tr my=".8rem" ps="0px">
            <Th ps="0px" color="gray.400">
              Companies
            </Th>
            <Th color="gray.400">Members</Th>
            <Th color="gray.400">Budget</Th>
            <Th color="gray.400">Completion</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dashboardTableData.map((row) => {
            return (
              <DashboardTableRow
                key={row.name}
                name={row.name}
                logo={row.logo}
                members={row.members}
                budget={row.budget}
                progression={row.progression}
              />
            );
          })}
        </Tbody>
      </Table>
    </Pond>
  );
}

