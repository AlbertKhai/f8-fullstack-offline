'use client'
import { ReactFlowProvider } from 'reactflow'
import MindmapFlow from './MindmapFlow/MindmapFlow'
import HeaderMindmap from './HeaderMindmap/HeaderMindmap'

function FlowWithProvider(props) {
  return (
    <ReactFlowProvider>
      <HeaderMindmap {...props} />
      <MindmapFlow {...props} />
    </ReactFlowProvider>
  )
}

export default FlowWithProvider
