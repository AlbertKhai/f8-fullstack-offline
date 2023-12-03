import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import Column from './Column/Column'
import AddColumn from './Column/AddColumn'

const Board = () => {
  const listColumn = useSelector(({ column }) => column.list)
  const listRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollLeft = listRef.current.scrollWidth
    }
  }, [listColumn])

  return (
    <main className='board'>
      <ul ref={listRef} className='column-list'>
        {listColumn.map((column) => (
          <Column key={column.idColumn} {...column} />
        ))}
        <AddColumn listRef={listRef} />
      </ul>
    </main>
  )
}

export default Board
