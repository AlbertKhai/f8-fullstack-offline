import { useCallback, memo, useRef, useState, useEffect } from 'react'
import { Handle, Position, useReactFlow } from 'reactflow'
import clsx from 'clsx'

const CustomNode = memo(function CustomNode({ id, data, isConnectable }) {
  const inputNode = useRef(null)
  const { deleteElements } = useReactFlow()
  const [readOnly, setReadOnly] = useState(true)

  const onChangeLabel = useCallback(
    (e) => {
      data?.handleChangeLabel(id, e.target.value)
    },
    [data?.handleChangeLabel]
  )

  const handle = (e) => {
    const codeDel = ['Delete', 'Backspace']
    if (codeDel.includes(e.code) && readOnly) {
      console.log(id)
      deleteElements({ nodes: [{ id }] })
    }
  }

  return (
    <div onKeyUp={handle} className='react-flow__node text-xs select-none'>
      {id !== '0' && <Handle type='target' position={Position.Top} isConnectable={isConnectable} />}
      <input
        ref={inputNode}
        name='text'
        onDoubleClick={() => setReadOnly(false)}
        onBlur={() => setReadOnly(true)}
        readOnly={readOnly}
        onChange={onChangeLabel}
        className={clsx(
          'text-white text-center h-full max-w-full read-only:cursor-grab outline-0 px-1 bg-transparent',
          !readOnly && 'nodrag'
        )}
        value={data.label}
      />
      <Handle type='source' position={Position.Bottom} isConnectable={isConnectable} />
    </div>
  )
})

export default CustomNode
