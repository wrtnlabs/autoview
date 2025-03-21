import { IAutoViewChipProps } from "@autoview/interface";
import { Chip as MuiChip } from "@mui/material";

import { transformChipProps } from "./transform";

export const Chip = (props: IAutoViewChipProps) => {
  return <MuiChip {...transformChipProps(props)} />;
};
