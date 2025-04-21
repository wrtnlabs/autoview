import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChatTagView = {
                    chatTag?: Schema.legacy.v4.LegacyV4ChatTag;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4ChatTag = {
                id?: string;
                channelId?: string;
                colorVariant?: "red" | "orange" | "yellow" | "olive" | "green" | "cobalt" | "purple" | "pink" | "navy";
                name: string;
                key: string;
                description?: string;
                followerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                createdAt?: number;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ChatTagView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    const { chatTag } = input;

    // If there's no chatTag payload, render a simple markdown explaining missing data.
    if (!chatTag) {
        return {
            type: "Markdown",
            content: "### No chat tag data provided."
        };
    }

    const {
        id,
        channelId,
        colorVariant,
        name,
        key,
        description,
        followerIds,
        createdAt
    } = chatTag;

    // Map legacy colorVariant values to AutoView icon colors
    const colorMap: Record<string, IAutoView.IAutoViewIconProps["color"]> = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime",
        green: "green",
        cobalt: "blue",
        purple: "violet",
        pink: "pink",
        navy: "indigo"
    };
    const iconColor = colorMap[colorVariant ?? ""] || "gray";

    // Format creation timestamp; if missing, show "Unknown"
    const createdLabel = createdAt
        ? new Date(createdAt).toLocaleString()
        : "Unknown";

    // Number of followers (handle undefined gracefully)
    const followerCount = Array.isArray(followerIds)
        ? followerIds.length
        : 0;

    // Prepare markdown block for the core properties
    const detailsMarkdown = [
        `**ID:** ${id ?? "N/A"}`,
        `**Channel ID:** ${channelId ?? "N/A"}`,
        `**Created At:** ${createdLabel}`
    ].join("\n\n");

    // Compose a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with a tag icon, title, and description (or fallback to key)
                type: "CardHeader",
                startElement: {
                    type: "Icon",
                    id: "tag",
                    color: iconColor,
                    size: 32
                },
                title: name,
                description: description ?? `Key: ${key}`
            },
            {
                // Content area uses markdown for better text styling on mobile
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: detailsMarkdown
                }
            },
            {
                // Footer shows follower count with a badge around a user icon
                type: "CardFooter",
                childrenProps: {
                    type: "Badge",
                    count: followerCount,
                    showZero: true,
                    childrenProps: {
                        type: "Icon",
                        id: "user",
                        color: "gray",
                        size: 20
                    }
                }
            }
        ]
    };
}
