import { useState } from 'react'
import './App.css'
import { Ahorcado } from './ahorcado'

function App() {
  // const [count, setCount] = useState(0)
  const [game, setGame] = useState<Ahorcado>(new Ahorcado())
  const [endGame, setEndGame] = useState('')
  // create a array with the letters of the alphabet
  const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65))

  // const game = new Ahorcado()
  const updateGame = (letter: string) => {

    const newGame = game.verificarLetra(letter)
    // console.log('NEW GAME :: ', newGame)
    setGame({ ...newGame })
    if (newGame.finJuego() !== 'Continua') {
      setEndGame(newGame.finJuego())
      newGame.reiniciarJuego()
      return
    }



    for (let j = 1; j <= newGame.letrasErradas.length; j++) {
      const el = document.getElementById(j.toString())
      console.log('el :: ', el)
      el?.classList.remove('hidden')
      el?.classList.add('block')
      el?.classList.add('animate-shake')
      // document.getElementById(j.toString())?.classList.add('block')
      // document.getElementById(j.toString())?.classList.remove('hidden')

    }

    // if (newGame.letrasErradas.length > 1) {
    //   document.getElementById('1')?.classList.add('animate-shake', 'bg-green-300')
    // }


  }


  return (
    <div className='min-h-screen flex flex-col justify-between'>

      {
        endGame !== '' && (
          <div className="modal absolute w-screen h-screen  flex items-center justify-center bg-black/40 text-white z-30">
            <div className="modal-content w-full sm:w-[350px] bg-slate-700 p-4   shadow rounded">
              <div className="modal-header mb-4 border-b border-slate-600 pb-2">
                <h2 className='text-2xl font-meduim'>Fin Juego</h2>
              </div>
              <div className="modal-body">
                {/* <p>Some text in the Modal Body</p> */}
                <p>{endGame || 'Ganaste despues de 10 intentos '}</p>
              </div>

              <div className="actions flex items-center justify-between mt-6  border-t border-slate-600 pt-2">
                <button className="px-3 py-1 bg-gradient-to-tl from-blue-500 to-red-400 rounded-full font-semibold">New Game</button>
                <button className="px-3 py-1 border bg-transparent rounded-full border-slate-800 hover:bg-slate-800 duration-500">Close</button>
              </div>

            </div>
          </div>
        )
      }


      <header className='bg-slate-800 p-2 text-center text-white'>cabecera</header>

      <div className="container m-auto my-6">
        <div className="content flex items-center my-4 flex-col md:flex-row  justify-between gap-4">

          <div className="left  bg-slate-600">
            <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg hidden '>
              Fallos 5/7
            </div>
            <div className="person my-4">
              <div className="person relative w-[300px] h-fit  pb-20 grid  place-items-center ">
                <div id='1' className="header w-[150px] h-[150px] z-10 bg-red-300 rounded-full shadow  border-slate-900 relative hidden">
                  <div id='2' className="eye-left w-12 h-12 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[36px] left-[20px] hidden"></div>
                  <div id='3' className="eye-right w-12 h-12 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[36px] right-[20px] hidden"></div>
                </div>
                <div className="body-person bg-red-300  -top-2 relative">
                  <div id='4' className="tronc h-[140px] w-12 shadow hidden "></div>
                  <div id='5' className="arm-left w-[30px] bg-red-300  absolute -rotate-45 top-[18px] -right-[46px] h-[120px] hidden"></div>
                  <div id='6' className="arm-right w-[30px] bg-red-300  absolute rotate-45 top-[18px] -left-[46px] h-[120px] hidden"></div>
                  <div id='7' className="leg-left arm-left w-[30px] bg-red-300  absolute -rotate-45 top-[108px] -right-[46px] h-[120px] hidden"></div>
                  <div id='8' className="leg-right arm-left w-[30px] bg-red-300  absolute rotate-45 top-[108px] -left-[46px] h-[120px] hidden"></div>
                </div>
              </div>
            </div>

            <div className="theword mx-2 flex items-center justify-center gap-x-6 my-6">
              {
                game.palabraAdivinar.split('').map((letter, i) => (
                  <div key={i} className='flex items-center w-8 h-8 border border-slate-800 justify-center text-slate-300 text-lg font-semibold  underline'>
                    {game.palabraUsuario[i] === game.palabraAdivinar[i] ? letter : '_'}
                  </div>
                ))
              }
            </div>
          </div>
          {/* <div className="text-gray-200 flex flex-col gap-4">
            <span> PAL. ADV:: {game.palabraAdivinar} </span>
            <span>Pal. USU ::  {game.palabraUsuario.join(',')}</span>
            <span>Errores :: {game.letrasErradas.join(',')}</span>
            <span> Intentos :: {game.intentos}</span>
          </div> */}

          <div className="right bg-slate-700 w-[500px]">
            <div className="right-header">
              <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                Letras
              </div>
              <div className="letters flex items-center gap-4 flex-wrap p-4">
                {
                  letters.map((letter, i) => (
                    <button key={i}
                      disabled={game.letrasErradas.includes(letter.toLowerCase()) || game.palabraUsuario.includes(letter.toLowerCase())}
                      className={`w-12 h-12 rounded-full shadow flex items-center justify-center text-slate-300 border  border-slate-600   hover:bg-gray-800 ${game.letrasErradas.includes(letter.toLowerCase()) && 'bg-red-400 disabled:hover:bg-red-400 '}  ${game.palabraUsuario.includes(letter.toLowerCase()) && 'bg-green-400 disabled:hover:bg-green-400  text-slate-800'} `}
                      onClick={() => updateGame(letter.toLowerCase())}
                    >
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
