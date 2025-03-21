import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewCardProps } from "./IAutoViewCardProps";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  interval?: number;
  infinite?: boolean;
  effect?: "slide" | "fade";
  navControls?: boolean;
  indicators?: boolean;
  childrenProps?: IAutoViewPresentationComponentProps[];
}

export interface IAutoViewCarouselSlideProps
  extends IAutoViewComponentPropsBase<"CarouselSlide"> {
  childrenProps: IAutoViewCardProps;
}
