import { useContext } from "react";
import { GameContext } from "../context/context";

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame debe usarse dentro de un GameProvider");
  }
  return context;
};
