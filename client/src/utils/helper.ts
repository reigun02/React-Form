export const inputTextValidation = (value: string) => value.trim() !== ''

export const emailValidation = (value: string) => {
  const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)

  return value.trim() !== '' && isEmail
}

export const generateEmailHelperText = (value: string, hasError: boolean) => {
  if (hasError && value === '') {
    return 'Email is required'
  } else if (hasError && value !== '') {
    return 'Email is invalid'
  } else {
    return ''
  }
}
