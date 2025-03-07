import { IAutoViewImageAvatarProps } from "@autoview/interface";
import { AvatarProps } from "@mui/material";

export function transformImageAvatarProps(
  props: IAutoViewImageAvatarProps,
): AvatarProps {
  return {
    src: props.src,
    alt: props.name ?? "",
    variant: "circular",
    sx: { width: props.size, height: props.size },
  };
}
