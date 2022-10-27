import { Flex, Grid, HStack, Text, } from '@chakra-ui/react';
import React from 'react';
import PondMyBots from './dash/PondMyBots.js';
import { Pond, PondBody, PondHeader } from './bits/Pond.js';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function PgDash() {
  const nav = useNavigate()
  const handleEditDesign = ()=>{
    nav('/design-editor')
  }
  const handleArchiveDesign = ()=>{

  }
  return (
    // <Flex flexDirection="column" flexGrow='1' pt="75px">

    <>
        {/* <BogGlobalStats/> */}
      <Pond title='My Bots'>
        <Text>MyRadBot11</Text>
        <PondBody ps="20px" pe="0px" mb="31px" position="relative">
          <Flex direction="column">

          </Flex>
        </PondBody>
      </Pond>

      <Pond title='My Designs'>
        <PondBody>
          <HStack>
            <Text>MyRadDesign11</Text>
            <EditIcon onClick={handleEditDesign}/>
            <DeleteIcon onClick={handleArchiveDesign}/>
          </HStack>
          <AddIcon/>
        </PondBody>
      </Pond>

      <Pond title='My Behaviors'>
        <Text>MyRadBehavior11</Text>
        <PondBody ps="20px" pe="0px" mb="31px" position="relative">
          <Flex direction="column">

          </Flex>
        </PondBody>
      </Pond>



    </>
  );
}
