import {useRef, useEffect, useState} from 'react'
import Algorithm, {type Selected} from '@/components/Algorithm'

interface EditorProps {
  show: boolean
}

const algo: Algo.RubicsAlgorithm = {
  turns: [
    {
      side: 'r',
      double: false,
      prime: true
    },
    {
      turns: [
        {
          side: 'U',
          prime: false,
          double: true
        },
        {
          side: 'L',
          double: true,
          prime: true
        }
      ]
    }
  ]
}

const Editor = ({show}: EditorProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = ref.current!
    if (show) {
      editor.style.height = 'auto'
      const {height} = editor.getBoundingClientRect()
      editor.style.height = '0'
      editor.getBoundingClientRect()
      editor.style.height = `${height}px`
      return
    }
    editor.style.height = '0'
  }, [show])

  const [selected, setSelected] = useState<Selected>({type: 'new', index: -1})

  return <div ref={ref} className="transition-[height_300ms] h-0 overflow-hidden">
    <Algorithm.Editable algo={algo} selected={selected} onSelect={setSelected}/>
    <div className="p-2"/>
  </div>
}

export default Editor