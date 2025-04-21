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
  // Format the created_at timestamp into a human-readable string
  const date = new Date(input.created_at);
  const formattedDate = isNaN(date.getTime())
    ? input.created_at    // fallback to the raw string if parsing failed
    : date.toLocaleString();

  // Build the value display component: a colored chip showing +/– value or N/A
  const valueComponent: IAutoView.IAutoViewChipProps | IAutoView.IAutoViewTextProps = 
    input.value === null
      ? {
          type: "Chip",
          label: "N/A",
          color: "gray",
          variant: "filled",
          size: "medium",
        }
      : {
          type: "Chip",
          label: `${input.direction === 1 ? "+" : "-"}${input.value}`,
          color: input.direction === 1 ? "green" : "red",
          variant: "filled",
          size: "medium",
        };

  // Card header with an up/down icon indicating direction and the code + date
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: input.code,
    description: formattedDate,
    startElement: {
      type: "Icon",
      id: input.direction === 1 ? "arrow-up" : "arrow-down",
      color: input.direction === 1 ? "green" : "red",
      size: 24,
    },
  };

  // Card content showing the source as an outlined chip
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: {
      type: "Chip",
      label: input.source,
      color: "primary",
      variant: "outlined",
      size: "small",
    },
  };

  // Card footer showing the mileage change component
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: valueComponent,
  };

  // Return a vertical card aggregating header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
