import type { Position } from '../components/position';
import type { Entity } from '../types/ecs';

type ObstacleAssemblage = Entity<'position' | 'sprite'>;

export const assembleObstacle = (position: Position): ObstacleAssemblage => ({
  position,
  sprite: '⛒',
});
