import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewColor } from "../properties/theme";
import { IAutoViewSize } from "../properties/theme/IAutoViewSize";

export interface IAutoViewIconButtonProps
  extends IAutoViewComponentPropsBase<"IconButton"> {
  /**
   * Name of the icon to display.
   *
   * It must be one of the icon names defined by the `@fortawesome/free-solid-svg-icons` and
   * `@fortawesome/free-brands-svg-icons` packages.
   *
   * The name must be in kebab-case, without the `fa` prefix. Also you should not include the icon
   * set prefix (e.g. `fa-solid` or `fa-brands`) in the name.
   *
   * For example:
   *
   * - `home`
   * - `github`
   * - `arrow-right`
   * - `caret-down`
   */
  icon?: string;
  variant?: IAutoViewIconButtonProps.IVariant;
  color?: IAutoViewColor.IVariant | IAutoViewColor.IScale;
  size?: IAutoViewSize.IBase;
}

export namespace IAutoViewIconButtonProps {
  export type IVariant = "contained" | "outlined";
}
