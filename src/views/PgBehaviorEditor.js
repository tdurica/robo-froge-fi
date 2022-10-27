import React from 'react';
import { Grid, } from '@chakra-ui/react';

import { PondTpl_BNCalc } from './ponds/PondTemplates.js';
import { PondCSSPropsConverter } from './calcs/PondCSSPropsConverter.js';

export default function PgBehaviorEditor() {

  return (
    <>
        <PondCSSPropsConverter/>
        <PondTpl_BNCalc/>
        {/* <PondFrogeXVitals/> */}
        {/* <PondRockets/> */}
    </>
  );
}
