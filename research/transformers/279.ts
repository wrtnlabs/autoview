import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type WebhookView = {
        webhook?: Schema.webhook.Webhook;
    };
    export namespace webhook {
        export type Webhook = {
            id?: string;
            channelId?: string;
            name: string;
            url: string;
            token?: string;
            createdAt?: number;
            scopes: ("userChat.opened" | "message.created.userChat" | "message.created.teamChat" | "lead.upserted.contact" | "lead.upserted.subscription" | "lead.deleted" | "member.upserted.contact" | "member.upserted.subscription" | "member.deleted")[] & tags.UniqueItems;
            /**
             * @deprecated
            */
            keywords?: string[] & tags.MinItems<1> & tags.MaxItems<20> & tags.UniqueItems;
            apiVersion: string;
            lastBlockedAt?: number;
            blocked?: boolean;
        };
    }
}
type IAutoViewTransformerInputType = Schema.WebhookView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
  const webhook = input.webhook;
  // If there's no webhook, render a markdown notice.
  if (!webhook) {
    return {
      type: "Markdown",
      content: "### No webhook data available.\n\nPlease configure a webhook to see its details."
    };
  }

  // Helper: format timestamp or fallback to "N/A"
  const formatDate = (ms?: number): string =>
    ms ? new Date(ms).toLocaleString() : "N/A";

  // Helper: mask a token for privacy, show first 4 & last 4 chars
  const maskToken = (token?: string): string => {
    if (!token) return "N/A";
    const len = token.length;
    if (len <= 8) return token;
    return `${token.slice(0, 4)}…${token.slice(-4)}`;
  };

  // Build chips for scopes
  const scopeChips: IAutoView.IAutoViewChipProps[] = webhook.scopes.map(
    (scope) => ({
      type: "Chip",
      label: scope,
      size: "small",
      variant: "outlined",
      color: "blue"
    })
  );

  // Build chips for keywords if present
  const keywordChips: IAutoView.IAutoViewChipProps[] = (webhook.keywords || []).map(
    (kw) => ({
      type: "Chip",
      label: kw,
      size: "small",
      variant: "outlined",
      color: "teal"
    })
  );

  // Badge indicating blocked state
  const blockedBadge: IAutoView.IAutoViewBadgeProps = {
    type: "Badge",
    childrenProps: {
      type: "Icon",
      id: webhook.blocked ? "ban" : "check",
      size: 16,
      color: webhook.blocked ? "red" : "green"
    },
    // Use a dot badge to draw attention
    dot: true,
    // Semantic color for badge background
    color: webhook.blocked ? "error" : "success",
    showZero: true
  };

  // Compose data list items for each field
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "URL",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "Button",
        label: "Open",
        href: webhook.url,
        variant: "text",
        color: "info",
        size: "small"
      }
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Token",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "Text",
        content: maskToken(webhook.token),
        variant: "body2",
        color: "gray"
      }
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Created At",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "Text",
        content: formatDate(webhook.createdAt),
        variant: "body2",
        color: "gray"
      }
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "API Version",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "Text",
        content: webhook.apiVersion,
        variant: "body2",
        color: "gray"
      }
    },
    {
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Scopes",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "ChipGroup",
        childrenProps: scopeChips,
        maxItems: 5
      }
    }
  ];

  // If there are keywords, append them
  if (keywordChips.length > 0) {
    dataListItems.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Keywords",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "ChipGroup",
        childrenProps: keywordChips,
        maxItems: 10
      }
    });
  }

  // If webhook has been blocked before, show last blocked timestamp
  if (webhook.lastBlockedAt) {
    dataListItems.push({
      type: "DataListItem",
      label: [
        {
          type: "Text",
          content: "Last Blocked At",
          variant: "subtitle2",
          color: "secondary"
        }
      ],
      value: {
        type: "Text",
        content: formatDate(webhook.lastBlockedAt),
        variant: "body2",
        color: "gray"
      }
    });
  }

  // Assemble the DataList
  const dataList: IAutoView.IAutoViewDataListProps = {
    type: "DataList",
    childrenProps: dataListItems
  };

  // Build the card header with an icon and blocked badge
  const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
    type: "CardHeader",
    title: webhook.name,
    description: webhook.channelId
      ? `Channel: ${webhook.channelId}`
      : undefined,
    startElement: {
      type: "Icon",
      id: "link",
      size: 24,
      color: "blue"
    },
    endElement: blockedBadge
  };

  // Card content holds the data list
  const cardContent: IAutoView.IAutoViewCardContentProps = {
    type: "CardContent",
    childrenProps: dataList
  };

  // Card footer with a primary action button
  const cardFooter: IAutoView.IAutoViewCardFooterProps = {
    type: "CardFooter",
    childrenProps: {
      type: "Button",
      label: "Visit Webhook",
      href: webhook.url,
      variant: "contained",
      color: "primary",
      size: "medium"
    }
  };

  // Return a vertical card assembling header, content, and footer
  return {
    type: "VerticalCard",
    childrenProps: [cardHeader, cardContent, cardFooter]
  };
}
