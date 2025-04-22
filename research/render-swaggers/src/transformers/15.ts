import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type IShoppingMileage = {
        id: string & tags.Format<"uuid">;
        value: null | number;
        created_at: string & tags.Format<"date-time">;
        code: string;
        source: string;
        direction: -1 | 1;
    };
}
type IAutoViewTransformerInputType = Schema.IShoppingMileage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // 1. Format the timestamp into a localized human-readable string.
  const date = new Date(input.created_at);
  const formattedDate = isNaN(date.valueOf())
    ? input.created_at
    : date.toLocaleString();

  // 2. Choose an up/down arrow icon to reflect the direction, with green for positive and red for negative.
  const directionIcon: IAutoView.IAutoViewIconProps = {
    type: "Icon",
    id: input.direction === 1 ? "arrow-up" : "arrow-down",
    color: input.direction === 1 ? "green" : "red",
    size: 24,
  };

  // 3. Prepare a Chip component to display the mileage value or "N/A" when null.
  const valueLabel = input.value !== null ? input.value.toString() : "N/A";
  const valueColor =
    input.value === null
      ? "gray"
      : input.value >= 0
      ? "green"
      : "red";
  const valueChip: IAutoView.IAutoViewChipProps = {
    type: "Chip",
    label: valueLabel,
    color: valueColor,
    size: "medium",
    variant: "filled",
  };

  // 4. Assemble the card, leveraging a VerticalCard for mobile-friendly layout.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // CardHeader shows the code and source text, plus the direction icon.
        type: "CardHeader",
        title: input.code,
        description: input.source,
        startElement: directionIcon,
      },
      {
        // CardContent uses Markdown for responsive, formatted display of date and ID.
        type: "CardContent",
        childrenProps: {
          type: "Markdown",
          content:
            `**Date:** ${formattedDate}  \n` +
            `**Record ID:** \`${input.id}\``,
        },
      },
      {
        // CardFooter highlights the value with a color-coded Chip.
        type: "CardFooter",
        childrenProps: valueChip,
      },
    ],
  };
}
