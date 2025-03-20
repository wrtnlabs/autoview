import { IAutoViewPresentationComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;

  interval?: number;

  infinite?: boolean;

  effect?: "slide" | "fade";

  navControls?: boolean;
  indicators?: boolean;
  childComponents: IAutoViewPresentationComponentProps[];
}

export namespace IAutoViewCarouselProps {
  export interface IItem {
    children: IAutoViewPresentationComponentProps[];
  }
}
