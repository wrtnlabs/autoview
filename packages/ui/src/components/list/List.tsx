import { IAutoViewListProps } from "@autoview/interface";
import { List as BaseList } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListProps
  extends TransformToComponentProps<IAutoViewListProps> {}

export const List = ({ childrenProps, ...props }: ListProps) => {
  return <BaseList>{renderComponent(childrenProps)}</BaseList>;
};
