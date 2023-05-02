import {useState} from 'react'
import './ModalCreateTask.scss'
import Select from 'react-select'
import {DataContext} from '../../../context/DataContext'
import {useContext} from 'react'
import {Cross} from '../../icons/cross'
import Input from '../../UI/Input/Input'
import TextArea from '../../UI/TextArea/TextArea'
import {FC} from 'react'

const ModalCreateTask: FC = ({onClose}) => {
  const {boardData, activeTab, setBoardData, indexColumns} =
    useContext(DataContext)
  const selectOptions = boardData[activeTab]?.columns
    .map((item, index) => [{value: item.name, label: item.name, index: index}])
    .flat()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [Subtasks, setSubtasks] = useState([])
  const [SelectStatus, setSelectStatus] = useState(selectOptions[0]?.value)
  const [IndexSelect, setIndexSelect] = useState(0)

  const onChangeSelect = (event) => {
    setSelectStatus(event.value)
    setIndexSelect(event.index)
  }

  const deleteInput = (index) => {
    setSubtasks([...Subtasks.slice(0, index), ...Subtasks.slice(index + 1)])
  }

  const createTask = () => {
    const NewTask = {
      title: title,
      description: description,
      status: SelectStatus,
      subtasks: [...Subtasks],
    }
    const localBoardList = [...boardData]
    localBoardList[activeTab]?.columns[IndexSelect]?.tasks.push(NewTask)
    setBoardData(localBoardList)
    onClose()
  }

  const createSubtask = () => {
    setSubtasks(Subtasks.concat([{title: '', isCompleted: false, value: ''}]))
  }

  const handleInputChange = (value, i) => {
    setSubtasks((prev) => {
      const subTasks = [...prev]
      subTasks[i].value = value
      subTasks[i].title = value
      return subTasks
    })
  }

  return (
    <div className='create-task'>
      <p className='create-task__title'>Add New Task</p>
      <div className='create-task__item'>
        <span className='create-task__subtitle'>Title</span>
        <Input
          placeholder='e.g. Take coffee break'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='create-task__item'>
        <span className='create-task__subtitle'>Description</span>
        <TextArea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='e.g. It’s always good to take a break. This 15 minute break will 
recharge the batteries a little.'
        />
      </div>

      {Subtasks.length === 0 ? null : (
        <div className='create-task__item create-task__item--sub'>
          <span className='create-task__subtitle'>Subtasks</span>
          {Subtasks.map((item, i) => (
            <div key={i} className='create-task__wrap-input'>
              <Input
                placeholder='e.g. Take coffee break'
                value={item.value}
                onChange={(e) => handleInputChange(e.target.value, i)}
              />
              <button
                onClick={() => deleteInput(i)}
                className='create-board__delete-input'>
                <Cross />
              </button>
            </div>
          ))}
        </div>
      )}

      <button onClick={createSubtask} className='new-sub'>
        + Add New Subtask
      </button>

      <div className='create-task__item'>
        <span className='create-task__subtitle'>Status</span>
        <Select
          isDisabled={selectOptions.length === 0}
          onChange={(e) => onChangeSelect(e)}
          defaultValue={selectOptions[0]}
          options={selectOptions}
        />
      </div>

      <button
        disabled={title.length === 0}
        onClick={createTask}
        className='create'>
        Create Task
      </button>
    </div>
  )
}

export default ModalCreateTask
