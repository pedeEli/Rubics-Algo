import type {ReactNode} from 'react'
import {useState, useEffect, useRef} from 'react'

interface AccordionProps {
  children: ReactNode[] | ReactNode
}

const Accordion = ({children}: AccordionProps) => {
  return <div>{children}</div>
}

interface PanelProps {
  title: string,
  open?: boolean,
  children: ReactNode[] | ReactNode
}

const panelClassName = (isOpen: boolean) => {
  let cls = 'transition-[margin_300ms] block shadow-[0_3px_1px_-2px_#0003,0_2px_2px_#00000024,0_1px_5px_#0000001f] overflow-hidden first-of-type:rounded-t-xl last-of-type:rounded-b-xl'
  if (isOpen)
    cls += ' my-4 first-of-type:mt-0 last-of-type:mb-0'
  return cls
}

const Panel = ({title, children, open = false}: PanelProps) => {
  const [isOpen, setOpen] = useState(open)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = ref.current!
    if (isOpen) {
      panel.style.height = 'auto'
      const {height} = panel.getBoundingClientRect()
      panel.style.height = '0'
      panel.getBoundingClientRect()
      panel.style.height = `${height}px`
      return
    }
    panel.style.height = '0'
  }, [isOpen])

  return (
    <div className={panelClassName(isOpen)}>
      <h2 className="cursor-pointer hover-highlight relative bg-surface dark:bg-surface-dark px-6 py-3" onClick={() => setOpen(!isOpen)}>{title}</h2>
      <div ref={ref} className="transition-[height_300ms] bg-surface dark:bg-surface-dark px-6 h-0">
        <div className="pt-3"/>
        {children}
        <div className="pt-3"/>
      </div>
    </div>
  )
}
Accordion.Panel = Panel

export default Accordion