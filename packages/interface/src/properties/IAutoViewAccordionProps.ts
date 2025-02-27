import { IAutoViewComponentProps } from "./IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "./IAutoViewComponentPropsBase";

export interface IAutoViewAccordionProps
  extends IAutoViewComponentPropsBase<"Accordion"> {
  items: IAutoViewAccordionProps.IItemProps[];
}
export namespace IAutoViewAccordionProps {
  export interface IItemProps {
    title: string;
    children: Array<Exclude<IAutoViewComponentProps, IAutoViewAccordionProps>>;
    collapsed: boolean;
  }
}
