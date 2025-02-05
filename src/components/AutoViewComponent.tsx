import { IAutoViewComponentProps } from "../structures/properties/IAutoViewComponentProps";

export function AutoViewComponent(props: IAutoViewComponentProps): JSX.Element {
  return <div>{props.type}</div>;
}
