import { IAutoViewGridListProps } from "@autoview/interface";
import { Grid2Props } from "@mui/material";

export function transformGridListProps(
  props: IAutoViewGridListProps,
): Grid2Props {
  return {
    rowGap: `${props.rowGap}px`,
    columnGap: `${props.columnGap}px`,
  };
}

export function transformGridItemProps(
  props: IAutoViewGridListProps.IItem,
): Grid2Props {
  return {
    size: props.column,
    offset: props.offset,
  };
}
