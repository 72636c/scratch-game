export type NonEmptyArray<T> = [T, ...T[]];

type Length<T extends unknown[]> = T extends { length: infer L } ? L : never;

type BuildTuple<L extends number, T extends unknown[] = []> = T extends {
  length: L;
}
  ? T
  : BuildTuple<L, [...T, unknown]>;

export type Subtract<A extends number, B extends number> =
  BuildTuple<A> extends [...infer U, ...BuildTuple<B>] ? Length<U> : never;
