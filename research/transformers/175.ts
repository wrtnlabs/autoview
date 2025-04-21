import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4CampaignUserView = {
                    campaignUser?: Schema.legacy.v4.marketing.LegacyV4CampaignUser;
                };
            }
        }
        export namespace v4 {
            export namespace marketing {
                export type LegacyV4CampaignUser = {
                    campaignId?: string;
                    userId?: string;
                    msgId?: string;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4CampaignUserView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const data = input.campaignUser;
  // If there's no campaign user data, show a friendly Markdown message
  if (!data) {
    return {
      type: "Markdown",
      content: "**No campaign user data available.**",
    };
  }

  // Destructure metrics with sensible defaults
  const {
    campaignId = "–",
    userId = "–",
    msgId = "–",
    sent,
    view,
    goal,
    click,
    version,
  } = data;

  // Helper to convert any value to string or fallback dash
  const formatValue = (value: unknown): string =>
    value !== undefined && value !== null ? String(value) : "–";

  // Build a list of label/value pairs for core metrics
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [];
  const addMetric = (label: string, value: unknown) => {
    listItems.push({
      type: "DataListItem",
      // Label as a small, secondary-styled text
      label: {
        type: "Text",
        variant: "subtitle2",
        color: "secondary",
        content: [label],
      },
      // Value as body2 text
      value: {
        type: "Text",
        variant: "body2",
        content: [formatValue(value)],
      },
    });
  };

  addMetric("Message ID", msgId);
  addMetric("Sent", sent);
  addMetric("Views", view);
  addMetric("Clicks", click);
  addMetric("Goal", goal);
  addMetric("Version", version);

  // Compose the DataList component
  const metricsList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: listItems,
  };

  // Header: shows an icon and identifies campaign + user
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: `Campaign: ${campaignId}`,
    description: `User: ${userId}`,
    // Use a FontAwesome chart-bar icon to represent analytics
    startElement: {
      type: "Icon",
      id: "chart-bar",
      color: "blue",
      size: 24,
    },
  };

  // Content: embed the metrics DataList in the card
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: [metricsList],
  };

  // Footer: action button linking to campaign details (if ID exists)
  const footerButton: IAutoView.IAutoViewButtonProps = {
    type: "Button",
    label: "View Details",
    variant: "outlined",
    color: "primary",
    size: "small",
    // Only attach a link if campaignId is present
    ...(campaignId !== "–" && { href: `/campaign/${campaignId}` }),
  };
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: [footerButton],
  };

  // Assemble into a responsive vertical card
  const card: IAutoView.IAutoViewVerticalCardProps = {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };

  return card;
}
