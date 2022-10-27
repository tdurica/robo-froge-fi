// 1. Import the utilities
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { useMediaQuery } from '@chakra-ui/react';
// 2. Update the breakpoints as key-value pairs
export const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});

export const deviceModes = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
});
export function useDeviceMode() {
  const [isMobile, isDesktop] = useMediaQuery(['(max-width: 767px)', '(min-width: 768px)',])
  return [isMobile, isDesktop]
}
