import { IAutoViewChipGroupProps } from "@autoview/interface";
import { Stack } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ChipGroupProps
  extends TransformToComponentProps<IAutoViewChipGroupProps> {}

export const ChipGroup = ({
  childrenProps = [],
  maxItems = 3,
  ...props
}: ChipGroupProps) => {
  return (
    <Stack flexDirection="row" sx={baseStyle} {...props}>
      {renderComponent(childrenProps.slice(0, maxItems))}
    </Stack>
  );
};

const baseStyle = {
  gap: "4px",
};
