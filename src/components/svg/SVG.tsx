interface SVGProps {       
  fill?: string,
  height?: string
}

const SVG = (d: string, viewBox = '0 0 48 48') => ({height = '100%', fill = 'currentColor'}: SVGProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} height={height}>
      <path fill={fill} d={d}/>
    </svg>
  )
}

export default SVG