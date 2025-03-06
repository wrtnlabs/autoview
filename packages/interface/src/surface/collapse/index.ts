import { ReactNode } from "react";

import { IAutoViewNonSurfaceComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

export interface IAutoViewCollapseProps
  extends IAutoViewComponentPropsBase<"Collapse"> {
  items: IAutoViewCollapseProps.IItem[];
  defaultExpandedKeys?: number[]; // defaults to [0]
  expandedKeys?: number[];
  onChange?: (expandedKeys: number[]) => void;
  accordion?: boolean;
  bordered?: boolean;
  expandIcon?: ReactNode;
  expandIconPosition?: IAutoViewCollapseProps.IIconPosition; // defaults to start
  size?: IAutoViewCollapseProps.ISize;
}

export namespace IAutoViewCollapseProps {
  export interface IItemHeader {
    content: IAutoViewNonSurfaceComponentProps;
    extra?: ReactNode;
  }

  export interface IItem {
    key: number;
    header: IItemHeader;
    content: IAutoViewNonSurfaceComponentProps;
  }

  export type ISize = "large" | "middle" | "small";

  export type IIconPosition = "start" | "end";
}
