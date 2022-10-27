import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import { injected } from './connectors.js'
import { useUserStore, useW3Store } from 'services/index.js';

export function useEagerConnect() {
  const u_activate = useW3Store(s=>s.u_activate)
  const u_active = useW3Store(s=>s.u_active)
  const [tried, setTried] = useState(false)

  useEffect(() => {
    if (!u_active ) {
      injected.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          u_activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      })
    }
  }, [])

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (u_active) {
      setTried(true)
    }
  }, [u_active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const u_activate = useW3Store(s=>s.u_activate)
  const u_active = useW3Store(s=>s.u_active)
  const u_error = useW3Store(s=>s.u_error)

  useEffect(() => {
    const ethereum = window.ethereum

    if (ethereum && ethereum.on && !u_active && !u_error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        if(u_activate){
          u_activate(injected, undefined, true).catch((err) => {
            console.error('Failed to activate after chain changed', err)
          })
        }
      }

      const handleAccountsChanged = (injAccounts) => {
        if (injAccounts.length > 0) {
          // eat errors
          if(u_activate){
            u_activate(injected, undefined, true).catch((err) => {
              console.error('Failed to activate after accounts changed', err)
            })
          }
          useUserStore.getState().removeAccount();
        }else{

        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [u_active, u_error, suppress, u_activate])
}
