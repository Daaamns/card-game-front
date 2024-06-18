import { Player } from './PLayer-type';
import { StatusEffect } from './StatusEffect.type';

export type PlayerStatus = {
  id: number;
  player: Player;
  statusEffect: StatusEffect;
  remainingTurns: number;
};
