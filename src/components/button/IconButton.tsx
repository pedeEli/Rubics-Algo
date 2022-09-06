import Link from 'next/link'
import type {ButtonProps} from './Button'
import {bgClassName, textClassName} from './Button'

const IconButton = (props: ButtonProps) => {
  const {children, className = '', color = 'primary', variant = 'normal'} = props

  if (props.href !== undefined) {
    return (
      <Link href={props.href}>
        <a type={props.type} onClick={event => props.onClick && props.onClick(event)} className={`${className} ${bgClassName(color, variant)} ${textClassName(color, variant)} focus:outline-none relative before:absolute before:inset-0 p-2 h-14 w-14 rounded-full overflow-hidden block`}>
          {children}
        </a>
      </Link>
    )
  }

  return (
    <button type={props.type} onClick={event => props.onClick && props.onClick(event)} className={`${className} ${bgClassName(color, variant)} ${textClassName(color, variant)} focus:outline-none relative before:absolute before:inset-0 p-2 h-14 w-14 rounded-full overflow-hidden`}>
      {children}
    </button>
  )
}

export default IconButton