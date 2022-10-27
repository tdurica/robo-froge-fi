import React, { useEffect, useState } from "react";
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Select,
  Input,
  Box,
  Portal,
  MenuButton,
  Menu,
  Flex,
  MenuItem,
  MenuList,
  Image,
  Grid,
  Icon,
  AccordionItem,
  Accordion, AccordionButton, AccordionIcon, AccordionPanel, Center, FormLabel, Switch, FormControl
} from '@chakra-ui/react';
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks.js";
import { connectors } from "./connectors.js";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useUserStore, useW3Store } from 'services/index.js';
import { useAtom } from 'jotai';
import LogoCoinbaseWallet from './assets/LogoCoinbaseWallet.png';
import LogoWalletConnect from './assets/LogoWalletConnect.png';
import LogoMetaMask from './assets/LogoMetaMask.png';
import { MdAdminPanelSettings, MdOutlinePrivateConnectivity } from 'react-icons/md';
import { GrConnect } from 'react-icons/gr';
import { first4, last4, surr4s } from '../../helpers/math/zmath.mjs';
import { FaEthereum, FaNetworkWired } from 'react-icons/fa';
import BoxSignSetVerify from './BoxSignSetVerify.js';
import {
  BtnBrandIcon,
  BtnConnectWallet,
  ConnectWalletNavButton,
  HFlexCC,
  S
} from '../bits/UtilityTags.js';
import { mont } from '../../theme/foundations/fonts.js';
import { wcModalIsOpenAtom } from '../../services/atoms.js';
import { GiGearHammer } from 'react-icons/gi';

