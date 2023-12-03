import Header from './components/Header/Header'
import Loading from './components/Loading'
import Toasts from './components/Toasts/Toasts'
import Board from './layouts/Board/Board'

const App = () => {
  return (
    <div className='trello'>
      <div className='trello-inner'>
        <Header />
        <Board />
      </div>
      <Loading />
      <Toasts />
    </div>
  )
}

export default App
