import {turnToString} from '@/utils/algo'

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

export default Algorithm