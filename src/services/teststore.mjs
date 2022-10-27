import { atom, useAtom } from 'jotai';
import axios from 'axios';
import create from 'zustand'

const useCrawlStore = create(set => ({
  ethPrice: 0,

  fetchFreshEthPrice: () => set(state => {
    return {
      ethPrice: state.ethPrice + 1
    }
  }),
  resetEthPrice: () => set({ ethPrice: 0 })
}))

const ucs = useCrawlStore.getState()

let v1 = ucs.ethPrice
ucs.fetchFreshEthPrice()

let v2 = useCrawlStore.getState().ethPrice


const useBearStore = create(() => ({ paw: true, snout: true, fur: true }))

// Getting non-reactive fresh state
const paw = useBearStore.getState().paw
// Listening to all changes, fires synchronously on every change
const unsub1 = useBearStore.subscribe(console.log)
// Updating state, will trigger listeners
useBearStore.setState({ paw: false })
// Unsubscribe listeners
unsub1()
// Destroying the store (removing all listeners)
useBearStore.destroy()



// const priceAtom = atom(10)
// const messageAtom = atom('hello')
// const productAtom = atom({ id: 12, name: 'good stuff' })
//
// const readOnlyAtom = atom((get) => get(priceAtom) * 2)
// const writeOnlyAtom = atom(
//   null, // it's a convention to pass `null` for the first argument
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(priceAtom, get(priceAtom) - update.discount)
//   }
// )

// const readWriteAtom = atom(
//   (get) => get(priceAtom) * 2,
//   (get, set, newPrice) => {
//     set(priceAtom, newPrice / 2)
//     // you can set as many atoms as you want at the same time
//   }
// )


// const ethPriceAtom = atom('')

// export const ethPrice = atom(
//   (get) => get(ethPriceAtom),
//   async (get, set, update) => {
//     await axios('/api/etherscan?method=ethPrice').then(res=>{
//       if(res.data && res.data.response) {
//         set(ethPriceAtom, res.data.response);
//       }
//     })
//   })
//
// export const setEthPrice = atom(
//   null, // it's a convention to pass `null` for the first argument
//   async (get, set, update) => {
//     await axios('/api/etherscan?method=ethPrice').then(res=>{
//       if(res.data && res.data.response) {
//         set(ethPriceAtom, res.data.response);
//       }
//     })
//   }
// )
