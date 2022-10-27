// import { Trans } from '@lingui/macro'
import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { network } from './connectors.js'
import { useEagerConnect, useInactiveListener } from './web3Hooks.js'
import { Text } from '@chakra-ui/react';
import { useCrawlStore, useUserStore, useFxStore, useW3Store } from 'services/index.js';

let ran1x = false
export default function W3RManager({ children }) {
  const u_ = useWeb3React()
  const n_ = useWeb3React('NETWORK')
  const {
    library:u_library, chainId:u_chainId,
    account:u_account, error:u_error, active:u_active,
    activate:u_activate, deactivate:u_deactivate,
  } = u_
  const {
    library:n_library, chainId:n_chainId,
    account:n_account, error:n_error, active:n_active,
    activate:n_activate, deactivate:n_deactivate,
  } = n_
  if(!ran1x){
    console.log('ran1x exec')
    useW3Store.getState().u_init(u_)
    useW3Store.getState().n_init(n_)
    useCrawlStore.getState().fetch_ethPrice()
    // useFxStore.getState().hydrateFxStore()
    ran1x=true;
  }

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  useEffect(async () => {
    console.log('activating everything in W3RManager.js')
    await n_activate(network);
    // console.log('u_account', u_account)
    // if(!ran1x){
    //   await useW3Store.getState().activateNetwork()
    //   await useCrawlStore.getState().fetch_ethPrice()
    //   await useFxStore.getState().hydrateFxStore()
    //   ran1x=true;
    // }
    // useW3Store.setState({
    //   u_activate:u_activate,
    //   u_deactivate:u_deactivate,
    //   n_activate:n_activate,
    //   n_deactivate:n_deactivate,
    // })
  }, [])

  const triedEager = useEagerConnect()

  useEffect(async () => {
    console.log('w3rmanager running user effects')
    await useW3Store.getState().u_init(u_)
    await useUserStore.getState().initUser()
  }, [u_chainId,u_account,u_active,])
  useEffect(async () => {
    console.log('w3rmanager running network effects')
    await useW3Store.getState().n_init(n_)
    await useFxStore.getState().hydrateFxStore()
  }, [n_chainId,n_account,n_active])

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate it
  useEffect(() => {
    if (triedEager && !n_active && !n_error && !u_active) {
      console.log('W3RManager - n_activate(network)')
      n_activate(network)
    }
  }, [triedEager, n_active, n_error, n_activate, u_active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedEager)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !u_active && n_error) {
    return (
          <Text>
            Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.
          </Text>
    )
  }

  return children
}
