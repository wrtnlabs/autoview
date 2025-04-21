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
  const { webhook } = input;

  // If there's no webhook data, render a simple text message.
  if (!webhook) {
    return {
      type: "Text",
      content: "No webhook data available",
    };
  }

  // Helper to format timestamps into human‑readable strings.
  const formatDate = (ts?: number): string =>
    ts != null ? new Date(ts).toLocaleString() : "N/A";

  // Build a list of key/value pairs to display in a DataList.
  const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
    {
      type: "DataListItem",
      label: {
        type: "Chip",
        label: "Channel",
        size: "small",
        variant: "outlined",
      },
      value: {
        type: "Text",
        content: webhook.channelId ?? "N/A",
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Chip",
        label: "Version",
        size: "small",
        variant: "outlined",
      },
      value: {
        type: "Text",
        content: webhook.apiVersion,
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Chip",
        label: "Created",
        size: "small",
        variant: "outlined",
      },
      value: {
        type: "Text",
        content: formatDate(webhook.createdAt),
      },
    },
    {
      type: "DataListItem",
      label: {
        type: "Chip",
        label: "Last Blocked",
        size: "small",
        variant: "outlined",
      },
      value: {
        type: "Text",
        content: formatDate(webhook.lastBlockedAt),
      },
    },
  ];

  // Prepare a set of chips to show status flags and tag‑like arrays.
  const footerElements: IAutoView.IAutoViewPresentationComponentProps[] = [];

  // Token status chip (masked indicator).
  footerElements.push({
    type: "Chip",
    label: webhook.token ? "Token Set" : "No Token",
    size: "small",
    variant: "filled",
    color: webhook.token ? "success" : "warning",
  });

  // Blocked status chip.
  footerElements.push({
    type: "Chip",
    label: webhook.blocked ? "Blocked" : "Active",
    size: "small",
    variant: "filled",
    color: webhook.blocked ? "error" : "success",
  });

  // Scopes as an outlined chip group for quick glance.
  if (Array.isArray(webhook.scopes) && webhook.scopes.length > 0) {
    footerElements.push({
      type: "ChipGroup",
      childrenProps: webhook.scopes.map((scope) => ({
        type: "Chip",
        label: scope,
        size: "small",
        variant: "outlined",
        color: "primary",
      })),
    });
  }

  // Deprecated keywords (if present) as a secondary chip group.
  if (Array.isArray(webhook.keywords) && webhook.keywords.length > 0) {
    footerElements.push({
      type: "ChipGroup",
      childrenProps: webhook.keywords.map((kw) => ({
        type: "Chip",
        label: kw,
        size: "small",
        variant: "outlined",
        color: "secondary",
      })),
    });
  }

  // Compose everything into a responsive vertical card.
  return {
    type: "VerticalCard",
    childrenProps: [
      // Header: shows the name and URL, with a link icon.
      {
        type: "CardHeader",
        title: webhook.name,
        description: webhook.url,
        startElement: {
          type: "Icon",
          id: "link",
          color: "blue",
          size: 24,
        },
      },
      // Content: a data list of core properties.
      {
        type: "CardContent",
        // Single child component is allowed, we supply our DataList directly.
        childrenProps: {
          type: "DataList",
          childrenProps: dataListItems,
        },
      },
      // Footer: chips for token, blocked status, scopes, and keywords.
      {
        type: "CardFooter",
        childrenProps: footerElements,
      },
    ],
  };
}
