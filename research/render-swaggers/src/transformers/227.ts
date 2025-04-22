import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace open {
        export namespace marketing {
            export type CampaignUserView = {
                campaignUser?: Schema.marketing.CampaignUser;
            };
        }
    }
    export namespace marketing {
        export type CampaignUser = {
            campaignId?: string;
            userId?: string;
            msgId?: string;
            userChatId?: string;
            sent?: number;
            view?: number;
            goal?: number;
            click?: number;
            version?: number & tags.Type<"int32">;
            id?: string;
            campaignMessageView?: boolean;
        };
    }
}
type IAutoViewTransformerInputType = Schema.open.marketing.CampaignUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms CampaignUserView data into a visual AutoView component tree.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const cu = input.campaignUser;
  // Handle edge case: no campaign data provided
  if (!cu) {
    return {
      type: "Markdown",
      content: "**No campaign data available**",
    };
  }

  // Destructure metrics with sensible defaults
  const {
    campaignId,
    userId,
    sent = 0,
    view = 0,
    click = 0,
    goal = 0,
    version,
    campaignMessageView,
  } = cu;

  // Helper: build a DataListItem for a given metric
  const createMetricItem = (
    label: string,
    iconId: string,
    value: number | undefined,
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    // Label area: icon + text
    label: [
      {
        type: "Icon",
        id: iconId,
        size: 16,
        color: "gray",
      },
      {
        type: "Text",
        content: label,
        variant: "body2",
      },
    ],
    // Value area: just the number
    value: {
      type: "Text",
      content: String(value ?? 0),
      variant: "body2",
    },
  });

  // Aggregate the core metrics
  const metrics: IAutoView.IAutoViewDataListItemProps[] = [
    createMetricItem("Sent", "paper-plane", sent),
    createMetricItem("Views", "eye", view),
    createMetricItem("Clicks", "mouse-pointer", click),
    createMetricItem("Goal", "bullseye", goal),
  ];
  // Optionally include version if present
  if (version !== undefined) {
    metrics.push(createMetricItem("Version", "tag", version));
  }

  // Build the responsive card layout
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        // Show the campaign and user identifiers
        title: `Campaign ${campaignId}`,
        description: `User ${userId}`,
        // A prominent icon to identify the card
        startElement: {
          type: "Icon",
          id: "bullhorn",
          size: 24,
          color: "blue",
        },
        // A badge indicating if the message was viewed
        endElement: campaignMessageView
          ? {
              type: "Chip",
              label: "Viewed",
              color: "green",
              size: "small",
              variant: "filled",
            }
          : {
              type: "Chip",
              label: "Not Viewed",
              color: "gray",
              size: "small",
              variant: "outlined",
            },
      },
      {
        type: "CardContent",
        // Present the metric list
        childrenProps: {
          type: "DataList",
          childrenProps: metrics,
        },
      },
    ],
  };
}
