import {FC, ReactElement, useEffect, useRef} from 'react'
import './ToolTip.scss'

type PropsToolTip = {
  children: ReactElement
  state: boolean
  setState: (state: boolean) => void
  customClass?: 'left'
  textEdit?: string
  textDelete?: string
  onClickDelete?: Function
  onClickEdit?: Function
}

const ToolTip: FC<PropsToolTip> = ({
  children,
  state,
  textEdit,
  textDelete,
  setState,
  customClass,
  onClickEdit,
  onClickDelete,
}) => {
  const toolTipClasses = customClass ? `tool-tip ${customClass}` : `tool-tip`
  const sortRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      let path = event.composedPath().includes(sortRef.current)
      if (!path) {
        setState(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => document.body.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div ref={sortRef} className='ToolTipContainer'>
      {children}

      {state ? (
        <div className={toolTipClasses}>
          <button onClick={onClickEdit} className='ToolTipContainer__button'>
            {textEdit}
          </button>
          <button onClick={onClickDelete} className='ToolTipContainer__button'>
            {textDelete}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ToolTip
