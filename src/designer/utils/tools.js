import { canvas, fabric$ } from '../fabric$.js';
import React, { useCallback } from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { IBtn } from './tags.js';
import { BiImport, BiSave, BiShapeCircle, BiShapePolygon, BiShapeSquare, BiText } from 'react-icons/bi';
import { BsRulers } from 'react-icons/bs';
import ImgUploadModal from './FileUpload/ImgUploadModal.js';
import { fabric } from 'fabric';
import { IoShapes } from 'react-icons/io5';
import { GiGlobe } from 'react-icons/gi';
import { SettingsIcon } from '@chakra-ui/icons';

export const toolCats = [
  ['shapes', IoShapes],
  ['global', GiGlobe],
  ['settings', SettingsIcon],
  ['text', BiText],
];
const mod = (n, m) => ((n % m) + m) % m;
export const cycleToolCat = () => {
  fabric$.setState({ altContext: 'none' });
  const currIdx = fabric$.getState().toolCatIdx;
  fabric$.setState({ toolCatIdx: mod(currIdx + 1, toolCats.length) });
};
const handler = () => {}

export const TopCtrlBar = ()=>{
  const toolCatIdx = fabric$(s=>s.toolCatIdx)
  const toolCat=fabric$(useCallback((s)=>toolCats[toolCatIdx],[toolCatIdx]))
  return (
    <HStack name='TopCtrlBar'>
      <Box id='CategoryPicker'>
        <IBtn scheme='blue' I={toolCats[toolCatIdx][1]} onClick={cycleToolCat} />
      </Box>
      <Box id='Tools'>
        {toolCats[toolCatIdx][0]==='settings'&&(<>
          <IBtn I={BiSave} onClick={handler} />
          <IBtn I={BiImport} onClick={handler} />
        </>)}
        {toolCats[toolCatIdx][0]==='global'&&(<>
          <IBtn I={BsRulers} onClick={onTool_ruler} />
        </>)}
        {toolCats[toolCatIdx][0]==='shapes'&&(<>
          <ImgUploadModal onFileAccepted={addImage} />
          <IBtn I={BiShapeCircle} onClick={addCircle} />
          <IBtn I={BiShapeSquare} onClick={addRect} />
          <IBtn I={BiShapePolygon} onClick={handler} />
        </>)}
        {toolCats[toolCatIdx][0]==='text'&&(<>
          <IBtn I={BiText} onClick={handler} />
        </>)}
      </Box>
    </HStack>

  )
}

const onTool_ruler = () => {
  fabric$.setState({altContext:'ruler'})
}

export const addRect = () => {
  fabric$.setState({altContext:'addRect'})
  const rect = new fabric.Rect({
    top : 100, left : 100, width : 100, height : 100, fill : 'yellow'
  });
  canvas.add(rect);
}
export const addCircle = () => {
  fabric$.setState({altContext:'addCircle'})
  const circle = new fabric.Circle({
    radius: 30, fill: '#f55', top: 100, left: 100 });
  canvas.add(circle);
}
export const addImage = (e) => {
  fabric$.setState({altContext:'addImage'})

  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function (f) {
    const data = f.target.result;
    fabric.Image.fromURL(data, function (img) {
      const oImg = img.set({
        left: 0, top: 0, angle: 0,width:100, height:100,cornersize:10,
      }).scale(0.9);
      canvas.add(oImg).renderAll();
      let a = canvas.setActiveObject(oImg);
      let dataURL = canvas.toDataURL({format: 'png', quality: 0.8});
    });
  };
  reader.readAsDataURL(file);
}
