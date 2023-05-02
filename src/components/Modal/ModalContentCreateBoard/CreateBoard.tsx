import {useState, useContext, FC} from 'react'
import './CreateBoard.scss'
import {Cross} from '../../icons/cross'
import {DataContext} from '../../../context/DataContext'
import Input from '../../UI/Input/Input'

const newColumn = [
  {
    name: 'Doing',
    tasks: [],
    value: 'Doing',
  },
  {
    name: 'Todo',
    tasks: [],
    value: 'Todo',
  },
]

type TypePropsCreateBoard = {
  closeModal: Function
}

const CreateBoard: FC<TypePropsCreateBoard> = ({closeModal}) => {
  const {boardData, setBoardData, activeTab, isMobile, setShowNav} =
    useContext(DataContext)
  const [name, setName] = useState('')
  const [stateArrInput, setValueNameFirst] = useState(newColumn)

  const createDefBoard = () => {
    const NewBoard = {
      id: String(Math.floor(Math.random() * 98) + 4),
      name: name,
      columns: stateArrInput,
    }
    const newBoardList = [...boardData]
    newBoardList.push(NewBoard)
    setBoardData(newBoardList)
    closeModal(false)

    if (isMobile === true) {
      setShowNav(false)
    }
  }

  const addColumn = () => {
    setValueNameFirst(stateArrInput.concat([{name: '', value: '', tasks: []}]))
  }

  const deleteInput = (index: any) => {
    setValueNameFirst([
      ...stateArrInput.slice(0, index),
      ...stateArrInput.slice(index + 1),
    ])
  }

  const handleInputChange = (value, i) => {
    setValueNameFirst((prev) => {
      const arr2 = [...prev]
      arr2[i].value = value
      arr2[i].name = value
      return arr2
    })
  }

  return (
    <div className='create-board'>
      <p className='create-board__title'>Add New Board</p>
      <div className='create-board__item'>
        <p className='create-board__sub-title'>Name</p>
        <div className='create-board__wrap-input'>
          <Input
            placeholder={'e.g. Web Design'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className='create-board__item'>
        {stateArrInput.length > 0 ? (
          <p className='create-board__sub-title'>Columns</p>
        ) : null}
        {stateArrInput.map((item, i) => (
          <div className='create-board__wrap-input' key={i}>
            <Input
              placeholder={'e.g. Web Design'}
              value={item.value}
              onChange={(e) => handleInputChange(e.target.value, i)}
            />

            <button
              onClick={() => deleteInput(i)}
              className='create-board__delete-input'>
              <Cross />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addColumn} className='new-column'>
        + Add New Column
      </button>
      <button
        disabled={name.length === 0}
        className='new-board'
        onClick={createDefBoard}>
        Create New Board
      </button>
    </div>
  )
}

export default CreateBoard
