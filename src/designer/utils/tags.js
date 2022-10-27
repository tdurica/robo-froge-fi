import {
  IconButton, Input, InputGroup, InputLeftElement, Text, useNumberInput
} from '@chakra-ui/react';
import { VFlex } from '../../views/bits/UtilityTags.js';
import React from 'react';


export const IBtn = ({onClick,I,scheme})=>{
  return <IconButton onClick={onClick} aria-label='' icon={<I/>} colorScheme={scheme}/>
}
export const IBtnCat = ({onClick,I})=>{
  return <IconButton colorScheme='blue' onClick={onClick} aria-label='' icon={<I/>} />
}
export const INumInput = ({onChng,I,w,l,ph=''})=>{
  const { getInputProps } =
    useNumberInput({
      step: 1, defaultValue: 100, min: 1, max: 1200, precision: 0,
    })
  const input = getInputProps()
  return (
    <VFlex>
      <Text fontSize='10px'>{l}</Text>
      <InputGroup size='xs' width={w}>
        <InputLeftElement pointerEvents='none' children={<I/>}/>
        <Input {...input} variant='filled'
               onChange={onChng} />
      </InputGroup>
    </VFlex>
  )
}
