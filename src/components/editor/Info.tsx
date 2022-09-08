import {useState, useEffect} from 'react'
import Textarea from '@/components/input/Textarea'
import Algorithm, {Selected} from '@/components/Algorithm'
import {AlgoHook} from '@/utils/algo'

import {isSingleFingerTurn, isFullHandTurn, isSingleFingerDoubleTurn} from '@/utils/algo'

interface InfoProps {
  algo: AlgoHook,
  selected: Selected | undefined,
  onSelect: (selected: Selected) => void
}

const fingerOptions: Array<{label: string, value: Algo.Finger}> = [
  {label: 'Thumb', value: 'Thumb'},
  {label: 'Index Finger', value: 'Index Finger'},
  {label: 'Middle Finger', value: 'Middle Finger'},
  {label: 'Pinky Finger', value: 'Pinky Finger'},
  {label: 'Ring Finger', value: 'Ring Finger'}
]
const fingerOptionsNoInfo: Array<{label: string, value: Algo.Finger | ''}> = [
  {label: 'No Info', value: ''},
  ...fingerOptions
]
const handOptions: Array<{label: Algo.Hand, value: Algo.Hand}> = [
  {label: 'Left Hand', value: 'Left Hand'},
  {label: 'Right Hand', value: 'Right Hand'}
]
const thumbOptions: Array<{label: string, value: Algo.ThumbPosition | ''}> = [
  {label: 'No Info', value: ''},
  {label: 'Front', value: 'Front'},
  {label: 'Top', value: 'Top'},
  {label: 'Bottom', value: 'Bottom'},
  {label: 'Back', value: 'Back'}
]

