export const bgImg = (img)=>({ background:`50% 50%/cover no-repeat url(${img})` })

export const pxNumToRem = (v)=>{
  if(['vw','vh','em','%','px'].indexOf(v)>-1){return v}return (parseInt(v) * .0625) + 'rem'}
export const numToPxStr = (v)=>{
  if(/\D/.test(v)){return v}return (v + 'px')}
export const abs=(top,right,bottom,left,rv={position:"absolute"})=>{
  if(top||top===0){rv.top=numToPxStr(top)}if(right||right===0){rv.right=numToPxStr(right)}
  if(bottom||bottom===0){rv.bottom=numToPxStr(bottom)}if(left||left===0){rv.left=numToPxStr(left)}return rv;
}
