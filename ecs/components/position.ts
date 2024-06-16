import type { ComponentName, Entity, EntityId } from '../types/ecs';

export type Position = {
  x: number;
  y: number;
};

// TODO: Move these functions to a utility module.

const serialisePosition = (position: Position): string =>
  `${position.x}.${position.y}`;

export const byPosition = <Component extends ComponentName>(
  entities: Record<EntityId, Entity<'position' | Component>>,
): Record<string, Entity<'position' | Component>> =>
  Object.fromEntries(
    Object.values(entities).map((entity) => [
      serialisePosition(entity.position),
      entity,
    ]),
  );

export const atPosition = <Component extends ComponentName>(
  entities: Record<string, Entity<'position' | Component>>,
  position: Position,
): Entity<'position' | Component> | undefined =>
  entities[serialisePosition(position)];
