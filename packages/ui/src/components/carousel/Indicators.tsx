import { styled } from "@mui/material";

export interface CarouselIndicators {
  items: any[];
}

export const CarouselIndicators = ({ items }: CarouselIndicators) => {
  return (
    <DotContainer>
      {items.map((item) => (
        <Dot key={item.key} active={item} />
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
  background-color: ${(props) => (props.active ? "blue" : "gray")};
`;
