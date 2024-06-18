import { PlayerStatus } from './Player.Status.type';
import { ClassType } from './class.type';

export type Player = {
  id: number;
  name: string;
  life: number;
  armor: number;
  classType: ClassType;
  statuses: PlayerStatus[];
};
