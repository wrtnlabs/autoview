import { IAutoViewStatsProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

import { Text } from "../text";

export const Stats = (props: IAutoViewStatsProps) => {
  const { title, value } = props;

  return (
    <Box>
      <Text variant="h4">{title}</Text>
      <Text variant="body1">{value}</Text>
    </Box>
  );
};

const Box = styled("div")``;
