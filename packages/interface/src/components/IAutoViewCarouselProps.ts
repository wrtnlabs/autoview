import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import {
  IAutoViewHorizontalCardProps,
  IAutoViewVerticalCardProps,
} from "./IAutoViewCardProps";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  interval?: number;
  infinite?: boolean;
  gutter?: number;
  effect?: "slide" | "fade";
  navControls?: boolean;
  indicators?: boolean;
  childrenProps?: Array<
    IAutoViewVerticalCardProps | IAutoViewHorizontalCardProps
  >;
}

export type IAutoViewCarouselComponentProps = IAutoViewCarouselProps;
