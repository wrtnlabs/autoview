import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewDividerProps
  extends IAutoViewComponentPropsBase<"Divider"> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  color?: string;
}
