import { IAutoViewListItemButtonProps } from "@autoview/interface";
import { ListItemButton as BaseListItemButton } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListItemButtonProps
  extends TransformToComponentProps<IAutoViewListItemButtonProps> {}

export const ListItemButton = (props: ListItemButtonProps) => {
  return <BaseListItemButton>{renderComponent(props)}</BaseListItemButton>;
};
