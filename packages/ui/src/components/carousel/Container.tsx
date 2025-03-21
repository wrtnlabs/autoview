import { styled } from "@mui/material";
import { type PropsWithChildren } from "react";

import { AutoViewCarouselContext } from "./Context";

export const CarouselContainer = ({ children }: PropsWithChildren<{}>) => {
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
`;

const Container = styled("div")`
  display: flex;
`;
