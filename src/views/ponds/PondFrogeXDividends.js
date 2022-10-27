import {
  Box,
  Button,
  Flex, HStack,
  Image,
  Popover,
  PopoverArrow, PopoverBody, PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text, Portal,
  VStack, forwardRef,
} from '@chakra-ui/react';
import {Pond,PondBody,PondHeader} from '../bits/Pond.js';
import React, { useCallback, useEffect, useState } from 'react';

import { useWeb3React } from '@web3-react/core';
import { call, stx, FX, readFX } from 'stx/stx.js';
import { olaToObject } from '../../helpers/deep.js';
import { useUserStore, useFxStore } from 'services/index.js';
import { useCrawlStore } from 'services/index.js';
import { BtnXs, P, S, sxFrogeEyeEyeBeforeBg, TextXs } from '../bits/UtilityTags.js';
import { Bubble, BubLabel, BubSub, BubValue } from '../bits/Bubble.js';
import { last4, sRnd } from '../../helpers/math/zmath.mjs';
import { mont } from '../../theme/foundations/fonts.js';
import { MoreInfoPopover } from '../bits/MoreInfoPopover.js';
import { tplUserItem } from '../../services/useUserStore.js';

let _execClaimFn = ()=>{}

export default function PondFrogeXDividends(props) {
  const {chainId:u_chainId,account:u_account,active:u_active,} = useWeb3React()
  const {chainId:n_chainId,account:n_account,active:n_active,} = useWeb3React('NETWORK')

  const [isClaimBtnDisabled, set_isClaimBtnDisabled] = useState(false)

  const ethPrice = useCrawlStore(s=>s.ethPrice)
  const fxPrice = useFxStore(s=>s.fxPrice)
  const _xMinClaimableDivs = useFxStore(s=>s._xMinClaimableDivs)
  const user = useUserStore(s=>s.users[u_account])

  let fxGetAccount = useUserStore(useCallback(s=>
    s.users[u_account] ?
      ( s.users[u_account].fxGetAccount )
     :( tplUserItem.fxGetAccount ),[user]))

  let [fxAcct,setFxAcct] = useState(false)

  useEffect(async ()=>{
    if(fxGetAccount._balance){
      setFxAcct(fxGetAccount)
    }
  },[fxGetAccount])

  const hydrate = async()=>{
    console.log('hydrating stuff from PondMyFrogeXRewards')
    await useUserStore.getState().hydrateFxGetAccount()
    await useFxStore.getState().hydrateFxStore()
    if(user.isFxClaimEligible){
      set_isClaimBtnDisabled(false)
    }else{
      set_isClaimBtnDisabled(true)
      console.log('things have changed... no longer eligible')
    }

  }

  const onExecClaim = async() => {
    set_isClaimBtnDisabled(true)
    await useUserStore.getState().execClaim(async(evt,data,err)=>{
      if(evt==='hID'){//creation cb
      }else{//activity cb
        set_isClaimBtnDisabled(false)
      }
      if(evt==='rcpt'){}
      if(evt==='conf'){}
      if(evt==='err'){}
    })
    // set_isClaimBtnDisabled(false)
  };

  const tickerBubbleStyle = {
    color:'bog.200', width: "45%", bgColor:'global.bubble',
    borderRadius: '6px', ...mont.md.md,
  }
  return (
    <Pond title={<><S color='white'>FrogeX</S>&nbsp;<S color='gray.300'>Dividends</S></>}>

      {u_account&&<TextXs mt='-3px' mb='7px'>For <S fontWeight='bold'>{last4(u_account)}</S></TextXs>}
      <PondBody width='100%'>
          <HStack width='100%' justifyContent='space-evenly'>
            <VStack __css={tickerBubbleStyle}><P>FrogeX</P><P sx={{color:'boog.400'}}>${fxPrice}</P></VStack>
            <VStack __css={tickerBubbleStyle}><P>ETH</P><P sx={{color:'boog.400'}}>${sRnd(ethPrice,-2)}</P></VStack>
          </HStack>
          {!user || !fxAcct || !u_active? (
            <TextXs>Please connect a wallet to view its FrogeX detail
              and optionally claim its due ETH rewards!</TextXs>
          ):(
            <>
              <Bubble>
                <BubLabel>Gross Total Earned Dividends</BubLabel>
                <BubValue>
                  {fxAcct._xDivsEarnedToDate[1]} ETH
                  <BubSub>(${fxAcct._xDivsEarnedToDate[2]} USD)</BubSub>
                </BubValue>
              </Bubble>
              <Bubble>
                <BubLabel>Dividends Claimed To Date</BubLabel>
                <BubValue>
                  {fxAcct._xDivsWithdrawnToDate[1]} ETH
                  <BubSub>(${fxAcct._xDivsWithdrawnToDate[2]} USD)</BubSub>
                </BubValue>
              </Bubble>
              <Bubble>
                <BubLabel>Unclaimed Dividends</BubLabel>
                <BubValue>
                  {fxAcct._xDivsAvailable[1]}&nbsp;ETH
                  <BubSub>(${fxAcct._xDivsAvailable[2]}&nbsp;USD)</BubSub>
                </BubValue>
              </Bubble>
              <Button disabled={user&&!user.isFxClaimEligible || isClaimBtnDisabled} mt={2} mb={1}
                      onClick={onExecClaim}>Claim Now</Button>

              <TextXs><strong>Minimum For Claim</strong> (current setting):</TextXs>
              {/* <MoreInfoPopover> */}
              {/*   We try to set the minimum around $20 USD equivalent - this helps keep the cost */}
              {/*   low on myriad TX, because of the auto-claim feature. For example, imagine you */}
              {/*   are due $4 in rewards, but processing the rewards will cost $5. The FrogeX */}
              {/*   contract prevents this with a minimum claimable setting, which is manually */}
              {/*   adjusted from time to time to keep things running optimally. */}
              {/* </MoreInfoPopover> */}
              <TextXs mb={1}>{_xMinClaimableDivs[1]}&nbsp;ETH&nbsp;
                (${_xMinClaimableDivs[2]}&nbsp;USD)</TextXs>
            </>
          )}
      </PondBody>
    </Pond>
  );
}
