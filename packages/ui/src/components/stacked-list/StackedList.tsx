import { IAutoViewStackedListProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

export const StackedList = ({ children }: IAutoViewStackedListProps) => {
  return <Stack>{children}</Stack>;
};

const Stack = styled("div")`
  display: flex;
  flex-direction: column;
`;
