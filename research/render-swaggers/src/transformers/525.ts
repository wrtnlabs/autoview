import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type packages_billing_usage = {
        /**
         * Sum of the free and paid storage space (GB) for GitHuub Packages.
        */
        total_gigabytes_bandwidth_used: number & tags.Type<"int32">;
        /**
         * Total paid storage space (GB) for GitHuub Packages.
        */
        total_paid_gigabytes_bandwidth_used: number & tags.Type<"int32">;
        /**
         * Free storage space (GB) for GitHub Packages.
        */
        included_gigabytes_bandwidth: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.packages_billing_usage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract metrics from the input
  const usedGB = input.total_gigabytes_bandwidth_used;
  const paidGB = input.total_paid_gigabytes_bandwidth_used;
  const freeGB = input.included_gigabytes_bandwidth;

  // Return a vertical card grouping a header and a set of visual chips
  return {
    type: "VerticalCard",
    childrenProps: [
      // Card header with an icon to identify the metric category
      {
        type: "CardHeader",
        title: "Packages Billing Usage",
        startElement: {
          type: "Icon",
          id: "server",        // FontAwesome "server" icon
          size: 24,
          color: "blue"
        }
      },
      // Card content holds a ChipGroup component to display each metric
      {
        type: "CardContent",
        childrenProps: {
          type: "ChipGroup",
          // Each chip has an icon + label, colored to enhance visual parsing
          childrenProps: [
            {
              type: "Chip",
              label: `Used: ${usedGB} GB`,
              startElement: {
                type: "Icon",
                id: "database",   // FontAwesome "database" icon
                size: 16,
                color: "blue"
              },
              color: "blue",
              variant: "filled"
            },
            {
              type: "Chip",
              label: `Paid: ${paidGB} GB`,
              startElement: {
                type: "Icon",
                id: "dollar-sign",// FontAwesome "dollar-sign" icon
                size: 16,
                color: "green"
              },
              color: "green",
              variant: "filled"
            },
            {
              type: "Chip",
              label: `Free: ${freeGB} GB`,
              startElement: {
                type: "Icon",
                id: "gift",       // FontAwesome "gift" icon
                size: 16,
                color: "gray"
              },
              color: "gray",
              variant: "filled"
            }
          ]
        }
      }
    ]
  };
}
