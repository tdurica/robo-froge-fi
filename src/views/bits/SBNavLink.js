import { Button, useStyleConfig } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { sxGlassBg2 } from './UtilityTags.js';
import React from 'react';
import { useAtom } from 'jotai';
import { appNavDrawerOpenAtom } from '../../services/atoms.js';

const SBNavLinkStyleConfig = {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: '100%',
    height: '30px',
    color:'global.bg',
    p: "4px",
    bgColor:'brand.green',
    borderRadius:'25px',
    _hover:{ opacity: ".8" },
    minWidth: "0px",
    wordWrap: "break-word",
    overflow:'hidden',
  },
  variants: {
    drawer: {
      bg: "gray.800",
      width: "100%",
      boxShadow: "0px 3.5px 5.5px rgba(0, 0, 0, 0.02)",
      borderRadius: "15px",
    },
  },
  defaultProps: {
    variant: "panel",
  },
};

export function SBNavLink(props) {
  const { to, variant, children, ...rest } = props
  const styles = useStyleConfig('SBNavLink', { variant })
  const [, set_appNavDrawerOpen] = useAtom(appNavDrawerOpenAtom)
  return <Button as={NavLink} to={to} __css={styles} _hover={{ opacity: ".8" }}
                 onClick={()=>set_appNavDrawerOpen(false)}
                 >{children}</Button>
}
export const SBNavLinkComponent = {
  components: {
    SBNavLink: SBNavLinkStyleConfig,
  },
};


