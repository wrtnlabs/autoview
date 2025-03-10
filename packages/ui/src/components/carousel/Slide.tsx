import { IAutoViewCarouselProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

export const CarouselSlide = (props: {
  item: IAutoViewCarouselProps.IItem;
}) => {
  return <Slide>{JSON.stringify(props)}</Slide>;
};

const Slide = styled("div")`
  flex: 0 0 100%;
  min-width: 0;
`;
