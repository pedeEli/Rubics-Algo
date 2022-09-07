import {useRef, useEffect, useState} from 'react'
import Algorithm, {type Selected, type SelectedTurn, type SelectedGroup, isTurn} from '@/components/Algorithm'
import Keyboard from './Keyboard'

interface EditorProps {
  show: boolean
}


const useAlgo = (initial: Algo.RubicsAlgorithm) => {
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
        }
      }
    }
  }
}


const Editor = ({show}: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (show && !render)
      return setRender(true)
    if (!render)
      return
    const editor = ref.current!
    editor.style.height = '0px'
  }, [show])

  useEffect(() => {
    if (!render)
      return
    const editor = ref.current!
    editor.style.height = 'auto'
    const {height} = editor.getBoundingClientRect()
    editor.style.height = '0px'
    editor.getBoundingClientRect()
    editor.style.height = `${height}px`
  }, [render])

  const handleTransitionEnd = () => {
    if (show)
      return
    setRender(false)
  }

  const algo = useAlgo({turns: []})
  const [selected, setSelected] = useState<Selected>({type: 'new', index: -1})
  const [deselected, setDeselected] = useState(false)

  const side = isTurn(selected) ? selected.turn.side : ''
  const prime = isTurn(selected) && selected.turn.prime
  const double = isTurn(selected) && selected.turn.double

  const handleLetter = (letter: Algo.SingleFingerSide | Algo.FullHandSide) => {
    const {type, index} = selected
    if (type === 'group')
      return
    if (type === 'turn') {
      if (selected.group) {
        algo.group(selected.group[1]).set(index, {side: letter})
        return
      }
      algo.set(index, {side: letter})
      return
    }
    const newTurn: Algo.Turn = {
      side: letter,
      prime: false,
      double: false
    }
    if (type === 'insert') {
      if (selected.group === -1) {
        setSelected({
          type: 'turn',
          turn: newTurn,
          index
        })
        algo.insert(index, newTurn)
        return
      }
      const group = algo.group(selected.group).insert(index, newTurn)
      setSelected({
        type: 'turn',
        turn: newTurn,
        index,
        group: [group, selected.group]
      })
      return
    }
    if (index === -1) {
      const turnIndex = algo.append(newTurn)
      setSelected({
        type: 'turn',
        turn: newTurn,
        index: turnIndex
      })
      return
    }
    const [group, groupIndex] = algo.group(index).append(newTurn)
    setSelected({
      type: 'turn',
      turn: newTurn,
      index: groupIndex,
      group: [group, index]
    })
  }
  const handlePrimeDouble = (key: 'prime' | 'double') => () => {
    const {type, index} = selected
    if (type !== 'turn')
      return
    const {turn} = selected
    if (selected.group)
      return algo.group(selected.group[1]).set(index, {[key]: !turn[key]})
    return algo.set(index, {[key]: !turn[key]})
  }

  const selectNew = (index: number) => {
    setSelected({
      type: 'new',
      index
    })
  }
  const selectTurn = (turn: Algo.Turn, index: number, group?: SelectedTurn['group']) => {
    setSelected({
      type: 'turn',
      turn,
      index,
      group
    })
  }
  const selectGroup = (group: Algo.TurnGroup, index: number, side: SelectedGroup['side']) => {
    setSelected({
      type: 'group',
      group,
      index,
      side
    })
  }
  const selectInsert = (index: number, group = -1) => {
    setSelected({
      type: 'insert',
      index,
      group
    })
  }
  const selectPrevious = () => {
    const {index, type} = selected
    if (type === 'new') {
      if (index === -1) {
        const length = algo.length()
        if (length === 0)
          return
        const previous = algo.last()
        if ('turns' in previous)
          return selectGroup(previous, length - 1, 'right')
        return selectTurn(previous, length - 1)
      }
      const group = algo.group(index)
      const groupLength = group.length()
      if (groupLength === 0)
          return selectGroup(group.ref, index, 'left')
      return selectTurn(group.last(), groupLength - 1, [group.ref, index])
    }
    if (type === 'insert') {
      if (selected.group === -1) {
        if (index === 0)
          return
        const previous = algo.get(index - 1)
        if ('turns' in previous)
          return selectGroup(previous, index - 1, 'right')
        return selectTurn(previous, index - 1)
      }
      const group = algo.group(selected.group)
      if (index === 0)
        return selectGroup(group.ref, selected.group, 'left')
      return selectTurn(group.get(index - 1), index - 1, [group.ref, selected.group])
    }
    if (type === 'group') {
      if (selected.side === 'right')
        return selectNew(index)
      if (index === 0)
        return
      const previous = algo.get(index - 1)
      if ('turns' in previous)
        return selectGroup(previous, index - 1, 'right')
      return selectTurn(previous, index - 1)
    }
    if (selected.group) {
      const {group} = selected
      if (index === 0)
        return selectGroup(group[0], group[1], 'left')
      const groupTurns = group[0].turns
      return selectTurn(groupTurns[index - 1]!, index - 1, group)
    }
    if (index === 0)
      return
    const previous = algo.get(index - 1)
    if ('turns' in previous)
      return selectGroup(previous, index - 1, 'right')
    return selectTurn(previous, index - 1)
  }
  const selectNext = () => {
    const {index, type} = selected
    if (type === 'new') {
      if (index === -1)
        return
      return selectGroup(algo.group(index).ref, index, 'right')
    }
    if (type === 'insert') {
      if (selected.group === -1) {
        const next = algo.get(index)
        if ('turns' in next)
          return selectGroup(next, index, 'left')
        return selectTurn(next, index)
      }
      const group = algo.group(selected.group)
      return selectTurn(group.get(index), index, [group.ref, selected.group])
    }
    if (type === 'group') {
      const {group} = selected
      if (selected.side === 'left') {
        if (group.turns.length === 0)
          return selectNew(index)
        return selectTurn(group.turns[0]!, 0, [group, index])
      }
      if (index === algo.length() - 1)
        return selectNew(-1)
      const next = algo.get(index + 1)
      if ('turns' in next)
        return selectGroup(next, index + 1, 'left')
      return selectTurn(next, index + 1)
    }
    if (selected.group) {
      const {group} = selected
      const groupTurns = group[0].turns
      if (index === groupTurns.length - 1)
        return selectNew(group[1])
      return selectTurn(groupTurns[index + 1]!, index + 1, group)
    }
    if (index === algo.length() - 1)
      return selectNew(-1)
    const next = algo.get(index + 1)
    if ('turns' in next)
      return selectGroup(next, index + 1, 'left')
    return selectTurn(next, index + 1)
  }
  const addGroup = () => {
    const {type, index} = selected
    if (type === 'insert' && selected.group === -1) {
      algo.insert(index, {turns: []})
      return selectNew(index)
    }
    if (type !== 'new' || index !== -1)
      return
    const i = algo.append({turns: []})
    return selectNew(i)
  }
  const deleteSelected = () => {
    const {type, index} = selected
    if (type === 'new' || type === 'insert')
      return
    if (type === 'group') {
      const turns = algo.group(index).delete()
      if (selected.side === 'left') {
        if (turns.length === 0 || index === turns.length)
          return selectNew(-1)
        const next = turns[index]!
        if ('turns' in next)
          return selectGroup(next, index, 'left')
        return selectTurn(next, index)
      }
      const newIndex = index + selected.group.turns.length
      if (turns.length === 0 || newIndex === turns.length)
        return selectNew(-1)
      const next = turns[newIndex]!
      if ('turns' in next)
        return selectGroup(next, newIndex, 'left')
      return selectTurn(next, newIndex)
    }
    if (selected.group) {
      const groupIndex = selected.group[1]
      const group = algo.group(groupIndex)
      const turns = group.remove(index)
      if (turns.length === 0 || index === turns.length)
        return selectNew(groupIndex)
      return selectTurn(turns[index]!, index, [group.ref, groupIndex])
    }
    const turns = algo.remove(index)
    if (turns.length === 0 || index === turns.length)
      return selectNew(-1)
    const next = turns[index]!
    if ('turns' in next)
      return selectGroup(next, index, 'left')
    return selectTurn(next, index)
  }
  const insertLeft = () => {
    const {type, index} = selected
    if (type === 'new' || type === 'insert')
      return
    if (type === 'group') {
      if (selected.side === 'right')
        return
      return selectInsert(index)
    }
    if (selected.group)
      return selectInsert(index, selected.group[1])
    return selectInsert(index)
  }
  const insertRight = () => {
    const {type, index} = selected
    if (type === 'new' || type === 'insert')
      return
    if (type === 'group') {
      if (selected.side === 'left')
        return selectInsert(0, index)
      if (index === algo.length() - 1)
        return
      return selectInsert(index + 1)
    }
    if (selected.group) {
      const {group} = selected
      if (index === group[0].turns.length - 1)
        return
      return selectInsert(index + 1, group[1])
    }
    if (index === algo.length() - 1)
      return
    return selectInsert(index + 1)
  }

  const getDisableLetters = () => {
    return selected.type === 'group'
  }
  const getDisablePrimeDouble = () => {
    const {type} = selected
    return type !== 'turn'
  }
  const disableLetters = getDisableLetters()
  const disablePrimeDouble = getDisablePrimeDouble()
  
  const getDisableNext = () => {
    const {type, index} = selected
    return type === 'new' && index === -1
  }
  const getDisablePrevious = () => {
    const {type, index} = selected
    if (type === 'turn' && index === 0 && !selected.group)
      return true
    if (type === 'group' && index === 0 && selected.side === 'left')
      return true
    if (type === 'insert' && index === 0 && selected.group === -1)
      return true
    return false
  }
  const getDisableGroup = () => {
    const {type, index} = selected
    if (type === 'new' && index === -1)
      return false
    if (type === 'insert' && selected.group === -1)
      return false
    return true
  }
  const getDisableDelete = () => {
    const {type} = selected
    return type === 'new' || type === 'insert'
  }
  const getDisableInsertLeft = () => {
    const {type} = selected
    if (type === 'new' || type === 'insert')
      return true
    if (type === 'group' && selected.side === 'right')
      return true
    return false
  }
  const getDisableInsertRight = () => {
    const {type, index} = selected
    if (type === 'new' || type === 'insert')
      return true
    if (type === 'group')
      return selected.side === 'right' && index === algo.length() - 1
    if (selected.group)
      return index === selected.group[0].turns.length - 1
    return index === algo.length() - 1
  }
  const disableNext = getDisableNext()
  const disablePrevious = getDisablePrevious()
  const disableGroup = getDisableGroup()
  const disableDelete = getDisableDelete()
  const disableInsertLeft = getDisableInsertLeft()
  const disableInsertRight = getDisableInsertRight()

  const deselect = () => {
    setDeselected(true)
  }
  useEffect(() => {
    if (!window)
      return
    window.addEventListener('click', deselect)
    return () => window.removeEventListener('click', deselect)
  }, [])

  return <>
    {render &&
      <div ref={ref} onTransitionEnd={handleTransitionEnd} className="transition-[height_300ms] h-0 overflow-hidden">
        <Algorithm.Editable algo={algo.ref} selected={deselected ? undefined : selected} onSelect={(s, e) => {
          e.stopPropagation()
          setSelected(s)
          setDeselected(false)
        }}/>
        <div className="p-2"/>
      </div>}
    <Keyboard
      show={!deselected && show}

      side={side}
      double={double}
      prime={prime}

      onLetter={handleLetter}
      onPrime={handlePrimeDouble('prime')}
      onDouble={handlePrimeDouble('double')}

      onPrevious={selectPrevious}
      onNext={selectNext}
      onDelete={deleteSelected}
      onGroup={addGroup}
      onInsertLeft={insertLeft}
      onInsertRight={insertRight}

      disableLetters={disableLetters}
      disablePrimeDouble={disablePrimeDouble}
      
      disableNext={disableNext}
      disablePrevious={disablePrevious}
      disableGroup={disableGroup}
      disableDelete={disableDelete}
      disableInsertLeft={disableInsertLeft}
      disableInsertRight={disableInsertRight}
    />
  </>
}

export default Editor