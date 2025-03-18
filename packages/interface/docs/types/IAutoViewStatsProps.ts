import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

export interface IAutoViewStatsProps
  extends IAutoViewComponentPropsBase<"Stats"> {
  title: string;
  value: string;
  precision?: number;
  valuePrefix?: string | IAutoViewIconProps;
  valueSuffix?: string | IAutoViewIconProps;
}

export namespace IAutoViewStats {
  export type IColors = string;
  export type IStatus = "error" | "info" | "success" | "warning";

  export interface IExtended {
    color: IColors;
    status: IStatus;
    size: string | number;
  }
}
