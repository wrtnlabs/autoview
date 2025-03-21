import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { AutoViewIconName } from "../typings/AutoViewIconName";

/**
 * Interface for defining properties of an Icon component.
 */
export interface IAutoViewIconProps
  extends IAutoViewComponentPropsBase<"Icon"> {
  /**
   * The name of the icon, following Font Awesome's `IconName` type.
   *
   * - Should be one of the valid Font Awesome icon names.
   * - Example values: `"arrow-right"`, `"coffee"`, `"user"`, etc.
   * - Incorrect values will result in a TypeScript error.
   */
  id: AutoViewIconName;
}
