import './TextArea.scss'
import React, {FC} from 'react'

type TextAreaProps = {
  value: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
}

const TextArea: FC<TextAreaProps> = ({value, onChange, placeholder}) => {
  return (
    <textarea
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      className='textarea'></textarea>
  )
}

export default TextArea
