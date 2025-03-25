import { IAutoViewAvatarGroupProps } from "@autoview/interface";
import {
  AvatarGroup as BaseAvatarGroup,
  AvatarGroupProps as BaseProps,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface AvatarGroupProps
  extends TransformToComponentProps<IAutoViewAvatarGroupProps> {}

export const AvatarGroup = ({ childrenProps, ...props }: AvatarGroupProps) => {
  return (
    <BaseAvatarGroup {...transformAvatarGroupProps(props)}>
      {renderComponent(childrenProps)}
    </BaseAvatarGroup>
  );
};

export function transformAvatarGroupProps(props: AvatarGroupProps): BaseProps {
  return {
    max: props.maxItems ?? 5,
    total: props.totalItems,
  };
}
