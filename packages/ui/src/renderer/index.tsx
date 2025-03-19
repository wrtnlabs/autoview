import { Arrayable, IAutoViewComponentProps } from "@autoview/interface";
import React, { ReactNode } from "react";

import { componentMap } from "../components";

export function renderComponent(
  props: Arrayable<undefined | null | string | IAutoViewComponentProps>,
): ReactNode {
  if (props == null) {
    return null;
  }

  if (typeof props === "string") {
    return <React.Fragment>{props}</React.Fragment>;
  }

  if (typeof props !== "object") {
    return null;
  }

  if (Array.isArray(props)) {
    return props.map((c, i) => (
      <React.Fragment key={i}>{renderComponent(c)}</React.Fragment>
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
