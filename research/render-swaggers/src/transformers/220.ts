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
  // If there's no webhook payload, display a friendly markdown message
  if (!webhook) {
    return {
      type: "Markdown",
      content: "**No webhook data available**",
    };
  }

  // Helper to format a UNIX timestamp (ms or s) into a human-readable string.
  // We assume that timestamps > 10^12 are ms, else seconds.
  const formatDate = (ts: number): string => {
    const millis = ts > 1e12 ? ts : ts * 1000;
    return new Date(millis).toLocaleString();
  };

  // Build a list of key/value pairs for the DataList
  const items: IAutoView.IAutoViewDataListItemProps[] = [];

  // 1) URL as a text button
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "URL", variant: "body2" },
    value: {
      type: "Button",
      label: webhook.url,
      href: webhook.url,
      variant: "text",
      color: "primary",
      startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
    },
  });

  // 2) API version
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "API Version", variant: "body2" },
    value: { type: "Text", content: webhook.apiVersion, variant: "body2" },
  });

  // 3) Token (masked if present)
  items.push({
    type: "DataListItem",
    label: { type: "Text", content: "Token", variant: "body2" },
    value: webhook.token
      ? {
          type: "Markdown",
          content: "`" + webhook.token + "`",
        }
      : { type: "Text", content: "N/A", variant: "body2" },
  });

  // 4) Creation date
  if (typeof webhook.createdAt === "number") {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Created At", variant: "body2" },
      value: {
        type: "Text",
        content: formatDate(webhook.createdAt),
        variant: "body2",
      },
    });
  }

  // 5) Last blocked date (only if it exists)
  if (typeof webhook.lastBlockedAt === "number") {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Last Blocked", variant: "body2" },
      value: {
        type: "Text",
        content: formatDate(webhook.lastBlockedAt),
        variant: "body2",
      },
    });
  }

  // 6) Keywords as a chip group
  if (Array.isArray(webhook.keywords) && webhook.keywords.length > 0) {
    items.push({
      type: "DataListItem",
      label: { type: "Text", content: "Keywords", variant: "body2" },
      value: {
        type: "ChipGroup",
        // show up to 10; overflow will show "+n"
        maxItems: 10,
        childrenProps: webhook.keywords.map((kw) => ({
          type: "Chip",
          label: kw,
          variant: "filled",
          color: "teal",
          size: "small",
        })),
      },
    });
  }

  // 7) Boolean flags with icons
  const booleanFlag = (
    flag: boolean | undefined,
    label: string
  ): IAutoView.IAutoViewDataListItemProps => ({
    type: "DataListItem",
    label: { type: "Text", content: label, variant: "body2" },
    value: {
      type: "Icon",
      id: flag ? "check-circle" : "times-circle",
      color: flag ? "green" : "red",
      size: 16,
    },
  });

  items.push(booleanFlag(webhook.watchUserChats, "Watch User Chats"));
  items.push(booleanFlag(webhook.watchGroups, "Watch Groups"));
  items.push(booleanFlag(webhook.blocked, "Blocked"));

  // Assemble the DataList component
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: items,
  };

  // Card header with an RSS-like icon
  const header: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: webhook.name,
    description: webhook.id ? `ID: ${webhook.id}` : undefined,
    startElement: {
      type: "Icon",
      id: "rss",
      size: 24,
      color: "blue",
    },
  };

  // Card content wrapping our DataList
  const content: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList,
  };

  // Footer with a primary action button to open the webhook URL
  const footer: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "Open Webhook",
      href: webhook.url,
      variant: "contained",
      color: "primary",
      startElement: { type: "Icon", id: "external-link", size: 16 },
    },
  };

  // Return a vertical card that will render nicely on desktop & mobile
  return {
    type: "VerticalCard",
    childrenProps: [header, content, footer],
  };
}
