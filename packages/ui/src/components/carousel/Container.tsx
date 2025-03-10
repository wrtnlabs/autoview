import { styled } from "@mui/material";
import React, { PropsWithChildren } from "react";

import { AutoViewCarouselContext } from "./Context";

export const CarouselContainer = (props: PropsWithChildren) => {
  const { carouselRef } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <RefContainer ref={carouselRef}>
      <Container>{props.children}</Container>
    </RefContainer>
  );
};

const RefContainer = styled("div")`
  position: relative;
  overflow: hidden;
`;

const Container = styled("div")`
  display: flex;
`;
