import { StandardProperties } from "csstype";

export interface IAutoViewComponentPropsBase<Type extends string> {
  /**
   * Discriminator property.
   */
  type: Type;

  style?: StandardProperties;
}
