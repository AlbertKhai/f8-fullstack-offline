import FlowWithProvider from './components/FlowWithProvider'

const CreateMindmap = ({ params }) => {
  const { idMindmap } = params

  return (
    <main className='py-5 mx-auto'>
      <FlowWithProvider idMindmap={idMindmap} />
    </main>
  )
}

export default CreateMindmap
