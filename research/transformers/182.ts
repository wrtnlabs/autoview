import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4GroupsInfiniteScrollingView = {
                    groups?: Schema.legacy.v4.LegacyV4Group[];
                    next?: string;
                };
            }
        }
        export namespace v4 {
            export type LegacyV4Group = {
                id?: string;
                channelId?: string;
                name: string & tags.Pattern<"[\\p{L}\\p{N}-_()]+">;
                scope: "all" | "public" | "private";
                managerIds?: string[] & tags.MinItems<1> & tags.MaxItems<2147483647> & tags.UniqueItems;
                icon?: string & tags.Pattern<"\\S+">;
                description?: string;
                createdAt?: number;
                updatedAt?: number;
                active?: boolean;
            };
        }
    }
}
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4GroupsInfiniteScrollingView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract groups array, default to empty if undefined
    const groups = input.groups ?? [];

    // If there are no groups to display, show a friendly markdown message
    if (groups.length === 0) {
        return {
            type: "Markdown",
            content: "### No groups available."
        };
    }

    // Color mapping for group scopes
    const scopeColorMap: Record<string, IAutoView.IAutoViewChipProps["color"]> = {
        all: "green",
        public: "blue",
        private: "gray",
    };

    // Build a list of ListItemProps for each group
    const listItems: IAutoView.IAutoViewListItemProps[] = groups.map((group) => {
        // Prepare scope chip
        const scopeChip: IAutoView.IAutoViewChipProps = {
            type: "Chip",
            label: group.scope,
            color: scopeColorMap[group.scope] || "gray",
            size: "small",
        };

        // Prepare manager count chip, if managerIds exist
        const managerChip: IAutoView.IAutoViewChipProps | undefined =
            group.managerIds && group.managerIds.length > 0
                ? {
                      type: "Chip",
                      label: `${group.managerIds.length} manager${group.managerIds.length > 1 ? "s" : ""}`,
                      variant: "outlined",
                      size: "small",
                      color: "secondary",
                  }
                : undefined;

        // Assemble end elements: scope first, then manager count if present
        const endElements: IAutoView.IAutoViewListItemProps["endElement"] = managerChip
            ? [scopeChip, managerChip]
            : scopeChip;

        // Use an avatar with initials derived from the group name
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: group.name,
            variant: "blue",
            size: 40,
        };

        return {
            type: "ListItem",
            title: group.name,
            description: group.description,
            // Left side: avatar for visual identification
            startElement: avatar,
            // Right side: chips showing scope and manager count
            endElement: endElements,
            // If the group has an associated channel or id, link to it (optional)
            href: group.id ? `/groups/${group.id}` : undefined,
        };
    });

    // Return a responsive list component wrapping all items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
