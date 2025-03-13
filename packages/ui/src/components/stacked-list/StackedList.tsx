import { IAutoViewStackedListProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const StackedList = ({ items, gap = 8 }: IAutoViewStackedListProps) => {
  return (
    <Stack gap={gap}>
      {items.map((item) => renderComponent(item.children))}
    </Stack>
  );
};

const Stack = styled("div")<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap}px;
`;
