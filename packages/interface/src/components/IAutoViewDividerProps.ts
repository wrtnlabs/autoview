import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

export interface IAutoViewDividerProps
  extends IAutoViewComponentPropsBase<"Divider"> {
  orientation?: "horizontal" | "vertical";
  color?: string;
}
