import type {ReactNode, default as React} from 'react'

type Color = 'primary' | 'secondary'
type Variant = 'normal' | 'raised'
export interface ButtonProps {
  children: ReactNode[] | ReactNode,
  className?: string,
  color?: Color,
  variant?: Variant,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}


export const textClassName = (color: Color, variant: Variant) => {
  if (variant === 'raised')
    return 'text-font dark:text-font-dark'
  if (color === 'primary')
    return 'text-primary'
  return 'text-font dark:text-font-dark'
}

export const bgClassName = (color: Color, variant: Variant) => {
  if (variant === 'normal') {
    if (color === 'primary')
      return 'before:hover:bg-primary/[.15] before:focus:bg-primary/30 dark:before:hover:bg-primary/10 dark:before:focus:bg-primary/20'
    return 'before:hover:bg-secondary/20 before:focus:bg-secondary/[.35] dark:before:hover:bg-secondary/10 dark:before:focus:bg-secondary/20'
  }
  if (color === 'primary')
    return 'bg-primary before:hover:bg-black/5 before:hover:bg-white/10 before:focus:bg-white/20 shadow-md'
  return 'bg-secondary dark:bg-secondary-dark before:hover:bg-white/10 before:focus:bg-white/20 shadow-md'
}

const Button = ({children, className = '', color = 'primary', variant = 'normal', onClick}: ButtonProps) => {
  return (
    <button onClick={event => onClick && onClick(event)} className={`${className} ${textClassName(color, variant)} ${bgClassName(color, variant)} focus:outline-none relative before:absolute before:inset-0 px-4 py-2 rounded-[0.25rem]`}>
      {children}
    </button>
  )
}

export default Button