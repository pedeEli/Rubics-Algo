import Back from '@/components/Back'
import Algorithm, {Selected} from '@/components/Algorithm'
import ollCubes from '@/data/OLLCubes'
import pllCubes from '@/data/PLLCubes'
import CubeButton from '@/components/button/CubeButton'
import Button from '@/components/button/Button'
import IconButton from '@/components/button/IconButton'
import AddSVG from '@/components/svg/Add'
import Editor from '@/components/editor'

import {useSession} from 'next-auth/react'
import React, {useState, useRef, useEffect} from 'react'
import {trpc} from '@/utils/trpc'

interface AlgoListProps<Type extends 'oll' | 'pll'> {
  type: Type,
  name: Type extends 'oll' ? Cube.OLLName : Cube.PLLName,
  section: Type extends 'oll' ? Cube.OLLSection : Cube.PLLSection,
  defaultAlgoIds: Algo.RubicsAlgoId[],
  userAlgoIds: Algo.RubicsAlgoId[] | null
}

const AlgoList = <Props extends AlgoListProps<'oll'> | AlgoListProps<'pll'>>(props: Props) => {
  const session = useSession()
  const [showEditor, setShowEditor] = useState(false)
  const [algos, setAlgos] = useState<Algo.RubicsAlgoId[]>(props.userAlgoIds ?? props.defaultAlgoIds)
  const [editing, setEditing] = useState<Algo.RubicsAlgoId>()
  const deleteMutation = trpc.useMutation('algorithms.delete', {
    onSuccess: (_, {id}) => {
      setAlgos(as => as.filter(([id_]) => id_ !== id))
    }
  })

  const toggleEditor = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setShowEditor(!showEditor)
  }

  const handleSave = (algoId: Algo.RubicsAlgoId) => {
    setAlgos(as => [...as, algoId])
    setShowEditor(false)
  }
  const handleEdit = (algoId: Algo.RubicsAlgoId) => {
    setAlgos(as => as.map(([id, algo]) => [id, id === algoId[0] ? algoId[1] : algo]))
    setShowEditor(false)
    setEditing(undefined)
  }
  const handleClose = () => {
    if (!editing)
      return
    setEditing(undefined)
  }

  const handleDelete = (algoId: Algo.RubicsAlgoId) => {
    if (deleteMutation.isLoading)
      return
    deleteMutation.mutate({id: algoId[0]})
  }
  const handleEditToggle = (algoId: Algo.RubicsAlgoId) => {
    setEditing(algoId)
    setShowEditor(true)
  }

  const disableDelete = algos.length === 1

  return <>
    <Back href={`/${props.type}`}/>
    <main className="max-w-3xl mx-auto bg-surface dark:bg-surface-dark p-7 min-h-full" style={{paddingTop: 'var(--back-button-height)'}}>
      <div className="py-2"/>
      <div className="grid grid-cols-[1fr_1fr] items-center">
        <h1 className="text-4xl text-center font-bold col-start-1 col-end-3 row-start-1">
          {props.type === 'pll' ? `${props.name} Permutation` : props.name}
        </h1>
        {session.status === 'authenticated' && <IconButton onClick={toggleEditor} className="col-start-2 row-start-1 justify-self-end"><AddSVG/></IconButton>}
      </div>
      <div className="py-2"/>
      {session.status === 'authenticated' && (
        props.type === 'oll'
          ? <Editor show={showEditor} type="oll" section={props.section} name={props.name} onSave={handleSave} editing={editing} onEdit={handleEdit} onClose={handleClose}/>
          : <Editor show={showEditor} type="pll" section={props.section} name={props.name} onSave={handleSave} editing={editing} onEdit={handleEdit} onClose={handleClose}/>
      )}
      <div className="grid sm:grid-cols-[auto_1fr] gap-4">
        <div className="aspect-square w-[10rem] justify-self-center cube-bg">
          {props.type === 'oll'
          ? <CubeButton.OLLCube {...ollCubes[props.section][props.name]}/>
          : <CubeButton.PLLCube {...pllCubes[props.section][props.name]}/>}
        </div>
        <div className="flex flex-col gap-2">
          {algos.map((algoId) => {
            return <AlgorithmDetail key={algoId[0]} algoId={algoId} disableDelete={disableDelete} onDelete={handleDelete} onEdit={handleEditToggle} showButtons={session.status === 'authenticated'}/>
          })}
          <div className="h-[2px] bg-secondary dark:bg-secondary-dark w-full"/>
        </div>
      </div>
    </main>
  </>
}

