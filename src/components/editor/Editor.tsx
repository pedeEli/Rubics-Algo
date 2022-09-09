import {useRef, useEffect, useState} from 'react'
import {useAlgo} from '@/utils/algo'
import Algorithm, {type Selected, type SelectedTurn, type SelectedGroup, isTurn} from '@/components/Algorithm'
import Keyboard from './Keyboard'
import Tabs from '@/components/layout/Tabs'
import Info from './Info'
import Button from '@/components/button/Button'
import {trpc} from '@/utils/trpc'

interface EditorProps<Type extends 'oll' | 'pll'> {
  show: boolean,
  type: Type,
  name: Type extends 'oll' ? Cube.OLLName : Cube.PLLName,
  section: Type extends 'oll' ? Cube.OLLSection : Cube.PLLSection,
  onSave: (algo: Algo.RubicsAlgorithm) => void
}

const Editor = <Props extends EditorProps<'oll'> | EditorProps<'pll'>>(props: Props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)

  const observer = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const {height} = entry.contentRect
      editorRef.current!.style.height = `${height}px`
    })
  })

  useEffect(() => {
    if (props.show && !render)
      return setRender(true)
    if (!render)
      return
    const editor = editorRef.current!
    editor.style.height = '0px'
  }, [props.show])

  useEffect(() => {
    if (!render)
      return
    const editor = editorRef.current!
    editor.style.height = 'auto'
    const {height} = editor.getBoundingClientRect()
    editor.style.height = '0px'
    editor.getBoundingClientRect()
    editor.style.height = `${height}px`

    const content = contentRef.current!
    observer.observe(content)
    return () => observer.unobserve(content)
  }, [render])

  const handleTransitionEnd = () => {
    if (props.show)
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
      delete selected.turn.info
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
    if (key === 'double')
      delete selected.turn.info
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

  const [infoSelected, setInfoSelected] = useState<Selected>()

  const mutation = trpc.useMutation('algorithms.add')
  const handleSave = async () => {
    try {
      if (props.type === 'oll')
        await mutation.mutateAsync({type: 'oll', section: props.section, name: props.name, algo: algo.ref})
      else
        await mutation.mutateAsync({type: 'pll', section: props.section, name: props.name, algo: algo.ref})
      props.onSave(algo.ref)
      algo.reset()
    } catch (e) {}
  }

  return <>
    {render &&
      <div ref={editorRef} onTransitionEnd={handleTransitionEnd} className="transition-[height] duration-[300ms] h-0 overflow-hidden">
        <div ref={contentRef} onTransitionEnd={e => e.stopPropagation()}>
          <Tabs selected={0}>
            <Tabs.Header>
              <Tabs.Tab name="Algorithm" id={0}/>
              <Tabs.Tab name="Info" id={1}/>
              <Tabs.Tab name="Finish" id={2}/>
            </Tabs.Header>
            <Tabs.Content>
              <Tabs.Panel id={0}>
                <Algorithm.Editable algo={algo.ref} selected={deselected ? undefined : selected} onSelect={(s, e) => {
                  e.stopPropagation()
                  setSelected(s)
                  setDeselected(false)
                }}/>
              </Tabs.Panel>
              <Tabs.Panel id={1}>
                <Info algo={algo} selected={infoSelected} onSelect={setInfoSelected}/>
              </Tabs.Panel>
              <Tabs.Panel id={2}>
                <div className="h-36 grid place-items-center">
                  <Button variant="raised" onClick={handleSave}>Save</Button>
                </div>
              </Tabs.Panel>
            </Tabs.Content>
          </Tabs>
          <div className="p-2"/>
        </div>
      </div>}
    <Keyboard
      show={!deselected && props.show}

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