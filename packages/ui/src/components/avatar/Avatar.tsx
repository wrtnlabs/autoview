import { IAutoViewAvatarProps } from "@autoview/interface";
import { Avatar as BaseAvatar, AvatarProps as BaseProps } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface AvatarProps
  extends TransformToComponentProps<IAutoViewAvatarProps> {}

export const Avatar = ({ size = 24, ...props }: AvatarProps) => {
  return (
    <BaseAvatar
      sx={{ width: size, height: size, flexShrink: 0 }}
      {...transformAvatarProps(props)}
    />
  );
};

export function transformAvatarProps(props: AvatarProps): BaseProps {
  return {
    src: props.src,
    alt: props.name ?? "",
    variant: "circular",
  };
}
