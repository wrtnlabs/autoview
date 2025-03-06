import { IAutoViewNonSurfaceComponentProps } from "../../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../../properties/IAutoViewComponentPropsBase";

/**
 * Properties for configuring the Carousel component.
 */
export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  /**
   * Enables automatic sliding of carousel items.
   * @default false
   */
  autoPlay?: boolean;
  /**
   * Array of items to be displayed in the carousel.
   */
  items: IAutoViewCarouselProps.IItem[];
  /**
   * Time interval (in milliseconds) between automatic transitions.
   * Effective when `autoPlay` is true.
   * @default 3000
   */
  interval?: number;
  /**
   * Enables infinite looping of carousel items.
   * @default false
   */
  infinite?: boolean;
  /**
   * Transition effect between slides.
   * - 'slide': Slides transition horizontally.
   * - 'fade': Slides fade in and out.
   * @default 'slide'
   */
  effect?: "slide" | "fade";
  /**
   * Duration (in milliseconds) of the transition animation.
   * @default 500
   */
  speed?: number;
  /**
   * Position of the navigation dots.
   * - 'top': Dots are displayed above the carousel.
   * - 'bottom': Dots are displayed below the carousel.
   * - 'left': Dots are displayed to the left of the carousel.
   * - 'right': Dots are displayed to the right of the carousel.
   * @default 'bottom'
   */
  dotPosition?: "top" | "bottom" | "left" | "right";
  /**
   * Displays navigation arrows for manual slide control.
   * @default true
   */
  showArrows?: boolean;
  /**
   * Displays indicator dots for slide navigation.
   * @default true
   */
  indicators?: boolean;
}

export namespace IAutoViewCarouselProps {
  /**
   * Represents an individual item within the carousel.
   */
  export interface IItem {
    /**
     * Unique identifier for the carousel item.
     */
    key: number;
    /**
     * Content to be rendered within the carousel item.
     */
    children: IAutoViewNonSurfaceComponentProps;
  }
}
