import { IAutoViewButtonProps } from "@autoview/interface";
import { Button as BaseButton, ButtonProps as BaseProps } from "@mui/material";

import { renderComponent } from "../../renderer";
import { TransformToComponentProps } from "../../utils/TransformToComponentProps";

export interface ButtonProps
  extends TransformToComponentProps<IAutoViewButtonProps> {}

export const Button = (props: ButtonProps) => {
  const { startElement, endElement, label } = props;

  function onClickHrefButton() {
    if (!props.href) return;
    window.open(props.href, "_blank");
  }

  return (
    <BaseButton
      sx={baseStyle}
      {...transformButtonProps(props)}
      onClick={onClickHrefButton}
    >
      {renderComponent(startElement)}
      {renderComponent(label)}
      {renderComponent(endElement)}
    </BaseButton>
  );
};

export function transformButtonProps(props: ButtonProps): BaseProps {
  return {
    variant: props.variant ?? "contained",
    color: props.color ?? "blue",
    size: props.size ?? "small",
  };
}

const baseStyle = {
  gap: "8px",
};