export default function WalletMenu() {
  const {
    u_library,
    u_chainId,
    u_account,
    u_activate,
    u_deactivate,
    u_active
  } = useW3Store(s=>s);
  const [error, setError] = useState("");
  const [userDesiredChainId, set_userDesiredChainId] = useState(undefined);
  const [wcModalIsOpen, set_wcModalIsOpen] = useAtom(wcModalIsOpenAtom);
  const enableLS = useUserStore(s=>s.global.enableLS)

  const handle_userDesiredChainId = (e) => {
    const id = e.target.value;
    set_userDesiredChainId(Number(id));
  };
  const switch_userDesiredChainId = async () => {
    await u_library.provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(u_chainId) }]
    }).then((switchSuccess)=>{})
    .catch(async (switchError)=>{
      if (switchError.code === 4902) {
        await u_library.provider.request({
          method: "wallet_addEthereumChain",
          params: [networkParams[toHex(u_chainId)]]
        }).then((addSuccess)=>{})
        .catch((addError)=>{setError(addError);});
      }
    });
  };
  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
    set_userDesiredChainId("");
  };

  const disconnect = () => {
    refreshState();
    u_deactivate();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // if (provider) u_activate(connectors[provider]); //auto-activate onload
  }, []);

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  const onClickWCBrand = (brand)=>{
    // if(brand==='WC'){
    //   u_activate(connectors.walletConnect);
    //   setProvider("walletConnect");
    //   set_wcModalIsOpen(false)
    // }
    // if(brand==='CBW'){
    //   u_activate(connectors.coinbaseWallet);
    //   setProvider("coinbaseWallet");
    //   set_wcModalIsOpen(false)
    // }
    if(brand==='MM'){
      u_activate(connectors.injected);
      setProvider("injected");
      set_wcModalIsOpen(false)
    }
  }
  const sxBase = {
    backgroundColor: 'rgba(0,0,0,0)',
    backdropFilter:"brightness(40%) saturate(300%) blur(3px)",
    width:'275px',
  }
  return (
    <Menu  id='ConnectWalletMenu'>
      <MenuButton onClick={()=>set_wcModalIsOpen(true)} id='WCButton'>
        <ConnectWalletNavButton/>
      </MenuButton>
      <MenuList p="16px 8px" sx={sxBase}>
        {/* <MenuItem borderRadius="8px" mb="10px"></MenuItem> */}

        {u_active
          ?(
            <Button size='xs' onClick={()=>disconnect()}>
              <Box sx={{'& path':{stroke:'white'}}} mr='6px'><GrConnect/></Box>
              Disconnect
            </Button>
          )
          :(
            <VStack opacity='0.7'>
              <Box fontSize={'xs'}>Note: Coinbase and WalletConnect are disabled, just until they've been tested!!  Thanks for your patience</Box>
              <Button variant="outline" w="100%"
                      onClick={() => onClickWCBrand('CBW')}>
                <Image src={LogoCoinbaseWallet} boxSize={26} mr={2}/>
                <Text>Coinbase Wallet</Text>
              </Button>
              <Button variant="outline" w="100%"
                      onClick={() => onClickWCBrand('WC')}>
                <Image src={LogoWalletConnect} boxSize={26} mr={2}/>
                <Text>Wallet Connect</Text>
              </Button>
              <Button variant="outline" w="100%"
                      onClick={() => onClickWCBrand('MM')}>
                <Image src={LogoMetaMask} boxSize={26} mr={2}/>
                <Text>Metamask</Text>
              </Button></VStack>
          )}

        <Box justifyContent="center" alignItems="center" mt={4} opacity='1' backgroundColor= 'rgba(12,21,34,.8)'
             borderRadius='12px' overflow='hidden'>
          {u_active && (
            <Box justifyContent="flex-start" alignItems="center" borderRadius='12px'>
              <Accordion allowToggle colorScheme='green'>
                <AccordionItem opacity='0.7' borderTopWidth='0'>
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <MdOutlinePrivateConnectivity size={34}/>
                          <S>Connection Info</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bgColor={isExpanded?'bog.700':'inherit'}>
                      <HStack>
                        <Text fontSize='xs'>Connection Status:</Text>
                        {u_active ? (<CheckCircleIcon color="green"/>):(<WarningIcon color="red"/>)}
                      </HStack>
                      <Text>Account:</Text>
                      <Text color={'#00ff00'}>{u_account&&surr4s(u_account)}</Text>
                      <Text>{`Network ID: ${u_chainId ? u_chainId : "No Network"}`}</Text>
                    </AccordionPanel>
                  </>)}
                </AccordionItem>

                <AccordionItem opacity='0.7'>
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <FaNetworkWired size={30}/>
                          <S>Switch Network</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bgColor={isExpanded?'bog.700':'inherit'} justify="space-evenly">
                      <HStack>
                        <Button h={100} onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Mainnet</Button>
                        <VStack>
                          <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Ropsten</Button>
                          <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Rinkeby</Button>
                          <Button size='xs' onClick={switch_userDesiredChainId}><FaEthereum as={Icon}/>&nbsp;Kovan</Button>
                        </VStack>
                      </HStack>
                    </AccordionPanel>
                  </>)}
                </AccordionItem>

                <AccordionItem opacity='0.7' >
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <MdAdminPanelSettings size={30}/>
                          <S>Settings</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bgColor={isExpanded?'bog.700':'inherit'} pb={4}>
                      <FormControl as={HStack} mb={2} justify='space-between'>
                        <FormLabel htmlFor='email-alerts' mb='0' fontSize='.8rem'>
                          Enable Local Persistence?
                        </FormLabel>
                        <Switch
                          isChecked={!!enableLS}
                          onChange={e=>useUserStore.getState().setGlobalEnableLS(e.target.checked)}
                        />
                      </FormControl>
                      <Button bgColor='blue.800' _hover={{bgColor:'blue.600'}} size={'xs'}  mb={2}
                        onClick={()=>{useUserStore.getState().clearLS()}}>
                        Clear Local Persistence
                      </Button>
                    </AccordionPanel>
                  </>)}
                </AccordionItem>

                <AccordionItem borderBottomWidth='0!important' opacity='0.7' >
                  {({ isExpanded }) => (<>
                    <h2>
                      <AccordionButton _expanded={{ bgColor: 'bog.500' }}>
                        <HFlexCC gap={4} flex='1' fontSize={13}>
                          <MdAdminPanelSettings size={30}/>
                          <S w='min-content'>Centralized Enhancement</S>
                        </HFlexCC>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel bgColor={isExpanded?'bog.700':'inherit'} pb={4}>
                      <Button bgColor='green.600' _hover={{bgColor:'green.500'}} width={'100%'} size={'lg'}  mb={2}>
                        Login <S fontSize={10} fontStyle='italic' fontWeight={200} ml={3}>Centralized<br/>Enhancement</S>
                      </Button>
                      <FormControl as={HStack} mb={2} justify='space-between'>
                        <FormLabel htmlFor='email-alerts' mb='0' fontSize='.8rem'>
                          Enable Login Persistence?
                        </FormLabel>
                        <Switch id='email-alerts' />
                      </FormControl>
                      {/* <BoxSignSetVerify/> */}
                    </AccordionPanel>
                  </>)}
                </AccordionItem>
              </Accordion>
            </Box>
          )}
          <Text maxW='150px' color='#A00'>{error ? error.message : null}</Text>
        </Box>
      </MenuList>
    </Menu>
  );
}
