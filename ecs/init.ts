import { assembleObstacle } from './assemblages/obstacle';
import { assemblePlayer } from './assemblages/player';
import { createEntityManager } from './managers/entity';
import { createSystemManager } from './managers/system';
import type { EntityBase, System } from './types/ecs';
import type { World } from './types/world';

const initEntities = (): EntityBase[] => [
  assemblePlayer({ x: 1, y: 2 }),
  assembleObstacle({ x: 1, y: 3 }),
  assembleObstacle({ x: 2, y: 2 }),
  assembleObstacle({ x: 3, y: 1 }),
];

const initWorld = (): World => ({
  map: {
    width: 5,
    height: 5,
  },
  meta: {
    quit: false,
  },
});

export const init = (): { systemManager: System; world: World } => {
  const entityManager = createEntityManager();
  const systemManager = createSystemManager();

  initEntities().forEach((entity) => {
    const id = entityManager.generateId();
    systemManager.register(id, entity);
  });

  return {
    systemManager,
    world: initWorld(),
  };
};
