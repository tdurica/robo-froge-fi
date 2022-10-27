import { Avatar, Box, Flex, Icon, Text } from '@chakra-ui/react';
import { ClockIcon } from "components/Icons/Icons.js";
import React from "react";
import { CITxStatusGreen, CITxStatusRed, CITxStatusYellow } from '../../assets/FrogeBrand.js';
import moment from 'moment';

const sxStatusIcon = { color:'bog.150', mr:'.8rem', bgColor:'bog.800', borderRadius:'8rem',
  p:'.4rem', w:'2rem', h:'2rem', '& path':{stroke:'bog.300'}, }
const H_SUCCESS='Transaction Succeeded';
const H_CANCELLED='Transaction Cancelled';
const H_FAILED='Transaction Failed';
const TxStatusGreen = ()=>(<CITxStatusGreen sx={sxStatusIcon}/>)
const TxStatusYellow = ()=>(<CITxStatusYellow sx={sxStatusIcon}/>)
const TxStatusRed = ()=>(<CITxStatusRed sx={sxStatusIcon}/>)

export function HistoryItem({ item }) {
  const { status,type,from,to,path,value,args,hash,rcpt,confs,
    error,output,t_created,t_resolved,} = item
  const navbarIcon = 'gray.200'

  return (
    <>
      {status==='Created'&&TxStatusYellow()}
      {status==='Rejected By User'&&TxStatusRed()}
      {status==='Success'&&TxStatusGreen()}
      {status==='Error'&&TxStatusRed()}
      <Flex flexDirection="column">
        <Text fontSize="14px" mb="5px" color='white'>
          {status}
        </Text>
        <Flex alignItems="center">
          <ClockIcon color={navbarIcon} w="13px" h="13px" me="3px" />
          <Text fontSize="xs" lineHeight="100%" color={navbarIcon}>
            {moment(t_resolved?t_resolved:t_created).fromNow()}
          </Text>
        </Flex>
      </Flex>
    </>
  );
}
