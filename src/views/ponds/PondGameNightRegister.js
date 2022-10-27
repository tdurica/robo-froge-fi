import {
  Box,
  Button,
  Flex, HStack,
  Image, Text, Portal,
  VStack, forwardRef,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { useUserStore, useFxStore } from 'services/index.js';
import { useCrawlStore } from 'services/index.js';
import { BtnXs, P, S, TextXs } from '../bits/UtilityTags.js';
import { mont } from '../../theme/foundations/fonts.js';

export default function PondGameNightRegister(props) {

  useEffect(async ()=>{
    // await hydrate()
  },[])

  const tickerBubbleStyle = {
    color:'gray.400',
    width: "45%",
    bgColor:'global.bubble',
    borderRadius: '6px',
    ...mont.md.md,
  }
  return (
    <Pond variant='alignCenter'>
      <PondHeader>
        <S color='white'>Register!</S>&nbsp;<S color='gray.300'>Come on then!</S>
      </PondHeader>
      <PondBody>
        <VStack>
          <HStack width='100%' justifyContent='space-evenly'>
            <Box __css={tickerBubbleStyle}><P>FrogeX</P><P>----</P></Box>
            <VStack __css={tickerBubbleStyle}><P>ETH</P><P>----</P></VStack>
          </HStack>
        </VStack>
      </PondBody>
    </Pond>
  );
}
