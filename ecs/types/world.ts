export type Map = {
  width: number;
  height: number;
};

type Meta = {
  quit: boolean;
};

export type World = {
  map: Map;
  meta: Meta;
};
