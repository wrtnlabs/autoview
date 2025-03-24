import { IAutoViewListSubheaderProps } from "@autoview/interface";
import { ListSubheader as BaseListSubheader } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListSubheaderProps
  extends TransformToComponentProps<IAutoViewListSubheaderProps> {}

export const ListSubheader = ({
  childrenProps,
  ...props
}: ListSubheaderProps) => {
  return (
    <BaseListSubheader>{renderComponent(childrenProps)}</BaseListSubheader>
  );
};
