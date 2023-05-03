import {createContext} from 'react'

type boardData = {
  columns: {
    name: string
    tasks: {
      title: string
      description: string
      status: string
      subtasks: {
        title: string
        isCompleted: Boolean
      }[]
    }[]
  }[]
  id: string
  name: string
}

export interface CurrentContextType {
  ModalEditTask: boolean
  isMobile: boolean
  showNav: boolean
  setShowNav: Function
  setModalEditTask: Function
  boardData: boardData[]
  activeTab: any | null
  setActiveTab: Function
  setBoardData: Function
  modalTask: boolean
  setModalTask: Function
  indexTask: any | null
  indexColumns: any | null
  setIndexTask: Function
  setIndexColumns: Function
  ModalDeleteTask: boolean
  setModalDeleteTask: Function
}

export const DataContext = createContext<CurrentContextType>(
  {} as CurrentContextType,
)
