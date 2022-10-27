
import {
  Flex,
} from '@chakra-ui/react';

import PropTypes from "prop-types";
import React from "react";
import { useAtom } from 'jotai';
import WalletMenu from '../wallet/WalletMenu.js';
import { useDeviceMode } from '../../theme/foundations/breakpoints.js';
import { BtnBrandIcon } from '../bits/UtilityTags.js';
import HistoryWidget from '../wallet/HistoryWidget.js';
import { appNavDrawerOpenAtom } from '../../services/atoms.js';
import { NavLink } from 'react-router-dom';
import { CISVG_FrogeNavBack } from '../../assets/FrogeBrand.js';

export default function AppNavControls(props) {
  const [isMobile, isDesktop] = useDeviceMode()
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;
  const [get_appNavDrawerOpen, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)

  return (
    <Flex id='FCB-AppNavbarLinks'
      pe={{ sm: "0px", md: "16px" }} w={{ sm: "100%", md: "auto" }}
      alignItems="center" flexDirection="row" gap={isMobile?'1.2rem':'.8rem'}
    >

      <HistoryWidget/>

      <WalletMenu/>

      {isMobile && (
        <BtnBrandIcon h='2.2rem' type='burger'
          onClick={() => set_appNavDrawerOpen(!get_appNavDrawerOpen)}
        />
      )}

    </Flex>
  );
}

AppNavControls.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
