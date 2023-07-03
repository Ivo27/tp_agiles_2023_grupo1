import { useEffect, useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'
import http from './api/axios'
import { IGame } from './views/Dashboard'
import DefaultAvatar from './components/DefaultAvatar'


function App() {

  const [faciles, setFaciles] = useState<IGame[]>([])
  const [medios, setMedios] = useState<IGame[]>([])
  const [dificiles, setDificiles] = useState<IGame[]>([])
  useEffect(() => {

    http.get(`/games?nivel=facil&finalState=Ganaste&_expand=user&userId_ne=null&_sort=intentos,time&_order=desc,desc`).then(res => {
      console.log(res.data)
      setFaciles(res.data)
    }).catch(err => console.log(err))

    http.get(`/games?nivel=medio&finalState=Ganaste&_expand=user&userId_ne=null&_sort=intentos&_order=desc`).then(res => {
      console.log(res.data)
      setMedios(res.data)
    }).catch(err => console.log(err))

    http.get(`/games?nivel=dificil&finalState=Ganaste&_expand=user&userId_ne=null&_sort=intentos&_order=desc`).then(res => {
      console.log(res.data)
      setDificiles(res.data)
    }).catch(err => console.log(err))

  }, [])

  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Navbar />
      <div className="">
        <div className="my-games container mx-auto my-7">
          <h1 className='title-form text-2xl sm:text-4xl'>TOP 10</h1>
          <span className='text-slate-400'>(Facil)</span>
          <div className="flex flex-col mt-1">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-sm text-gray-400">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th></th>
                        <th scope="col" className="px-2 w-40 py-3 text-left tracking-wider">
                          JUGADOR
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Pal. Adv.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          ESTADO
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          NIVEL
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          INT.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          TIMER
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Entradas
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800" id='table-dashboard'>
                      {faciles.map((game: IGame, index: number) => (
                        <tr key={game.id} className={`border-b border-slate-600 ${index % 2 === 0 && 'bg-black bg-opacity-20'}`}>
                          <td className="pl-4"> {game.id} </td>
                          <td className="px-2 py-1 w-fit flex top-[6px] relative  items-center   h-full whitespace-nowrap">
                            {game?.user?.photo ? (<img className="w-8 h-8 rounded-full shadow border border-slate-700 object-cover" src={game.user.photo} alt="" />) : (<DefaultAvatar />)}
                            <span className="ml-2 font-medium">{game?.user?.fullName || 'Desconocido'}</span>
                          </td>
                          <td className="px-2 py-1  whitespace-nowrap"> {game.palabraAdivinar} </td>
                          <td className={`px-2 py-1 whitespace-nowrap ${game.finalState !== 'Ganaste' ? 'text-red-400' : 'text-green-400'} `}>
                            {game.finalState === 'Continua' ? 'Perdiste' : game.finalState}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap capitalize"> {game.nivel} </td>
                          <td className="px-2 py-1 whitespace-nowrap"> {game.allInputs.length} </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {game.withTimer ? `${game.time}s` : '---'}


                          </td>
                          <td className="px-2  flex items-center place-items-center  bottom-[6px] relative !mt-0 whitespace-nowrap">
                            {
                              game.allInputs.map((input: string) => {
                                if (game.palabraAdivinar.includes(input)) {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                      </svg>
                                    </div>

                                  )
                                }
                              })
                            }
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div >
            </div >
          </div >
        </div >

        <div className="my-games container mx-auto my-7">
          <h1 className='title-form text-2xl sm:text-4xl'>TOP 10</h1>
          <span className='text-slate-400'>(Medio)</span>
          <div className="flex flex-col mt-1">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-sm text-gray-400">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th></th>
                        <th scope="col" className="px-2 w-40 py-3 text-left tracking-wider">
                          JUGADOR
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Pal. Adv.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          ESTADO
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          NIVEL
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          INT.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          TIMER
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Entradas
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800" id='table-dashboard'>
                      {medios.map((game: IGame, index: number) => (
                        <tr key={game.id} className={`border-b border-slate-600 ${index % 2 === 0 && 'bg-black bg-opacity-20'}`}>
                          <td className="pl-4"> {game.id} </td>
                          <td className="px-2 py-1 w-fit flex top-[6px] relative  items-center   h-full whitespace-nowrap">
                            {game?.user?.photo ? (<img className="w-8 h-8 rounded-full shadow border border-slate-700 object-cover" src={game.user.photo} alt="" />) : (<DefaultAvatar />)}
                            <span className="ml-2 font-medium">{game?.user?.fullName || 'Desconocido'}</span>
                          </td>
                          <td className="px-2 py-1  whitespace-nowrap"> {game.palabraAdivinar} </td>
                          <td className={`px-2 py-1 whitespace-nowrap ${game.finalState !== 'Ganaste' ? 'text-red-400' : 'text-green-400'} `}>
                            {game.finalState === 'Continua' ? 'Perdiste' : game.finalState}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap capitalize"> {game.nivel} </td>
                          <td className="px-2 py-1 whitespace-nowrap"> {game.allInputs.length} </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {game.withTimer ? `${game.time}s` : '---'}


                          </td>
                          <td className="px-2  flex items-center place-items-center  bottom-[6px] relative !mt-0 whitespace-nowrap">
                            {
                              game.allInputs.map((input: string) => {
                                if (game.palabraAdivinar.includes(input)) {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                      </svg>
                                    </div>

                                  )
                                }
                              })
                            }
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div >
            </div >
          </div >
        </div >

        <div className="my-games container mx-auto my-7">
          <h1 className='title-form text-2xl sm:text-4xl'>TOP 10</h1>
          <span className='text-slate-400'>(Dificil)</span>
          <div className="flex flex-col mt-1">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full text-sm text-gray-400">
                    <thead className="bg-gray-800 text-xs uppercase font-medium">
                      <tr>
                        <th></th>
                        <th scope="col" className="px-2 w-40 py-3 text-left tracking-wider">
                          JUGADOR
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Pal. Adv.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          ESTADO
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          NIVEL
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          INT.
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          TIMER
                        </th>
                        <th scope="col" className="px-2 py-3 text-left tracking-wider">
                          Entradas
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800" id='table-dashboard'>
                      {dificiles.map((game: IGame, index: number) => (
                        <tr key={game.id} className={`border-b border-slate-600 ${index % 2 === 0 && 'bg-black bg-opacity-20'}`}>
                          <td className="pl-4"> {game.id} </td>
                          <td className="px-2 py-1 w-fit flex top-[6px] relative  items-center   h-full whitespace-nowrap">
                            {game?.user?.photo ? (<img className="w-8 h-8 rounded-full shadow border border-slate-700 object-cover" src={game.user.photo} alt="" />) : (<DefaultAvatar />)}
                            <span className="ml-2 font-medium">{game?.user?.fullName || 'Desconocido'}</span>
                          </td>
                          <td className="px-2 py-1  whitespace-nowrap"> {game.palabraAdivinar} </td>
                          <td className={`px-2 py-1 whitespace-nowrap ${game.finalState !== 'Ganaste' ? 'text-red-400' : 'text-green-400'} `}>
                            {game.finalState === 'Continua' ? 'Perdiste' : game.finalState}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap capitalize"> {game.nivel} </td>
                          <td className="px-2 py-1 whitespace-nowrap"> {game.allInputs.length} </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {game.withTimer ? `${game.time}s` : '---'}


                          </td>
                          <td className="px-2  flex items-center place-items-center  bottom-[6px] relative !mt-0 whitespace-nowrap">
                            {
                              game.allInputs.map((input: string) => {
                                if (game.palabraAdivinar.includes(input)) {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div key={input} className="flex flex-col items-center justify-center">
                                      <span>{input}</span>
                                      <svg className="w-4 fill-current text-red-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                      </svg>
                                    </div>

                                  )
                                }
                              })
                            }
                          </td>
                        </tr>
                      ))}

                    </tbody>
                  </table>
                </div>
              </div >
            </div >
          </div >
        </div >


      </div >
      {/* <Outlet /> */}
      < Footer />
    </div >
  )
}

export default App
