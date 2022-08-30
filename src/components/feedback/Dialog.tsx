import type {ReactNode} from 'react'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: ReactNode[] | ReactNode
}

const Dialog = ({open, onClose, children}: DialogProps) => {
  return <>{open &&
    <div className="fixed inset-0 bg-black/20 dark:bg-white/20 z-[9999] grid place-content-center" onClick={onClose}>
      <div className="m-6 bg-background dark:bg-background-dark rounded-2xl px-8 py-6" onClick={event => event.stopPropagation()}>
        {children}
      </div>
    </div>
  }</>
}

export default Dialog