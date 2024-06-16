import type { Subtract } from '../types/util';

const directions = ['up', 'right', 'down', 'left'] as const;

export type Direction = (typeof directions)[number];

export const cycleDirection = (
  direction: Direction,
  rotation: 'clockwise' | 'anticlockwise',
): Direction => {
  const currentIndex = directions.indexOf(direction);

  const delta = rotation === 'clockwise' ? 1 : -1;

  const newIndex = (currentIndex + delta) % directions.length;

  return (
    directions[newIndex] ??
    directions[
      (directions.length - 1) as Subtract<(typeof directions)['length'], 1>
    ]
  );
};
