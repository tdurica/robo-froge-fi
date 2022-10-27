import {
  Box, Grid, HStack, IconButton, Input, InputGroup,
  InputLeftElement, InputRightElement, NumberInput, NumberInputField,
  Text, useNumberInput, VStack,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { fabric } from "fabric";
import { canvas, fabric$ } from './fabric$.js';
import { addCircle, addImage, addRect } from './utils/canvas-methods.js';
import { BsBoundingBoxCircles, BsRulers } from 'react-icons/bs';
import {
  BiImport, BiSave, BiShapeCircle, BiShapePolygon, BiShapeSquare, BiText
} from 'react-icons/bi';
import { GoTextSize } from 'react-icons/go';
import { ImTextColor, ImTextHeight, ImTextWidth } from 'react-icons/im';
import { IoShapes } from 'react-icons/io5';
import { DeleteIcon, SettingsIcon } from '@chakra-ui/icons';
import { GiGlobe } from 'react-icons/gi';
import { AiOutlineColumnHeight, AiOutlineColumnWidth } from 'react-icons/ai';
import { HFlex, S, VFlex } from '../views/bits/UtilityTags.js';
import { RiImageAddLine } from 'react-icons/ri';
import { v4 as uuidv4 } from 'uuid';
import UploadDropzone from './utils/FileUpload/UploadDropzone.js';
import ImgUploadModal from './utils/FileUpload/ImgUploadModal.js';
import { abs } from './utils/general.js';
import { IBtn, IBtnCat, INumInput } from './utils/tags.js';
import { cycleToolCat, toolCats, TopCtrlBar } from './utils/tools.js';



/** --------------------------------------- **/
export default function PgDesignEditor(props) {
  const fabricData = fabric$(s=>s.fabricData)
  const altContext = fabric$(s=>s.altContext)

  const [canvasDim,setCanvasDim] = useState([350,200])
  const handler = () => {}

  const onAlt_canvasWidth = (e) => {
    setCanvasDim([e.target.value,canvasDim[1]])}
  const onAlt_canvasHeight = (e) => {
    canvas.setDimensions({height:e.target.value});
  }
  const onAlt_RemoveItem = (e) => {

  }

  useEffect(()=>{
    fabric$.getState().initCanvas()
  },[])
  useEffect(()=>{
    // canvas.setDimensions({width:100, height:200});
  },[canvas])

  const dbbZoom = fabric$(s=>s.dbbZoom)
  const dbbMouseCoords = fabric$(s=>s.dbbMouseCoords)
  const dbbCoordsRel = fabric$(s=>s.dbbCoordsRel)
  return (
    <VFlex id='EditorWrap' h='100%' w='100%'>
      <TopCtrlBar/>


      <HStack name='TopAltBar'>
        {altContext==='text'&&(<>
          <IBtn I={ImTextHeight} onClick={handler} />
          <IBtn I={ImTextWidth} onClick={handler} />
          <IBtn I={ImTextColor} onClick={handler} />
          <IBtn I={GoTextSize} onClick={handler} />
        </>)}
        {altContext==='ruler'&&(<>
          <DeleteIcon onClick={onAlt_RemoveItem}/>
          <INumInput l='Canvas Width' onChng={onAlt_canvasWidth} I={AiOutlineColumnWidth} w='4.4rem'/>
          <INumInput l='Canvas Height' onChng={onAlt_canvasHeight} I={AiOutlineColumnHeight} w='4.4rem'/>
        </>)}

      </HStack>
      <VStack name='LeftCtrlBar' position='absolute' left={0}>

      </VStack>
      <HFlex id='canvasWrap' sx={{width:'100%', height:'100%',position:'relative'}}>
        <HFlex sx={{
          ...abs(0,0,null,0), height:'12px', backgroundColor:'rgba(0,0,160,.01)',
          pointerEvents:'none',zIndex:'1',gap:'1rem'
        }}>
          <Text fontSize={9} flexBasis={110}>zoom:{dbbZoom}</Text>
          <Text fontSize={9} flexBasis={120}>xy({dbbMouseCoords})</Text>
          <Text fontSize={9} color='blue' flexBasis={120}>xy({dbbCoordsRel})</Text>
        </HFlex>
        <canvas id="canvas"/>

      </HFlex>

      {/* <ImageMapEditor /> */}
    </VFlex>
  );
}
