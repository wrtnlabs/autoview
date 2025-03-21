import { IAutoViewCardHeaderProps } from "@autoview/interface";
import {
  CardHeaderProps as BaseProps,
  CardHeader as MuiCardHeader,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { Icon } from "../icon";

export interface CardHeaderProps
  extends TransformToComponentProps<IAutoViewCardHeaderProps> {}

export const CardHeader = (props: CardHeaderProps) => {
  return <MuiCardHeader {...transformCardHeaderProps(props)} />;
};

export function transformCardHeaderProps(props: CardHeaderProps): BaseProps {
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
