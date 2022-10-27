import {
  Box, Button,
  FormControl, FormErrorMessage, FormLabel,
  HStack,
  Input,
  Text, Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { S, TextXs, } from 'views/bits/UtilityTags.js';
import { Pond, PondHeader } from 'views/bits/Pond.js';
import axios from 'axios';
import useCopyToClipboard from '../../hooks/useCopyToClipboard.js';
import { CopyToClipboard } from 'react-copy-to-clipboard/lib/Component.js';

const mockTestInput = `bg={'bog.700'} minH={'60px'} py={{ base: 2 }} px={{ base: 4 }}
      borderBottom='1' borderStyle={'solid'}
      borderColor={'bog.900'} justify='space-between' alignItems={'center'}`

export const PondCSSPropsConverter = () => {
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false);

  const onChangeInput = (e)=>{
    let inputValue = e.target.value
    try{
      const converted = convertCssProps(inputValue)
      setOutput(converted);
    }catch(e){}
  }

  return (
    <Pond title='CSS Props Converter'>
      <Textarea size='xs' onChange={onChangeInput}/>
      {/* <Button onClick={onConvert} size='xs' w={100}>Convert</Button> */}
      <CopyToClipboard
        text={output}
        onCopy={() => setCopied(true)}
      >
        <Textarea size='xs' value={output} height='10rem' readOnly/>
      </CopyToClipboard>
      {copied && <TextXs>Copied.</TextXs>}

    </Pond>
  )
}


export const convertCssProps = (input)=>{
  const rgxPickCssProps = /\w+\s*?=((.|\n)*?)(?=\s\w+=|$)/g;
  const rgxPickSides = /(\w+)\s*?=\s*?(['"{].+)/;
  const pickProps = input.match(rgxPickCssProps)
  return pickProps.map((v,i,a)=>{
    const noNL = v.replace(/\n/g,'')
    const [,LS,RS] = noNL.match(rgxPickSides)
    const noNest = RS.replace(/\\n/,'').trim()
    .replace(/^{/,'').replace(/}$/,'').trim()
    return `${LS}: ${noNest},`
  }).join(' ')
}
