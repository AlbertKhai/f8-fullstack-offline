'use client'
import { useCallback, useEffect, useRef } from 'react'
import ReactFlow, { Background, Controls, MiniMap, addEdge, useEdgesState, useNodesState, useReactFlow } from 'reactflow'

import 'reactflow/dist/style.css'
import '../assets/scss/mindmap.scss'

import CustomNode from './CustomNode'

const nodeTypes = { customNode: CustomNode }

const MindmapFlow = ({ initialNodes, initialEdges }) => {
  const reactFlowWrapper = useRef(null)
  const connectingNodeId = useRef(null)
  const { screenToFlowPosition } = useReactFlow()
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params) => {
    connectingNodeId.current = null
    setEdges((eds) => addEdge(params, eds))
  }, [])

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId
  }, [])

  const onChangeLabel = useCallback((idNode, label) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === idNode) {
          return {
            ...node,
            data: {
              ...node.data,
              label
            }
          }
        }
        return node
      })
    )
  }, [])

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return

      const targetIsPane = event.target.classList.contains('react-flow__pane')

      if (targetIsPane) {
        const id = `${+nodes.at(-1).id + 1}`
        const newNode = {
          id,
          type: 'customNode',
          deletable: true,
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY
          }),
          data: { label: `Node ${id}`, handleChangeLabel: onChangeLabel },
          origin: [0.5, 0.0]
        }

        setNodes((nds) => nds.concat(newNode))
        setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }))
      }
    },
    [screenToFlowPosition, nodes]
  )

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        return {
          ...node,
          data: {
            ...node.data,
            handleChangeLabel: onChangeLabel
          }
        }
      })
    )
  }, [])

  return (
    <div className='py-5' style={{ width: '100%', height: '500px' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        nodeOrigin={[0.5, 0]}
        deleteKeyCode={['Delete', 'Backspace']}
      >
        <Controls />
        <MiniMap />
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default MindmapFlow
