import { Components, Theme } from "@mui/material";

import MuiAvatar from "./avatar";
import MuiAvatarGroup from "./avatar-group";
import MuiButton from "./button";
import MuiButtonGroup from "./button-group";
import MuiCard from "./card";
import MuiCardActions from "./card-actions";
import MuiCardContent from "./card-content";
import MuiCardHeader from "./card-header";
import MuiCardMedia from "./card-media";
import MuiChip from "./chip";
import MuiIconButton from "./icon-button";
import MuiList from "./list";
import MuiListItem from "./list-item";
import MuiListItemAvatar from "./list-item-avatar";
import MuiListItemButton from "./list-item-button";
import MuiListItemIcon from "./list-item-icon";
import MuiListItemText from "./list-item-text";
import MuiListSubheader from "./list-subheader";
import MuiTypography from "./typography";

const components: Components<Omit<Theme, "components">> = {
  MuiAvatar,
  MuiAvatarGroup,
  MuiButton,
  MuiButtonGroup,
  MuiCard,
  MuiCardActions,
  MuiCardContent,
  MuiCardHeader,
  MuiCardMedia,
  MuiChip,
  MuiIconButton,
  MuiList,
  MuiListItem,
  MuiListItemAvatar,
  MuiListItemButton,
  MuiListItemIcon,
  MuiListItemText,
  MuiListSubheader,
  MuiTypography,
};

export default components;
