import type { Direction } from '../../components/direction';
import {
  type Position,
  atPosition,
  byPosition,
} from '../../components/position';
import type { Speed } from '../../components/speed';
import type { Entity } from '../../types/ecs';
import type { Map } from '../../types/world';
import { createSystem } from '../system';

const isInMapBoundary = (position: Position, map: Map): boolean =>
  position.x >= 0 &&
  position.x < map.width &&
  position.y >= 0 &&
  position.y < map.height;

const calculateOffset = (direction: Direction, speed: Speed): Position => {
  switch (direction) {
    case 'up':
      return {
        x: 0,
        y: -speed,
      };

    case 'down':
      return {
        x: 0,
        y: speed,
      };

    case 'left':
      return {
        x: -speed,
        y: 0,
      };

    case 'right':
      return {
        x: speed,
        y: 0,
      };
  }
};

export const createMovementSystem = () =>
  createSystem(
    // Collide with any entity that has a position.
    ['position'],
    // Loop through moving entities with a direction and speed.
    ['direction', 'speed'],
    (entities, world) => {
      // TODO: Share this calculation across systems and ticks.
      const entityByPosition = byPosition(entities);

      const movingEntities = Object.values(entities).filter(
        (entity): entity is Entity<'direction' | 'position' | 'speed'> =>
          Boolean(entity.direction && entity.speed),
      );

      for (const entity of movingEntities) {
        const offset = calculateOffset(entity.direction, entity.speed);

        const nextPosition: Position = {
          x: entity.position.x + offset.x,
          y: entity.position.y + offset.y,
        };

        // TODO: Support movement that persists across ticks.
        entity.speed = 0;

        if (
          !isInMapBoundary(nextPosition, world.map) ||
          atPosition(entityByPosition, nextPosition)
        ) {
          return;
        }

        entity.position = nextPosition;
      }
    },
  );
