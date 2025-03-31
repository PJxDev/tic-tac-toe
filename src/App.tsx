import LOGO from './assets/logo.svg?react'
import REMATCH from '/redo-icon.svg?url'
import X from './assets/x.svg?react'
import O from './assets/o.svg?react'
import { BotonTurno } from './components/BotonTurno.tsx'
import { CeldaComponent } from './components/CeldaComponent.tsx'
import { Marcador } from './components/Marcador.tsx'
import { useGameContext } from './hooks/useGameContext.tsx'
import { useEffect } from 'react'
import { Cuadricula, Results } from './types.ts'
import { useResetGame } from './hooks/useResetGame.tsx'
import { PopupBanner } from './components/PopupBanner.tsx'

function App() {
  const {
    configGame: { playerMark, setPlayerMark, isVsCpu, setIsVsCpu },
    statusGame: {
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
  } = useGameContext()
  const resetGame = useResetGame()

  const WIN_CONDITIONS: (keyof Cuadricula)[][] = [
    ['c11', 'c12', 'c13'],
    ['c21', 'c22', 'c23'],
    ['c31', 'c32', 'c33'],
    ['c11', 'c21', 'c31'],
    ['c12', 'c22', 'c32'],
    ['c13', 'c23', 'c33'],
    ['c11', 'c22', 'c33'],
    ['c13', 'c22', 'c31']
  ]

  const handleReset = () => {
    resetGame()
    setIsRestarting(false)
  }
  const handleButtonRestart = () => {
    if (isWinner.show || isTie) return
    setIsRestarting(true)
  }
  const handleStartGame = ({ CPU }: { CPU: boolean }) => {
    setIsGameStarted(true)
    setIsVsCpu(CPU)
    if (CPU && playerMark === 'O') cpuMoves(false)
  }

  const cpuMoves = (playerWin: boolean) => {
    if (playerWin) return

    const center: keyof Cuadricula = 'c22'
    const corners: (keyof Cuadricula)[] = ['c11', 'c13', 'c31', 'c33']
    const edges: (keyof Cuadricula)[] = ['c12', 'c21', 'c23', 'c32']

    const playerInCorners = corners.filter(
      (corner) => cuadricula[corner] === playerMark
    )
    const availableEdges = edges.filter((edge) => cuadricula[edge] === '')
    const availablePositions = Object.entries(cuadricula).filter(
      ([, value]) => {
        return value === ''
      }
    )

    const playerWinCondition = WIN_CONDITIONS.find((condition) => {
      const [a, b, c] = condition
      return (
        (cuadricula[a] === playerMark &&
          cuadricula[b] === playerMark &&
          cuadricula[c] === '') ||
        (cuadricula[a] === playerMark &&
          cuadricula[c] === playerMark &&
          cuadricula[b] === '') ||
        (cuadricula[b] === playerMark &&
          cuadricula[c] === playerMark &&
          cuadricula[a] === '')
      )
    })
    const cpuWinCondition = WIN_CONDITIONS.find((condition) => {
      const [a, b, c] = condition
      return (
        (cuadricula[a] === turn &&
          cuadricula[b] === turn &&
          cuadricula[c] === '') ||
        (cuadricula[a] === turn &&
          cuadricula[c] === turn &&
          cuadricula[b] === '') ||
        (cuadricula[b] === turn &&
          cuadricula[c] === turn &&
          cuadricula[a] === '')
      )
    })

    if (cuadricula[center] === '') {
      setTimeout(() => {
        setCuadricula({ ...cuadricula, [center]: turn })
        setTurn(turn === 'X' ? 'O' : 'X')
      }, 750)
      return
    } else if (cpuWinCondition) {
      const cellToWin = cpuWinCondition.find((cell) => cuadricula[cell] === '')
      if (!cellToWin) return
      setTimeout(() => {
        setCuadricula({ ...cuadricula, [cellToWin]: turn })
        setTurn(turn === 'X' ? 'O' : 'X')
      }, 750)
      return
    } else if (playerWinCondition) {
      const cellToBlock = playerWinCondition.find(
        (cell) => cuadricula[cell] === ''
      )
      if (!cellToBlock) return
      setTimeout(() => {
        setCuadricula({ ...cuadricula, [cellToBlock]: turn })
        setTurn(turn === 'X' ? 'O' : 'X')
      }, 750)
      return
    } else if (playerInCorners.length === 2) {
      if (availableEdges.length === 0) return

      setTimeout(() => {
        setCuadricula({ ...cuadricula, [availableEdges[0]]: turn })
        setTurn(turn === 'X' ? 'O' : 'X')
      }, 750)
      return
    } else {
      if (availablePositions.length === 0) return
      const randomIndex = Math.floor(Math.random() * availablePositions.length)
      const [key] = availablePositions[randomIndex]
      const newCuadricula = { ...cuadricula, [key]: turn }
      setTimeout(() => {
        setCuadricula(newCuadricula)
        setTurn(turn === 'X' ? 'O' : 'X')
      }, 750)
    }
  }

  useEffect(() => {
    const playerWin = checkWinner({ cuadricula })
    if (isVsCpu && turn !== playerMark) {
      cpuMoves(playerWin)
    }
    return
  }, [cuadricula])

  const handleWin = () => {
    const winner: keyof Results = turn === 'X' ? 'o' : 'x'
    setIsWinner({ player: turn === 'X' ? 'O' : 'X', show: true })
    setResults({ ...results, [winner]: results[winner] + 1 })
  }
  const handleTie = () => {
    setResults({ ...results, ties: results.ties + 1 })
    setIsTie(true)
  }
  const handleNextRound = () => {
    resetGame()
  }
  const handleQuit = () => {
    resetGame(true)
  }
  const checkWinner = (props: { cuadricula: Cuadricula }): boolean => {
    const { cuadricula } = props
    let winner = false

    WIN_CONDITIONS.forEach((condition) => {
      const [a, b, c] = condition
      if (
        cuadricula[a] &&
        cuadricula[a] === cuadricula[b] &&
        cuadricula[a] === cuadricula[c]
      ) {
        winner = true
        handleWin()
      }
    })

    if (!winner && Object.values(cuadricula).every((value) => value !== '')) {
      handleTie()
    }
    return winner
  }

  return (
    <>
      {!isGameStarted ? (
        <div className='w-full flex-1 flex flex-col justify-center items-center gap-8 font-cairo'>
          <header className='w-full flex flex-row justify-center items-center'>
            <LOGO width={'5rem'} />
          </header>
          <section className='w-full max-w-80 flex flex-col gap-4 bg-button rounded-md p-4 text-button-text'>
            <h2 className='text-xl font-bold'>PICK PLAYER MARK</h2>
            <div className='marks-symbols  flex justify-between bg-background rounded-md p-2'>
              <button
                onClick={() => setPlayerMark('X')}
                className='relative flex justify-center flex-1 rounded-lg !bg-transparent '
              >
                <X
                  width={'3rem'}
                  stroke={
                    playerMark === 'X'
                      ? 'var(--color-background)'
                      : 'var(--color-button-text)'
                  }
                  className='z-10 transition-colors duration-300'
                />
              </button>
              <button
                onClick={() => setPlayerMark('O')}
                className='relative flex justify-center flex-1 rounded-lg !bg-transparent'
              >
                <span
                  className={`absolute inset-0 bg-button-text rounded-lg transition-transform duration-300 ${
                    playerMark === 'O' ? 'translate-x-0' : '-translate-x-full'
                  }`}
                />
                <O
                  width={'3rem'}
                  stroke={
                    playerMark === 'O'
                      ? 'var(--color-background)'
                      : 'var(--color-button-text)'
                  }
                  className='z-10 transition-colors duration-300'
                />
              </button>
            </div>
            <span className='text-reset-button-shadow'>
              REMEMBER: X GOES FIRST
            </span>
          </section>
          <section className='w-full max-w-60 start-buttons  flex flex-col gap-4 text-background font-bold'>
            <button
              className='!bg-accent shadow-button shadow-accent-shadow p-2 rounded-lg'
              onClick={() => handleStartGame({ CPU: true })}
            >
              NEW GAME (VS CPU)
            </button>
            <button
              className='!bg-primary shadow-button shadow-primary-shadow p-2 rounded-lg'
              onClick={() => handleStartGame({ CPU: false })}
            >
              NEW GAME (VS PLAYER)
            </button>
          </section>
        </div>
      ) : (
        <div className='w-full flex-1 flex flex-col items-center gap-16 font-cairo'>
          <header className='w-full flex flex-row justify-between items-center'>
            <LOGO width={'5rem'} />
            <BotonTurno turn={turn} />
            <div
              onClick={handleButtonRestart}
              className='rematch  bg-button-text rounded-md flex flex-col justify-center items-center p-2 shadow-button shadow-reset-button-shadow'
            >
              <img className='w-6' src={REMATCH} alt='rematch icon' />
            </div>
          </header>
          <div className='game  flex flex-col flex-1 justify-center gap-8 max-w-80 w-full'>
            <section className='cuadrilla  w-full grid grid-cols-3 grid-rows-3 items-center gap-4'>
              {Object.entries(cuadricula).map(([key, value]) => {
                return <CeldaComponent key={key} celda={[key, value]} />
              })}
            </section>
            <section className='results w-full grid grid-cols-3 gap-4'>
              <Marcador />
            </section>
          </div>
          {isWinner.player && isWinner.show && (
            <PopupBanner
              title={'YOU WON!'}
              button={{ text: 'QUIT', clickFn: handleQuit }}
              buttonAccent={{ text: 'NEXT ROUND', clickFn: handleNextRound }}
            >
              <section className='flex justify-center items-center gap-4 font-bold'>
                {isWinner.player === 'X' && <X width={'3rem'} />}
                {isWinner.player === 'O' && <O width={'3rem'} />}
                <h2
                  className={`text-3xl ${
                    isWinner.player === 'X' ? 'text-primary' : 'text-accent'
                  }`}
                >
                  TAKES THE ROUND
                </h2>
              </section>
            </PopupBanner>
          )}
          {isTie && (
            <PopupBanner
              title={"CAN'T BELEIVE IT!"}
              button={{ text: 'QUIT', clickFn: handleQuit }}
              buttonAccent={{ text: 'NEXT ROUND', clickFn: handleNextRound }}
            >
              <section className='flex justify-center items-center gap-4 font-bold'>
                <LOGO width={'4rem'} />
                <h2 className='text-3xl'>IT'S A TIE!</h2>
              </section>
            </PopupBanner>
          )}
          {isRestarting && (
            <PopupBanner
              button={{
                text: 'NO, CANCEL',
                clickFn: () => setIsRestarting(false)
              }}
              buttonAccent={{ text: 'YES, RESTART', clickFn: handleReset }}
            >
              <section className='flex justify-center items-center gap-4 font-bold'>
                <h2 className='text-3xl'>RESTART GAME?</h2>
              </section>
            </PopupBanner>
          )}
        </div>
      )}
    </>
  )
}

export default App
