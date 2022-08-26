import type {ButtonProps} from './Button'
import {bgClassName, textClassName} from './Button'

const Fab = ({children, className = '', color = 'primary', variant = 'normal', onClick}: ButtonProps) => {
  return (
    <button onClick={event => onClick && onClick(event)} className={`${className} ${bgClassName(color, variant)} ${textClassName(color, variant)} focus:outline-none relative before:absolute before:inset-0 p-3 h-16 w-16 rounded-full overflow-hidden`}>
      {children}
    </button>
  )
}

export default Fab