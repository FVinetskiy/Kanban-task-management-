import './BoardEmpty.scss'
import {FC} from 'react'

type PropsBoardEmpty = {
  NewColumn: React.MouseEventHandler<HTMLButtonElement>
}

const BoardEmpty: FC<PropsBoardEmpty> = ({NewColumn}) => {
  return (
    <div className='BoardEmpty'>
      <p className='BoardEmpty__text'>
        This board is empty. Create a new column to get started.
      </p>
      <button onClick={NewColumn} className='button button--auto'>
        + Add New Column
      </button>
    </div>
  )
}

export default BoardEmpty
