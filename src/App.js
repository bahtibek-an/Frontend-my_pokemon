import { Route, Routes } from 'react-router-dom'
import { Pokemon, Main } from './components'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/pokemon/:name' element={<Pokemon />} />
      </Routes>
    </div>
  )
}

export default App