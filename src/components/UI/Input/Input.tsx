import {FC} from 'react'
import './Input.scss'

type InputProps = {
  placeholder: string
  value: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({placeholder, value, onChange}) => {
  return (
    <input
      placeholder={placeholder}
      className='input'
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
