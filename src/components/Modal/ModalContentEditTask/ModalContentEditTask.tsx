import {FC} from 'react'
import './ModalContentEditTask.scss'
import Select from 'react-select'
import {DataContext} from '../../../context/DataContext'
import {useContext, useState} from 'react'
import {Cross} from '../../icons/cross'
import Input from '../../UI/Input/Input'
import TextArea from '../../UI/TextArea/TextArea'

type PropsModalEditTask = {
  onClose: () => void
}

const ModalContentEditTask: FC<PropsModalEditTask> = ({onClose}) => {
  const {boardData, activeTab, setBoardData, indexColumns, indexTask} =
    useContext(DataContext)

  const selectOptions = boardData[activeTab].columns
    .map((item: any, index: number) => [
      {value: item.name, label: item.name, index: index},
    ])
    .flat()

  const currentTask =
    boardData[activeTab]?.columns[indexColumns]?.tasks[indexTask]
  const valueTitleName =
    boardData[activeTab].columns[indexColumns].tasks[indexTask]?.title
  const valueDescription =
    boardData[activeTab].columns[indexColumns].tasks[indexTask].description
  const currentSubtasks =
    boardData[activeTab].columns[indexColumns].tasks[indexTask].subtasks
  const [valueTitle, setValueTitle] = useState(valueTitleName)
  const [valueTextarea, setValueTextarea] = useState(valueDescription)
  const [subTasks, setSubTasks] = useState(currentSubtasks)
  const [IndexSelect, setIndexSelect] = useState(0)
  const localBoard = [...boardData]

  const deleteInput = (index: number) => {
    setSubTasks([...subTasks.slice(0, index), ...subTasks.slice(index + 1)])
  }

  const handleInputChange = (value: any, index: number) => {
    setSubTasks((prev: any) => {
      const localSubtasks = [...prev]
      localSubtasks[index].title = value
      return localSubtasks
    })
  }

  const addSubTask = () => {
    setSubTasks(subTasks.concat([{title: '', isCompleted: false}]))
  }

  const onChangeSelect = (event:any) => {
    if (indexColumns !== event.index) {
      const newColumnTask = localBoard[activeTab]?.columns[
        indexColumns
      ].tasks.filter((elem: any, index: number) => index !== IndexSelect)
      localBoard[activeTab].columns[indexColumns].tasks = newColumnTask
      const chosenColumn = localBoard[activeTab].columns[event.index].tasks
      chosenColumn.push(currentTask)
    }
  }

  const save = () => {
    if (localBoard[activeTab].columns[indexColumns].tasks[indexTask]?.title) {
      localBoard[activeTab].columns[indexColumns].tasks[indexTask].title =
        valueTitle
    }

    localBoard[activeTab].columns[indexColumns].tasks[indexTask].description =
      valueTextarea
    localBoard[activeTab].columns[indexColumns].tasks[indexTask].subtasks =
      subTasks
    setBoardData(localBoard)
    onClose()
  }

  return (
    <div className='edit-task'>
      <p className='edit-task__title'>edit-task</p>

      <div className='edit-task__item'>
        <p className='edit-task__sub-title'>Title</p>
        <Input
          placeholder={'title'}
          value={valueTitle}
          onChange={(e) => setValueTitle(e.target.value)}
        />
      </div>
      <div className='edit-task__item'>
        <p className='edit-task__sub-title'>Description</p>
        <TextArea
          value={valueTextarea}
          onChange={(e) => setValueTextarea(e.target.value)}
          placeholder={
            'e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
          }
        />
      </div>
      <div className='edit-task__item'>
        {subTasks.length !== 0 ? (
          <p className='edit-task__sub-title'>Subtasks</p>
        ) : null}
        <div className='edit-task__content-sub'>
          {subTasks.map((item: any, index: number) => (
            <div className='edit-board__wrapper' key={index}>
              <Input
                value={item.title}
                onChange={(e) => handleInputChange(e.target.value, index)}
              />
              <button
                onClick={() => deleteInput(index)}
                className='create-board__delete-input'>
                <Cross />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addSubTask} className='new'>
          + Add New Subtask
        </button>
      </div>
      <div className='edit-task__item'>
        <p className='edit-task__sub-title'>Status</p>
        <Select
          isDisabled={selectOptions.length === 0}
          onChange={(e) => onChangeSelect(e)}
          defaultValue={selectOptions[indexColumns]}
          options={selectOptions}
        />
      </div>
      <button onClick={save} className='save'>
        Save Changes
      </button>
    </div>
  )
}

export default ModalContentEditTask
