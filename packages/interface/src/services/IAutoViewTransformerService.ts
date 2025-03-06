import { IAutoViewComponentProps } from "../properties/IAutoViewComponentProps";

export interface IAutoViewTransformerService<T> {
  transform($input: T): Promise<IAutoViewComponentProps>;
  random(): Promise<T>;
}
