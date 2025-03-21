import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { Icon } from "../../../components/icon";

type DefaultListProps = {
  style?: React.CSSProperties;
};

export function DefaultList({ style }: DefaultListProps) {
  return (
    <List style={style}>
      <ListItem style={{ background: "pink" }}>
        <ListItemIcon sx={{ background: "yellow" }}>
          <div
            style={{
              width: 40,
              height: 40,
              background: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon type="Icon" id="home" />
          </div>
        </ListItemIcon>
        <ListItemText primary="hi" />
      </ListItem>
      <ListItem style={{ background: "hotpink" }}>
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText primary="hi" />
      </ListItem>
      <ListItem style={{ background: "salmon" }}>
        <ListItemText primary="primary" secondary="secondary" />
      </ListItem>
    </List>
  );
}

export function ButtonList({ style }: DefaultListProps) {
  return (
    <List style={style}>
      <ListItem style={{ background: "pink" }}>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary="hi" />
      </ListItem>
      <ListItem style={{ background: "hotpink" }}>
        <ListItemButton style={{ background: "purple" }}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="hi" />
        </ListItemButton>
      </ListItem>
      <ListItem style={{ background: "pink" }}>
        <ListItemButton style={{ background: "purple" }}>
          <ListItemText primary="primary" secondary="secondary" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
