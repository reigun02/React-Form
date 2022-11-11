import { useState } from 'react'

const useForm = (validateValue: (enteredValue: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value)
  }

  const inputBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  const valueIsValid = validateValue(enteredValue)
  const hasError = !valueIsValid && isTouched

  return {
    value: enteredValue,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset
  }
}

export default useForm