export default AlgoList


import {isSingleFingerTurn, isFullHandTurn, isSingleFingerDoubleTurn} from '@/utils/algo'

interface AlgorithmDetailProps {
  algoId: Algo.RubicsAlgoId,
  onDelete: (algoId: Algo.RubicsAlgoId) => void,
  onEdit: (algoId: Algo.RubicsAlgoId) => void,
  disableDelete: boolean,
  showButtons: boolean
}
const AlgorithmDetail = ({algoId, onDelete, onEdit, disableDelete, showButtons}: AlgorithmDetailProps) => {
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [_, algo] = algoId

  let observer = typeof window !== 'undefined' && new ResizeObserver(entries => {
    entries.forEach(entry => {
      const {height} = entry.contentRect
      detailRef.current!.style.height = `${height}px`
    })
  })

  useEffect(() => {
    if (open && !render)
      return setRender(true)
    if (!render)
      return
    const detail = detailRef.current!
    detail.style.height = '0px'
  }, [open])

  useEffect(() => {
    if (!render || !observer)
      return
    const detail = detailRef.current!
    detail.style.height = 'auto'
    const {height} = detail.getBoundingClientRect()
    detail.style.height = '0px'
    detail.getBoundingClientRect()
    detail.style.height = `${height}px`

    const content = contentRef.current!
    observer.observe(content)
    return () => {
      observer && observer.unobserve(content)
    }
  }, [render])

  const handleTransitionEnd = () => {
    if (open)
      return
    setRender(false)
  }

  const handleEdit = () => {
    onEdit(algoId)
    setOpen(false)
  }

  const [selected, setSelected] = useState<Selected>()

  return <div>
    <Button variant="raised" onClick={() => setOpen(!open)}><Algorithm algo={algo}/></Button>
    {render && <div ref={detailRef} onTransitionEnd={handleTransitionEnd} className="h-0 transition-[height] overflow-hidden">
      <div ref={contentRef}>
        <div className="p-1"/>
        <div className="ml-3">
          {algo.info && <>
            <div>{algo.info}</div>
            <div className="p-1"/>
          </>}
          <Algorithm.Selectable algo={algo} selected={selected} onSelect={setSelected}/>
          <div className="p-1"/>
          {showButtons &&
            <div className="flex gap-2">
              <Button onClick={handleEdit}>Edit</Button>
              <Button onClick={() => onDelete(algoId)} disabled={disableDelete}>Delete</Button>
            </div>}
          <FullHandTurnInfo selected={selected}/>
          <SingleFingerTurnInfo selected={selected}/>
          <SingleFingerDoubleTurnInfo selected={selected}/>
          <GroupInfo selected={selected}/>
        </div>
      </div>
    </div>}
  </div>
}

interface InfoProps {
  selected?: Selected
}
const FullHandTurnInfo = ({selected}: InfoProps) => {
  if (selected?.type !== 'turn' || !isFullHandTurn(selected.turn) || !selected.turn.info)
    return <></>

  const {info} = selected.turn
  return (
    <div>Your thumb should be on the <span className="text-primary">{info.thumbPosition}</span> when starting the turn.</div>
  )
}
const SingleFingerTurnInfo = ({selected}: InfoProps) => {
  if (selected?.type !== 'turn' || !isSingleFingerTurn(selected.turn) || !selected.turn.info)
    return <></>
  
  const {info} = selected.turn
  return (
    <div>Turn with your <span className="text-primary">{info.finger}</span> on your <span className="text-primary">{info.hand}</span>.</div>
  )
}
const SingleFingerDoubleTurnInfo = ({selected}: InfoProps) => {
  if (selected?.type !== 'turn' || !isSingleFingerDoubleTurn(selected.turn) ||!selected.turn.info)
    return <></>

  const {info: {first, second}} = selected.turn
  return <>
    <div><span className="text-primary">First</span> turn with your <span className="text-primary">{first.finger}</span> on your <span className="text-primary">{first.hand}</span>.</div>
    <div><span className="text-primary">Second</span> turn with your <span className="text-primary">{second.finger}</span> on your <span className="text-primary">{second.hand}</span>.</div>
  </>
}
const GroupInfo = ({selected}: InfoProps) => {
  if (selected?.type !== 'group' || !selected.group.info)
    return <></>

  return <div>{selected.group.info}</div>
}