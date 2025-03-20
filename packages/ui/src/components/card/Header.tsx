import { IAutoViewCardHeaderProps } from "@autoview/interface";
import { CardHeaderProps, CardHeader as MuiCardHeader } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";
import { Icon } from "../icon";

export const CardHeader = (props: IAutoViewCardHeaderProps) => {
  return <MuiCardHeader {...transformCardHeaderProps(props)} />;
};

export function transformCardHeaderProps(
  props: IAutoViewCardHeaderProps,
): CardHeaderProps {
  const { startElement, endElement } = props;

  return {
    action: endElement ? renderComponent(endElement) : undefined,
    avatar: startElement ? renderComponent(startElement) : undefined,
    subheader: [
      <Icon type="Icon" id="home" style={{ width: "10px", height: "10px" }} />,
      props.description,
    ],
    subheaderTypographyProps: undefined,
    title: props.title,
    titleTypographyProps: undefined,
  };
}
