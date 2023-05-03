import {FC} from 'react'
import './ModalEditBoard.scss'
import {DataContext} from '../../../context/DataContext'
import {useContext, useState} from 'react'
import {Cross} from '../../icons/cross'
import Input from '../../UI/Input/Input'

type PropsModalEdit = {
  onClose: () => void
}

const ModalEditBoard: FC<PropsModalEdit> = ({onClose}) => {
  const {boardData, activeTab, setBoardData} = useContext(DataContext)
  const columns = boardData[activeTab]?.columns
  const valueTitleName = boardData[activeTab].name
  const [valueTitle, setValueTitle] = useState(valueTitleName)
  const [arrColumn, setArrColumn] = useState(columns)

  const deleteInput = (index: number) => {
    setArrColumn([...arrColumn.slice(0, index), ...arrColumn.slice(index + 1)])
  }

  const handleChange = (e: string) => {
    setValueTitle(e)
  }

  const addNewColumn = () => {
    setArrColumn(arrColumn.concat([{name: '', tasks: []}]))
  }

  const SaveSetting = () => {
    const localBoard = [...boardData]
    localBoard[activeTab].name = valueTitle
    localBoard[activeTab].columns = arrColumn
    setBoardData(localBoard)
    onClose()
  }

  const handleInputChange = (value: any, index: number) => {
    setArrColumn((prev: any) => {
      const localColumns = [...prev]
      localColumns[index].value = value
      localColumns[index].name = value
      return localColumns
    })
  }

  return (
    <div className='edit-board'>
      <div className='edit-board__title'>Edit Board</div>

      <div className='edit-board__item'>
        <p className='edit-board__sub-title'>Board Name</p>
        <Input
          onChange={(e) => handleChange(e.target.value)}
          value={valueTitle}
        />
      </div>

      <div className='edit-board__item'>
        <p className='edit-board__sub-title'>Board Columns</p>
        <div className='edit-board__content'>
          {arrColumn.map((item: any, index: number) => (
            <div className='edit-board__wrapper' key={index}>
              <Input
                value={item.name}
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
      </div>

      <button onClick={addNewColumn} className='new-column'>
        + Add New Column
      </button>
      <button onClick={SaveSetting} className='save'>
        Save Changes
      </button>
    </div>
  )
}

export default ModalEditBoard
