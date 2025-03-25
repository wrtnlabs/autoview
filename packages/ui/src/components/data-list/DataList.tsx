import { IAutoViewDataListProps } from "@autoview/interface";
import { Stack } from "@mui/material";

import { TransformToComponentProps } from "../../utils/TransformToComponentProps";
import { DataListItem } from "./DataListItem";

export interface DataListProps
  extends TransformToComponentProps<IAutoViewDataListProps> {}

export const DataList = function ({ childrenProps = [] }: DataListProps) {
  return (
    <Stack>
      {childrenProps.map((prop, index) => (
        <DataListItem key={index} {...prop} />
      ))}
    </Stack>
  );
};
