import {useEffect, useState} from 'react'
import NavBar from './components/NavBar/NavBar'
import Layout from './components/Layout/Layout'
import React, {useContext, FC} from 'react'
import {DataContext} from './context/DataContext'
import data from '../data.json'

const App: FC = () => {
  const [boardData, setBoardData] = useState(data.boards)
  const [activeTab, setActiveTab] = useState(null)
  const [modalTask, setModalTask] = useState<boolean>(false)
  const [indexTask, setIndexTask] = useState(null)
  const [indexColumns, setIndexColumns] = useState(null)
  const [ModalDeleteTask, setModalDeleteTask] = useState<boolean>(false)
  const [ModalEditTask, setModalEditTask] = useState<boolean>(false)
  const [showNav, setShowNav] = useState<boolean>(true)
  const [isMobile, setIsMobile] = useState<boolean>(false)

  const handleResize = () => {
    if (window.innerWidth < 769) {
      setIsMobile(true)
      setShowNav(false)
    } else {
      setIsMobile(false)
      setShowNav(true)
    }
  }

  useEffect(() => {
    window.addEventListener('load', handleResize)
    window.addEventListener('resize', handleResize)
  })

  return (
    <main className='app'>
      <DataContext.Provider
        value={{
          ModalEditTask,
          isMobile,
          showNav,
          setShowNav,
          setModalEditTask,
          boardData,
          activeTab,
          setActiveTab,
          setBoardData,
          modalTask,
          setModalTask,
          indexTask,
          setIndexTask,
          indexColumns,
          setIndexColumns,
          ModalDeleteTask,
          setModalDeleteTask,
        }}>
        <NavBar />
        <Layout />
      </DataContext.Provider>
    </main>
  )
}

export default App
