import { useEffect, useRef } from 'react'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

import Column from './Column'
import AddColumn from '../ActionBoard/AddColumn'

const ListColumn = ({ listColumn }) => {
  const listRef = useRef(null)
  const lengthColumnRef = useRef(listColumn?.length)

  useEffect(() => {
    if (listRef.current && listColumn?.length > lengthColumnRef.current) {
      listRef.current.scrollLeft = listRef.current.scrollWidth
      lengthColumnRef.current = listColumn?.length
    }
  }, [listColumn])

  return (
    <SortableContext items={listColumn?.map((column) => column.idColumn)} strategy={horizontalListSortingStrategy}>
      <ul ref={listRef} className='column-list'>
        {listColumn?.map((column) => (
          <Column key={column.idColumn} {...column} />
        ))}
        <AddColumn listRef={listRef} />
      </ul>
    </SortableContext>
  )
}

export default ListColumn