const Info = ({algo, selected, onSelect}: InfoProps) => {
  const [finger, setFinger] = useState<Algo.Finger | ''>('')
  const [hand, setHand] = useState<Algo.Hand>('Left Hand')
  const [thumb, setThumb] = useState<Algo.ThumbPosition | ''>('')
  const [secondFinger, setSecondFinger] = useState<Algo.Finger>('Thumb')
  const [secondHand, setSecondHand] = useState<Algo.Hand>('Left Hand')
  const [groupInfo, setGroupInfo] = useState('')
  
  const reset = () => {
    setFinger('')
    setHand('Left Hand')
    setThumb('')
    setSecondFinger('Thumb')
    setSecondHand('Left Hand')
    setGroupInfo('')
  }

  useEffect(() => {
    if (!selected)
      return reset()
    if (selected.type === 'group') {
      if (!selected.group.info)
        return reset()
      console.log(selected.group.info)
      setGroupInfo(selected.group.info)
      return
    }
    if (selected.type !== 'turn' || !selected.turn.info)
      return reset()
    if (isSingleFingerTurn(selected.turn)) {
      const {info} = selected.turn
      setFinger(info.finger)
      setHand(hand)
      return
    }
    if (isFullHandTurn(selected.turn)) {
      setThumb(selected.turn.info.thumbPosition)
      return
    }
    if (isSingleFingerDoubleTurn(selected.turn)) {
      const {info} = selected.turn
      setFinger(info.first.finger)
      setHand(info.first.hand)
      setSecondFinger(info.second.finger)
      setSecondHand(info.second.hand)
      return
    }
  }, [selected])

  const handleFingerSelect = (finger: Algo.Finger | '') => {
    setFinger(finger)

    if (selected?.type !== 'turn' || finger === '')
      return
   
    if (isSingleFingerDoubleTurn(selected.turn)) {
      algo.set(selected.index, {info: {first: {finger, hand}, second: {finger: secondFinger, hand: secondHand}}})
      return
    }
    algo.set(selected.index, {info: {finger, hand}})
  }
  const handleHandSelect = (hand: Algo.Hand) => {
    setHand(hand)

    if (selected?.type !== 'turn' || finger === '')
      return

    if (isSingleFingerDoubleTurn(selected.turn)) {
      algo.set(selected.index, {info: {first: {finger, hand}, second: {finger: secondFinger, hand: secondHand}}})
      return
    }
    algo.set(selected.index, {info: {finger, hand}})
  }
  const handleThumbSelect = (thumb: Algo.ThumbPosition | '') => {
    setThumb(thumb)

    if (selected?.type !== 'turn' || thumb === '')
      return
    
    algo.set(selected.index, {info: {thumbPosition: thumb}})
  }

  const handleSecondFingerSelect = (secondFinger: Algo.Finger) => {
    setSecondFinger(secondFinger)

    if (selected?.type !== 'turn' || finger === '')
      return

    algo.set(selected.index, {info: {first: {finger, hand}, second: {finger: secondFinger, hand: secondHand}}})
  }
  const handleSecondHandSelect = (secondHand: Algo.Hand) => {
    setSecondHand(secondHand)

    if (selected?.type !== 'turn' || finger === '')
      return

    algo.set(selected.index, {info: {first: {finger, hand}, second: {finger: secondFinger, hand: secondHand}}})
  }

  const handleGroupInfo = (groupInfo: string) => {
    setGroupInfo(groupInfo)

    if (selected?.type !== 'group')
      return
    
    algo.group(selected.index).setInfo(groupInfo)
  }

  return <div className="flex flex-col">
    <Textarea label="Info" name="info"/>
    <div className="py-2"/>
    <Algorithm.Selectable algo={algo.ref} onSelect={onSelect} selected={selected}/>
    {selected?.type === 'turn' && isSingleFingerTurn(selected.turn) && <>
      <div className="py-1"/>
      <div className="flex gap-2 flex-col">
        <div>Specify which finger and hand to use</div>
        <ButtonSelect options={fingerOptionsNoInfo} selected={finger} onSelect={handleFingerSelect}/>
        <div className="w-full h-[1px] dark:bg-white/30 bg-black/30"/>
        <ButtonSelect options={handOptions} selected={hand} onSelect={handleHandSelect} disabled={finger === ''}/>
      </div>
    </>}
    {selected?.type === 'turn' && isFullHandTurn(selected.turn) && <>
      <div className="py-1"/>
      <div className="flex gap-2 flex-col">
        <div>Specify the thumb position at the start of the turn</div>
        <ButtonSelect options={thumbOptions} selected={thumb} onSelect={handleThumbSelect}/>
      </div>
    </>}
    {selected?.type === 'turn' && isSingleFingerDoubleTurn(selected.turn) && <>
      <div className="py-1"/>
      <div className="flex gap-2 flex-col">
        <div>Specify which two fingers and hands to use</div>
        <ButtonSelect options={fingerOptionsNoInfo} selected={finger} onSelect={handleFingerSelect}/>
        <div className="w-full h-[1px] dark:bg-white/30 bg-black/30"/>
        <ButtonSelect options={handOptions} selected={hand} onSelect={handleHandSelect} disabled={finger === ''}/>
        <div className="w-full h-[1px] dark:bg-white/30 bg-black/30"/>
        <ButtonSelect options={fingerOptions} selected={secondFinger} onSelect={handleSecondFingerSelect} disabled={finger === ''}/>
        <div className="w-full h-[1px] dark:bg-white/30 bg-black/30"/>
        <ButtonSelect options={handOptions} selected={secondHand} onSelect={handleSecondHandSelect} disabled={finger === ''}/>
      </div>
    </>}
    {selected?.type === 'group' && <>
      <div className="py-1"/>
      <Textarea label="Group Info" name="group-info" value={groupInfo} onInput={handleGroupInfo}/>
    </>}
  </div>
}

export default Info


interface ButtonSelectProps<Value extends any> {
  options: Array<{label: string, value: Value}>
  selected: Value,
  onSelect: (selected: Value) => void,
  className?: string,
  disabled?: boolean
}

const classNames = (selected: boolean) => {
  let cls = 'rounded-full border h-10 px-3 dark:disabled:text-font-dark/40 disabled:text-font/50'
  if (selected)
    cls += ' bg-primary dark:disabled:bg-white/40 disabled:bg-black/20 border-transparent'
  else
    cls += ' border-black/40 dark:border-white/40'
  return cls
}

const ButtonSelect = <Value extends any>({options, selected, onSelect, className = '', disabled}: ButtonSelectProps<Value>) => {
  return <div className={`${className} flex gap-2 flex-wrap`}>
    {options.map(({label, value}, index) => {
      return <button key={index} disabled={disabled} className={classNames(selected === value)} onClick={() => onSelect(value)}>{label}</button>
    })}
  </div>
}