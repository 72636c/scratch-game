import type { Direction } from '../components/direction';
import type { PlayerControl } from '../components/playerControl';
import type { Position } from '../components/position';
import type { Speed } from '../components/speed';
import type { Sprite } from '../components/sprite';

import type { World } from './world';

type ComponentMap = {
  direction: Direction;
  playerControl: PlayerControl;
  position: Position;
  speed: Speed;
  sprite: Sprite;
};

export type ComponentName = keyof ComponentMap;

export type Entity<
  Required extends ComponentName,
  Optional extends ComponentName = never,
> = Pick<ComponentMap, Required> & Partial<Pick<ComponentMap, Optional>>;

export type EntityBase = Record<string, unknown>;

export type EntityId = number;

export type System = {
  register: (id: EntityId, entity: EntityBase) => void;

  tick: (world: World) => void | Promise<void>;
};
