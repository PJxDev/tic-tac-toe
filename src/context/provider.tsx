import { ReactNode, useState } from 'react'
import { Cuadricula, EquisO, Results } from '../types'
import { GameContext } from './context'

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [playerMark, setPlayerMark] = useState<EquisO>('X')
  const [isVsCpu, setIsVsCpu] = useState<boolean>(false)
  const [turn, setTurn] = useState<EquisO>('X')
  const [results, setResults] = useState<Results>({ x: 0, ties: 0, o: 0 })
  const [cuadricula, setCuadricula] = useState<Cuadricula>({
    c11: '',
    c12: '',
    c13: '',
    c21: '',
    c22: '',
    c23: '',
    c31: '',
    c32: '',
    c33: ''
  })
  const [isTie, setIsTie] = useState<boolean>(false)
  const [isRestarting, setIsRestarting] = useState<boolean>(false)
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [isWinner, setIsWinner] = useState<{
    player: EquisO | null
    show: boolean
  }>({ player: null, show: false })

  const configGame = {
    isVsCpu,
    setIsVsCpu,
    playerMark,
    setPlayerMark
  }
  const statusGame = {
    turn,
    setTurn,
    results,
    setResults,
    cuadricula,
    setCuadricula,
    isTie,
    setIsTie,
    isRestarting,
    setIsRestarting,
    isWinner,
    setIsWinner,
    isGameStarted,
    setIsGameStarted
  }

  return (
    <GameContext.Provider value={{ configGame, statusGame }}>
      {children}
    </GameContext.Provider>
  )
}
