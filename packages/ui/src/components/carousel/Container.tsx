import { styled } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { AutoViewCarouselContext } from "./Context";

export const CarouselContainer = ({ children }: PropsWithChildren) => {
  const { carouselRef } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <RefContainer ref={carouselRef}>
      <Container>{children}</Container>
    </RefContainer>
  );
};

const RefContainer = styled("div")`
  position: relative;
  overflow: hidden;
  width: 500px;
  height: 400px;
`;

const Container = styled("div")`
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
  }
`;
