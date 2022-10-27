import { mode } from "@chakra-ui/theme-tools";
import { fontsTheme } from './foundations/fonts.js';
import { colorWheels } from './foundations/colorWheels.js';
//https://paletton.com/
//https://themera.vercel.app/
//http://colormind.io/bootstrap/
//https://gka.github.io/palettes/
export const globalStyles = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  colors: {
    ...colorWheels,
    brand: {
      outline: "#212e3e",
      dkgreen: "#7ba735",
      green: "#90c63e",
      ltgreen: "#9ed648",
    },
    global: {
      bg: "#111623",
      panel: "#192030",
      bubble: "#1f2738",
    },
    bog50: "#E5ECFF",
    bog100: "#D8E3FE",
    bog150: "#CCDAFD",
    bog200: "#B8C9F9",
    bog250: "#B8C9F9",
    bog300: "#778DC5",
    bog350: "#6374A0",
    bog400: "#596992",
    bog450: "#4C5B83",
    bog500: "#3D4A6D",
    bog550: "#374361",
    bog600: "#303950",
    bog650: "#283146",
    bog700: "#232B3F",
    bog750: "#1E2537",
    bog800: "#192030",
    bog850: "#151B29",
    bog900: "#111623",
  },
  radii: {
    panelsRadius: '12px',
  },
  ...fontsTheme,
  styles: {
    global: (props) => ({
      ':focus:not(:focus-visible):not([role="dialog"]):not([role="menu"])': {
        boxShadow: 'none !important'
      },
      body: {
        fontFamily: 'Montserrat , Helvetica, sans-serif',
        fontWeight: 400,
        //...bgPattern,
        bg: "global.bg",
      },
      heading: 'Montserrat , Helvetica, sans-serif',
      html: {
        fontFamily: 'Montserrat , Helvetica, sans-serif',
        fontWeight: 400,
      }
    }),
  },
};

const bgPattern = {
  ':before': {
    content: '" "',
    display: 'block',
    position: 'absolute',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    opacity: '0.06',
    backgroundImage: import('../assets/pattern-svgs/pattern5.svg'),
    backgroundRepeat: 'repeat',
    backgroundPosition: '50%, 50%',
    backgroundSize: '25%',
    pointerEvents: 'none',
  }
}
