import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4OneTimeMsgUserView = {
                    oneTimeMsgUser?: Schema.legacy.v4.marketing.LegacyV4OneTimeMsgUser;
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                export type LegacyV4OneTimeMsgUser = {
                    oneTimeMsgId?: string;
                    userId?: string;
                    sent?: number;
                    view?: number;
                    goal?: number;
                    click?: number;
                    version?: number & tags.Type<"int32">;
                    id?: string;
                };
            }
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4OneTimeMsgUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const user = input.oneTimeMsgUser;
  // If there's no data, show a friendly markdown message
  if (!user) {
    return {
      type: "Markdown",
      content: "### No User Data Available\nNo one-time message user data was provided."
    };
  }

  // Normalize metrics (fallback to zero if undefined)
  const sent   = user.sent   ?? 0;
  const views  = user.view   ?? 0;
  const clicks = user.click  ?? 0;
  const goal   = user.goal   ?? 0;

  // Define each metric with a label, icon, and its numeric value
  const metrics = [
    { label: "Sent",   icon: "paper-plane", value: sent   },
    { label: "Views",  icon: "eye",         value: views  },
    { label: "Clicks", icon: "hand-pointer",value: clicks },
    { label: "Goal",   icon: "bullseye",    value: goal   },
  ];

  // Build a DataListItem for each metric
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = metrics.map(metric => {
    // For "Views", compare against goal to pick a color
    let chipColor: IAutoView.IAutoViewChipProps["color"] = "primary";
    if (metric.label === "Views" && goal > 0) {
      const ratio = metric.value / goal;
      if (ratio >= 1)         chipColor = "success";
      else if (ratio >= 0.75) chipColor = "info";
      else if (ratio >= 0.5)  chipColor = "warning";
      else                     chipColor = "error";
    }

    return {
      type: "DataListItem",
      // Combine an icon and text for the label
      label: [
        { type: "Icon", id: metric.icon, size: 20, color: "gray" },
        { type: "Text", content: metric.label, variant: "body1", color: "gray" }
      ],
      // Show the metric as a colored chip
      value: {
        type: "Chip",
        label: `${metric.value}`,
        color: chipColor,
        size: "small",
        variant: "filled"
      }
    };
  });

  // Compose a vertical card with header and content
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: `User: ${user.userId ?? "Unknown"}`,
        description: `Message ID: ${user.oneTimeMsgId ?? "N/A"}`,
        startElement: { type: "Icon", id: "chart-bar", size: 24, color: "blue" }
      },
      {
        type: "CardContent",
        // Nest a DataList inside the card content
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems
        }
      }
    ]
  };
}
