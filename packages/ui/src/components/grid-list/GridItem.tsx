import { IAutoViewGridListProps } from "@autoview/interface";
import { Grid2 as MuiGrid } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";
import { transformGridItemProps } from "./transform";

export const GridItem = (props: IAutoViewGridListProps.IItem) => {
  const itemProps = transformGridItemProps(props);

  return <MuiGrid {...itemProps}>{renderComponent(props.children)}</MuiGrid>;
};
