import {
  Box, Button, Flex, Grid,
  Icon, Image, Progress, SimpleGrid, Spacer, Text,
} from "@chakra-ui/react";
// assets
import peopleImage from "assets/img/people-image.png";
import frog009 from "assets/img/stock-frogs/darkbg/square/009.jpg";
// Custom components
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import {
  CartIcon, DocumentIcon, GlobeIcon, RocketIcon, StatsIcon, WalletIcon,
} from "components/Icons/Icons.js";
import React, { useEffect, useState } from 'react';
// react icons
import { BsArrowRight } from "react-icons/bs";
import { useWeb3React } from '@web3-react/core';
import { stx } from 'stx/stx.js';
import addr from 'data/addresses.js';
import { olaToObject } from '../../helpers/deep.js';
import PortionBar from '../../components/Charts/PortionBar.js';
import { BtnReadMore } from '../bits/UtilityTags.js';

export default function PondFrogeXVitals() {
  const textColor = "white"
  const w3r = useWeb3React('NETWORK')
  const [_getConfig, set_getConfig] = useState(cfgInit)

  const GetConfig = ()=>{
    const cfg = _getConfig;
    return (
      <><Text fontSize="xs" color="gray.400" fontWeight="normal">
        _ethPtnChty : {cfg._ethPtnChty}<br/>
        _ethPtnLqty : {cfg._ethPtnLqty}<br/>
        _ethPtnMktg : {cfg._ethPtnMktg}<br/>
        _ethPtnRwds : {cfg._ethPtnRwds}<br/>
        _hopThreshold : {cfg._hopThreshold}<br/>
        _lockerUnlockDate : {cfg._lockerUnlockDate}<br/>
        _lqtyThreshold : {cfg._lqtyThreshold}<br/>
        _tknPtnLqty : {cfg._tknPtnLqty}<br/>
        _tradingEnabled : {cfg._tradingEnabled}<br/>
        _ttlFeePctBuys : {cfg._ttlFeePctBuys}<br/>
        _ttlFeePctSells : {cfg._ttlFeePctSells}<br/>
        _xGasForClaim : {cfg._xGasForClaim}<br/>
        _xMinClaimableDivs : {cfg._xMinClaimableDivs}<br/>
      </Text>
        <PortionBar mw='100%' seriesData={[{
          name: 'Charity',
          data: [cfg._ethPtnChty]
        }, {
          name: 'Liquidity',
          data: [cfg._ethPtnLqty]
        }, {
          name: 'Marketing',
          data: [cfg._ethPtnMktg]
        }, {
          name: 'Rewards',
          data: [cfg._ethPtnRwds]
        }]}/>
      </>

    )
  }

  useEffect(async ()=>{

    set_getConfig(olaToObject(await stx({
      from:w3r.account,to: addr.mainnet.FROGEX.ERC20,
      abiLookup: ['FrogeX','getConfig'],})))

  },[])

  return (
    <Pond minHeight="290.5px" p="1.2rem">
      <PondHeader>FrogeX Vitals</PondHeader>
      <PondBody w="100%">
        <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%">
          <Flex
            flexDirection="column"
            h="100%"
            lineHeight="1.6"
            width={{ lg: "55%" }}
          >
            <GetConfig/>
            <Spacer />
            <Flex align="center">
              <BtnReadMore onClick={()=>console.log('reading!')}/>
            </Flex>
          </Flex>
          <Spacer />
          <Flex
            bg="green.300" align="center" justify="center"
            borderRadius="15px" width={{ lg: "30%" }}
            minHeight={{ sm: "250px" }}
          >
            <Image
              src={frog009}
              alt="chakra image"
              minWidth={{ md: "100px", lg: "100px" }}
            />
          </Flex>
        </Flex>
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
