import "@fontsource/raleway/300.css"
import "@fontsource/raleway/500.css"
import "@fontsource/raleway/700.css"
import "@fontsource/raleway/900.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/900.css"


export const fontsTheme = {
  fonts: {
    body: 'Montserrat, Helvetica, sans-serif',
    rale: 'Raleway, Helvetica, sans-serif',
    mont: 'Montserrat, Helvetica, sans-serif',
    mono: "Menlo, monospace",
  },
  fontWeights: {
    rale: { light: 300, medium: 500, bold: 700, heavy: 900, },
    mont: { light: 300, medium: 500, bold: 700, heavy: 900, },
  },
}

function buildFontTree( famStr, weightsObj, sizesObj, rv = {} ){
  for(let [wKey,wVal] of Object.entries(weightsObj)){rv[wKey] = {};
    for(let [sKey,sVal] of Object.entries(sizesObj)){rv[wKey][sKey] = {
        fontFamily: famStr, fontWeight:wVal, fontSize:sVal }}}
  return rv
}
const montFam = 'mont'
const raleFam = 'mont'
const montWeights = {
  lt:300,
  md:500,
  bd:700,
  hv:900,
};
const montSizes = {
  xs:'.6rem',
  sm:'.8rem',
  md:'.9rem',
  lg:'1.2rem',
  xl:'1.5rem',
}
export const mont = buildFontTree(montFam,montWeights,montSizes)
export const rale = buildFontTree(raleFam,montWeights,montSizes)
