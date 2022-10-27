import { useEffect, useState } from "react";
import {
  VStack,
  Button,
  Text,
  Input,
  Box,
} from '@chakra-ui/react';
import { useWeb3React } from "@web3-react/core";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { toHex, truncateAddress } from "helpers/math/utils.js";
import { useAtom } from 'jotai';
import { wcModalIsOpenAtom } from '../../services/atoms.js';

export default function BoxSignSetVerify() {
  const {
    library:u_library,
    chainId:u_chainId,
    account:u_account,
    activate:u_activate,
    deactivate:u_deactivate,
    active:u_active
  } = useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();
  const [wcModalIsOpen, set_wcModalIsOpen] = useAtom(wcModalIsOpenAtom);

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const signMessage = async () => {
    if (!u_library) return;
    try {
      const signature = await u_library.provider.request({
        method: "personal_sign",
        params: [message, u_account]
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!u_library) return;
    try {
      const verify = await u_library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature]
      });
      setVerified(verify === u_account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const resetState = () => {
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };


  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    // if (provider) activate(connectors[provider]); //auto-activate onload
  }, []);

  useEffect(() => {
    if(wcModalIsOpen)resetState()
  }, [wcModalIsOpen]);



  return (
      <Box maxW="sm" borderWidth="1px" borderRadius="lg"
           overflow="hidden" padding="10px">
        <VStack>
          <Button onClick={signMessage} isDisabled={!message}>
            Sign Message
          </Button>
          <Input
            placeholder="Set Message"
            maxLength={20}
            onChange={handleInput}
            w="140px"
          />
          {signature ? (
            <Tooltip label={signature} placement="bottom">
              <Text>{`Signature: ${truncateAddress(signature)}`}</Text>
            </Tooltip>
          ) : null}
        </VStack>
        <VStack>
          <Button onClick={verifyMessage} isDisabled={!signature}>Verify
            Message</Button>
          {verified !== undefined ? (
            verified === true ? (
              <VStack>
                <CheckCircleIcon color="green"/>
                <Text>Signature Verified!</Text>
              </VStack>
            ) : (
              <VStack>
                <WarningIcon color="red"/>
                <Text>Signature Denied!</Text>
              </VStack>
            )
          ) : null}
          {error&&error}
        </VStack>
      </Box>
  );
}
