export interface IAutoViewTransformerService<T> {
  transform($input: T): Promise<T>;
  random(): Promise<T>;
}
