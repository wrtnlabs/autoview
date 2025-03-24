import { IAutoViewListSubheaderProps } from "@autoview/interface";
import {
  ListSubheader as BaseListSubheader,
  ListSubheaderProps as BaseProps,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListSubheaderProps
  extends TransformToComponentProps<IAutoViewListSubheaderProps> {}

export const ListSubheader = ({
  childrenProps,
  stickToTop = false,
  ...props
}: ListSubheaderProps) => {
  return (
    <BaseListSubheader {...transformListSubheaderProps(props)}>
      {renderComponent(childrenProps)}
    </BaseListSubheader>
  );
};

export function transformListSubheaderProps(
  props: ListSubheaderProps,
): BaseProps {
  return {
    disableSticky: !props.stickToTop,
    style: props.style,
  };
}
