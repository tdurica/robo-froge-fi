const mockTestInput = `py={{ base: {yjyfj:{size:800}} }} bg={'bog.700'
} minH={'60px'}  px={{ base: 4
 }
 }
      borderBottom= '1' borderStyle={'solid'}
      borderColor={'bog.900'} justify='space-between' alignItems={{'center'}}`
const rgxPickCssProps = /\w+\s*?=((.|\n)*?)(?=\s\w+=|$)/g;
const rgxPickSides = /(\w+)\s*?=\s*?(['"{].+)/;
const rgxNoNest = /(\w+).+?(['"{].+)/;

const match = mockTestInput.match(rgxPickCssProps)

const out = match.map((v,i,a)=>{
  const noNL = v.replace(/\n/g,'')
  const [,LS,RS] = noNL.match(rgxPickSides)
  const noNest = RS.replace(/\\n/,'').trim()
  .replace(/^{/,'').replace(/}$/,'').trim()
  return `${LS}: ${noNest},`
}).join(' ')
debugger
