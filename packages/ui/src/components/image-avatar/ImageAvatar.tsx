import { IAutoViewImageAvatarProps } from "@autoview/interface";
import { Avatar as MuiImageAvatar } from "@mui/material";

import { transformImageAvatarProps } from "./transform";

export const ImageAvatar = (props: IAutoViewImageAvatarProps) => {
  return <MuiImageAvatar {...transformImageAvatarProps(props)} />;
};
