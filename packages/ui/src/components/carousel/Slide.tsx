import { IAutoViewNonSurfaceComponentProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

import { renderComponent } from "../../renderer";

export const CarouselSlide = (props: IAutoViewNonSurfaceComponentProps) => {
  return <Slide>{renderComponent(props)}</Slide>;
};

const Slide = styled("div")`
  flex: 0 0 100%;
  min-width: 0;
`;
