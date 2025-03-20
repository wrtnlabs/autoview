import { StandardProperties } from "csstype";

import { IAutoViewComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { Arrayable } from "../utils";

export interface IAutoViewStackProps
  extends IAutoViewComponentPropsBase<"Stack"> {
  direction?: "row" | "column";
  wrap?: StandardProperties["flexWrap"];
  justifyContent?: StandardProperties["justifyContent"];
  alignItems?: StandardProperties["alignItems"];
  gap?: StandardProperties["gap"];
  childComponents: Arrayable<IAutoViewComponentProps>;
}
