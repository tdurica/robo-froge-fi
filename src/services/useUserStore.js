const [__,__E,__W] = [console.log,console.error,console.warn];
import produce from 'immer';
import create from 'zustand';
import { readFX, stx } from '../stx/stx.js';
import { useW3Store } from './useW3Store.js';
import addr from '../data/addresses.js';
import { PHASE } from '../data/constants.js';
import { mockEthBal, mockFxGetAccount1 } from './mocks.js';
import { useCrawlStore } from './useCrawlStore.js';
import { balToHrTuple } from '../helpers/math/zmath.mjs';
import { useFxStore } from './useFxStore.js';
import axios from 'axios';

export const createAuthCreds = async ()=>{
  const { web3, u_library, u_account } = useW3Store.getState()
  const authMsg = web3.utils.randomHex(4) // "0x6892ffc6"
  const authSig = await u_library.provider.request({
    method: "personal_sign",
    params: [authMsg, u_account]
  });
  return {account:u_account, authParams:[authMsg, authSig]}
}

const defaultOn = (evt, data, err) => { __(evt, data, err);
  if (evt === 'historyUID') {}
  if (evt === 'transactionHash') {}
  if (evt === 'receipt') {}
  if (evt === 'confirmation') {}
  if (evt === 'error') {}
};

export const tplHistoryItem={
  status:'Created',
  type:'',//buy,sell,
  from:'',
  to:'',
  path:[],
  value:'',
  args:[],
  hash:'',
  rcpt: {},
  confs:0,
  error:[],
  output:'',
  t_created:0,
  t_resolved:0,
  hID:'',
}
export const tplUserItem={
  history: {},
  ethBal:['', '', ''],
  isFxClaimEligible: false,
  fxGetAccount: {
    _balance: ['', '', ''],
    _xDivsAvailable: ['', '', ''],
    _xDivsEarnedToDate: ['', '', ''],
    _xDivsWithdrawnToDate: ['', '', ''],
    _isAMMPair: '',
    _isBlackListedBot: '',
    _isExcludedFromRwds: '',
    _isExcludedFromFees: '',
  },
}
export const tplGlobal={
  enableLS:false
}

