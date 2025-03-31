import { useGameContext } from '../hooks/useGameContext'

export const Marcador: React.FC = () => {
  const {
    configGame: { playerMark },
    statusGame: { results }
  } = useGameContext()
  return (
    <>
      <div className='x_result || bg-primary font-bold text-background rounded-md flex flex-col justify-center items-center py-2'>
        <span>X ({playerMark === 'X' ? 'YOU' : 'RIVAL'})</span>
        <span className=' text-2xl font-extrabold'>{results.x}</span>
      </div>
      <div className='ties || bg-button-text font-bold text-background rounded-md flex flex-col justify-center items-center py-2'>
        <span>TIES</span>
        <span className=' text-2xl font-extrabold'>{results.ties}</span>
      </div>
      <div className='o_result || bg-accent font-bold text-background rounded-md flex flex-col justify-center items-center py-2'>
        <span>O ({playerMark === 'O' ? 'YOU' : 'RIVAL'})</span>
        <span className=' text-2xl font-extrabold'>{results.o}</span>
      </div>
    </>
  )
}
