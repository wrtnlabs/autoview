import { IAutoViewCardProps } from "@autoview/interface";
import { CardProps as BaseProps, Card as MuiCard } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface CardProps
  extends TransformToComponentProps<IAutoViewCardProps> {}

export const Card = ({ childrenProps, ...props }: CardProps) => {
  return (
    <MuiCard {...transformCardProps(props)} raised>
      {renderComponent(childrenProps)}
    </MuiCard>
  );
};

export function transformCardProps(props: CardProps): BaseProps {
  return {};
}
