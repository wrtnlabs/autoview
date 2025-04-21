import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export type EventsView = {
        prev?: string;
        next?: string;
        events?: Schema.Event[];
    };
    export type Event = {
        userId?: string;
        id?: string;
        channelId?: string;
        name: string;
        property?: {
            [key: string]: {};
        };
        createdAt?: number;
        expireAt?: number;
        managed?: boolean;
        version?: number & tags.Type<"int32">;
        nameI18nMap?: {
            [key: string]: string;
        };
    };
}
type IAutoViewTransformerInputType = Schema.EventsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there are no events, show a friendly markdown message
    if (!input.events || input.events.length === 0) {
        return {
            type: "Markdown",
            content: "### No events available\nThere are currently no events to display."
        };
    }

    // Helper to format a timestamp (if present) to locale string
    const formatTime = (ts?: number): string | null => {
        if (typeof ts !== "number") return null;
        try {
            return new Date(ts).toLocaleString();
        } catch {
            return null;
        }
    };

    // Build a DataListItem for each event, using icons and text
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = input.events.map((event) => {
        const valueChildren: IAutoView.IAutoViewPresentationComponentProps[] = [];

        // User icon + ID
        if (event.userId) {
            valueChildren.push(
                { type: "Icon", id: "user", size: 16, color: "blue" },
                { type: "Text", content: ` ${event.userId}`, variant: "body2" }
            );
        }

        // Channel icon + channelId
        if (event.channelId) {
            valueChildren.push(
                { type: "Icon", id: "hashtag", size: 16, color: "teal" },
                { type: "Text", content: ` ${event.channelId}`, variant: "body2" }
            );
        }

        // Created at timestamp
        const created = formatTime(event.createdAt);
        if (created) {
            valueChildren.push(
                { type: "Icon", id: "calendar", size: 16, color: "gray" },
                { type: "Text", content: ` ${created}`, variant: "body2" }
            );
        }

        // Expiration timestamp
        const expires = formatTime(event.expireAt);
        if (expires) {
            valueChildren.push(
                { type: "Icon", id: "hourglass", size: 16, color: "orange" },
                { type: "Text", content: ` ${expires}`, variant: "body2" }
            );
        }

        // Version chip
        if (typeof event.version === "number") {
            valueChildren.push({
                type: "Chip",
                label: `v${event.version}`,
                variant: "outlined",
                size: "small",
                color: "secondary"
            });
        }

        // Build the DataListItem
        return {
            type: "DataListItem",
            // Use the event's name as the label, styled as a header
            label: { type: "Text", content: event.name, variant: "subtitle1", color: "primary" },
            // Inline children for the value field
            value: valueChildren
        };
    });

    // Build pagination buttons if prev/next cursors are present
    const paginationButtons: IAutoView.IAutoViewButtonProps[] = [];
    if (input.prev) {
        paginationButtons.push({
            type: "Button",
            label: "Previous",
            variant: "outlined",
            size: "small",
            href: input.prev
        });
    }
    if (input.next) {
        paginationButtons.push({
            type: "Button",
            label: "Next",
            variant: "contained",
            size: "small",
            href: input.next
        });
    }

    // Compose the final VerticalCard with the data list and pagination
    return {
        type: "VerticalCard",
        childrenProps: [
            // Main content: the list of events
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            // Footer: pagination controls (if any)
            {
                type: "CardFooter",
                childrenProps: paginationButtons.length > 0 ? paginationButtons : undefined
            }
        ]
    };
}
