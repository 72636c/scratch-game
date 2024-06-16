import { init } from './init';
import type { System } from './types/ecs';
import type { World } from './types/world';

const loop = async (world: World, systemManager: System): Promise<void> => {
  if (world.meta.quit) {
    return;
  }

  await systemManager.tick(world);

  return loop(world, systemManager);
};

const main = async () => {
  const { systemManager, world } = init();

  return loop(world, systemManager);
};

main().catch((err) => {
  throw err;
});
