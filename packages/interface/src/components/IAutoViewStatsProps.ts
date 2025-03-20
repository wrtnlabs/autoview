import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewIconProps } from "./IAutoViewIconProps";

// FIXME: 완전히 다시 설계
// https://chakra-ui.com/docs/components/data-list
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
