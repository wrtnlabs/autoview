import { IAutoViewComponentProps } from "@autoview/interface";
import React from "react";

import { componentMap } from "../components";

export function renderComponent(config: IAutoViewComponentProps) {
  if (!config || typeof config !== "object" || !config.type) return null;

  const Component = componentMap[config.type];

  if (!Component) {
    console.warn(`Unknown component type: ${config.type}`);
    return null;
  }

  if (!hasChildren(config)) {
    return <Component {...config} />;
  }

  const { children, ...props } = config;

  const renderedChildren = Array.isArray(children)
    ? children.map((child, index) => (
        <React.Fragment key={index}>{renderComponent(child)}</React.Fragment>
      ))
    : renderComponent(children);

  return <Component {...props}>{renderedChildren}</Component>;
}

function hasChildren(
  config: IAutoViewComponentProps,
): config is IAutoViewComponentProps & {
  children: IAutoViewComponentProps | IAutoViewComponentProps[];
} {
  return "children" in config;
}
