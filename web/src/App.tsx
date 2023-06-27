import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  // create a array with the letters of the alphabet
  const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65))

  const theWord = 'javascript'

  return (
    <div className='min-h-screen flex flex-col justify-between'>

      <header className='bg-slate-800 p-2 text-center text-white'>cabecera</header>

      <div className="container m-auto my-6">
        <div className="content flex items-center my-4 flex-col md:flex-row  justify-between gap-4">

          <div className="left  bg-slate-600">
            <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
              Fallos 5/7
            </div>
            <div className="person my-4">
              <div className="person relative w-[300px] h-fit  pb-20 grid  place-items-center">
                <div className="header w-[150px] h-[150px] z-10 bg-red-300 rounded-full shadow  border-slate-900 relative">
                  <div className="eye-left w-12 h-12 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[36px] left-[20px]"></div>
                  <div className="eye-right w-12 h-12 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[36px] right-[20px]"></div>
                </div>
                <div className="body bg-red-300  -top-2 relative">
                  <div className="tronc h-[140px] w-12 shadow "></div>
                  <div className="arm-left w-[30px] bg-red-300  absolute -rotate-45 top-[18px] -right-[46px] h-[120px]"></div>
                  <div className="arm-right w-[30px] bg-red-300  absolute rotate-45 top-[18px] -left-[46px] h-[120px]"></div>
                  <div className="leg-left arm-left w-[30px] bg-red-300  absolute -rotate-45 top-[108px] -right-[46px] h-[120px]"></div>
                  <div className="leg-right arm-left w-[30px] bg-red-300  absolute rotate-45 top-[108px] -left-[46px] h-[120px]"></div>
                </div>
              </div>
            </div>

            <div className="theword bg-red-300 mx-2 flex items-center justify-center gap-x-6 my-6">
              {
                theWord.split('').map((letter, i) => (
                  <div key={i} className='flex items-center justify-center text-slate-300 text-lg font-semibold  underline'>
                    {letter}
                  </div>
                ))
              }
            </div>
          </div>

          <div className="right bg-slate-700 w-[500px]">
            <div className="right-header">
              <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                Letras
              </div>
              <div className="letters flex items-center gap-4 flex-wrap p-4">
                {
                  letters.map((letter, i) => (
                    <button key={i} className='w-12 h-12 rounded-full shadow flex items-center justify-center text-slate-300 border border-slate-600 hover:bg-gray-800 '>
                      {letter}
                    </button>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className='bg-slate-800 text-center p-4 mt-auto'>
        <span className='text-slate-400'>@Ivo_Messeroux 2023 | Ahorcado </span>
      </footer>
    </div>
  )
}

export default App
