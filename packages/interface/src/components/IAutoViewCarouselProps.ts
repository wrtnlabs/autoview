import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewCardProps } from "./IAutoViewCardProps";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  interval?: number;
  infinite?: boolean;
  gutter?: number;
  effect?: "slide" | "fade";
  navControls?: boolean;
  indicators?: boolean;
  childrenProps?: IAutoViewCardProps[];
}

export type IAutoViewCarouselComponentProps = IAutoViewCarouselProps;
