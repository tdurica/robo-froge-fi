import { canvas } from '../fabric$.js';
import { fabric } from 'fabric';
import React from 'react';

export const getTextObjProperties = ()=>{
  // Fabric js - Get All Properties of Text Object
  let canvas = ctx = activeObject = text1 = text2 = '';
  let textProperties = ['angle', 'backgroundColor', 'clipTo', 'fill', 'fillRule', 'flipX', 'flipY',
    'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'globalCompositeOperation', 'height',
    'id', 'left', 'letterSpace', 'lineHeight', 'opacity', 'originX', 'originY', 'scaleX', 'scaleY',
    'shadow', 'stroke', 'strokeDashArray', 'strokeLineCap', 'strokeLineJoin', 'strokeMiterLimit',
    'strokeWidth', 'text', 'textAlign', 'textBackgroundColor', 'textDecoration', 'top',
    'transformMatrix', 'visible', 'width'];
  console.clear();
  canvas = new fabric.Canvas('canvas');
  let ctx = canvas.getContext('2d');
  let text1 = new fabric.Text('Text1', {
  });
  text1.set('fill', 'red');
  text1.set('left', 50);
  text1.set('top', 110);
  let text2 = new fabric.Text('Text2', {
    fill: 'green',
    left: 150,
    top: 50
  });
  canvas.add(text1, text2).renderAll().setActiveObject(text1);
  let activeObject = canvas.getActiveObject();
  $(document).on('click', '#replace', function(e) {
    e.preventDefault();
    console.log('Enter');
    for(let i=0; i<textProperties.length; i++) {
      let property = textProperties[i];
      text2.set(property, activeObject.get(property));
    }
    canvas.renderAll().setActiveObject(text2);
    console.log('Exit');
  });
}

export const useImageAsArtboardWhileStretchingImage = (e) => {
  canvas.setBackgroundColor('', canvas.renderAll.bind(canvas));
  canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(f) {
    let data = f.target.result;
    fabric.Image.fromURL(data, function(img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });
    });
  };
  reader.readAsDataURL(file);
}
export const useImageAsArtboardWhileResizingArtboard = (e) => {
  canvas.setBackgroundColor('', canvas.renderAll.bind(canvas));
  canvas.setBackgroundImage(0, canvas.renderAll.bind(canvas));
  let file = e.target.files[0];
  let reader = new FileReader();
  reader.onload = function(f) {
    let data = f.target.result;
    fabric.Image.fromURL(data, function(img) {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });
    });
  };
  reader.readAsDataURL(file);
}

export const getCanvasAtResoution = (newWidth) => {
  if (canvas.width !== newWidth) {
    let scaleMultiplier = newWidth / canvas.width;
    let objects = canvas.getObjects();
    for(let [k,v] of Object.entries(objects)) {
      v.scaleX = v.scaleX * scaleMultiplier;
      v.scaleY = v.scaleY * scaleMultiplier;
      v.left = v.left * scaleMultiplier;
      v.top = v.top * scaleMultiplier;
      v.setCoords();
    }
    canvas.setWidth(canvas.getWidth() * scaleMultiplier);
    canvas.setHeight(canvas.getHeight() * scaleMultiplier);
    canvas.renderAll();
    canvas.calcOffset();
  }
  return canvas.toDataURL();
}
