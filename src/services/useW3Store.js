import create from 'zustand';
import React from 'react';
import { connectors } from '../views/wallet/connectors.js';
import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

export const useW3Store = create((set,get) => ({
  web3:web3,
  u_library:null,
  u_chainId:'',
  u_account:'',
  u_error:'',
  u_active:'',
  u_activate:null,
  u_deactivate:null,
  n_library:null,
  n_chainId:'',
  n_account:'',
  n_error:'',
  n_active:'',
  n_activate:null,
  n_deactivate:null,
  activateNetwork:async()=>{
    (get().n_activate && await get().n_activate(connectors.network));
  },
  activateUser:async(connector)=>{
    (get().u_activate && await get().u_activate(connector));
  },
  u_init:async(u_)=>{
    set({
      u_library:u_.library,
      u_chainId:u_.chainId,
      u_account:u_.account,
      u_error:u_.error,
      u_active:u_.active,
      u_activate:u_.activate,
      u_deactivate:u_.deactivate,
    })
    await get().activateNetwork();
  },
  n_init:async(n_)=>{
    set({
      n_library:n_.library,
      n_chainId:n_.chainId,
      n_account:n_.account,
      n_error:n_.error,
      n_active:n_.active,
      n_activate:n_.activate,
      n_deactivate:n_.deactivate,
    })
    await get().activateNetwork();
  },
}))