export const useUserStore = create((set, get) => ({
  global: tplGlobal,
  users: {},
  execClaim: (on = defaultOn) => {
    return stx({
      from: useW3Store.getState().u_account,
      to: addr.mainnet.FROGEX.ERC20,
      path: ['FrogeX', 'xClaim'], on: on
    })/* .catch(err => {__('errcaught!');on('error', err);}); */
  },
  hydrateEthBalance: async () => {
    const lib = useW3Store.getState().n_library;
    if (!lib) {return;}
    const { u_account, u_active } = useW3Store.getState();
    if (!u_active) {return;}
    get().assureUserZS(u_account);
    const ethBal = PHASE>0?await lib.getBalance(u_account):mockEthBal;
    const ethPrice = useCrawlStore.getState().ethPrice;
    const ethBalTuple = balToHrTuple(ethBal.toString(), 18, ethPrice);
    get()._s(s=>{s.users[u_account].ethBal = ethBalTuple })
  },
  initStore: async () => {
    get().assureLS()
    get().globalApplyLStoZS()
    if(get().global.enableLS){
      get().usersApplyLStoZS();
    }
  },
  assureLS:()=>{
    if(!JSON.parse(localStorage.getItem('global'))){
      window.localStorage.setItem('global', JSON.stringify(tplGlobal));}
    if(!JSON.parse(localStorage.getItem('users'))){
      const usersVal = get().global.enableLS? get().users : {};
      window.localStorage.setItem('users', JSON.stringify(usersVal));}
  },
  initUser: async () => {
    await get().hydrateEthBalance();
    await get().hydrateFxGetAccount();
  },
  removeAccounts: () => {
    set({ users: {} });
  },
  hydrateFxGetAccount: async () => {
    const { u_account, u_active } = useW3Store.getState();
    if (!u_active) {return;}
    const acc = PHASE>0?await readFX('getAccount',[u_account]):mockFxGetAccount1;
    const fxPrice = useFxStore.getState().fxPrice;
    const ethPrice = useCrawlStore.getState().ethPrice;
    const minForClaim = useFxStore.getState()._xMinClaimableDivs[0];
    get()._s(s=>{
      s.users[u_account].fxGetAccount = {
        _balance: balToHrTuple(acc._balance, 9, fxPrice),
        _xDivsAvailable: balToHrTuple(acc._xDivsAvailable, 18, ethPrice),
        _xDivsEarnedToDate: balToHrTuple(acc._xDivsEarnedToDate, 18, ethPrice),
        _xDivsWithdrawnToDate: balToHrTuple(acc._xDivsWithdrawnToDate, 18, ethPrice),
        _isAMMPair: acc._isAMMPair,
        _isBlackListedBot: acc._isBlackListedBot,
        _isExcludedFromRwds: acc._isExcludedFromRwds,
        _isExcludedFromFees: acc._isExcludedFromFees,
      }
      s.users[u_account].isFxClaimEligible = (acc._xDivsAvailable > minForClaim)
    })
  },
  assureUserZS: (acct) => {
    if (get().users[acct]==null){
      set({users:{[acct]:tplUserItem}})
    }
  },
  setHistory: async (evt,hID,from,data,e,_sv={}) => {
    const _s = get()._s;
    const p = (s)=>s.users[from].history[hID]
    // const authCreds = await createAuthCreds()
    if(evt==='hID'){
      get().assureUserZS(from);
      _s(s=>{s.users[from].history[hID] = {
        ...tplHistoryItem, t_created: Date.now(),
        path:data.path,value:data.value,args:data.args,
        from:data.from,to:data.to,hID:hID,
      }})
    }
    if(evt==='hash'){ _s(s=>{p(s).hash = data})   }
    if(evt==='rcpt'){ _s(s=>{p(s).rcpt = data})
                      _s(s=>{p(s).status = 'Resolved'})   }
    if(evt==='conf'){ _s(s=>{p(s).confs = data})   }
    if(evt==='out'){  _s(s=>{p(s).out = data})   }
    if(['err','rcpt'].includes(evt)){ _s(s=>{p(s).t_resolved = Date.now()}) }
    if(evt==='err'){
      _s(s=>{p(s).error.push(data)})
      _s(s=>{p(s).status = data.code===4001?'Rejected By User':'Error'})
    }
    if(['hID','hash','rcpt','err'].includes(evt) && get().global.enableLS){
      get().usersApplyZStoLS();
    }
  },
  setGlobalEnableLS:(b)=>{
    get()._s(s=>{s.global.enableLS = b;})
    get().globalApplyZStoLS();
    if(b){
      get().usersApplyZStoLS();
      get().usersApplyLStoZS();
    }
  },
  globalApplyZStoLS: () => {
    let globalZS = get().global
    window.localStorage.setItem('global', JSON.stringify(globalZS));
  },
  globalApplyLStoZS: () => {
    let globalLS = JSON.parse(localStorage.getItem('global'))
    if(globalLS.enableLS){
      get()._s(s=>{s.global.enableLS=true})
      get().usersApplyLStoZS();
    }
  },
  usersApplyZStoLS: () => {
    if(!get().global.enableLS){return;}
    let usersLS = JSON.parse(localStorage.getItem('users'));
    Object.assign(usersLS?usersLS:{}, get().users)
    window.localStorage.setItem('users', JSON.stringify(usersLS));
  },
  usersApplyLStoZS: () => {
    let usersLS = JSON.parse(localStorage.getItem('users'))
    if(!usersLS){return;}//nothing to apply
    for(const [k,v] of Object.entries(usersLS)){
      get().assureUserZS(k);//k is the address
      get()._s(s=>{Object.assign(s.users[k],v)})
    }
  },
  clearLS:()=>{window.localStorage.clear();get().assureLS()},
  getHistoryDB: async (newHistory) => {
    const authCreds = await createAuthCreds()
    const res = await axios.post('/api/history', {
      ...authCreds, newHistory:newHistory
    });if(res.data) {set({ history: res.data.history});}
  },
  _s: (fn) => set(produce(fn)),
}));
