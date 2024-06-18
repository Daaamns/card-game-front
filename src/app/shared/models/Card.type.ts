import { StatusEffect } from './StatusEffect.type';

export type Card = {
  id: number;
  name: string;
  description: string;
  damage: number;
  selfDamage: number;
  healing: number;
  armor: number;
  targetType: string;
  statusEffect: StatusEffect[] | null;
};
