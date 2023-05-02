import {FC, useEffect, ReactElement} from 'react'
import './Modal.scss'
import {useKeyPress} from '../../hooks/useKeyPress'

type PropsModal = {
  active: boolean
  setActive: Function
  children?: ReactElement
}

const Modal: FC<PropsModal> = ({active, setActive, children}) => {
  const closeModalKeyPress = useKeyPress('Escape')

  useEffect(() => {
    if (active === true) {
      setActive(!closeModalKeyPress)
    }
  }, [closeModalKeyPress])

  return active ? (
    <div onClick={() => setActive(false)} className='modal'>
      <div onClick={(e) => e.stopPropagation()} className='modal__content'>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal
