import './Header.scss'
import {VerticalEllipse} from '../icons/VerticalEllipse'
import ToolTip from '../ToolTip/ToolTip'
import {useContext, useState} from 'react'
import ModalContentDelete from '../Modal/ModalContentDelete/ModalContentDelete.jsx'
import Modal from '../Modal/Modal'
import ModalCreateTask from '../Modal/ModalCreateTask/ModalCreateTask'
import ModalEditBoard from '../Modal/ModalEditBoard/ModalEditBoard'
import {DataContext} from '../../context/DataContext'
import {Chevron} from '../icons/chevron'
import {FC} from 'react'

const Header: FC = () => {
  const {boardData, activeTab, showNav, setShowNav} = useContext(DataContext)
  const [ModalDeleteActive, setModalDeleteActive] = useState(false)
  const [ModalNewTask, setModalNewTask] = useState(false)
  const [ToolTipOpen, setToolTipOpen] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const titleBoard = boardData[activeTab]?.['name']

  const currentColumnLength = boardData[activeTab]?.columns.length

  const ToggleToolTeep = () => {
    setToolTipOpen(!ToolTipOpen)
  }

  const onClickOpenDopModal = () => {
    ToggleToolTeep()
    setModalDeleteActive(!ModalDeleteActive)
  }

  const onClickEditModal = () => {
    ToggleToolTeep()
    setEditModal(!editModal)
  }

  const onCloseDeleteModal = () => {
    setModalDeleteActive(!ModalDeleteActive)
  }
  const onCloseCreateModal = () => {
    setModalNewTask(!ModalNewTask)
  }
  const onCloseModalEdit = () => {
    setEditModal(!editModal)
  }

  return (
    <>
      <header className='header'>
        <div className='header__wrap-mobile'>
          <button
            onClick={() => setShowNav(!showNav)}
            className={
              showNav ? 'header__mobile-button active' : 'header__mobile-button'
            }>
            <Chevron />
          </button>
          <h1 className='header__title'>{titleBoard}</h1>
        </div>

        <div className='header__content'>
          <button
            onClick={() => setModalNewTask(!ModalNewTask)}
            disabled={activeTab === null || currentColumnLength === 0}
            className='button'>
            + <span> Add New Task</span>
          </button>
          <ToolTip
            onClickEdit={onClickEditModal}
            onClickDelete={onClickOpenDopModal}
            textEdit={'Edit Board'}
            textDelete={'Delete Board'}
            customClass={'left'}
            state={ToolTipOpen}
            setState={setToolTipOpen}>
            <button
              disabled={activeTab === null || boardData.length === 0}
              onClick={ToggleToolTeep}
              className='header__button-setting'>
              <VerticalEllipse />
            </button>
          </ToolTip>
        </div>
      </header>

      <Modal active={ModalDeleteActive} setActive={setModalDeleteActive}>
        <ModalContentDelete onClose={onCloseDeleteModal} />
      </Modal>
      <Modal active={ModalNewTask} setActive={setModalNewTask}>
        <ModalCreateTask onClose={onCloseCreateModal} />
      </Modal>
      <Modal active={editModal} setActive={setEditModal}>
        <ModalEditBoard onClose={onCloseModalEdit} />
      </Modal>
    </>
  )
}

export default Header
