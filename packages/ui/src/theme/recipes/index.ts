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
  MuiTypography,
};

export default components;
