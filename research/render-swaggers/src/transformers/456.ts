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
    // If there are no deliveries, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "*No deliveries to display*",
        };
    }

    // Helper to decide icon id and color based on HTTP status code
    const getStatusIcon = (code: number): IAutoView.IAutoViewIconProps => {
        let id = "check-circle";            // default success
        let color: IAutoView.IAutoViewIconProps["color"] = "green";
        if (code >= 300 && code < 400) {
            id = "exclamation-circle";
            color = "yellow";
        } else if (code >= 400) {
            id = "times-circle";
            color = "red";
        }
        return {
            type: "Icon",
            id,
            color,
            size: 20,
        };
    };

    // Helper to decide chip color based on HTTP status code
    const getStatusChipColor = (code: number): IAutoView.IAutoViewChipProps["color"] => {
        if (code >= 400) return "error";
        if (code >= 300) return "warning";
        return "success";
    };

    // Build a ListItem for each delivery
    const listItems: IAutoView.IAutoViewListItemProps[] = input.map((item) => {
        // Format delivered time to a user-friendly local string
        let deliveredAtText: string;
        try {
            deliveredAtText = new Date(item.delivered_at).toLocaleString();
        } catch {
            deliveredAtText = item.delivered_at; // fallback to raw string
        }

        // Include action in description if present
        const descriptionParts: string[] = [deliveredAtText];
        if (item.action) {
            descriptionParts.push(item.action);
        }
        if (item.redelivery) {
            descriptionParts.push("🔄 redelivery");
        }
        const description = descriptionParts.join(" • ");

        // Chips for status_code and duration (ms)
        const statusChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: item.status_code.toString(),
            color: getStatusChipColor(item.status_code),
            size: "small",
            variant: "outlined",
        };
        const durationChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: `${item.duration} ms`,
            color: "info",
            size: "small",
            variant: "outlined",
        };

        return {
            type: "ListItem",
            title: item.event,
            description,
            startElement: getStatusIcon(item.status_code),
            endElement: [statusChip, durationChip],
        };
    });

    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: listItems,
    };
}
