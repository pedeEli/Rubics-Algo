declare module Cube {
  type CornerRotation = 0 | 1 | 2
  type EdgeRotation = 0 | 1
  
  interface OLLCubeProps {  
    topLeft?: CornerRotation,
    top?: EdgeRotation,
    topRight?: CornerRotation,
    right?: EdgeRotation
    bottomRight?: CornerRotation,
    bottom?: EdgeRotation,
    bottomLeft?: CornerRotation,
    left?: EdgeRotation,
  }
  
  type PLLColor = 0 | 1 | 2 | 3
  type ArrowPosition = 1 | 2 | 3
  
  interface ArrowProps {
    x1: ArrowPosition
    y1: ArrowPosition
    x2: ArrowPosition
    y2: ArrowPosition
  }

  interface PLLCubeProps {
    arrows?: ArrowProps[]
    top0?: PLLColor
    top1?: PLLColor
    top2?: PLLColor
    right0?: PLLColor
    right1?: PLLColor
    right2?: PLLColor
    bottom0?: PLLColor
    bottom1?: PLLColor
    bottom2?: PLLColor
    left0?: PLLColor
    left1?: PLLColor
    left2?: PLLColor
  }

  type OLLSection =
    'All Corners Oriented' |
    'All Edges Oriented' |
    'No Edges Oriented' |
    'P Shapes' |
    'W Shapes' |
    'T Shapes' |
    'Square Shapes' |
    'Fish Shapes' |
    'C Shapes' |
    'Small Lightning Bolts' |
    'Big Lightning Bolts' |
    'L Shapes' |
    'Knight Move Shapes' |
    'I Shapes' |
    'Awkward Shapes'

  type PLLSection =
    'Edges Only' |
    'Corners Only' |
    'Adjacent Corner Swap' |
    'Diagonal Corner Swap' |
    'G Permutations'
}
