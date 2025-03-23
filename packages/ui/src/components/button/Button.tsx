import { IAutoViewButtonProps } from "@autoview/interface";
import { Button as BaseButton } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ButtonProps
  extends TransformToComponentProps<IAutoViewButtonProps> {}

export const Button = (props: ButtonProps) => {
  const { variant, size, startElement, endElement, label } = props;

  return (
    <BaseButton variant="contained" size="small">
      {renderComponent(startElement)}
      {renderComponent(label)}
      {renderComponent(endElement)}
    </BaseButton>
  );
};
