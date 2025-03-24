import { IAutoViewChipProps } from "@autoview/interface";
import { Chip as BaseChip, ChipProps as BaseProps } from "@mui/material";
import { ReactElement } from "react";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ChipProps
  extends TransformToComponentProps<IAutoViewChipProps> {}

export const Chip = (props: ChipProps) => {
  return <BaseChip {...transformChipProps(props)} />;
};

export function transformChipProps(props: ChipProps): BaseProps {
  return {
    label: props.label,
    color: props.color ?? "primary",
    size: props.size ?? "small",
    clickable: false,
    variant: props.variant ?? "filled",
    icon: (renderComponent(props.startElement) as ReactElement) ?? undefined,
  };
}
