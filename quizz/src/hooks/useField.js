import { useState } from 'react'

export const useField = (type = 'text', initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = ({ target }) => {
    setValue(target.value)
  }

  const reset = () => {
    setValue(initialValue)
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset,
    value,
  }
}
