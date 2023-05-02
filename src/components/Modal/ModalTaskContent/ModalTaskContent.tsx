import React, {useContext, useState, FC} from 'react'
import './ModalTaskContent.scss'
import {DataContext} from '../../../context/DataContext'
import Checkbox from '../../UI/Checkbox/Checkbox'
import {VerticalEllipse} from '../../icons/VerticalEllipse'
import ToolTip from '../../ToolTip/ToolTip'
import Select from 'react-select'

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
  const subLength = currentTask.subtasks.length
  const subLengthComplete = currentTask.subtasks.filter(
    (elem) => elem.isCompleted === true,
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

  const handleClick = (index) => {
    const newArr = [...Subtasks]
    if (newArr[index].isCompleted === true) {
      newArr[index].isCompleted = false
    } else {
      newArr[index].isCompleted = true
    }
    setSubtasks(newArr)
  }

  const selectOptions = boardData[activeTab]?.columns
    .map((item) => [{value: item.name, label: item.name}])
    .flat()

  const onChangeSelect = (newWalue) => {
    const localBoards = [...boardData]
    const currentColumnName = localBoards[activeTab]?.columns[indexColumns].name
    if (currentColumnName !== newWalue.value) {
      const newListTasks = boardData[activeTab]?.columns[
        indexColumns
      ].tasks.filter((elem, index) => index !== indexTask)
      localBoards[activeTab].columns[indexColumns].tasks = newListTasks
      const choiceColum = localBoards[activeTab]?.columns.find(
        function choiceColumnElem(element) {
          return element.name === newWalue.value
        },
      )
      choiceColum.tasks.push(currentTask)
    }
    setModalTask(false)
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
        {Subtasks.map((item, index) => (
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
