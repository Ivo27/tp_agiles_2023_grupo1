import './App.css'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Navbar />
      <Outlet />
      <footer className='bg-slate-800 text-center p-4 mt-auto'>
        <span className='text-slate-400'>@Ivo_Messeroux 2023 | Ahorcado </span>
      </footer>
    </div>
  )
}

export default App
