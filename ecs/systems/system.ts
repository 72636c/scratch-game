import type {
  ComponentName,
  Entity,
  EntityBase,
  EntityId,
  System,
} from '../types/ecs';
import type { NonEmptyArray } from '../types/util';
import type { World } from '../types/world';

type EntityMap<
  Archetype extends NonEmptyArray<ComponentName>,
  OptionalComponents extends ComponentName[],
> = Record<EntityId, Entity<Archetype[number], OptionalComponents[number]>>;

export const createSystem = <
  Archetype extends NonEmptyArray<ComponentName>,
  OptionalComponents extends ComponentName[],
>(
  archetype: Archetype,
  _optionalComponents: OptionalComponents,
  tick: (
    entities: EntityMap<Archetype, OptionalComponents>,
    world: Readonly<World>,
  ) => void | Promise<void>,
): System => {
  // TODO: Share references between systems that operate on the same archetype.
  const entities: EntityMap<Archetype, OptionalComponents> = [];

  // TODO: Use a bitmask or pre-filtering in the system manager for efficiency.
  const satisfiesArchetype = (
    entity: EntityBase,
  ): entity is Entity<Archetype[number]> =>
    archetype.every((component) => component in entity);

  return {
    // TODO: Current model does not expect components to be added or removed
    // during execution. Provide a central mechanism for systems to receive a
    // `register` call when a component changes.
    register: (id, entity) => {
      if (satisfiesArchetype(entity)) {
        entities[id] = entity;
      } else {
        delete entities[id];
      }
    },

    tick: (world: World) => tick(entities, world),
  };
};
