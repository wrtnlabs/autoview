import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace shared {
        export type IntegerView = {
            result?: number & tags.Type<"int32">;
        };
    }
}
type IAutoViewTransformerInputType = Schema.shared.IntegerView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const { result } = input;

  // If there's no numeric result, show a friendly markdown message.
  if (result == null) {
    return {
      type: "Markdown",
      content: "**No result available**"
    };
  }

  // Prepare icon and styling based on sign of the result.
  // Positive numbers get an upward arrow in green,
  // negatives get a downward arrow in red,
  // zero gets a neutral minus in gray.
  const isPositive = result > 0;
  const isNegative = result < 0;
  let iconId: string;
  let color: IAutoView.IAutoViewChipProps["color"];

  if (isPositive) {
    iconId = "arrow-up";
    color = "green";
  } else if (isNegative) {
    iconId = "arrow-down";
    color = "red";
  } else {
    iconId = "minus";
    color = "gray";
  }

  // Construct a Chip component to visualize the numeric result.
  // Chips are compact, mobile-friendly, and include an icon + label.
  return {
    type: "Chip",
    label: result.toString(),
    variant: "filled",
    size: "medium",
    color,
    startElement: {
      type: "Icon",
      id: iconId,
      color,
      size: 16
    }
  };
}
