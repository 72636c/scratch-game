/* eslint-disable no-console */

import type { Direction } from '../../components/direction';
import { atPosition, byPosition } from '../../components/position';
import type { Entity } from '../../types/ecs';
import type { Map } from '../../types/world';
import { createSystem } from '../system';

const clearPreviousRender = (map: Map): void => {
  for (let i = 0; i < map.height; i++) {
    process.stdout.moveCursor(0, -1);
    process.stdout.clearLine(1);
  }
};

const showDirection = (direction: Direction): string => {
  switch (direction) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'left':
      return '←';
    case 'right':
      return '→';
  }
};

const showEntity = (
  entity: Entity<'sprite', 'direction' | 'playerControl'>,
): string =>
  entity.direction && entity.playerControl
    ? showDirection(entity.direction)
    : entity.sprite;

export const createCommandLineRenderSystem = () => {
  let firstRender = true;

  return createSystem(
    // Render entities with a position and sprite.
    ['position', 'sprite'],
    // Customise rendering for a player-controllable entity with a direction.
    ['direction', 'playerControl'],
    (entities, world) => {
      if (firstRender) {
        firstRender = false;
      } else {
        clearPreviousRender(world.map);
      }

      // TODO: Share this calculation across systems and ticks.
      const entityByPosition = byPosition(entities);

      for (let y = 0; y < world.map.height; y++) {
        let row = '';

        for (let x = 0; x < world.map.width; x++) {
          const entity = atPosition(entityByPosition, { x, y });

          row += entity ? showEntity(entity) : '·';
        }

        console.log(row);
      }
    },
  );
};
