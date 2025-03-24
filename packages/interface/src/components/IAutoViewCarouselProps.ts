import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import { IAutoViewCardProps } from "./IAutoViewCardProps";
import { IAutoViewImageProps } from "./IAutoViewImageProps";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  interval?: number;
  infinite?: boolean;
  effect?: "slide" | "fade";
  navControls?: boolean;
  indicators?: boolean;
  childrenProps?: IAutoViewCarouselItemProps[];
}

export interface IAutoViewCarouselItemProps
  extends IAutoViewComponentPropsBase<"CarouselItem"> {
  childrenProps: IAutoViewCardProps | IAutoViewImageProps;
}

export type IAutoViewCarouselComponentProps =
  | IAutoViewCarouselProps
  | IAutoViewCarouselItemProps;
