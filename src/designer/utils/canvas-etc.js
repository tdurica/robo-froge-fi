import { canvas } from '../fabric$.js';
import { fabric } from 'fabric';
import React from 'react';

export const resizeCanvas = (e)=>{
  const canvasWrap = document.getElementById('canvasWrap')
  const cWrapWidth = canvasWrap.getBoundingClientRect().width
  const cWrapHeight = canvasWrap.getBoundingClientRect().height
  if (canvas.width !== cWrapWidth) {
    let scaleMultiplier = cWrapWidth / canvas.width;
    let objects = canvas.getObjects();
    for(let [k,v] of Object.entries(objects)) {
      v.scalex = v.scalex * scaleMultiplier;
      v.scaley = v.scaley * scaleMultiplier;
      v.left = v.left * scaleMultiplier;
      v.top = v.top * scaleMultiplier;
      v.setCoords();
    }
    canvas.setWidth(canvas.getWidth() * scaleMultiplier);
    canvas.setHeight(cWrapHeight);
    canvas.renderAll();
    canvas.calcOffset();
    // canvas.setDimensions({width:cWrapWidth,height:cWrapHeight})
  }
}

