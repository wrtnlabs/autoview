import { IAutoViewComponentProps } from "@autoview/interface";
import { Fragment } from "react/jsx-runtime";

import { componentMap } from "../components";

export function renderComponent(
  props: IAutoViewComponentProps | IAutoViewComponentProps[],
) {
  if (props == null || typeof props !== "object") {
    return null;
  }

  if (Array.isArray(props)) {
    return props.map((c, index) => (
      <Fragment key={index}>{renderComponent(c)}</Fragment>
    ));
  }

  if (!props.type) {
    console.warn(`Missing component type`);
    return null;
  }

  const Component = componentMap[props.type];

  if (!Component) {
    console.warn(`Unknown component type: ${props.type}`);
    return null;
  }

  return <Component {...props} />;
}
