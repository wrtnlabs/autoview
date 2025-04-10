import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";
import {
  IAutoViewHorizontalCardProps,
  IAutoViewVerticalCardProps,
} from "./IAutoViewCardProps";

export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  autoPlay?: boolean;
  /**
   * Duration is not in milliseconds because Embla uses an attraction physics simulation when scrolling instead of easings.
   *
   * Only values between `20` and `60` are recommended.
   */
  interval?: number;
  /**
   * Whether the carousel should loop.
   *
   * It is recommended to set this to `true` for most cases.
   */
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
