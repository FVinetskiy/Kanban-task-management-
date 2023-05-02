import {useParams} from 'react-router-dom'
import './TaskList.scss'
import {useContext, useEffect, useState, FC} from 'react'
import Task from '../Task/Task'
import LoaderColumn from '../LoaderCulumns/LoaderColumns'
import {DataContext} from '../../context/DataContext'

const TaskList: FC = (column, {index}) => {
  const [isLoading, setisLoading] = useState(true)
  const {setIndexColumns} = useContext(DataContext)

  const getIndex = () => {
    setIndexColumns(column.index)
  }

  useEffect(() => {
    setisLoading(true)
    setTimeout(() => {
      setisLoading(false)
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
          {column?.tasks?.map((i, index) => (
            <Task
              key={i.title}
              index={index}
              title={i.title}
              subtasks={i.subtasks}
              lengthSubtask={i.subtasks?.length}
              isCompletedLength={
                i.subtasks?.filter((elem) => elem.isCompleted === true).length
              }
            />
          ))}
        </li>
      )}
    </>
  )
}

export default TaskList
