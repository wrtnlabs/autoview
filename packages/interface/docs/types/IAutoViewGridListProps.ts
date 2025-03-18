import { IAutoViewNonSurfaceComponentProps } from "../../src/properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../src/properties/IAutoViewComponentPropsBase";

export interface IAutoViewGridListProps
  extends IAutoViewComponentPropsBase<"GridList"> {
  items: IAutoViewGridListProps.IItem[];
  rowGap?: number;
  columnGap?: number;
}

export namespace IAutoViewGridListProps {
  export interface IItem {
    children: IAutoViewNonSurfaceComponentProps;
    column?: IColumn | IResponsive;
    offset?: IColumn | IResponsive;
  }

  export type IColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  export type IBreakpoint = "xs" | "sm" | "md" | "lg" | "xl";
  export interface IResponsive extends Record<IBreakpoint, IColumn> {}
}
