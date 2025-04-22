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

    // If no webhook data is provided, show a simple informative text
    if (!webhook) {
        return {
            type: "Text",
            content: "No webhook data available",
            variant: "body1",
            color: "tertiary",
        };
    }

    // Helper to format a timestamp (in ms) into a localized string or "-" if undefined
    const formatDate = (ts?: number): string =>
        ts !== undefined ? new Date(ts).toLocaleString() : "-";

    // Helper to mask sensitive token, showing only last 4 chars if available
    const maskToken = (token?: string): string => {
        if (!token) return "-";
        const len = token.length;
        if (len <= 4) return "****";
        return "••••" + token.slice(len - 4);
    };

    // Prepare the list of key/value pairs for details
    const detailsItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Webhook ID",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.id ?? "-",
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Channel",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.channelId ?? "-",
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "URL",
                variant: "body2",
                color: "secondary",
            },
            // Provide a button that opens the URL in a new tab
            value: {
                type: "Button",
                variant: "text",
                size: "small",
                color: "primary",
                href: webhook.url,
                startElement: {
                    type: "Icon",
                    id: "link",
                    size: 16,
                    color: "cyan",
                },
                label: "Open",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Token",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: maskToken(webhook.token),
                variant: "body1",
                color: webhook.token ? "gray" : "disabled",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Created At",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: formatDate(webhook.createdAt),
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "API Version",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.apiVersion,
                variant: "body1",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Blocked",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: webhook.blocked ? "Yes" : "No",
                variant: "body1",
                color: webhook.blocked ? "error" : "success",
            },
        },
        {
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Last Blocked",
                variant: "body2",
                color: "secondary",
            },
            value: {
                type: "Text",
                content: formatDate(webhook.lastBlockedAt),
                variant: "body1",
            },
        },
    ];

    // Build a group of chips for each scope for a compact overview
    const scopeChips = webhook.scopes.map((scope) => ({
        type: "Chip" as const,
        label: scope,
        size: "small" as const,
        variant: "outlined" as const,
        color: "primary" as const,
    }));

    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with an icon, title, and blocked status indicator
                type: "CardHeader",
                title: webhook.name,
                description: webhook.id ? `ID: ${webhook.id}` : undefined,
                startElement: {
                    type: "Icon",
                    id: "plug",
                    size: 32,
                    color: "blue",
                },
                endElement: webhook.blocked
                    ? {
                          type: "Icon",
                          id: "ban",
                          size: 24,
                          color: "red",
                      }
                    : undefined,
            },
            {
                // Main content displaying all details in a data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailsItems,
                },
            },
            {
                // Footer showing the scopes as a chip group
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: scopeChips,
                    maxItems: 10, // avoid overflow on small screens
                },
            },
        ],
    };
}
