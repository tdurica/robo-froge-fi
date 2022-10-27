import {
  Box, Button, Flex, Text,
} from "@chakra-ui/react";
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

export default function PondMyBots() {
  const textColor = "white"

  return (
    <Pond title='My Bots'>
      <PondHeader p="22px 0px 35px 14px">
        <Flex direction="column">
          <Text fontSize='lg' color='white' fontWeight='bold' pb='.5rem'>
            SnootyBot
          </Text>
        </Flex>
      </PondHeader>
      <PondBody ps="20px" pe="0px" mb="31px" position="relative">
        <Flex direction="column">

        </Flex>
      </PondBody>
    </Pond>
  );
}

