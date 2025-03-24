import { IAutoViewListItemProps } from "@autoview/interface";
import { ListItem as BaseListItem } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListItemProps
  extends TransformToComponentProps<IAutoViewListItemProps> {}

export const ListItem = (props: ListItemProps) => {
  return <BaseListItem>{renderComponent(props)}</BaseListItem>;
};
