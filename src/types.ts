import { ReactNode } from "react"

export type EquisO = 'X' | 'O'
export type Celda = EquisO | ''
export type Results = {
  x: number
  ties: number
  o: number
}
export type Cuadricula = {
  c11: Celda
  c12: Celda
  c13: Celda
  c21: Celda
  c22: Celda
  c23: Celda
  c31: Celda
  c32: Celda
  c33: Celda
}
export type IsWinner ={
  player: EquisO | null
  show: boolean
}
export type ConfigGame = {
  isVsCpu: boolean;
  setIsVsCpu: (isVsCpu: boolean) => void;
  playerMark: EquisO;
  setPlayerMark: (playerMark: EquisO) => void;
}
export type StatusGame = {

  turn: EquisO;
  setTurn: (turn: EquisO) => void;
  results: Results;
  setResults: (results: Results) => void;
  cuadricula: Cuadricula,
  setCuadricula: (cuadricula: Cuadricula) => void;
  isTie:boolean;
  setIsTie: (isTie: boolean) => void;
  isRestarting:boolean;
  setIsRestarting: (isRestarting: boolean) => void;
  isWinner: IsWinner;
  setIsWinner: (isWinner: IsWinner) => void;
  isGameStarted: boolean;
  setIsGameStarted: (isGameStarted: boolean) => void;
}

export type GameContextType = { 
  configGame: ConfigGame,
  statusGame: StatusGame
}


export interface TurnIndicatorProps {
  turn: EquisO
}
export interface CeldaProps {
  celda: [string, Celda]
}
export interface WinnerBannerProps {
  winner: EquisO
}
export interface PopupBannerProps {
  title?: string;
  button: { text: string; clickFn: VoidFunction };
  buttonAccent: { text: string; clickFn: VoidFunction };
  children: ReactNode;
};

