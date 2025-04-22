import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Delivery made by a webhook, without request and response information.
     *
     * @title Simple webhook delivery
    */
    export type hook_delivery_item = {
        /**
         * Unique identifier of the webhook delivery.
        */
        id: number & tags.Type<"int32">;
        /**
         * Unique identifier for the event (shared with all deliveries for all webhooks that subscribe to this event).
        */
        guid: string;
        /**
         * Time when the webhook delivery occurred.
        */
        delivered_at: string;
        /**
         * Whether the webhook delivery is a redelivery.
        */
        redelivery: boolean;
        /**
         * Time spent delivering.
        */
        duration: number;
        /**
         * Describes the response returned after attempting the delivery.
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
    };
}
type IAutoViewTransformerInputType = Schema.hook_delivery_item[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Handle the empty case gracefully by informing the user
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No webhook deliveries available\nThere are currently no deliveries to display."
        };
    }

    // Aggregate basic statistics
    const total = input.length;
    const successCount = input.filter(item => item.status_code < 400).length;
    const failureCount = total - successCount;
    const averageDuration =
        input.reduce((sum, item) => sum + item.duration, 0) / total;

    // Build a markdown summary for the card
    const summaryMarkdown =
        `**Total Deliveries**: ${total}  \n` +
        `**Successful**: ${successCount}  \n` +
        `**Failed**: ${failureCount}  \n` +
        `**Avg Duration**: ${averageDuration.toFixed(2)} ms`;

    // Map each delivery item into a DataListItemProps
    const listItems: IAutoView.IAutoViewDataListItemProps[] = input.map(item => {
        // Format the label as markdown: show timestamp and event name
        const labelComponent: IAutoView.IAutoViewPresentationComponentProps = {
            type: "Markdown",
            content: `**${item.delivered_at}** - _${item.event}_`
        };

        // Visual element for HTTP status
        const statusChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: item.status_code.toString(),
            color: item.status_code < 400 ? "green" : "red",
            size: "small",
            variant: "filled"
        };

        // Chip to show delivery duration
        const durationChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `${item.duration}ms`,
            size: "small",
            variant: "outlined"
        };

        // Optional icon to mark redeliveries
        const redeliveryIcon: IAutoView.IAutoViewIconProps | undefined = item.redelivery
            ? {
                type: "Icon",
                id: "redo",
                color: "orange",
                size: 16
            }
            : undefined;

        // Assemble the right-hand side value components
        const valueComponents: IAutoView.IAutoViewPresentationComponentProps[] = [
            statusChip,
            durationChip,
        ];
        if (redeliveryIcon) valueComponents.push(redeliveryIcon);

        return {
            type: "DataListItem",
            label: [labelComponent],
            value: valueComponents
        };
    });

    // Wrap the summary and the data list into a vertical card for responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Webhook Deliveries"
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "Markdown",
                        content: summaryMarkdown
                    },
                    {
                        type: "DataList",
                        childrenProps: listItems
                    }
                ]
            }
        ]
    };
}
