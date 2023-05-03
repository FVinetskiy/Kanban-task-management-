import {useContext, useState, FC} from 'react'
import './ModalTaskContent.scss'
import {DataContext} from '../../../context/DataContext'
import Checkbox from '../../UI/Checkbox/Checkbox'
import {VerticalEllipse} from '../../icons/VerticalEllipse'
import ToolTip from '../../ToolTip/ToolTip'
import Select, {SingleValue} from 'react-select'

type PropsNewValueColumn = {
  label: string
  value: string
}

const ModalTaskContent: FC = () => {
  const {
    indexTask,
    boardData,
    activeTab,
    setBoardData,
    indexColumns,
    setModalTask,
    ModalDeleteTask,
    setModalDeleteTask,
    ModalEditTask,
    setModalEditTask,
  } = useContext(DataContext)

  const [ToolTipTask, setToolTipTask] = useState(false)
  const currentTask =
    boardData[activeTab]?.columns[indexColumns].tasks[indexTask]
  const subLength = currentTask?.subtasks?.length
  const subLengthComplete = currentTask.subtasks.filter(
    (elem: any) => elem.isCompleted === true,
  ).length
  const currentSubtask = currentTask.subtasks
  const [Subtasks, setSubtasks] = useState(currentSubtask)

  const ToggleToolTeep = () => {
    setToolTipTask(!ToolTipTask)
  }

  const onClickOpenDopModal = () => {
    ToggleToolTeep()
    setModalDeleteTask(!ModalDeleteTask)
    setModalTask(false)
  }

  const openEditTaskModal = () => {
    ToggleToolTeep()
    setModalEditTask(!ModalEditTask)
    setModalTask(false)
  }

  const handleClick = (index: number) => {
    const newArr = [...Subtasks]
    if (newArr[index].isCompleted === true) {
      newArr[index].isCompleted = false
    } else {
      newArr[index].isCompleted = true
    }
    setSubtasks(newArr)
  }

  const selectOptions = boardData[activeTab]?.columns
    .map((item: any) => [{value: item.name, label: item.name}])
    .flat()

  const onChangeSelect = (
    newValue: SingleValue<PropsNewValueColumn> | null,
  ) => {
    const localBoards = [...boardData]
    const currentColumnName = localBoards[activeTab]?.columns[indexColumns].name
    if (currentColumnName !== newValue?.value) {
      const newListTasks = boardData[activeTab]?.columns[
        indexColumns
      ].tasks.filter((elem: any, index: number) => index !== indexTask)
      localBoards[activeTab].columns[indexColumns].tasks = newListTasks

      const choiceColum = localBoards[activeTab]?.columns.find(
        function choiceColumnElem(element: any) {
          return element.name === newValue?.value
        },
      )
      choiceColum?.tasks.push(currentTask)
    }
    setModalTask(false)
    setBoardData(localBoards)
  }

  return (
    <div className='current-task'>
      <div className='current-task__head'>
        <p className='current-task__title'>{currentTask.title}</p>
        <ToolTip
          onClickEdit={openEditTaskModal}
          onClickDelete={onClickOpenDopModal}
          textEdit={'Edit Task'}
          textDelete={'Delete Task'}
          state={ToolTipTask}
          setState={setToolTipTask}>
          <button
            onClick={ToggleToolTeep}
            className='current-task__button-setting'>
            <VerticalEllipse />
          </button>
        </ToolTip>
      </div>
      <p className='current-task__description'>{currentTask.description}</p>
      <p className='current-task__length'>
        Subtasks (<span>{subLengthComplete}</span> of <span>{subLength}</span> )
      </p>
      <div className='current-task__container-check'>
        {Subtasks.map((item: any, index: number) => (
          <Checkbox
            checked={item.isCompleted}
            key={index}
            title={item.title}
            onChange={() => handleClick(index)}
          />
        ))}
      </div>
      <div className='select'>
        <p className='select__title'>Current Status</p>
        <Select
          onChange={onChangeSelect}
          defaultValue={selectOptions[indexColumns]}
          options={selectOptions}
        />
      </div>
    </div>
  )
}

export default ModalTaskContent
