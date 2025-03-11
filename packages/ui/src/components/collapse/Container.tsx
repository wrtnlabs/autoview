import { IAutoViewCollapseProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

import { Collapse } from "./Collapse";

export const CollapseContainer = (props: IAutoViewCollapseProps) => {
  return (
    <Container>
      {props.items.map((item) => (
        <Collapse {...item} />
      ))}
    </Container>
  );
};

const Container = styled("div")``;
