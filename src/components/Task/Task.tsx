import {FC} from 'react'
import './Task.scss'
import {useContext, useState} from 'react'
import {DataContext} from '../../context/DataContext'

type TaskProps = {
  title: String
  lengthSubtask?: number
  isCompletedLength?: number
  onClick?: (() => void) | undefined
}

const Task: FC<TaskProps> = ({
  title,
  lengthSubtask = 0,
  isCompletedLength = 0,
  setModal,
  subtasks,
  index,
  card,
}) => {
  const {setModalTask, setIndexTask} = useContext(DataContext)

  const openTask = () => {
    setModalTask(true)
    setIndexTask(index)
  }

  return (
    <>
      <div className='task' onClick={openTask}>
        <p className='task__title'>{title}</p>
        <p className='task__info'>
          <span>{isCompletedLength}</span>
          <span>of</span>
          <span>{lengthSubtask}</span> substasks
        </p>
      </div>
    </>
  )
}

export default Task
