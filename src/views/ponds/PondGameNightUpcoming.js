import {
  Box,
  Button,
  Flex, HStack,
  Image,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
  TableContainer,  Text, Portal,
  VStack, forwardRef,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { call, stx, FX, readFX } from 'stx/stx.js';
import { olaToObject } from '../../helpers/deep.js';
import { useUserStore, useFxStore } from 'services/index.js';
import { useCrawlStore } from 'services/index.js';
import { BtnXs, P, S, sxFrogeEyeEyeBeforeBg, TextXs } from '../bits/UtilityTags.js';
import { Bubble, BubLabel, BubSub, BubValue } from '../bits/Bubble.js';
import { last4 } from '../../helpers/math/zmath.mjs';
import { mont } from '../../theme/foundations/fonts.js';
import { MoreInfoPopover } from '../bits/MoreInfoPopover.js';


let _execClaimFn = ()=>{}


export default function PondGameNightUpcoming(props) {

  const tickerBubbleStyle = {
    color:'gray.400',
    width: "45%",
    bgColor:'global.bubble',
    borderRadius: '6px',
    ...mont.md.md,
  }
  return (
    <Pond>
      <PondHeader>
        <S color='white'>Upcoming</S>&nbsp;<S color='gray.300'>Events</S>
      </PondHeader>
      <PondBody>
        <VStack>
          <HStack width='100%' justifyContent='space-evenly'>
            <VStack __css={tickerBubbleStyle}><P>FrogeX</P><P>fxPrice</P></VStack>
            <VStack __css={tickerBubbleStyle}><P>ETH</P><P>ethPrice</P></VStack>
          </HStack>
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <TableCaption>events</TableCaption>
              <Thead>
                <Tr><Th>When</Th><Th>What</Th></Tr>
              </Thead>
              <Tbody>
                <Tr><Td>25.4</Td><Td>inches</Td></Tr>
                <Tr><Td>30.48</Td><Td>feet</Td></Tr>
                <Tr><Td>0.91444</Td><Td>yards</Td></Tr>
              </Tbody>
              <Tfoot>
                <Tr><Th>something</Th><Th>the the bottom</Th></Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </VStack>
      </PondBody>
    </Pond>
  );
}
