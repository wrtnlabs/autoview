import { IAutoViewChipProps } from "@autoview/interface";
import { ChipOwnProps } from "@mui/material";

export function transformChipProps(props: IAutoViewChipProps): ChipOwnProps {
  return {
    label: props.label,
    color: "primary", // TODO: Fix this
    size: "small", // TODO: Fix this
    clickable: false,
    avatar: undefined, // // TODO: props.startElement
    deleteIcon: undefined, // TODO: props.endElement
  };
}
