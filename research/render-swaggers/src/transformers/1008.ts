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
  // Destructure input for clarity
  const {
    total_gigabytes_bandwidth_used: totalUsed,
    total_paid_gigabytes_bandwidth_used: paidUsed,
    included_gigabytes_bandwidth: includedFree,
  } = input;

  // Calculate free-used portion and remaining free quota
  // freeUsed = totalUsed − paidUsed (portion covered by free tier)
  const freeUsed = Math.max(totalUsed - paidUsed, 0);
  // remainingFree = includedFree − freeUsed, clamp at zero
  const remainingFree = Math.max(includedFree - freeUsed, 0);

  // Prepare a mermaid pie chart to visualize distribution
  const mermaidPie = [
    'mermaid',
    'pie title Bandwidth Usage Breakdown',
    `"Free Used": ${freeUsed}`,
    `"Remaining Free": ${remainingFree}`,
    `"Paid Used": ${paidUsed}`,
    '```',
  ].join('\n');

  // Compose a vertical card with a header, a chart, and a detailed list
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        // Card header with icon, title and description
        type: "CardHeader",
        startElement: {
          type: "Icon",
          id: "database",    // database icon to represent storage/bandwidth
          color: "blue",
          size: 28,
        },
        title: "Packages Billing Usage",
        description: "Dashboard for GitHub Packages bandwidth usage (GB)",
      },
      {
        // Card content with a mermaid chart and a data list for exact figures
        type: "CardContent",
        childrenProps: [
          {
            // Mermaid chart for a quick visual breakdown
            type: "Markdown",
            content: mermaidPie,
          },
          {
            // DataList to present exact numbers alongside icons
            type: "DataList",
            childrenProps: [
              {
                type: "DataListItem",
                label: [
                  {
                    type: "Icon",
                    id: "download",  // download icon for total used
                    color: "green",
                    size: 20,
                  },
                  {
                    type: "Text",
                    content: "Total Used (GB)",
                  },
                ],
                value: {
                  type: "Text",
                  content: String(totalUsed),
                },
              },
              {
                type: "DataListItem",
                label: [
                  {
                    type: "Icon",
                    id: "gift",      // gift icon for included free quota
                    color: "teal",
                    size: 20,
                  },
                  {
                    type: "Text",
                    content: "Free Included (GB)",
                  },
                ],
                value: {
                  type: "Text",
                  content: String(includedFree),
                },
              },
              {
                type: "DataListItem",
                label: [
                  {
                    type: "Icon",
                    id: "credit-card", // credit-card icon for paid usage
                    color: "red",
                    size: 20,
                  },
                  {
                    type: "Text",
                    content: "Paid Used (GB)",
                  },
                ],
                value: {
                  type: "Text",
                  content: String(paidUsed),
                },
              },
            ],
          },
        ],
      },
    ],
  };
}
