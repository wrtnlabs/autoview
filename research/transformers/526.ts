import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type combined_billing_usage = {
        /**
         * Numbers of days left in billing cycle.
        */
        days_left_in_billing_cycle: number & tags.Type<"int32">;
        /**
         * Estimated storage space (GB) used in billing cycle.
        */
        estimated_paid_storage_for_month: number & tags.Type<"int32">;
        /**
         * Estimated sum of free and paid storage space (GB) used in billing cycle.
        */
        estimated_storage_for_month: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.combined_billing_usage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Create chips for each metric, using icons for quick visual recognition.
  const chips: IAutoView.IAutoViewChipProps[] = [
    {
      type: "Chip",
      label: `${input.days_left_in_billing_cycle} days left`,
      startElement: {
        type: "Icon",
        id: "calendar-days",
        color: "teal",
        size: 16,
      },
      color: "info",
      variant: "outlined",
      size: "medium",
    },
    {
      type: "Chip",
      label: `${input.estimated_paid_storage_for_month} GB paid`,
      startElement: {
        type: "Icon",
        id: "hdd",
        color: "blue",
        size: 16,
      },
      color: "primary",
      variant: "outlined",
      size: "medium",
    },
    {
      type: "Chip",
      label: `${input.estimated_storage_for_month} GB total`,
      startElement: {
        type: "Icon",
        id: "database",
        color: "violet",
        size: 16,
      },
      color: "secondary",
      variant: "outlined",
      size: "medium",
    },
  ];

  // Assemble a vertical card with a header and content area.
  // The header gives context; the content holds our chips for a compact, responsive layout.
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "Billing Usage",
        description: "Overview of your current billing cycle usage",
        startElement: {
          type: "Icon",
          id: "chart-pie",
          color: "teal",
          size: 24,
        },
      },
      {
        type: "CardContent",
        // Embed our ChipGroup directly as the single child component
        childrenProps: {
          type: "ChipGroup",
          childrenProps: chips,
        },
      },
    ],
  };

  return card;
}
