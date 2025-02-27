import { IAutoViewComponentProps } from "./IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "./IAutoViewComponentPropsBase";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  interval?: number;
  defaultIndex?: number;
  autoplay?: boolean;
  children: Array<Exclude<IAutoViewComponentProps, IAutoViewCarouselProps>>;
}
