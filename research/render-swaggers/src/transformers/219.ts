import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4WebhookView = {
                    webhook?: Schema.legacy.v4.LegacyV4Webhook;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Webhook = {
                id?: string;
                channelId?: string;
                name: string;
                url: string;
                token?: string;
                keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
                createdAt?: number;
                watchUserChats?: boolean;
                watchGroups?: boolean;
                apiVersion: string;
                lastBlockedAt?: number;
                blocked?: boolean;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4WebhookView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const webhook = input.webhook;
  // If there's no webhook data, show a simple markdown message
  if (!webhook) {
    return {
      type: "Markdown",
      content: "## No webhook data available",
    };
  }

  // Format timestamps into a human‐readable string
  const formatDate = (ts?: number): string =>
    ts ? new Date(ts).toLocaleString() : "N/A";

  // Mask sensitive token, only keep last 4 characters
  const maskedToken = webhook.token
    ? `••••${webhook.token.slice(-4)}`
    : "N/A";

  // Generate a small status chip for boolean flags
  const booleanChip = (
    flag: boolean | undefined,
    label: string
  ): IAutoView.IAutoViewChipProps => ({
    type: "Chip",
    label,
    size: "small",
    variant: "filled",
    color: flag ? "success" : "error",
  });

  // If keywords exist, turn them into a series of outlined chips
  const keywordChips: IAutoView.IAutoViewChipProps[] =
    webhook.keywords?.map((kw) => ({
      type: "Chip",
      label: kw,
      size: "small",
      variant: "outlined",
      color: "primary",
    })) ?? [];

  // Build the rows of our DataList
  const listItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "ID", variant: "subtitle2" }],
      value: [{ type: "Text", content: webhook.id ?? "N/A", variant: "body1" }],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Channel ID", variant: "subtitle2" }],
      value: [
        { type: "Text", content: webhook.channelId ?? "N/A", variant: "body1" },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "URL", variant: "subtitle2" }],
      // A clickable button for the webhook URL
      value: {
        type: "Button",
        variant: "text",
        size: "small",
        href: webhook.url,
        startElement: { type: "Icon", id: "link", color: "blue", size: 16 },
        label: webhook.url,
      },
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Token", variant: "subtitle2" }],
      value: [{ type: "Text", content: maskedToken, variant: "body1" }],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Created At", variant: "subtitle2" }],
      value: [
        { type: "Text", content: formatDate(webhook.createdAt), variant: "body1" },
      ],
    },
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: "Last Blocked At", variant: "subtitle2" },
      ],
      value: [
        { type: "Text", content: formatDate(webhook.lastBlockedAt), variant: "body1" },
      ],
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "API Version", variant: "subtitle2" }],
      value: [{ type: "Text", content: webhook.apiVersion, variant: "body1" }],
    },
    {
      type: "DataListItem",
      label: [
        { type: "Text", content: "Watch User Chats", variant: "subtitle2" },
      ],
      value: booleanChip(webhook.watchUserChats, webhook.watchUserChats ? "Yes" : "No"),
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Watch Groups", variant: "subtitle2" }],
      value: booleanChip(webhook.watchGroups, webhook.watchGroups ? "Yes" : "No"),
    },
    {
      type: "DataListItem",
      label: [{ type: "Text", content: "Blocked", variant: "subtitle2" }],
      value: booleanChip(webhook.blocked, webhook.blocked ? "Yes" : "No"),
    },
  ];

  // Add a keywords row only if we have any
  if (keywordChips.length) {
    listItems.push({
      type: "DataListItem",
      label: [{ type: "Text", content: "Keywords", variant: "subtitle2" }],
      value: {
        type: "ChipGroup",
        childrenProps: keywordChips,
        maxItems: 5,
      },
    });
  }

  // Compose a vertical card to present all the details
  return {
    type: "VerticalCard",
    childrenProps: [
      {
        type: "CardHeader",
        title: webhook.name,
        description: webhook.url,
        startElement: { type: "Icon", id: "link", color: "blue", size: 24 },
      },
      {
        type: "CardContent",
        childrenProps: {
          type: "DataList",
          childrenProps: listItems,
        },
      },
      {
        type: "CardFooter",
        childrenProps: [
          // Show API version as an outlined chip
          {
            type: "Chip",
            label: `v${webhook.apiVersion}`,
            size: "small",
            variant: "outlined",
            color: "cyan",
          },
          // Show overall blocked/active status
          {
            type: "Chip",
            label: webhook.blocked ? "Blocked" : "Active",
            size: "small",
            variant: "filled",
            color: webhook.blocked ? "error" : "success",
          },
        ],
      },
    ],
  };
}
