import {useState, useEffect, useRef} from 'react'
import LeftChevron from '@/components/svg/LeftChevron'
import RightChevron from '@/components/svg/RightChevron'
import Delete from '@/components/svg/Delete'
import Brackets from '@/components/svg/Brackets'

type Letter = Algo.SingleFingerSide | Algo.FullHandSide
interface KeyboardProps {
  show: boolean,

  side: Letter | '',
  prime: boolean,
  double: boolean,

  onLetter: (letter: Letter) => void,
  onNext: () => void,
  onPrevious: () => void,
  onInsertLeft: () => void,
  onInsertRight: () => void,
  onDelete: () => void,
  onGroup: () => void,
  onPrime: () => void
  onDouble: () => void,

  disableLetters: boolean,
  disablePrimeDouble: boolean,

  disableNext: boolean,
  disablePrevious: boolean,
  disableDelete: boolean,
  disableGroup: boolean,
  disableInsertLeft: boolean,
  disableInsertRight: boolean
}

const letters: Letter[] = [
  'R', 'L', 'U', 'F', 'D', 'B',
  'r', 'l', 'u', 'f', 'd', 'b',
  'M', 'S', 'E', 'x', 'y', 'z'
]

const togglableKey = (on: boolean) => {
  let cls = 'h-auto p-0 shadow-md relative before:absolute enabled:before:inset-0 hover:before:bg-white/10 focus:before:bg-white/20 outline-none disabled:text-font/40 dark:disabled:text-font-dark/40'
  if (on)
    cls += ' bg-primary'
  else
    cls += ' bg-secondary dark:bg-secondary-dark'
  return cls
}
const insertKey = `${togglableKey(false)} flex items-center justify-center`
const actionKey = `${insertKey} keyboard-h:col-span-2 keyboard-w:col-span-2`

const Keyboard = ({
  show,
  side, prime, double,
  onLetter, onDouble, onPrime,
  onPrevious, onNext, onDelete, onGroup, onInsertLeft, onInsertRight,
  disableLetters, disablePrimeDouble,
  disableDelete, disableGroup, disableInsertLeft, disableInsertRight, disableNext, disablePrevious
}: KeyboardProps) => {
  const [render, setRender] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const div = ref.current!
    if (show && !render) {
      setRender(true)
      return
    }
    if (!render)
      return
    div.style.transform = 'translateY(110%)'
    div.addEventListener('transitionend', () => {
      setRender(false)
    }, {once: true})
  }, [show])

  useEffect(() => {
    if (render) {
      const div = ref.current!
      div.getBoundingClientRect()
      div.style.transform = 'translateY(0%)'
    }
  }, [render])

  return <>{render &&
    <div ref={ref} className="transition-transform translate-y-[110%] shadow-[0_-.1rem_2rem_rgba(0,0,0,.2)] fixed bottom-0 left-0 right-0 flex justify-center text-lg z-20 bg-surface dark:bg-surface-dark">
      <div className="keyboard-h:aspect-[12/4.5] keyboard-w:aspect-[12/4.5] keyboard-h:grid-cols-[repeat(12,1fr)] keyboard-w:grid-cols-[repeat(12,1fr)] max-w-sm w-full grid grid-cols-[repeat(6,1fr)] aspect-[6/5] auto-rows-[1fr] px-[6px] py-1 gap-1">
        <button className={`${togglableKey(prime)} col-span-3`}  onClick={onPrime}  disabled={disablePrimeDouble}>Prime</button>
        <button className={`${togglableKey(double)} col-span-3`} onClick={onDouble} disabled={disablePrimeDouble}>Double</button>

        {letters.map(letter => <button key={letter} className={togglableKey(side === letter)} onClick={() => onLetter(letter)} disabled={disableLetters}>{letter}</button>)}

        <button className={actionKey} onClick={onPrevious} disabled={disablePrevious}>
          <LeftChevron height="2em"/>
        </button>
        <button className={actionKey} onClick={onNext} disabled={disableNext}>
          <RightChevron height="2em"/>
        </button>
        <button className={actionKey} onClick={onDelete} disabled={disableDelete}>
          <Delete height="1.5em"/>
        </button>
        <button className={actionKey} onClick={onGroup} disabled={disableGroup}>
          <Brackets height="1.5em"/>
        </button>
        <div className="keyboard-h:col-span-4 keyboard-w:col-span-4 grid grid-cols-[50%_50%] col-span-2">
          <button className={`${insertKey} col-start-1 col-end-2 row-start-1 pr-3`} onClick={onInsertLeft} disabled={disableInsertLeft}>
            <LeftChevron height="2em"/>
          </button>
          <button className={`${insertKey} col-start-2 col-end-3 row-start-1 pl-3`} onClick={onInsertRight} disabled={disableInsertRight}>
            <RightChevron height="2em"/>
          </button>
          <div className="row-start-1 col-start-1 col-end-3 z-10 flex items-center justify-center pointer-events-none translate-y-[-5%]">Insert</div>
        </div>
      </div>
    </div>
  }</>
}

export default Keyboard