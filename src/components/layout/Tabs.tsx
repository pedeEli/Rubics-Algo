import React, {createContext, useContext, useState, useRef, type ReactNode, useEffect} from 'react'

interface TabsContext {
  register: (id: React.Key) => void,
  tabs: Map<React.Key, () => HTMLButtonElement>,
  selected?: React.Key,
  setSelected: (id: React.Key) => void,
  indices: Map<React.Key, number>,
  transitioning: boolean
}
const TabsContext = createContext<TabsContext | undefined>(undefined)

interface TabsProps {
  selected: React.Key,
  children: ReactNode[] | ReactNode
}
const Tabs = ({selected: selected_, children}: TabsProps) => {
  const [selected, setSelected] = useState<React.Key>(selected_)
  const tabs = useRef(new Map<React.Key, () => HTMLButtonElement>())
  const index = useRef(0)
  const indices = useRef(new Map<React.Key, number>())

  const register = (id: React.Key) => {
    if (indices.current.has(id))
      return
    indices.current.set(id, index.current++)
  }

  const value: TabsContext = {
    register,
    selected,
    tabs: tabs.current,
    setSelected,
    indices: indices.current,
    transitioning: false
  }

  return <TabsContext.Provider value={value}>
    <div className="w-full">
      {children}
    </div>
  </TabsContext.Provider>
}


const TabsHeader = ({children}: {children: ReactNode[] | ReactNode}) => {
  const context = useContext(TabsContext)!
  const headerRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const line = lineRef.current
    if (!header || !line || context.selected === undefined)
      return
    
    const tab = context.tabs.get(context.selected)!()

    const headerRect = header.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()

    const dx = tabRect.x - headerRect.x
    const {width} = tabRect

    line.style.transform = `translateX(${dx}px) scaleX(${width})`
  }, [context.selected])

  return <div ref={headerRef} className="flex text-center relative">
    {children}
    {context.selected !== undefined && <div ref={lineRef} className="origin-left transition-transform absolute left-0 bottom-0 h-[3px] bg-primary w-[1px]"/>}
  </div>
}
Tabs.Header = TabsHeader


interface TabProps {
  name: string,
  id: React.Key
}
const TabsTab = ({name, id}: TabProps) => {
  const context = useContext(TabsContext)!
  const ref = useRef<HTMLButtonElement>(null)
  
  context.register(id)
  context.tabs.set(id, () => ref.current!)

  return <button ref={ref} className="w-full tracking-wider px-3 py-2 uppercase hover-highlight relative" onClick={() => context.transitioning || context.setSelected(id)}>{name}</button>
}
Tabs.Tab = TabsTab


const TabsContent = ({children}: {children: ReactNode[] | ReactNode}) => {
  return <div className="relative">
    {children}
  </div>
}
Tabs.Content = TabsContent

interface PanelProps {
  id: React.Key,
  children: ReactNode[] | ReactNode
}
const TabsPanel = ({id, children}: PanelProps) => {
  const context = useContext(TabsContext)!
  const previous = useRef<React.Key>()
  const ref = useRef<HTMLDivElement>(null)
  const [render, setRender] = useState(false)
  const isBefore = useRef<boolean>()

  if (context.selected !== undefined && previous.current === undefined) {
    previous.current = context.selected
    if (context.selected === id)
      setRender(true)
  } else if (context.selected === id && previous.current !== id) {
    const {indices} = context
    isBefore.current = indices.get(id)! < indices.get(previous.current!)!
    previous.current = context.selected
    setRender(true)
  } else if (context.selected !== id && previous.current === id) {
    const {indices} = context
    isBefore.current = indices.get(id)! > indices.get(context.selected!)!
    previous.current = context.selected

    const panel = ref.current!
    panel.style.position = 'absolute'
    if (isBefore.current) 
      panel.style.transform = 'translateX(110%)'
    else
      panel.style.transform = 'translateX(-110%)'
  } else {
    previous.current = context.selected
  }

  useEffect(() => {
    if (!render)
      return

    context.transitioning = true

    const panel = ref.current!

    panel.getBoundingClientRect()
    panel.style.transform = 'translateX(0%)'
  }, [render])

  const handleTransitionEnd = () => {
    if (previous.current === id)
      return
    context.transitioning = false
    setRender(false)
  }
  const directionClass = (isBefore?: boolean) => {
    if (isBefore === undefined)
      return 'translate-x-0'
    if (isBefore)
      return 'translate-x-[-110%]'
    return 'translate-x-[110%]'
  }
  
  return <>{render &&
    <div ref={ref} onTransitionEnd={handleTransitionEnd} className={`${directionClass(isBefore.current)} transition-transform duration-[300ms] w-full top-0`}>
      <div className="p-2"/>
      {children}
      <div className="p-2"/>
    </div>
  }</>
}
Tabs.Panel = TabsPanel

export default Tabs