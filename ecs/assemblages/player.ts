import type { Position } from '../components/position';
import type { Entity } from '../types/ecs';

type PlayerAssemblage = Entity<
  'direction' | 'playerControl' | 'position' | 'speed' | 'sprite'
>;

export const assemblePlayer = (position: Position): PlayerAssemblage => ({
  direction: 'up',
  playerControl: true,
  position,
  speed: 0,
  sprite: '⏺',
});
