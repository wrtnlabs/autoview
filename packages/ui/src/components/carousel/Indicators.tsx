import { styled } from "@mui/material";
import React from "react";

import { AutoViewCarouselContext } from "./Context";

export interface CarouselIndicators {
  items: any[];
}

export const CarouselIndicators = ({ items }: CarouselIndicators) => {
  const { carouselApi, selectedIndex, setSelectedIndex } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <DotContainer>
      {items.map((item, index) => (
        <Dot
          key={item.key}
          active={index === selectedIndex}
          onClick={() => {
            setSelectedIndex(index);
            carouselApi?.scrollTo(index);
          }}
        />
      ))}
    </DotContainer>
  );
};

const DotContainer = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Dot = styled("div")<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${(props) => (props.active ? "red" : "gray")};
`;
