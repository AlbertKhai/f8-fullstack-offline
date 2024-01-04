'use client'
import { ReactFlowProvider } from 'reactflow'
import MindmapFlow from './MindmapFlow/MindmapFlow'

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <MindmapFlow {...props} />
    </ReactFlowProvider>
  )
}

export default FlowWithProvider
