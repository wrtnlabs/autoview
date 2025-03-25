import { IAutoViewCardHeaderProps } from "@autoview/interface";
import {
  CardHeader as BaseCardHeader,
  CardHeaderProps as BaseProps,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardHeaderProps
  extends TransformToComponentProps<IAutoViewCardHeaderProps> {}

export const CardHeader = (props: CardHeaderProps) => {
  const result = transformCardHeaderProps(props);

  return <BaseCardHeader sx={baseStyle} {...result} />;
};

export function transformCardHeaderProps(props: CardHeaderProps): BaseProps {
  const { startElement, endElement } = props;

  return {
    avatar: renderComponent(startElement),
    action: renderComponent(endElement),
    subheader: renderComponent(props.description),
    subheaderTypographyProps: {
      variant: "caption",
      color: "#777",
    },
    title: props.title,
    titleTypographyProps: {
      variant: "subtitle2",
      color: "#111",
    },
  };
}

const baseStyle = {
  width: "100%",
};
