import './Layout.scss'
import Header from '../Header/Header'
import TaskList from '../TaskList/TaskList'
import {useContext} from 'react'
import {DataContext} from '../../context/DataContext'
import BoardEmpty from '../BoardEmpty/BoardEmpty'
import Modal from '../Modal/Modal'
import ModalTaskContent from '../Modal/ModalTaskContent/ModalTaskContent'
import ModalContentDeleteTask from '../Modal/ModalContentDeleteTask/ModalContentDeleteTask'
import ModalContentEditTask from '../Modal/ModalContentEditTask/ModalContentEditTask'
import {FC} from 'react'

const Layout: FC = () => {
  const {
    boardData,
    setBoardData,
    activeTab,
    modalTask,
    ModalEditTask,
    setModalEditTask,
    setModalTask,
    ModalDeleteTask,
    setModalDeleteTask,
  } = useContext(DataContext)

  const currentTab = boardData[activeTab]?.columns

  const NewColumn = () => {
    const localBoards = [...boardData]
    const currentColumn = localBoards[activeTab]?.columns
    const DefNewColumn = [{name: 'Default Name', tasks: []}]
    Array.prototype.push.apply(currentColumn, DefNewColumn)
    setBoardData(localBoards)
  }

  const onCloseModalEditTask = () => {
    setModalEditTask(false)
  }
  const onCloseModalDeleteTask = () => {
    setModalDeleteTask(false)
  }

  return (
    <>
      <div className={'MainContent'}>
        <Header />
        <div className='MainContent__content'>
          <ul className='list-task'>
            {currentTab?.map((column: any, index: number) => {
              return <TaskList index={index} key={index} {...column} />
            })}
            {activeTab !== null && currentTab?.length > 0 ? (
              <div className='main-list-task'>
                <button onClick={NewColumn} className='newColumn'>
                  + New Column
                </button>
              </div>
            ) : null}
          </ul>
          {currentTab?.length === 0 ? (
            <BoardEmpty NewColumn={NewColumn} />
          ) : null}
        </div>
      </div>
      <Modal active={modalTask} setActive={setModalTask}>
        <ModalTaskContent />
      </Modal>
      <Modal active={ModalDeleteTask} setActive={setModalDeleteTask}>
        <ModalContentDeleteTask onClose={onCloseModalDeleteTask} />
      </Modal>
      <Modal active={ModalEditTask} setActive={setModalEditTask}>
        <ModalContentEditTask onClose={onCloseModalEditTask} />
      </Modal>
    </>
  )
}

export default Layout