import { useState, useContext } from 'react'
import { Ahorcado, NIVEL } from '../ahorcado'
import http from '../api/axios'
import { AuthContext } from '../context/authContext';
import Box from '../components/Box';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';


const Game = () => {
    const { authState } = useContext(AuthContext);
    // const [count, setCount] = useState(0)
    const [game, setGame] = useState<Ahorcado>()
    const [endGame, setEndGame] = useState('')
    const [timer, setTimer] = useState<number>()
    const [timeLeft, setTimeLeft] = useState<number>(0)
    const [playing, setPlaying] = useState(false)
    const [level, setLevel] = useState('facil')
    const [withTimer, setWithTimer] = useState<'Yes' | 'No'>('No')
    const [loadingStartingGame, setLoadingStartingGame] = useState(false)
    const letters = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 65))

    const clearPerson = (l: number) => {
        for (let j = 1; j <= l; j++) {
            const el = document.getElementById(j.toString())
            el?.classList.remove('block')
            el?.classList.add('hidden')
        }
    }

    // const game = new Ahorcado()
    const updateGame = async (letter: string) => {
        if (!game) return
        const newGame = game.verificarLetra(letter)
        setGame({ ...newGame })
        const isDone = newGame.finJuego()

        // update person body
        for (let j = 1; j <= newGame.letrasErradas.length; j++) {
            const el = document.getElementById(j.toString())
            el?.classList.remove('hidden')
            el?.classList.add('block', 'animate-pulse')
        }
        if (isDone !== 'Continua' || (withTimer === 'Yes' && timeLeft === 0)) return handleEndGame(game, isDone)

    }

    const handleEndGame = async (game: Ahorcado, isDone: string) => {
        setEndGame(isDone)
        clearInterval(timer)
        setTimer(undefined)
        // setTimeLeft(0)
        setPlaying(false)
        // setWithTimer('No')
        // store result in database
        try {
            const res = await http.post('/games', {
                ...game,
                userId: authState.user?.id,
                finalState: isDone,
                time: game.TIMER - timeLeft,
                withTimer: withTimer === 'Yes' ? true : false,
                date: new Date()
            })
            if (res.status === 200) {
                console.log('done suuccess')
            }
        } catch (error) {
            console.log('error')
        }
        game.reiniciarJuego()
        // alert('Juego terminado')
        // setGame(undefined)
    }

    const handleNewGame = () => {
        handleCloseModal()
        handleStartGame()
    }

    const handleCloseModal = () => {
        setGame(undefined)
        setEndGame('')
        clearPerson(8)
        setTimeLeft(0)
        // setWithTimer('No')

    }

    const handleStartGame = () => {
        console.log(withTimer, level)
        setLoadingStartingGame(true)
        const lev: NIVEL = level === 'facil' ? 'facil' : level === 'medio' ? 'medio' : 'dificil'
        const g = new Ahorcado(lev)
        setGame(g)
        if (withTimer === 'Yes') {
            setTimeLeft(g.TIMER)
            const intervalId = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev === 0) {
                        clearInterval(intervalId)
                        setEndGame('Perdiste')
                        setPlaying(false)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
            setTimer(intervalId)
        }
        setPlaying(true)
        setLoadingStartingGame(false)
    }


    return (
        <div className='flex h-screen justify-between flex-col'>
            <Navbar />
            {
                (playing || game !== undefined) ? (

                    <>
                        {
                            endGame !== '' && (
                                <div className="modal absolute w-screen h-screen  flex items-center justify-center bg-black/40 text-white z-30">
                                    <div className="modal-content w-f[90%] mx-8 sm:mx-0 sm:w-[350px] bg-slate-700 p-4   shadow rounded">
                                        <div className="modal-header mb-4 border-b border-slate-600 pb-2">
                                            <h2 className='text-2xl font-meduim'>Fin Juego</h2>
                                        </div>
                                        <div className="modal-body">
                                            {/* <p>Some text in the Modal Body</p> */}
                                            <p className={`${endGame === 'Ganaste' ? 'text-green-400' : 'text-red-400'}`}>
                                                {
                                                    endGame === 'Ganaste' ? `Felicidades ${authState.user?.fullName}, ganaste ` : `Perdiste ${authState.user?.fullName}, vuelve a intentarlo`
                                                }
                                            </p>
                                        </div>
                                        <div className="actions flex items-center justify-between mt-6  border-t border-slate-600 pt-2">
                                            <button className="px-3 py-1 bg-gradient-to-tl from-blue-500 to-red-400 rounded-full font-semibold"
                                                onClick={() => handleNewGame()}
                                            >
                                                Jugar de nuevo
                                            </button>
                                            <button className="px-3 py-1 border bg-transparent rounded-full border-slate-800 hover:bg-slate-800 duration-500"
                                                onClick={() => handleCloseModal()}
                                            >
                                                Cerrar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="container m-auto my-6 flex flex-col sm:flex-row gap-y-4">
                            <div className="content mx-2 sm:w-[50%] flex items-center flex-col bg-slate-600   gap-4">
                                <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                                    Fallos {game?.letrasErradas.length}/{game?.MAX_INTENTOS}
                                </div>
                                <div className="person my-4 w-full min-h-[300px] relative">

                                    <div className="base absolute bottom-0  w-[70px] h-[6px] z-10 bg-red-300  shadow  border-slate-900 "></div>
                                    <div className="left-side absolute left-0 sm:left-[20px] bottom-0 w-2 h-[325px] z-10 bg-red-300  shadow  border-slate-900 "></div>
                                    <div className=" top-side absolute -top-[25px] left-0 sm:left-[20px]  w-[50%] sm:w-[130px] h-[6px] z-10 bg-red-300  shadow  border-slate-900 relative"></div>
                                    <div className="top-pick  absolute -top-[25px] left-[50%] sm:left-[150px]  w-2 h-[50px] z-10 bg-red-300 shadow  border-slate-900 "></div>

                                    <div className="person relative w-full sm:w-[300px] h-fit  pb-20 grid  place-items-center ">
                                        <div id='1' className="header  w-[80px] h-[80px] z-10 bg-red-300 rounded-full shadow  border-slate-900 relative hidden">
                                            <div id='2' className="eye-left w-4 h-4 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[28px] left-[20px] hidden"></div>
                                            <div id='3' className="eye-right w-4 h-4 rounded-full border bg-slate-600  border-slate-600 shadow absolute top-[28px] right-[20px] hidden"></div>
                                        </div>
                                        <div className="body-person bg-red-300  -top-2 relative">
                                            <div id='4' className="tronc h-[100px] w-8 shadow hidden "></div>
                                            <div id='5' className="arm-left w-[20px] bg-red-300  absolute -rotate-45 !top-0 -right-[30px] h-[120px] hidden"></div>
                                            <div id='6' className="arm-right w-[20px] bg-red-300  absolute rotate-45 top-[0px] -left-[30px] h-[120px] hidden"></div>
                                            <div id='7' className="leg-left arm-left w-[20px] bg-red-300  absolute -rotate-45 top-[70px] left-[47px] h-[120px] hidden"></div>
                                            <div id='8' className="leg-right arm-left w-[20px] bg-red-300  absolute rotate-45 top-[70px] -left-[30px] h-[120px] hidden"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="theword mx-2 flex items-center justify-center gap-4 my-6 flex-wrap">
                                    {
                                        game?.palabraAdivinar.split('').map((letter: string, i: number) => (
                                            <div key={i} className='flex items-center w-8 h-8 border border-slate-800 justify-center text-slate-300 text-lg font-semibold  underline'>
                                                {game.palabraUsuario[i] === game.palabraAdivinar[i] ? letter : '_'}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            <div className="right mx-2  bg-slate-700 flex-1  sm:w-[50%]">
                                <div className='text-slate-400 w-full text-3xl font-semibold p-2 bg-slate-800 bg-gradient from-slate-700 to-slate-900 text-center text-lg '>
                                    Letras
                                </div>
                                <div className="letters flex items-center gap-4 flex-wrap p-4">
                                    {
                                        letters.map((letter, i) => (
                                            <button key={i}
                                                disabled={game?.letrasErradas.includes(letter.toLowerCase()) || game?.palabraUsuario.includes(letter.toLowerCase())}
                                                className={`w-12 h-12 rounded-full shadow flex items-center justify-center text-slate-300 border  border-slate-600   hover:bg-gray-800 ${game?.letrasErradas.includes(letter.toLowerCase()) && 'bg-red-400 disabled:hover:bg-red-400 '}  ${game?.palabraUsuario.includes(letter.toLowerCase()) && 'bg-green-400 disabled:hover:bg-green-400  text-slate-800'} `}
                                                onClick={() => updateGame(letter.toLowerCase())}
                                            >
                                                {letter}
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            (playing && withTimer === 'Yes') && (
                                <div className="timer text-slate-400 text-center my-6 flex items-center justify-center ">
                                    {/* <span>Te queda : </span> */}
                                    <div className={`flex bg-slate-800 items-center justify-center text-3xl animate-ping duration-500 font-bold text-slate-400 text-center w-20 h-20 rounded-full shadow ${timeLeft <= 5 ? 'text-red-400' : '!text-green-400'} `}>
                                        {timeLeft}
                                    </div>
                                </div>
                            )
                        }
                    </>

                ) : (
                    <div className="flex flex-col items-center justify-center h-full mx-2 sm:mx-0 ">
                        <Box className="levels w-full  sm:w-[350px]">
                            <h1 className='title-form text-2xl sm:text-4xl'>Configurar jugada</h1>
                            <fieldset>
                                <label htmlFor="Nivel" className='text-slate-400'>Nivel</label>
                                <select
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLevel(e.target.value)}
                                    name="levels" id="levels"
                                    className='bg-slate-900 text-slate-400'
                                >
                                    <option value="facil">Facil</option>
                                    <option value="medio">Medio</option>
                                    <option value="dificil">Dificil</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <label htmlFor="Nivel" className='text-slate-400'>Jugar con tiempo</label>
                                <div className="flex items-center w-full justify-between  border0 border-slate-600 p-2 bg-slate-900">
                                    <span className='flex items-center bg-red-3002 gap-1'>
                                        <label htmlFor='timer'>Si</label>
                                        <input type='radio' onChange={() => setWithTimer('Yes')} className='w-6 h-6' name='timer' value="yes" />
                                    </span>
                                    <span className='flex items-center bg-red-3003 gap-1'>
                                        <label htmlFor='timer' >No</label>
                                        <input type='radio' onChange={() => setWithTimer('No')} className='w-6 h-6' name='timer' value="No" />
                                    </span>
                                </div>
                            </fieldset>

                            <fieldset>
                                <button disabled={false}
                                    className='btn gradient'
                                    type='submit'
                                    onClick={() => handleStartGame()}
                                >
                                    {loadingStartingGame ? ('Iniciando juego...') : 'Iniciar juego'}
                                </button>
                            </fieldset>

                        </Box>
                    </div>
                )
            }
            <Footer />
        </div>
    )
}

export default Game