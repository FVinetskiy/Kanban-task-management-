import React, {useContext, FC} from 'react'
import './ModalContentDelete.scss'
import {DataContext} from '../../../context/DataContext'

const ModalContentDelete: FC = ({onClose}) => {
  const {boardData, activeTab, setBoardData} = useContext(DataContext)
  const currentTabName = boardData[activeTab].name

  const onClickDeleteBoard = () => {
    const localBoards = [...boardData]
    const filteredArray = localBoards.filter(
      (value, index) => index !== activeTab,
    )
    setBoardData(filteredArray)
    onClose()
  }

  return (
    <div className='clarification'>
      <p className='clarification__title'>Delete this board?</p>
      <p className='clarification__text'>
        Are you sure you want to delete the <span>‘{currentTabName}’</span>
        board? This action will remove all columns and tasks and cannot be
        reversed.
      </p>
      <div className='clarification__wrap-button'>
        <button
          onClick={onClickDeleteBoard}
          className='clarification__button clarification__button--Delete'>
          Delete
        </button>
        <button
          onClick={() => onClose()}
          className='clarification__button clarification__button--def'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ModalContentDelete
