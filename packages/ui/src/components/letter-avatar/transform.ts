import { IAutoViewLetterAvatarProps } from "@autoview/interface";
import { AvatarProps } from "@mui/material";

export function transformLetterAvatarProps(
  props: IAutoViewLetterAvatarProps,
): AvatarProps {
  return {
    children: props.name.charAt(0),
    sx: { width: props.size, height: props.size },
    variant: "circular",
    color: props.color ?? "#3498db",
  };
}
