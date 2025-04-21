import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = boolean;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Map the boolean value to a corresponding FontAwesome icon and color
  const iconProps: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: input ? "check-circle" : "times-circle",  // "check-circle" for true, "times-circle" for false
    color: input ? "green" : "red",               // green for true, red for false
    size: 32,                                      // medium size icon, good for mobile & desktop
  };

  // Wrap the icon in a tooltip to provide an accessible text label on hover or tap
  const tooltipProps: IAutoView.IAutoViewTooltipProps = {
    type: "Tooltip",
    message: input ? "True" : "False",  // textual representation for screen readers
    childrenProps: iconProps,
  };

  return tooltipProps;
}
