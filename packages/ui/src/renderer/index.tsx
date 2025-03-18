import { IAutoViewComponentProps } from "@autoview/interface";
import React from "react";

import { componentMap } from "../components";

export function renderComponent(
  props:
    | string
    | IAutoViewComponentProps
    | Array<string | IAutoViewComponentProps>,
) {
  if (props == null || typeof props !== "object") {
    return null;
  }

  if (Array.isArray(props)) {
    return props.map((c, index) => (
      <React.Fragment key={index}>{renderComponent(c)}</React.Fragment>
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
