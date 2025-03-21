import { IAutoViewLetterAvatarProps } from "@autoview/interface";
import { Avatar as MuiLetterAvatar } from "@mui/material";

import { transformLetterAvatarProps } from "./transform";

export const LetterAvatar = (props: IAutoViewLetterAvatarProps) => {
  return <MuiLetterAvatar {...transformLetterAvatarProps(props)} />;
};
