import { IAutoViewIconButtonProps } from "@autoview/interface";
import {
  IconButton as BaseIconButton,
  IconButtonProps as BaseProps,
} from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface IconButtonProps
  extends TransformToComponentProps<IAutoViewIconButtonProps> {}

export const IconButton = (props: IconButtonProps) => {
  const { icon } = props;

  return (
    <BaseIconButton {...transformIconButtonProps(props)}>
      {renderComponent(icon)}
    </BaseIconButton>
  );
};

export function transformIconButtonProps(props: IconButtonProps): BaseProps {
  return {
    color: props.color ?? "blue",
    size: props.size ?? "small",
  };
}
