import { createCommandLineInputSystem } from '../systems/input/commandLine';
import { createMovementSystem } from '../systems/logic/movement';
import { createCommandLineRenderSystem } from '../systems/render/commandLine';
import type { System } from '../types/ecs';

export const createSystemManager = (): System => {
  const systems: System[] = [
    createCommandLineRenderSystem(),
    createCommandLineInputSystem(),
    createMovementSystem(),
  ];

  return {
    register: (id, entity) =>
      systems.forEach((system) => system.register(id, entity)),

    tick: async (world) => {
      for (const system of systems) {
        const value = system.tick(world);

        if (value && typeof value.then === 'function') {
          await value;
        }
      }
    },
  };
};
