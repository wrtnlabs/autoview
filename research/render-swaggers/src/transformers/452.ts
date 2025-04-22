import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Org Hook
     *
     * @title Org Hook
    */
    export type org_hook = {
        id: number & tags.Type<"int32">;
        url: string & tags.Format<"uri">;
        ping_url: string & tags.Format<"uri">;
        deliveries_url?: string & tags.Format<"uri">;
        name: string;
        events: string[];
        active: boolean;
        config: {
            url?: string;
            insecure_ssl?: string;
            content_type?: string;
            secret?: string;
        };
        updated_at: string & tags.Format<"date-time">;
        created_at: string & tags.Format<"date-time">;
        type: string;
    };
}
type IAutoViewTransformerInputType = Schema.org_hook;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Helper to safely format ISO date strings for display.
    const formatDate = (iso: string): string => {
        const t = Date.parse(iso);
        if (isNaN(t)) return iso;
        return new Date(t).toLocaleString();
    };
    const createdDate = formatDate(input.created_at);
    const updatedDate = formatDate(input.updated_at);

    // Build an array of DataListItemProps for core webhook properties.
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = [];

    // ID
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "ID", variant: "subtitle2" },
        value: { type: "Text", content: input.id.toString(), variant: "body2" }
    });

    // Primary URL
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "URL", variant: "subtitle2" },
        // Render as a clickable markdown link
        value: {
            type: "Markdown",
            content: `[🔗 Open](${input.url})`
        }
    });

    // Ping URL
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Ping URL", variant: "subtitle2" },
        value: {
            type: "Markdown",
            content: `[🔗 Open ping](${input.ping_url})`
        }
    });

    // Optional deliveries_url
    if (input.deliveries_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Deliveries", variant: "subtitle2" },
            value: {
                type: "Markdown",
                content: `[📦 View deliveries](${input.deliveries_url})`
            }
        });
    }

    // Events array as a group of chips
    if (Array.isArray(input.events) && input.events.length > 0) {
        const chips = input.events.map((evt) => ({
            type: "Chip" as const,
            label: evt,
            size: "small" as const,
            variant: "outlined" as const,
            color: "teal" as const
        }));
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Events", variant: "subtitle2" },
            value: {
                type: "ChipGroup" as const,
                childrenProps: chips
            }
        });
    }

    // Active flag as a colored chip
    dataListItems.push({
        type: "DataListItem",
        label: { type: "Text", content: "Active", variant: "subtitle2" },
        value: {
            type: "Chip" as const,
            label: input.active ? "Yes" : "No",
            size: "small" as const,
            variant: "filled" as const,
            color: input.active ? "green" as const : "red" as const
        }
    });

    // Show config.content_type if provided
    if (input.config.content_type) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Content Type", variant: "subtitle2" },
            value: { type: "Text", content: input.config.content_type, variant: "body2" }
        });
    }

    // Show insecure_ssl flag from config
    if (typeof input.config.insecure_ssl === "string") {
        // Convert string flag ("0" or "1") to boolean-like label
        const insecure = input.config.insecure_ssl !== "0";
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Insecure SSL", variant: "subtitle2" },
            value: {
                type: "Chip" as const,
                label: insecure ? "Enabled" : "Disabled",
                size: "small" as const,
                variant: "outlined" as const,
                color: insecure ? "warning" as const : "gray" as const
            }
        });
    }

    // Compose the DataList component
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems
    };

    // Header icon for webhook
    const webhookIcon: IAutoView.IAutoViewIconProps = {
        type: "Icon",
        id: "link",
        color: "blue",
        size: 24
    };

    // Active indicator chip in header
    const statusChip: IAutoView.IAutoViewChipProps = {
        type: "Chip",
        label: input.active ? "Active" : "Inactive",
        size: "small",
        variant: "filled",
        color: input.active ? "success" : "error"
    };

    // Build the card UI: header, content, footer
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.type,
                startElement: webhookIcon,
                endElement: statusChip
            },
            {
                type: "CardContent",
                childrenProps: dataList
            },
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    // Use markdown for responsive date layout
                    content: `**Created:** ${createdDate}  \n**Updated:** ${updatedDate}`
                }
            }
        ]
    };

    return card;
}
