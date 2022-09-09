declare namespace Cube {
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

  type OLLName =
    'OLL 1'  | 'OLL 2'  | 'OLL 3'  | 'OLL 4'  | 'OLL 5'  | 'OLL 6'  | 'OLL 7'  | 'OLL 8'  | 'OLL 9'  | 'OLL 10' |
    'OLL 11' | 'OLL 12' | 'OLL 13' | 'OLL 14' | 'OLL 15' | 'OLL 16' | 'OLL 17' | 'OLL 18' | 'OLL 19' | 'OLL 20' |
    'OLL 21' | 'OLL 22' | 'OLL 23' | 'OLL 24' | 'OLL 25' | 'OLL 26' | 'OLL 27' | 'OLL 28' | 'OLL 29' | 'OLL 30' |
    'OLL 31' | 'OLL 32' | 'OLL 33' | 'OLL 34' | 'OLL 35' | 'OLL 36' | 'OLL 37' | 'OLL 38' | 'OLL 39' | 'OLL 40' |
    'OLL 41' | 'OLL 42' | 'OLL 43' | 'OLL 44' | 'OLL 45' | 'OLL 46' | 'OLL 47' | 'OLL 48' | 'OLL 49' | 'OLL 50' |
    'OLL 51' | 'OLL 52' | 'OLL 53' | 'OLL 54' | 'OLL 55' | 'OLL 56' | 'OLL 57'

  type PLLSection =
    'Edges Only' |
    'Corners Only' |
    'Adjacent Corner Swap' |
    'Diagonal Corner Swap' |
    'G Permutations'
  
  type PLLName =
    'Ua' | 'Ub' | 'H' | 'Z' | 'Aa' | 'Ab' | 'E'  | 'T'  | 'F'  | 'Ja' | 'Jb' |
    'Ra' | 'Rb' | 'Y' | 'V' | 'Na' | 'Nb' | 'Ga' | 'Gb' | 'Gc' | 'Gd'
}