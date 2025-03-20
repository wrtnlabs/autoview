import { IAutoViewPresentationComponentProps } from "@autoview/interface";
import { styled } from "@mui/material";
import React from "react";

import { AutoViewCarouselContext } from "./Context";

export interface CarouselIndicators {
  items: IAutoViewPresentationComponentProps[];
}

export const CarouselIndicators = ({ items }: CarouselIndicators) => {
  const { carouselApi, selectedIndex, setSelectedIndex } =
    AutoViewCarouselContext.useAutoViewCarouselContextContext();

  return (
    <DotContainer>
      {items.map((item, index) => (
        <Dot
          key={`${item.type}.${index}`}
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
  gap: 8px;
  padding-top: 10px;
`;

const Dot = styled("div")<{ active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 100%;
  background-color: ${(props) => (props.active ? "red" : "gray")};
`;
