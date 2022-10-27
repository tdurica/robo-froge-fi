import create from 'zustand';
import { FXP, readFX } from '../stx/stx.js';
import { balToHrTuple } from '../helpers/math/zmath.mjs';
import { useCrawlStore } from 'services';
import produce from 'immer';

export const useFxStore = create((set,get) => ({
  fxPrice:'-',
  _xMinClaimableDivs:['','',''],
  xGetDivsGlobalTotalDist:'',
  fxGetConfigRaw: {},
  fxGetConfigLabels: [],
  fxGetConfigArrArr: [[]],
  hydrateFxStore: async (state) => {
    const fxPrice = await FXP.getFxPrice();
    const xGetDivsGlobalTotalDist = await readFX('xGetDivsGlobalTotalDist')
    const cfg = await readFX('getConfig')
    if(cfg) {
      const labels = Object.entries(cfg).map((k,v)=>`${k}: ${v}`)
      const arrarr = Object.entries(cfg).map((k,v)=>[k,v])
      const ethPrice = useCrawlStore.getState().ethPrice
      const minClaimTuple = balToHrTuple(cfg._xMinClaimableDivs, 18, ethPrice)
      set({
        fxPrice:fxPrice,
        _xMinClaimableDivs:minClaimTuple,
        xGetDivsGlobalTotalDist:xGetDivsGlobalTotalDist,
        fxGetConfigRaw: cfg,
        fxGetConfigLabels: labels,
        fxGetConfigArrArr: arrarr
      });
    }
    return get().fxGetConfigRaw
  },
  _s: (fn) => set(produce(fn)),
}))

