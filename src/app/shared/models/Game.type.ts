import { Player } from './PLayer-type';

export type Game = {
  id: number;
  player1: Player;
  player2: Player;
  isPlayer1Turn: boolean;
  isPlayer1Lost: boolean;
  isPlayer2Lost: boolean;
  finished: boolean;
};
