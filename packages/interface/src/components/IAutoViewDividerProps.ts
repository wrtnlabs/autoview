import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

// FIXME: List divider?
export interface IAutoViewDividerProps
  extends IAutoViewComponentPropsBase<"Divider"> {
  // FIXME:
  orientation?: "horizontal" | "vertical";
  // FIXME:
  color?: string;
}
