import {createContext} from 'react'

export interface CurrentContextType {
  ModalEditTask: boolean
  isMobile: boolean
  showNav: boolean
  setShowNav: Function
  setModalEditTask: Function
  boardData: object
  activeTab: null | number
  setActiveTab: Function
  setBoardData: Function
  modalTask: boolean
  setModalTask: Function
  indexTask: null | number
  indexColumns: null | number
  setIndexTask: Function
  setIndexColumns: Function
  ModalDeleteTask: boolean
  setModalDeleteTask: Function
}

export const DataContext = createContext<CurrentContextType>([])
