import { IAutoViewStatsProps } from "@autoview/interface";
import { styled } from "@mui/material";

import { Typography } from "../typography";

export const Stats = (props: IAutoViewStatsProps) => {
  const { title, value } = props;

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  );
};

const Box = styled("div")``;
