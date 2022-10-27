import { fabric } from 'fabric';
const [__,__E,__W] = [console.log,console.error,console.warn];
import produce from 'immer';
import create from 'zustand';
import ResizeObserver from 'resize-observer-polyfill';
import { sRnd } from '../helpers/math/zmath.mjs';
import { resizeCanvas } from './utils/canvas-etc.js';

export const tplDesignItem={
  history: {},
  ethBal:['', '', ''],
  isFxClaimEligible: false,
  fxGetAccount: {
    _balance: ['', '', ''],
  },
}

export let canvas=null;

export const fabric$ = create((set, get) => ({
  // canvas: null,

  fabricData: {
    objects: [],
  },
  activeObject: false,
  artboard:null,
  artboardCoords:null,
  altContext:'none',
  toolCatIdx:0,
  dbbZoom:'',
  dbbMouseCoords:'',
  dbbCoordsRel:'',
  initArtboard() {
    const rect = new fabric.Rect({
      top : 0, left : 0, width : 600, height : 300, fill : '#bfb',
      selectable:false,hasControls:false,hasBorders:false,
      moveCursor:'normal',hoverCursor:'normal',
    });
    canvas.add(rect);
    set({artboard:rect})
    set({artboardCoords:rect.aCoords})
  },
  relCoord(cx,cy) {
    let abs1 = new fabric.Point(cx,cy)
    let abs2 = fabric.util.transformPoint(abs1, canvas.viewportTransform);

    console.log('abs1',abs1)
    console.log('abs2',abs2)
    console.log('@',get().artboard.calcACoords().tl)
    const rel = get().artboard.toLocalPoint(abs2, 'left', 'top')
    console.log(rel.x, rel.y)
    return [rel.x, rel.y]
  },
  initCanvas() {
    // set({canvas: new fabric.Canvas('canvas', { backgroundColor: 'gray' })})
    const canvasWrap = document.getElementById('canvasWrap')
    const cWrapWidth = canvasWrap.getBoundingClientRect().width
    const cWrapHeight = canvasWrap.getBoundingClientRect().height
    // canvas.setDimensions({width:cWrapWidth,height:cWrapHeight})
    canvas = new fabric.Canvas('canvas', { backgroundColor: 'gray',
      width:cWrapWidth,height:cWrapHeight
    })
    canvas.viewportTransform = [1, 0, 0, 1, 50, 50];
    // const canvas = get().canvas;
    get().initArtboard()
    const zooms = [.7, .8, .9, 1, 2, 3, 4.5, 6];
    canvas
    .on('mouse:wheel', function(opt) {
      let isZoomIn = opt.e.deltaY < 0;
      let zoom = canvas.getZoom();
      let zoomIdx = zooms.indexOf(zoom) ?? zooms.length-1;
      if (isZoomIn && zoom >= zooms[zooms.length-1]) {
        zoom = zooms[zooms.length - 1];
      }else if (!isZoomIn && zoom <= zooms[0]) {
        zoom = zooms[0];
      }else{
        zoom = zooms[isZoomIn?zoomIdx+1:zoomIdx-1];
      }
      let artWidth = get().artboard.width
      let artHeight = get().artboard.height
      let vptBoundaryOffsetWidth = artWidth / 2
      let vptBoundaryOffsetHeight = artHeight / 2
      let vptBoundaryMinX = 0 - vptBoundaryOffsetWidth
      let vptBoundaryMinY = 0 - vptBoundaryOffsetHeight
      let vptBoundaryMaxX = 0 - vptBoundaryOffsetWidth
      let vptBoundaryMaxY = 0 - vptBoundaryOffsetHeight
      set({dbbZoom:sRnd(zoom,-2)})
      console.log('hey')
      canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      // opt.e.preventDefault();
      // opt.e.stopPropagation();
      let vpt = this.viewportTransform;
      // if (zoom < .2) {
      //   vpt[4] = 200 - 1000 * zoom / 2;
      //   vpt[5] = 200 - 1000 * zoom / 2;
      // } else {
      //   if (vpt[4] >= 0) {
      //     vpt[4] = 0;
      //   } else if (vpt[4] < canvas.getWidth() - artWidth * zoom) {
      //     vpt[4] = canvas.getWidth() - artWidth * zoom;
      //   }
      //   if (vpt[5] >= 0) {
      //     vpt[5] = 0;
      //   } else if (vpt[5] < canvas.getHeight() - artHeight * zoom) {
      //     vpt[5] = canvas.getHeight() - artHeight * zoom;
      //   }
      // }
      this.setViewportTransform(this.viewportTransform);
      set({artboardCoords:get().artboard.calcACoords()})
      canvas.renderAll()
    })
    .on('mouse:down', function(opt) {
      const evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    })
    .on('mouse:move', function(opt) {
      set({dbbMouseCoords:opt.e.clientX+'|'+opt.e.clientY})

      if (this.isDragging) {
        const e = opt.e;
        let vpt = this.viewportTransform;
        vpt[4] += e.clientX - this.lastPosX;
        vpt[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    })
    .on('mouse:up', function(opt) {
         // on mouse up we want to recalculate new interaction
      // for all objects, so we call setViewportTransform
      const { x:pX,y:pY } = opt.pointer;//rel to canvas element TL
      const { x:absX,y:absY } = opt.absolutePointer //rel to artboard (if artboard remains 0,0)
      __(`p`,pX,pY,absX,absY)
      this.setViewportTransform(this.viewportTransform);
      const [rx,ry] = get().relCoord(opt.e.clientX,opt.e.clientY)
      set({dbbCoordsRel:rx+'|'+ry})
      this.isDragging = false;
      this.selection = true;
    });
    // window.addEventListener('orientationchange', get().resizeCanvas, false);
    // window.addEventListener('resize', get().resizeCanvas, true);
    const ro = new ResizeObserver((entries, observer) => {
      __('rsObserver')
      resizeCanvas()
      // for (const entry of entries) {
      //   const {left, top, width, height} = entry.contentRect;
      //   console.log('Element:', entry.target);
      //   console.log(`Element's size: ${ width }px x ${ height }px`);
      //   console.log(`Element's paddings: ${ top }px ; ${ left }px`);
      // }
    });
    ro.observe(canvasWrap);
  },
  saveFabricData(fabricData) {
    set({ 'fabricData': fabricData });
  },
  saveActiveObject(activeObject) {
    set({ 'activeObject': activeObject });
  },
  setHistory: async (evt,hID,_s=get()._s) => {
    const p = (s)=>s.users[from].history[hID]
    if(evt==='out'){ _s(s=>{p(s).out = data}) }
  },
  _s: (fn) => set(produce(fn)),
}));
