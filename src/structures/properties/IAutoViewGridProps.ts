import { IAutoViewComponentProps } from "./IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "./IAutoViewComponentPropsBase";

export interface IAutoViewGridProps
  extends IAutoViewComponentPropsBase<"Grid"> {}
export namespace IAutoViewGridProps {
  export interface IItemProps {
    children: Array<Exclude<IAutoViewComponentProps, IAutoViewGridProps>>;
  }
}
