import {FC, useContext, useState} from 'react'
import {Board} from '../icons/board'
import {LogoDark} from '../icons/LogoDark'
import {HideSidebar} from '../icons/HideSidebar'
import {IconShowSidebar} from '../icons/iconShowSidebar'
import SwitchTheme from '../SwitchTheme/SwitchTheme'
import Modal from '../Modal/Modal'
import './NavBar.scss'
import CreateBoard from '../Modal/ModalContentCreateBoard/CreateBoard'
import {DataContext} from '../../context/DataContext'

const NavBar: FC = () => {
  const {boardData, activeTab, setActiveTab, showNav, setShowNav, isMobile} =
    useContext(DataContext)
  const openTab = (index: number) => setActiveTab(index)
  const [modalState, setModal] = useState(false)

  const HideNavBar = () => {
    setShowNav(!showNav)
  }

  const openCurrentTab = (index: number) => {
    openTab(index)
    if (isMobile === true) {
      setShowNav(!showNav)
    }
  }

  const ListName = boardData.map((item: any, index: number) => (
    <button
      onClick={() => openCurrentTab(index)}
      className={`navLink ${index === activeTab ? 'active' : ''}`}
      key={item.id}>
      <Board />
      <span>{item.name}</span>
    </button>
  ))

  return (
    <>
      <aside className={showNav ? 'navbar' : 'navbar hide'}>
        <div className='navbar__head'>
          <LogoDark className='navbar__logo' />
          <p className='navbar__title'>
            ALL BOARDS <span>({boardData.length})</span>
          </p>
        </div>
        <nav className='navbar__navigation'>{ListName}</nav>
        <button
          onClick={() => setModal(!modalState)}
          className='navbar__create'>
          <Board />
          <span>+ Create New Board</span>
        </button>
        <div className='navbar__container'>
          <SwitchTheme />
        </div>
        <button onClick={HideNavBar} className='navbar__hide'>
          <HideSidebar />
          <span>Hide Sidebar</span>
        </button>
      </aside>

      <button
        onClick={HideNavBar}
        className={showNav ? 'show-sidebar' : 'show-sidebar active'}>
        <IconShowSidebar />
      </button>

      <Modal active={modalState} setActive={setModal}>
        <CreateBoard closeModal={setModal} />
      </Modal>
    </>
  )
}

export default NavBar
