import { IAutoViewCarouselProps } from "@autoview/interface";
import { styled } from "@mui/material";

import { renderComponent } from "../../renderer";

export const CarouselSlide = ({ children }: IAutoViewCarouselProps.IItem) => {
  return <Slide>{renderComponent(children)}</Slide>;
};

const Slide = styled("div")`
  flex: 0 0 100%;
  min-width: 0;
`;
