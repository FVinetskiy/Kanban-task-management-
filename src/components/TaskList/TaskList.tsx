import './TaskList.scss'
import {useContext, useEffect, useState, FC} from 'react'
import Task from '../Task/Task'
import LoaderColumn from '../LoaderCulumns/LoaderColumns'
import {DataContext} from '../../context/DataContext'

type PropsTaskList = {
  index: number
  name: string
  tasks: []
}

type subtask = {
  title: string
  isCompleted: boolean
}

type PropsTask = {
  title: string
  description: string
  status: string
  subtasks: subtask[]
}

const TaskList: FC<PropsTaskList> = (column) => {
  const [isLoading, setIsLoading] = useState(true)
  const {setIndexColumns} = useContext(DataContext)

  const getIndex = () => {
    setIndexColumns(column.index)
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  return (
    <>
      {isLoading ? (
        <LoaderColumn />
      ) : (
        <li onClick={getIndex} className='list-task__item'>
          <p className='list-task__title'>
            <span
              className='list-task__mark'
              style={{
                backgroundColor:
                  '#' + Math.floor(Math.random() * 16777215).toString(16),
              }}></span>
            {column?.name} ({column?.tasks?.length})
          </p>
          {column?.tasks?.map((i: PropsTask, index: number) => (
            <Task
              key={i.title}
              index={index}
              title={i.title}
              lengthSubtask={i.subtasks?.length}
              isCompletedLength={
                i.subtasks?.filter((elem: any) => elem.isCompleted === true)
                  .length
              }
            />
          ))}
        </li>
      )}
    </>
  )
}

export default TaskList
