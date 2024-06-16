import { createInterface } from 'readline/promises';

import { cycleDirection } from '../../components/direction';
import type { Entity } from '../../types/ecs';
import type { World } from '../../types/world';
import { createSystem } from '../system';

const processCommand = (
  player: Entity<'direction' | 'speed'>,
  world: World,
  command: string,
): void => {
  switch (command) {
    case 'w':
      player.speed = 1;
      return;

    case 'a':
      player.direction = cycleDirection(player.direction, 'anticlockwise');
      return;

    case 's':
      player.speed = -1;
      return;

    case 'd':
      player.direction = cycleDirection(player.direction, 'clockwise');
      return;

    case 'q':
      world.meta.quit = true;
      return;

    default:
      return;
  }
};

export const createCommandLineInputSystem = () => {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return createSystem(
    // Influence movement components of a player-controllable entity.
    ['direction', 'playerControl', 'speed'],
    [],
    async (entities, world) => {
      const players = Object.values(entities);

      if (!players[0] || players.length > 1) {
        throw new Error('Exactly one player is required');
      }

      const [player] = players;

      // TODO: Move blocking I/O out of the system.
      const rawCommand = await readline.question('> ');
      process.stdout.moveCursor(0, -1);
      process.stdout.clearLine(1);

      const command = rawCommand.trim();

      processCommand(player, world, command);
    },
  );
};
