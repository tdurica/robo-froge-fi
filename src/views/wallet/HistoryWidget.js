import React, { useCallback, useEffect, useState } from 'react';
import {
  VStack, chakra,
  Button,
  Text,
  Input,
  Box, Menu, MenuButton, MenuList, Flex, MenuItem, Center, Icon, HStack,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useAtom } from 'jotai';
import { BtnBrandIcon, HFlex, HFlexCC, HFlexSC, VFlex } from '../bits/UtilityTags.js';
import { HistoryItem } from './HistoryItem.js';
import { MdOutlineHistory } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import { CITxStatusGreen, CITxStatusYellow, CITxStatusRed } from 'assets/FrogeBrand.js';
import { wcModalIsOpenAtom, useUserStore, useW3Store } from 'services/index.js';


export default function HistoryWidget() {
  const u_chainId= useW3Store(s=>s.u_chainId);
  const u_account= useW3Store(s=>s.u_account);
  const u_active= useW3Store(s=>s.u_active);

  const history = useUserStore(s=>
    s.users[u_account]
    && Object.keys(s.users[u_account].history).length
      ?s.users[u_account].history :null)

  useEffect(async () => {
    if(u_active){
      // await useUserStore.getState().syncHistory()
    }
  }, [u_account])

  const sxBase = {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter:"brightness(40%) saturate(300%) blur(3px)",
    width:'275px',
    maxHeight:'20rem',
  }

  return (
    <Menu id='NotifsMenu'>
      <MenuButton id='NotifsButton'>
        <Center id="BtnBrandIcon"
                __css={{
                  color: 'global.bg',
                  bgColor: 'brand.green',
                  h: '2rem', w: '2rem', p: '3px',
                  borderRadius: '7px',
                }} ><MdOutlineHistory size={25}/></Center>
      </MenuButton>
      <MenuList as={Flex} sx={sxBase} p="10px 8px" bgColor={'bog.900'} flexDirection="column">
        {history&&<>
          <HFlexCC justify='space-between' mb='4px' fontSize='.7rem' fontWeight='300'>
            <Box>In history: {Object.values(history).length}</Box>
            <Box>Unresolved: {Object.values(history).filter(v=>v.status==='Created').length}</Box>
          </HFlexCC>
          <VFlex overflowY='scroll'>
            {Object.values(history)
            .sort((a,b)=>b.t_created-a.t_created)
            .map((v,i)=>
              <MenuItem key={v.hID} borderRadius="8px" mb="10px">
                <HistoryItem item={v}/>
              </MenuItem>
            )}
          </VFlex>
        </>}
        {!history&&(
          <MenuItem borderRadius="8px" mb="10px">
            No history yet
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}
