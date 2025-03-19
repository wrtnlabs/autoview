import { StandardProperties } from "csstype";

import {
  IAutoViewComponentProps,
  IAutoViewComponentPropsBase,
} from "../../src";
import { Arrayable } from "../../src/utils";

export interface IAutoViewStackProps
  extends IAutoViewComponentPropsBase<"Stack"> {
  direction?: "row" | "column";
  wrap?: StandardProperties["flexWrap"];
  justifyContent?: StandardProperties["justifyContent"];
  alignItems?: StandardProperties["alignItems"];
  gap?: StandardProperties["gap"];
  childComponents: Arrayable<IAutoViewComponentProps>;
}
