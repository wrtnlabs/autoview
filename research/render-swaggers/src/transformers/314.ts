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
    // Format timestamp for user-friendly display
    const deliveredAt = new Date(input.delivered_at).toLocaleString();

    // Pretty-print JSON payloads for markdown rendering
    const requestPayload = JSON.stringify(input.request.payload ?? {}, null, 2);
    const responsePayload = JSON.stringify(input.response.payload ?? '', null, 2);

    // Build a list of key/value DataListItem components
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [
        {
            type: "DataListItem",
            label: [
                { type: "Icon", id: "hashtag", size: 16, color: "gray" },
                { type: "Text", content: ["ID"] }
            ],
            value: { type: "Text", content: [`${input.id}`] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "fingerprint", size: 16, color: "gray" },
            value: { type: "Text", content: [`${input.guid}`] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "calendar-alt", size: 16, color: "gray" },
            value: { type: "Text", content: [deliveredAt] }
        },
        {
            type: "DataListItem",
            label: { type: "Icon", id: "clock", size: 16, color: "gray" },
            value: { type: "Text", content: [`${input.duration} ms`] }
        }
    ];

    // Optionally include installation and repository IDs
    if (input.installation_id != null) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Installation ID"] },
            value: { type: "Text", content: [`${input.installation_id}`] }
        });
    }
    if (input.repository_id != null) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Repository ID"] },
            value: { type: "Text", content: [`${input.repository_id}`] }
        });
    }

    // Status code as a colored badge
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: ["Status Code"] },
        value: {
            type: "Badge",
            count: input.status_code,
            color: input.status_code >= 400 ? "error" : "success",
            childrenProps: { type: "Icon", id: "shield-alt", size: 16, color: "gray" }
        }
    });

    // Include throttled timestamp if present
    if (input.throttled_at) {
        const throttledAt = new Date(input.throttled_at).toLocaleString();
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: ["Throttled At"] },
            value: { type: "Text", content: [throttledAt] }
        });
    }

    // Build the main card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with event name and action, plus a redelivery chip if applicable
            {
                type: "CardHeader",
                title: `Event: ${input.event}`,
                description: input.action ?? "No action",
                startElement: { type: "Icon", id: "bolt", size: 24, color: "blue" },
                endElement: input.redelivery
                    ? {
                          type: "Chip",
                          label: "Redelivery",
                          color: "warning",
                          size: "small",
                          variant: "outlined"
                      }
                    : undefined
            },
            // Core details as a DataList
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            // Show the raw JSON payloads in a collapsible markdown view
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content:
                        "### Request Payload\n" +
                        "json\n" +
                        requestPayload +
                        "\n```\n\n" +
                        "### Response Payload\n" +
                        "```json\n" +
                        responsePayload +
                        "\n```"
                }
            },
            // Footer with a link button if a URL is provided
            {
                type: "CardFooter",
                childrenProps: input.url
                    ? {
                          type: "Button",
                          label: ["View Target URL"],
                          href: input.url,
                          variant: "outlined",
                          startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" }
                      }
                    : []
            }
        ]
    };
}
