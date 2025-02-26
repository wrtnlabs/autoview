import { IAutoViewComponentProps } from "./properties/IAutoViewComponentProps";

export interface IAutoViewApplication {
  /**
   * Render a component.
   *
   * Render a component with the given primitive component properties.
   *
   * @param arg Argument containing the component properties
   */
  render(arg: IAutoViewApplication.IRenderArgument): void;
}
export namespace IAutoViewApplication {
  /**
   * Argument containing the component properties.
   */
  export interface IRenderArgument {
    /**
     * Primitive data of the Auto Viewer components.
     */
    component: IAutoViewComponentProps;
  }
}
