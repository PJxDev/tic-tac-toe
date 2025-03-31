import X from '../assets/x.svg?react'
import O from '../assets/o.svg?react'
import { TurnIndicatorProps } from "../types"

export const BotonTurno: React.FC<TurnIndicatorProps> = ({turn}) => {
  return (
    <div className='turn || flex justify-center items-center gap-2 bg-button px-4 py-2 rounded-md m-auto shadow-button'>
      {turn === 'X' && (
        <X width='1rem' height='1rem' stroke='var(--color-button-text)' />
      )}
      {turn === 'O' && (
        <O width='1rem' height='1rem' stroke='var(--color-button-text)' />
      )}
      <span className='font-bold text-button-text'>TURN</span>
    </div>
  )
}
