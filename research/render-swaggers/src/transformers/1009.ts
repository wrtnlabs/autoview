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



// Transforms combined billing usage data into a visual AutoView component.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Destructure and rename inputs for clarity.
  const {
    days_left_in_billing_cycle: daysLeft,
    estimated_paid_storage_for_month: paidStorage,
    estimated_storage_for_month: totalStorage,
  } = input;

  // Prepare a list of items to display each metric with an icon and a text label/value.
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      // Combine an icon and text for the label.
      label: [
        { type: "Icon", id: "clock", color: "blue", size: 20 },
        { type: "Text", content: "Days left in billing cycle", variant: "body2" },
      ],
      // Display the numeric value with units.
      value: { type: "Text", content: `${daysLeft} days`, variant: "body1" },
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "hdd", color: "green", size: 20 },
        { type: "Text", content: "Estimated paid storage", variant: "body2" },
      ],
      value: { type: "Text", content: `${paidStorage} GB`, variant: "body1" },
    },
    {
      type: "DataListItem",
      label: [
        { type: "Icon", id: "database", color: "teal", size: 20 },
        { type: "Text", content: "Estimated total storage", variant: "body2" },
      ],
      value: { type: "Text", content: `${totalStorage} GB`, variant: "body1" },
    },
  ];

  // Compose the final UI as a vertical card with a header and data list.
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Title and description for the whole card.
        title: "Billing Usage",
        description: "Overview of your billing cycle usage",
        // A pie-chart icon to visually indicate metrics overview.
        startElement: { type: "Icon", id: "chart-pie", color: "indigo", size: 24 },
      },
      {
        type: "CardContent",
        // Embed a DataList to render our metrics in a responsive, mobile-friendly list.
        childrenProps: {
          type: "DataList",
          childrenProps: listItems,
        },
      },
    ],
  };
}
