import X from '../assets/x.svg?react'
import O from '../assets/o.svg?react'
import { CeldaProps, Cuadricula } from '../types'
import { useGameContext } from '../hooks/useGameContext'

export const CeldaComponent: React.FC<CeldaProps> = ({ celda }) => {
  const [key, value] = celda
  const { configGame:{isVsCpu, playerMark},
    statusGame: { turn, setTurn, cuadricula, setCuadricula } } = useGameContext()

  
  const handleClick = () => {
    if (value !== '') return
    if (isVsCpu && turn !== playerMark) return

    const newCuadricula:Cuadricula = {...cuadricula, [key]: turn }
    setCuadricula(newCuadricula)
    setTurn(turn === 'X' ? 'O' : 'X')

  }

  return (
    <div
      className='button || bg-button grid place-content-center rounded-md aspect-square shadow-button'
      data-pxy={key}
      key={key}
      onClick={handleClick}
    >
      {value === 'X' && <X />}
      {value === 'O' && <O />}
    </div>
  )
}
