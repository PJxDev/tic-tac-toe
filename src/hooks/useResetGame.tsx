import { useGameContext } from "./useGameContext"


export const useResetGame = () => {
  const { configGame: {setPlayerMark, setIsVsCpu }, statusGame: { setTurn, setResults, setCuadricula, setIsWinner, setIsTie, setIsGameStarted } } = useGameContext()
  
  return (full?: boolean) => {
    setTurn('X')
    setIsWinner({ player: null, show: false })
    setIsTie(false)
    setCuadricula({
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
    if (full) {
      setResults({ x: 0, o: 0, ties: 0 })
      setIsVsCpu(false)
      setPlayerMark('X')
      setIsGameStarted(false)
    }
  }
}
