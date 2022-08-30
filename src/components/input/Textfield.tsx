import type { FormEvent, ReactNode, HTMLInputTypeAttribute } from "react"
import {useState} from 'react'

interface TextfieldProps {
  name: string,
  id?: string,
  label: string | ReactNode,
  type?: HTMLInputTypeAttribute,
  errorMsg?: string
}

const spanClassName = (value: string, focused: boolean) => {
  let cls = 'absolute leading-[1.15rem] text-left text-ellipsis whitespace-nowrap cursor-text overflow-hidden transition-all origin-top-left left-0 top-[50%] translate-y-[-50%] pointer-events-none'
  if (focused || value !== '')
    cls += ' text-primary translate-y-[-106%] scale-75'
  return cls
}

const lineClassName = (value: string, focused: boolean) => {
  let cls = 'after:border-primary after:border-b-[1px] after:transition-all after:scale-x-0 after:absolute after:border-solid after:left-0 after:bottom-0 after:w-full after:z-[2] origin-[46px_center_0px] before:border-b-white/40 before:border-b-[1px] before:z-[1] before:absolute before:bottom-0 before:left-0 before:w-full before:border-solid'
  if (focused || value !== '')
    cls += ' after:scale-x-100'
  return cls
}

const Textfield = ({label, name, id = name, type = 'text', errorMsg}: TextfieldProps) => {
  let [value, setValue] = useState('')
  let [focused, setFocused] = useState(false)

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <div>
    <label className="inline-flex items-baseline relative overflow-hidden h-14 text-base before:inline-block before:w-0 before:h-10" htmlFor={id}>
      <span className={spanClassName(value, focused)}>{label}</span>
      <input onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onInput={handleInput} className="outline-none h-7 transition-all w-full min-w-0 border-none rounded-none bg-transparent appearance-none p-0" type={type} id={id} name={name}/>
      <div className={lineClassName(value, focused)}/>
    </label>
    {errorMsg !== undefined && <div className="text-sm text-error">{errorMsg === '' ? <span>&nbsp;</span> : errorMsg}</div>}
  </div>
}

export default Textfield