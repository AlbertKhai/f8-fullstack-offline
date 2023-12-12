import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { postNewColumn, updateCard, updateColumn } from '~/helper/actionsSlice'
import { findColumnByCard, moveCardBetweenColumn } from '~/helper/supportHandleDnd'
import { postTaskMiddleware } from '~/redux/middlewares/postTasksMiddleware'
import Card from './Card/Card'
import Column from './Column/Column'
import ListColumn from './Column/ListColumn'

const typeItemDragging = { column: 'typeColumn', card: 'typeCard' }

const Board = () => {
  const listColumn = useSelector(({ column }) => column.list)
  const onColumnChange = useSelector(({ column }) => column.change)
  const dispatch = useDispatch()

  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [columnBeforeDragging, setColumnBeforeDragging] = useState(null)

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  const sensors = useSensors(mouseSensor, touchSensor)

  const lastOverId = useRef(null)

  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.ofIdColumn ? typeItemDragging.card : typeItemDragging.column)
    setActiveDragItemData(e?.active?.data?.current)

    if (e?.active?.data?.current?.ofIdColumn) {
      setColumnBeforeDragging(findColumnByCard(listColumn, e.active.data.current.ofIdColumn))
    }
  }

  const handleDragOver = (e) => {
    const { active, over } = e

    if (!active || !over) return

    const {
      id: idCardDragging,
      data: { current: dataCardDragging }
    } = active

    const {
      id: idCardOver,
      data: { current: dataCardOver }
    } = over

    const activeColumn = findColumnByCard(listColumn, dataCardDragging.ofIdColumn)
    const overColumn = findColumnByCard(listColumn, dataCardOver.ofIdColumn)

    if (!activeColumn || !overColumn) return
    if (activeColumn.idColumn !== overColumn.idColumn) {
      moveCardBetweenColumn(
        active,
        over,
        activeColumn,
        overColumn,
        idCardDragging,
        idCardOver,
        dataCardDragging,
        dataCardOver,
        listColumn,
        dispatch,
        updateColumn
      )
    }
  }

  const handleDragEnd = (e) => {
    const { active, over } = e

    if (!active || !over) return

    if (activeDragItemType === typeItemDragging.card) {
      const {
        id: idCardDragging,
        data: { current: dataCardDragging }
      } = active

      const {
        id: idCardOver,
        data: { current: dataCardOver }
      } = over

      const activeColumn = findColumnByCard(listColumn, dataCardDragging.ofIdColumn)
      const overColumn = findColumnByCard(listColumn, dataCardOver.ofIdColumn)

      // Nếu không lấy được column thì return
      if (!activeColumn || !overColumn) return

      if (columnBeforeDragging.idColumn !== overColumn.idColumn) {
        // Kéo thả card khác column
        moveCardBetweenColumn(
          active,
          over,
          activeColumn,
          overColumn,
          idCardDragging,
          idCardOver,
          dataCardDragging,
          dataCardOver,
          listColumn,
          dispatch,
          updateColumn
        )
      } else {
        // Kéo thả card trong column
        const oldCardIndex = columnBeforeDragging?.listCard?.findIndex(({ idCard }) => idCard === activeDragItemId)
        const newCardIndex = overColumn?.listCard?.findIndex(({ idCard }) => idCard === idCardOver)
        const newListCard = arrayMove(columnBeforeDragging?.listCard, oldCardIndex, newCardIndex)
        dispatch(updateCard({ ofIdColumn: dataCardOver.ofIdColumn, newListCard }))
      }
    }

    if (activeDragItemType === typeItemDragging.column && active.id !== over.id) {
      const oldColumnIndex = listColumn.findIndex((column) => column.idColumn === active.id)
      const newColumnIndex = listColumn.findIndex((column) => column.idColumn === over.id)
      const newColumnsSorted = arrayMove(listColumn, oldColumnIndex, newColumnIndex)
      dispatch(updateColumn(newColumnsSorted))
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setColumnBeforeDragging(null)
    dispatch(postNewColumn())
  }

  const dropAnimation = { sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }) }

  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === typeItemDragging.column) {
        return closestCorners({ ...args })
      }

      const pointerIntersections = pointerWithin(args)

      if (!pointerIntersections.length) return

      let overId = getFirstCollision(pointerIntersections, 'id')

      if (overId) {
        const checkColumn = listColumn?.find((column) => column.idColumn === overId)

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.listCard?.some(({ idCard }) => idCard === container.id)
            })
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId }] : []
    },
    [activeDragItemType, listColumn]
  )

  useEffect(() => {
    if (onColumnChange && listColumn) {
      dispatch(postTaskMiddleware(listColumn))
    }
  }, [onColumnChange])

  return (
    <main className='board'>
      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <ListColumn listColumn={listColumn} />
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemType &&
            (activeDragItemType === typeItemDragging.column ? (
              <Column {...activeDragItemData} />
            ) : (
              <Card {...activeDragItemData} />
            ))}
        </DragOverlay>
      </DndContext>
    </main>
  )
}

export default Board
