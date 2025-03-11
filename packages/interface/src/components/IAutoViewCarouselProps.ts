import { IAutoViewNonSurfaceComponentProps } from "../properties/IAutoViewComponentProps";
import { IAutoViewComponentPropsBase } from "../properties/IAutoViewComponentPropsBase";

/**
 * Properties for configuring the Carousel component.
 *
 * The Carousel component displays a series of content items, such as images or text,
 * in a sequential and interactive manner. Users can navigate through the items manually,
 * or the carousel can transition automatically.
 */
export interface IAutoViewCarouselProps
  extends IAutoViewComponentPropsBase<"Carousel"> {
  /**
   * Enables automatic sliding between items.
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Array of items to be displayed in the carousel.
   * Each item must conform to the IItem interface, ensuring a consistent structure across all elements.
   */
  items: IAutoViewCarouselProps.IItem[];

  /**
   * Time interval in milliseconds between automatic transitions when `autoPlay` is enabled.
   * @default 3000
   */
  interval?: number;

  /**
   * Allows continuous looping of carousel items.
   * @default false
   */
  infinite?: boolean;

  /**
   * Visual transition effect between slides.
   * - 'slide': Horizontal sliding transition.
   * - 'fade': Fading transition.
   * @default 'slide'
   */
  effect?: "slide" | "fade";

  /**
   * Duration in milliseconds of the transition animation.
   * @default 500
   */
  speed?: number;

  /**
   * Position of navigation dots.
   * - 'top': Above the carousel.
   * - 'bottom': Below the carousel.
   * - 'left': To the left of the carousel.
   * - 'right': To the right of the carousel.
   * @default 'bottom'
   */
  dotPosition?: "top" | "bottom" | "left" | "right";

  /**
   * Displays navigation arrows for manual control.
   * If `autoPlay` is set to `false`, this property must be `true` to allow users to navigate through the carousel items.
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
   * Each item must have a unique key and content adhering to the IAutoViewNonSurfaceComponentProps interface.
   */
  export interface IItem {
    /**
     * Content to be rendered within the carousel item.
     * Must conform to the IAutoViewNonSurfaceComponentProps interface.
     */
    children: IAutoViewNonSurfaceComponentProps;
  }
}
