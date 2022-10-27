import {
  Box, Button, Flex, Image, Text, VStack,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { connectors } from '../wallet/connectors.js';
import { useUserStore, useFxStore, useCrawlStore } from 'services/index.js';
import { BtnXs, TextXs } from '../bits/UtilityTags.js';


export default function PondNetworkVitals(props) {
  const u_ = useWeb3React()
  const n_ = useWeb3React('NETWORK')
  const {
    library:u_library,
    chainId:u_chainId,
    account:u_account,
    activate:u_activate,
    deactivate:u_deactivate,
    active:u_active,
  } = u_
  const {
    library:n_library,
    chainId:n_chainId,
    account:n_account,
    activate:n_activate,
    deactivate:n_deactivate,
    active:n_active,
  } = n_

  const _getConfigRaw = useFxStore(s=>s.fxGetConfigRaw)
  const _balance = useUserStore(s=>s.users[u_account].fxGetAccount._balance)
  // const ethPrice = useCrawlStore(state=>state.ethPrice)


  const GetVitalsInfo = ()=>{
    return (
      <>
        <TextXs>
          u_account : {u_account}<br/>
          u_active : {String(u_active)}<br/>
          u_chainId : {u_chainId}<br/>
          <br/>
          n_account : {n_account}<br/>
          n_active : {String(n_active)}<br/>
          n_chainId : {n_chainId}<br/>
          <br/>
          _ethPtnLqty : {_getConfigRaw._ethPtnLqty}<br/>
          _balance : {_balance[1]}<br/>
          _balance (USD) : {_balance[2]}<br/>


        </TextXs>
        {/* <PopoverFXGetConfig/> */}
        {/* {_getConfig.map((v,i)=><TextXS key={i}>{v}</TextXS>)} */}
      </>

    )
  }

  useEffect(async ()=>{
    await useFxStore.getState().hydrateFxStore()
  },[u_,n_])

  const u_call = async() => {
    // set_getConfig(olaToObject(await stx({
    //   from:u_account,to: addr.mainnet.FROGEX.ERC20,
    //   path: ['FrogeX','getConfig'],})))
    // set_balanceOf(await readFX('balanceOf',[u_account]))
    // const {} = await FX.getAccount(u_account)
    // FX.getConfigFormatTechLabels()
    // FX.totalSupply
    // FX.xGetDivsGlobalTotalDist
    // getAmountOut()
  };
  const n_call = async() => {
    // set_getConfigRaw(olaToObject(await readFX('getConfig')))
  };

  return (
    <Pond title='Network Vitals'>
      <PondBody>
        <VStack>
          <BtnXs onClick={()=>u_activate(connectors.injected)}>Connect User</BtnXs>
          <BtnXs onClick={()=>u_deactivate()}>D/C User</BtnXs>
          <BtnXs onClick={()=>u_call()}>User STX</BtnXs>
          <BtnXs onClick={()=>n_activate(connectors.network)}>Connect Network</BtnXs>
          <BtnXs onClick={()=>n_deactivate()}>D/C Network</BtnXs>
          <BtnXs onClick={()=>n_call()}>Network STX</BtnXs>
        </VStack>
        <Box flexDirection={{ sm: "column", lg: "row" }} w="100%">
          <Flex
            flexDirection="column"
            h="100%"
            lineHeight="1.6"
            width={{ lg: "55%" }}
          >
            <GetVitalsInfo/>
          </Flex>
        </Box>
      </PondBody>
    </Pond>
  );
}

const cfgInit = {
  _ethPtnChty:'',
  _ethPtnLqty:'',
  _ethPtnMktg:'',
  _ethPtnRwds:'',
  _hopThreshold:'',
  _lockerUnlockDate:'',
  _lqtyThreshold:'',
  _tknPtnLqty:'',
  _tradingEnabled:'',
  _ttlFeePctBuys:'',
  _ttlFeePctSells:'',
  _xGasForClaim:'',
  _xMinClaimableDivs:'',
}
