import {useState, ReactNode, HTMLInputTypeAttribute} from 'react'

interface TextfieldProps {
  name: string,
  id?: string,
  label: string | ReactNode,
  type?: HTMLInputTypeAttribute,
  errorMsg?: string
}

export const spanClassName = (value: string, focused: boolean) => {
  let cls = 'absolute top-4 origin-left transition-transform'
  if (value !== '' || focused)
    cls += ' translate-y-[-90%] scale-75'
  return cls
}

export const lineClassName = (value: string, focused: boolean) => {
  let cls = 'absolute bottom-0 left-0 right-0 bg-black/40 dark:bg-white/40 h-[1px] before:absolute before:inset-0 before:bg-primary before:scale-x-0 before:transition-transform'
  if (value !== '' || focused)
    cls += ' before:scale-x-100'
  return cls
}

export const Textfield = ({label, name, id = name, type = 'text', errorMsg}: TextfieldProps) => {
  let [value, setValue] = useState('')
  let [focused, setFocused] = useState(false)

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value)
  }

  return <div>
    <label className="relative inline-flex" htmlFor={id}>
      <span className={spanClassName(value, focused)}>{label}</span>
      <input
        className="bg-inherit outline-none mt-4 mb-3"
        onInput={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        type={type}
        name={name}
        id={id}
      />
      <div className={lineClassName(value, focused)}/>
    </label>
    {errorMsg !== undefined && <div className="text-sm text-error">{errorMsg === '' ? <span>&nbsp;</span> : errorMsg}</div>}
  </div>
}

export default Textfield