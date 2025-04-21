import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type actions_billing_usage = {
        /**
         * The sum of the free and paid GitHub Actions minutes used.
        */
        total_minutes_used: number & tags.Type<"int32">;
        /**
         * The total paid GitHub Actions minutes used.
        */
        total_paid_minutes_used: number & tags.Type<"int32">;
        /**
         * The amount of free GitHub Actions minutes available.
        */
        included_minutes: number & tags.Type<"int32">;
        minutes_used_breakdown: {
            /**
             * Total minutes used on Ubuntu runner machines.
            */
            UBUNTU?: number & tags.Type<"int32">;
            /**
             * Total minutes used on macOS runner machines.
            */
            MACOS?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows runner machines.
            */
            WINDOWS?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 4 core runner machines.
            */
            ubuntu_4_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 8 core runner machines.
            */
            ubuntu_8_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 16 core runner machines.
            */
            ubuntu_16_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 32 core runner machines.
            */
            ubuntu_32_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Ubuntu 64 core runner machines.
            */
            ubuntu_64_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 4 core runner machines.
            */
            windows_4_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 8 core runner machines.
            */
            windows_8_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 16 core runner machines.
            */
            windows_16_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 32 core runner machines.
            */
            windows_32_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on Windows 64 core runner machines.
            */
            windows_64_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on macOS 12 core runner machines.
            */
            macos_12_core?: number & tags.Type<"int32">;
            /**
             * Total minutes used on all runner machines.
            */
            total?: number & tags.Type<"int32">;
        };
    };
}
type IAutoViewTransformerInputType = Schema.actions_billing_usage;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms GitHub Actions billing usage data into a visual AutoView component
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  // Extract breakdown values with safe fallbacks
  const ubuntu = input.minutes_used_breakdown.UBUNTU ?? 0;
  const macos = input.minutes_used_breakdown.MACOS ?? 0;
  const windows = input.minutes_used_breakdown.WINDOWS ?? 0;

  // Build a mermaid pie chart to visualize the OS breakdown
  const chartMarkdown = `\`\`\`mermaid
pie title Minutes Used Breakdown by OS
    "Ubuntu": ${ubuntu}
    "macOS": ${macos}
    "Windows": ${windows}
\`\`\``;

  // Prepare a list of summary items
  const summaryItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: { type: "Text", content: "Total Minutes Used" },
      value: { type: "Text", content: String(input.total_minutes_used) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Paid Minutes Used" },
      value: { type: "Text", content: String(input.total_paid_minutes_used) },
    },
    {
      type: "DataListItem",
      label: { type: "Text", content: "Included Free Minutes" },
      value: { type: "Text", content: String(input.included_minutes) },
    },
  ];

  // Compose the full UI as a vertical card:
  // - Header with icon and title
  // - Content with a data list for key metrics
  // - Footer with a pie chart of OS breakdown
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: "GitHub Actions Billing Usage",
        // Use a FontAwesome icon for branding
        startElement: {
          type: "Icon",
          id: "github",
          size: 40,
          color: "blue",
        },
      },
      {
        type: "CardContent",
        // Embed a DataList to display the summary items
        childrenProps: {
          type: "DataList",
          childrenProps: summaryItems,
        },
      },
      {
        type: "CardFooter",
        // Render the OS breakdown as a mermaid pie chart via Markdown
        childrenProps: {
          type: "Markdown",
          content: chartMarkdown,
        },
      },
    ],
  };
}
