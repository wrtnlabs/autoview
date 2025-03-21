import { IAutoViewGridListProps } from "@autoview/interface";
import { Grid2 as MuiGrid } from "@mui/material";

import { renderComponent } from "../../renderer";
import { transformGridListProps } from "./transform";

export const GridList = (props: IAutoViewGridListProps) => {
  const listProps = transformGridListProps(props);

  return (
    <MuiGrid container {...listProps}>
      {props.items.map((item) => renderComponent(item.children))}
    </MuiGrid>
  );
};
