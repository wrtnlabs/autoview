import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = string[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // If the input array is empty or missing, render a friendly markdown message
  if (!Array.isArray(input) || input.length === 0) {
    return {
      type: "Markdown",
      content: "_No items to display_",
    };
  }

  // Map each string to a compact Chip component for visual appeal and responsiveness.
  // Chips wrap naturally on small screens, making this layout mobile-friendly.
  const chipList: IAutoView.IAutoViewChipProps[] = input.map((item) => ({
    type: "Chip",
    label: item,
    variant: "filled",
    color: "primary",
    size: "small",
  }));

  // Display up to 8 chips by default, collapsing the rest into a "+X" indicator.
  // This keeps the UI tidy on narrow viewports.
  return {
    type: "ChipGroup",
    childrenProps: chipList,
    maxItems: 8,
  };
}
