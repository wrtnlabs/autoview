import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Delivery made by a webhook.
     *
     * @title Webhook delivery
    */
    export type hook_delivery = {
        /**
         * Unique identifier of the delivery.
        */
        id: number & tags.Type<"int32">;
        /**
         * Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).
        */
        guid: string;
        /**
         * Time when the delivery was delivered.
        */
        delivered_at: string;
        /**
         * Whether the delivery is a redelivery.
        */
        redelivery: boolean;
        /**
         * Time spent delivering.
        */
        duration: number;
        /**
         * Description of the status of the attempted delivery
        */
        status: string;
        /**
         * Status code received when delivery was made.
        */
        status_code: number & tags.Type<"int32">;
        /**
         * The event that triggered the delivery.
        */
        event: string;
        /**
         * The type of activity for the event that triggered the delivery.
        */
        action: string | null;
        /**
         * The id of the GitHub App installation associated with this event.
        */
        installation_id: (number & tags.Type<"int32">) | null;
        /**
         * The id of the repository associated with this event.
        */
        repository_id: (number & tags.Type<"int32">) | null;
        /**
         * Time when the webhook delivery was throttled.
        */
        throttled_at?: (string & tags.Format<"date-time">) | null;
        /**
         * The URL target of the delivery.
        */
        url?: string;
        request: {
            /**
             * The request headers sent with the webhook delivery.
            */
            headers: {} | null;
            /**
             * The webhook payload.
            */
            payload: {} | null;
        };
        response: {
            /**
             * The response headers received when the delivery was made.
            */
            headers: {} | null;
            /**
             * The response payload received.
            */
            payload: string | null;
        };
    };
}
type IAutoViewTransformerInputType = Schema.hook_delivery;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to create a simple text component
    const mkText = (content: string, variant: IAutoView.IAutoViewTextProps["variant"] = "body2"): IAutoView.IAutoViewTextProps => ({
        type: "Text",
        content,
        variant,
    });

    // Helper to create a chip for highlighting statuses
    const mkChip = (
        label: string,
        color: IAutoView.IAutoViewChipProps["color"] = "primary",
        variant: IAutoView.IAutoViewChipProps["variant"] = "filled",
        size: IAutoView.IAutoViewChipProps["size"] = "small",
    ): IAutoView.IAutoViewChipProps => ({
        type: "Chip",
        label,
        color,
        variant,
        size,
    });

    // Format date-time strings to readable form
    const formatDate = (iso: string | null | undefined): string => {
        if (!iso) return "—";
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };

    // Build key/value pairs for the main fields (excluding payloads)
    const items: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: mkText("ID"),
            value: mkText(String(input.id)),
        },
        {
            type: "DataListItem",
            label: mkText("Event"),
            value: mkText(input.event),
        },
        {
            type: "DataListItem",
            label: mkText("Status"),
            value: mkText(`${input.status} (${input.status_code})`),
        },
        {
            type: "DataListItem",
            label: mkText("Delivered At"),
            value: mkText(formatDate(input.delivered_at)),
        },
        {
            type: "DataListItem",
            label: mkText("Duration"),
            value: mkText(`${input.duration} ms`),
        },
        {
            type: "DataListItem",
            label: mkText("Redelivery"),
            value: mkChip(
                input.redelivery ? "Yes" : "No",
                input.redelivery ? "warning" : "success",
            ),
        },
        {
            type: "DataListItem",
            label: mkText("Action"),
            value: mkText(input.action ?? "—"),
        },
    ];

    // Optional fields
    if (input.installation_id !== null) {
        items.push({
            type: "DataListItem",
            label: mkText("Installation ID"),
            value: mkText(String(input.installation_id)),
        });
    }
    if (input.repository_id !== null) {
        items.push({
            type: "DataListItem",
            label: mkText("Repository ID"),
            value: mkText(String(input.repository_id)),
        });
    }
    if (input.throttled_at != null) {
        items.push({
            type: "DataListItem",
            label: mkText("Throttled At"),
            value: mkText(formatDate(input.throttled_at)),
        });
    }
    if (input.url) {
        // Use markdown link for clickable URL
        const mdLink = `[# Open Target URL](${input.url})`;
        items.push({
            type: "DataListItem",
            label: mkText("Target URL"),
            value: { type: "Markdown", content: mdLink },
        });
    }

    // Prepare JSON code blocks for request/response
    const renderJsonBlock = (label: string, obj: unknown): IAutoView.IAutoViewPresentationComponentProps[] => {
        const jsonStr = obj != null ? JSON.stringify(obj, null, 2) : "null";
        return [
            mkText(label, "subtitle2"),
            {
                type: "Markdown",
                content: "json\n" + jsonStr + "\n```",
            },
        ];
    };

    // Assemble the card
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with title, subtitle and redelivery badge
                type: "CardHeader",
                title: `Delivery #${input.id}`,
                description: input.event,
                startElement: {
                    type: "Icon",
                    id: "exchange-alt", // generic delivery icon
                    color: "blue",
                    size: 24,
                },
                endElement: mkChip(
                    input.redelivery ? "Redelivery" : "First delivery",
                    input.redelivery ? "warning" : "success",
                ),
            },
            {
                // Main content: data list + separators + raw payloads
                type: "CardContent",
                childrenProps: [
                    // Structured key/value list
                    {
                        type: "DataList",
                        childrenProps: items,
                    },
                    // Divider
                    {
                        type: "Divider",
                        orientation: "horizontal",
                        color: "#eeeeee",
                    },
                    // Request section
                    ...renderJsonBlock("📥 Request Headers & Payload", {
                        headers: input.request.headers,
                        payload: input.request.payload,
                    }),
                    // Divider between request and response
                    {
                        type: "Divider",
                        orientation: "horizontal",
                        color: "#eeeeee",
                    },
                    // Response section
                    ...renderJsonBlock("📤 Response Headers & Payload", {
                        headers: input.response.headers,
                        payload: input.response.payload,
                    }),
                ],
            },
        ],
    };

    return card;
}
