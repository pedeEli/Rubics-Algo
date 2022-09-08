declare namespace Algo {
  interface RubicsAlgorithm {
    info?: string,
    turns: Array<Turn | TurnGroup>
  }

  interface TurnGroup {
    info?: string,
    turns: Array<Turn>
  }

  type FullHandSide = 'R' | 'r' | 'L' | 'l'
  type SingleFingerSide = 'U' | 'u' | 'D' | 'd' | 'F' | 'f' | 'B' | 'b' | 'x' | 'y' | 'z' | 'M' | 'E' | 'S'

  type Turn = FullHandTurn | SingleFingerTurn | SingleFingerDoubleTurn

  interface FullHandTurn {
    side: FullHandSide,
    prime: boolean,
    double: boolean,
    info?: FullHandTurnInfo
  }

  interface SingleFingerTurn {
    side: SingleFingerSide,
    prime: boolean,
    double: false,
    info?: SingleTurnInfo
  }

  interface SingleFingerDoubleTurn {
    side: SingleFingerSide,
    prime: boolean,
    double: true,
    info?: DoubleTurnInfo
  }

  type Finger = 'Thumb' | 'Index Finger' | 'Middle Finger' | 'Ring Finger' | 'Pinky Finger'
  type Hand = 'Left Hand' | 'Right Hand'
  type ThumbPosition = 'Front' | 'Top' | 'Back' | 'Bottom'

  interface FullHandTurnInfo {
    thumbPosition: ThumbPosition
  }

  interface SingleTurnInfo {
    finger: Finger,
    hand: Hand
  }

  interface DoubleTurnInfo {
    first: SingleTurnInfo,
    second: SingleTurnInfo
  }
}