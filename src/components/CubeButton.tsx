import {ReactNode} from 'react'
import Link from 'next/link'

interface CubeButtonProps {
    href: string,
    text: string,
    children: ReactNode
}

const CubeButton = ({children, href, text}: CubeButtonProps) => {
  return (
    <Link href={href}>
      <div className="w-full h-full cube-bg select-none cursor-pointer relative hover-highlight">
        <div className="w-full aspect-square grid">
          <div className="col-start-1 row-start-1 w-full h-full">
            {children}
          </div>
          <div className="col-start-1 row-start-1 w-full h-full grid place-items-center font-bold text-[2rem] text-shadow">
            {text}
          </div>
        </div>
      </div>
    </Link>
  )
}

const center = 'bg-gray-500 dark:bg-gray-400'
const cubeYellow = 'bg-yellow-400'

const ollClassName = (isPiece: boolean, isCenter = false) => {
  return isPiece
    ? cubeYellow
    : isCenter
    ? center
    : ''
}

const OLLCube = ({
  topLeft = 0,
  top = 0,
  topRight = 0,
  right = 0,
  bottomRight = 0,
  bottom = 0,
  bottomLeft = 0,
  left = 0
}: Cube.OLLCubeProps) => {
  return (
    <div className="w-full h-full grid gap-cube grid-cols-cube grid-rows-cube">
      <div></div>
      <div className={ollClassName(topLeft === 2)}></div>
      <div className={ollClassName(top === 1)}></div>
      <div className={ollClassName(topRight === 1)}></div>
      <div></div>
      <div className={ollClassName(topLeft === 1)}></div>
      <div className={ollClassName(topLeft === 0, true)}></div>
      <div className={ollClassName(top === 0, true)}></div>
      <div className={ollClassName(topRight === 0, true)}></div>
      <div className={ollClassName(topRight === 2)}></div>
      <div className={ollClassName(left === 1)}></div>
      <div className={ollClassName(left === 0, true)}></div>
      <div className={cubeYellow}></div>
      <div className={ollClassName(right === 0, true)}></div>
      <div className={ollClassName(right === 1)}></div>
      <div className={ollClassName(bottomLeft === 2)}></div>
      <div className={ollClassName(bottomLeft === 0, true)}></div>
      <div className={ollClassName(bottom === 0, true)}></div>
      <div className={ollClassName(bottomRight === 0, true)}></div>
      <div className={ollClassName(bottomRight === 1)}></div>
      <div></div>
      <div className={ollClassName(bottomLeft === 1)}></div>
      <div className={ollClassName(bottom === 1)}></div>
      <div className={ollClassName(bottomRight === 2)}></div>
    </div>
  )
}
CubeButton.OLLCube = OLLCube


const Arrow = ({x1, x2, y1, y2}: Cube.ArrowProps) => {
  const angle = Math.atan2(y1 - y2, x1 - x2)
  const deltaAngle = Math.PI / 180 * 45
  const headSize = .2

  const hx1 = headSize * Math.cos(angle + deltaAngle) + x2
  const hy1 = headSize * Math.sin(angle + deltaAngle) + y2

  const hx2 = headSize * Math.cos(angle - deltaAngle) + x2
  const hy2 = headSize * Math.sin(angle - deltaAngle) + y2

  const displacement = 10
  const posx1 = (a: number) => -50 + 100 * a + displacement * (x2 - x1)
  const posy1 = (a: number) => -50 + 100 * a + displacement * (y2 - y1)
  const posx2 = (a: number) => -50 + 100 * a + displacement * (x1 - x2)
  const posy2 = (a: number) => -50 + 100 * a + displacement * (y1 - y2)

  const svgClass = "w-full h-full fill-transparent stroke-gray-800 col-start-2 col-end-5 row-start-2 row-end-5"

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300" className={svgClass}>
      <path
        d={`M${posx1(x1)} ${posy1(y1)} L${posx2(x2)} ${posy2(y2)} L${posx2(hx1)} ${posy2(hy1)} M${posx2(x2)} ${posy2(y2)} L${posx2(hx2)} ${posy2(hy2)}`}
        strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}


const pllClassName = (color: Cube.PLLColor) => {
  if (color === 0)
    return 'bg-orange-500'
  if (color === 1)
    return 'bg-green-500'
  if (color === 2)
    return 'bg-red-500'
  return 'bg-blue-500'
}

const PLLCube = ({
  arrows = [],
  top0 = 0,
  top1 = 0,
  top2 = 0,
  right0 = 1,
  right1 = 1,
  right2 = 1,
  bottom0 = 2,
  bottom1 = 2,
  bottom2 = 2,
  left0 = 3,
  left1 = 3,
  left2 = 3
}: Cube.PLLCubeProps) => {
  return (
    <div className="w-full h-full grid grid-cols-[100%] grid-rows-[100%]">
      <div className="grid grid-cols-cube grid-rows-cube aspect-square col-start-1 row-start-1 gap-cube">
        <div></div>
        <div className={pllClassName(top0)}></div>
        <div className={pllClassName(top1)}></div>
        <div className={pllClassName(top2)}></div>
        <div></div>
        <div className={pllClassName(left2)}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={pllClassName(right0)}></div>
        <div className={pllClassName(left1)}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={pllClassName(right1)}></div>
        <div className={pllClassName(left0)}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={cubeYellow}></div>
        <div className={pllClassName(right2)}></div>
        <div></div>
        <div className={pllClassName(bottom2)}></div>
        <div className={pllClassName(bottom1)}></div>
        <div className={pllClassName(bottom0)}></div>
      </div>
      <div className="grid grid-cols-cube grid-rows-cube aspect-square col-start-1 row-start-1 gap-cube">
        {arrows.map((arrow, index) => <Arrow key={index} {...arrow}/>)}
      </div>
    </div>
  )
}
CubeButton.PLLCube = PLLCube

export default CubeButton
