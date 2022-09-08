import {useState} from 'react'

export const turnToString = (turn: Algo.Turn) => {
    let str = turn.side
    if (turn.double)
        str += '2'
    if (turn.prime)
        str += '\''
    return str
}

export const useAlgo = (initial: Algo.RubicsAlgorithm) => {
  const [algo, setAlgo] = useState(initial)

  return {
    ref: algo,
    insert: (index: number, turn: Algo.Turn | Algo.TurnGroup) => {
      setAlgo(a => {
        a.turns = [...a.turns.slice(0, index), turn, ...a.turns.slice(index)]
        return a
      })
    },
    append: (turn: Algo.Turn | Algo.TurnGroup) => {
      const {length} = algo.turns
      setAlgo(a => {
        a.turns = [...a.turns, turn]
        return a
      })
      return length
    },
    set: (index: number, data: Partial<Algo.Turn>) => {
      setAlgo(a => {
        const turn = a.turns[index] as Algo.Turn
        Object.assign(turn, data)
        return {...a}      
      })
    },
    length: () => algo.turns.length,
    last: () => algo.turns[algo.turns.length - 1]!,
    get: (index: number) => algo.turns[index]!,
    remove: (index: number) => {
      const turns = [...algo.turns.slice(0, index), ...algo.turns.slice(index + 1)]
      setAlgo(a => {
        a.turns = turns
        return a
      })
      return turns
    },
    group: (groupIndex: number) => {
      const ref = algo.turns[groupIndex] as Algo.TurnGroup
      return {
        insert: (index: number, turn: Algo.Turn) => {
          setAlgo(a => {
            ref.turns = [...ref.turns.slice(0, index), turn, ...ref.turns.slice(index)]
            return a
          })
          return ref
        },
        append: (turn: Algo.Turn) => {
          const {length} = ref.turns
          setAlgo(a => {
            ref.turns.push(turn)
            return a
          })
          return [ref, length] as const
        },
        set: (index: number, data: Partial<Algo.Turn>) => {
          setAlgo(a => {
            const turn = ref.turns[index]!
            Object.assign(turn, data)
            return {...a}
          })
        },
        ref,
        length: () => ref.turns.length,
        last: () => ref.turns[ref.turns.length - 1]!,
        get: (index: number) => ref.turns[index]!,
        delete: () => {
          const turns = [...algo.turns.slice(0, groupIndex), ...ref.turns,...algo.turns.slice(groupIndex + 1)]
          setAlgo(a => {
            a.turns = turns
            return a
          })
          return turns
        },
        remove: (index: number) => {
          const turns = [...ref.turns.slice(0, index), ...ref.turns.slice(index + 1)]
          setAlgo(a => {
            ref.turns = turns
            return a
          })
          return turns
        },
        setInfo: (info: string) => {
          setAlgo(a => {
            ref.info = info
            if (info === '')
              delete ref.info
            return a
          })
        }
      }
    }
  }
}

export type AlgoHook = ReturnType<typeof useAlgo>


const fullHandSide = /^R|r|L|l$/

export const isSingleFingerTurn = (turn: Algo.Turn): turn is Algo.SingleFingerTurn => {
  if (turn.double)
    return false
  return !fullHandSide.test(turn.side)
}

export const isFullHandTurn = (turn: Algo.Turn): turn is Algo.FullHandTurn => {
  return fullHandSide.test(turn.side)
}

export const isSingleFingerDoubleTurn = (turn: Algo.Turn): turn is Algo.SingleFingerDoubleTurn => {
  if (!turn.double)
    return false
  return !fullHandSide.test(turn.side)
}