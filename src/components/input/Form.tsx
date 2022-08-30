import type {ZodObject, ZodString, ZodTypeAny} from 'zod'
import type {ReactNode, FormEvent} from 'react'

type ValueState = { valid: true } | { valid: false, message: string, code: string}
export type FormInvalidHandler<
  Values extends Record<string, string>
> = (values: Array<[keyof Values, ValueState]>) => void

interface FormProps<Structure extends Record<string, ZodString>, Values extends Record<string, string>> {
  structure: ZodObject<Structure, 'strip', ZodTypeAny, Values>
  children: ReactNode[] | ReactNode,
  className?: string,
  onSubmit?: (values: Values) => void,
  onInvalid?: FormInvalidHandler<Values>
}

const Form = <
  Structure extends Record<string, ZodString>,
  Values extends Record<string, string>
>({children, className = '', structure, onSubmit, onInvalid}: FormProps<Structure, Values>) => {

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData) as Values
    const results = await structure.safeParseAsync(values)
    
    if (results.success) {
      onSubmit && onSubmit(results.data)
      return
    }

    if (!onInvalid)
      return

    const errors = new Map<keyof Values, ValueState>()
    const {issues} = results.error

    issues.forEach(({path, message, code}) => {
      if (errors.has(path[0] as string))
        return
      errors.set(path[0] as string, { valid: false, message, code })
    })

    Object.keys(values).forEach(name => {
      if (errors.has(name))
        return
      errors.set(name, { valid: true })
    })

    onInvalid([...errors.entries()])
  }

  return <form noValidate onSubmit={handleSubmit} className={className}>
    {children}
  </form>
}

export default Form