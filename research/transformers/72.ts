import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = number;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Determine the sign of the number to choose an appropriate icon and color
  const isPositive = input > 0;
  const isNegative = input < 0;

  // Default to neutral for zero or non-numeric cases
  let color: IAutoView.IAutoViewChipProps["color"] = "gray";
  let iconId = "circle"; // neutral circle icon

  if (isPositive) {
    color = "green";
    iconId = "arrow-up";
  } else if (isNegative) {
    color = "red";
    iconId = "arrow-down";
  }

  // Compose a Chip with an icon to visually represent the number
  return {
    type: "Chip",
    label: input.toString(),
    variant: "filled",
    color,
    size: "medium",
    startElement: {
      // Icon indicating increase/decrease/neutral
      type: "Icon",
      id: iconId,
      color,
      size: 12,
    },
  };
}
