import {lineClassName, spanClassName} from './Textfield'
import {useState, useEffect, ReactNode, ChangeEvent} from 'react'

interface TextareaProps {
  name: string,
  id?: string,
  label: string | ReactNode,
  errorMsg?: string,
  value?: string,
  onInput?: (input: string) => void
}

const Textarea = ({name, id = name, label, errorMsg, value: value_ = '', onInput}: TextareaProps) => {
  let [value, setValue] = useState('')
  let [focused, setFocused] = useState(false)

  useEffect(() => {
    setValue(value_)
  }, [value_])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
    onInput && onInput(event.currentTarget.value)
  }

  return <div>
    <label className="relative inline-flex w-full" htmlFor={id}>
      <span className={spanClassName(value + value_, focused)}>{label}</span>
      <textarea
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
        className="bg-inherit outline-none mt-4 mb-3 resize-none w-full"
        id={id}
        name={name}
        rows={2}
        value={value}
      ></textarea>
      <div className={lineClassName(value, focused)}/>
    </label>
    {errorMsg !== undefined && <div className="text-sm text-error">{errorMsg === '' ? <span>&nbsp;</span> : errorMsg}</div>}
  </div>
}

export default Textarea