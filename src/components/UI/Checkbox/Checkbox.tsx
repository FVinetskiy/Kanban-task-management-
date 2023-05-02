import {FC} from 'react'
import './Checkbox.scss'

type PropsCheckbox = {
  title: string
  checked?: boolean
  onChange: Function
}

const Checkbox: FC<PropsCheckbox> = ({title, checked, onChange}) => {
  return (
    <label className='checkbox'>
      <input
        defaultChecked={checked}
        onChange={() => onChange()}
        type='checkbox'
        className='checkbox__input'
      />
      <span className='checkbox__box'></span>
      <span className='checkbox__text'>{title}</span>
    </label>
  )
}

export default Checkbox
