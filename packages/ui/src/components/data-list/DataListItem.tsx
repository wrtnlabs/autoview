import { IAutoViewDataListItemProps } from "@autoview/interface";
import { Stack } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface DataListItemProps
  extends TransformToComponentProps<IAutoViewDataListItemProps> {}

export const DataListItem = function ({ label, value }: DataListItemProps) {
  return (
    <Stack flexDirection="row">
      {renderComponent(label)}
      {renderComponent(value)}
    </Stack>
  );
};
