import React, {useContext, FC} from 'react'
import './ModalContentDeleteTask.scss'
import {DataContext} from '../../../context/DataContext'

const ModalContentDeleteTask: FC = ({onClose}) => {
  const {boardData, setBoardData, activeTab, indexColumns, indexTask} =
    useContext(DataContext)

  const currentTaskName =
    boardData[activeTab]?.columns[indexColumns].tasks[indexTask].title

  const onClickDeleteTask = () => {
    const localBoards = [...boardData]
    const filteredTasks = localBoards[activeTab]?.columns[
      indexColumns
    ].tasks.filter((value, index) => index !== indexTask)
    if (localBoards[activeTab]?.columns[indexColumns]?.tasks) {
      localBoards[activeTab].columns[indexColumns].tasks = filteredTasks
    }
    setBoardData(localBoards)
    onClose()
  }

  return (
    <div className='clarification'>
      <p className='clarification__title'>Delete this task?</p>
      <p className='clarification__text'>
        Are you sure you want to delete the <span>‘{currentTaskName}’</span>
        task and its subtasks? This action cannot be reversed.
      </p>
      <div className='clarification__wrap-button'>
        <button
          onClick={onClickDeleteTask}
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

export default ModalContentDeleteTask
