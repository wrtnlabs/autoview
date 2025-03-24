import { IAutoViewListItemProps } from "@autoview/interface";
import {
  ListItem as BaseListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ListItemProps
  extends TransformToComponentProps<IAutoViewListItemProps> {}

export const ListItem = (props: ListItemProps) => {
  const content = (
    <>
      {renderComponent(props.startElement)}
      <ListItemText primary={props.title} secondary={props.description} />
      {renderComponent(props.endElement)}
    </>
  );

  if (props.href) {
    return (
      <BaseListItem sx={{ padding: 0 }}>
        <ListItemButton href={props.href} target="_blank">
          {content}
        </ListItemButton>
      </BaseListItem>
    );
  }

  return <BaseListItem>{content}</BaseListItem>;
};
