import {turnToString} from '@/utils/algo'
import React from 'react'

interface AlgorithmProps {
  algo: Algo.RubicsAlgorithm
}

const Algorithm = ({algo}: AlgorithmProps) => {
  return (
    <span className="flex flex-wrap gap-1">
      {algo.turns.map((turn, index) => {
        const isGroup = 'turns' in turn
        return <span key={index} className={isGroup ? "flex gap-1" : ""}>
          {isGroup
          ? <>
            <span>(</span>
            {turn.turns.map((t, i) => <span key={i}>{turnToString(t)}</span>)}
            <span>)</span>
          </>
          : <span>{turnToString(turn)}</span>}
        </span>
      })}
    </span>
  )
}


export interface SelectedTurn {
  type: 'turn',
  turn: Algo.Turn,
  index: number,
  group?: [Algo.TurnGroup, number]
}
export interface SelectedGroup {
  type: 'group',
  group: Algo.TurnGroup,
  index: number,
  side: 'left' | 'right'
}
export interface SelectedNew {
  type: 'new',
  index: number
}
export interface SelectedInsert {
  type: 'insert',
  index: number,
  group: number
}
export type Selected = SelectedTurn | SelectedGroup | SelectedNew | SelectedInsert;

export const isTurn = (selected: Selected): selected is SelectedTurn => selected.type === 'turn'
export const isGroup = (selected: Selected): selected is SelectedGroup => selected.type === 'group'
export const isNew = (selected: Selected): selected is SelectedNew => selected.type === 'new'
export const isInsert = (selected: Selected): selected is SelectedInsert => selected.type === 'insert'

const equalsTurn = (selected: Selected, turn: Algo.Turn, group?: SelectedTurn['group']): selected is SelectedTurn => {
  if (!isTurn(selected))
      return false
  if (!group)
      return selected.turn === turn
  if (!selected.group)
      return false
  return selected.turn === turn && selected.group[0] === group[0] && selected.group[1] === group[1]
}
const equalsGroup = (selected: Selected, group: Algo.TurnGroup): selected is SelectedGroup => isGroup(selected) && selected.group === group
const equalsNew = (selected: Selected, index: number): selected is SelectedNew => isNew(selected) && selected.index === index
const equalsInsert = (selected: Selected, index: number, group = -1): selected is SelectedInsert => {
  return isInsert(selected)
      && selected.index === index
      && selected.group === group
}


const sharedCls = 'w-8 h-8 font-bold px-2 min-w-min rounded outline-none flex items-center justify-center overflow-hidden relative before:absolute before:inset-0 hover:before:bg-white/10 focus:before:bg-white/20'
const classNames = (selected: boolean, outline = false) => {
  let cls = 'w-8 h-8 font-bold px-2 min-w-min rounded outline-none flex items-center justify-center overflow-hidden relative before:absolute before:inset-0 hover:before:bg-white/10 focus:before:bg-white/20'
  if (selected)
    cls += ' bg-primary shadow-md'
  if (outline && !selected)
    cls += ' border border-white/30'
  return cls
}

interface EditableAlgorithmProps {
  algo: Algo.RubicsAlgorithm,
  selected: Selected,
  onSelect: (selected: Selected) => void
}

const EditableAlgorithm = ({algo, selected, onSelect}: EditableAlgorithmProps) => {
  const selectNew = (index: number) => () => {
    onSelect({
      type: 'new',
      index
    })
  }
  const selectTurn = (turn: Algo.Turn, index: number, group?: SelectedTurn['group']) => () => {
    onSelect({
      type: 'turn',
      turn,
      index,
      group
    })
  }
  const selectGroup = (group: Algo.TurnGroup, index: number, side: SelectedGroup['side']) => () => {
    onSelect({
      type: 'group',
      group,
      index,
      side
    })
  }

  const newIsSelected = equalsNew(selected, -1)

  return <span className="flex flex-wrap gap-1">
    {algo.turns.map((turn, index) => {
      const insertButton = equalsInsert(selected, index) && <button className={classNames(true)} onClick={selectNew(-1)}>
          <span className="caret">|</span>
        </button>

      if ('turns' in turn) {
        const newIsSelected = equalsNew(selected, index)

        return <React.Fragment key={index}>
          {insertButton}
          <span className="flex gap-1">
            <button className={classNames(equalsGroup(selected, turn) && selected.side === 'left')} onClick={selectGroup(turn, index, 'left')}>&#40;</button>
            {turn.turns.map((t, i) => {
              return <React.Fragment key={i}>
                {equalsInsert(selected, i, index) && <button className={classNames(true)} onClick={selectNew(-1)}>
                    <span className="caret">|</span>
                  </button>}
                <button className={classNames(equalsTurn(selected, t, [turn, index]))} onClick={selectTurn(t, i, [turn, index])}>
                  {turnToString(t)}
                </button>
              </React.Fragment>
            })}
            <button className={classNames(newIsSelected, true)} onClick={selectNew(index)}>
              {newIsSelected && <span className="caret">|</span>}
            </button>
            <button className={classNames(equalsGroup(selected, turn) && selected.side === 'right')} onClick={selectGroup(turn, index, 'right')}>)</button>
          </span>
        </React.Fragment>
      }

      return <button key={index} className={classNames(equalsTurn(selected, turn))} onClick={selectTurn(turn, index)}>
        {turnToString(turn)}
      </button>
    })}
    <button className={classNames(newIsSelected, true)} onClick={selectNew(-1)}>
      {newIsSelected && <span className="caret">|</span>}
    </button>
  </span>
}
Algorithm.Editable = EditableAlgorithm

export default Algorithm