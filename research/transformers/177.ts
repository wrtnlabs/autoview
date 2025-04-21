import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace legacy {
        export namespace open {
            export namespace v4 {
                export type LegacyV4ChatTagsView = {
                    chatTags?: Schema.legacy.v4.LegacyV4ChatTag[];
                    next?: string;
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
type IAutoViewTransformerInputType = Schema.legacy.open.v4.LegacyV4ChatTagsView;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract chat tags, default to empty array if undefined
    const tags = input.chatTags ?? [];

    // Mapping from legacy colorVariant to AutoView color names
    const colorMap: Record<string, IAutoView.IAutoViewAvatarProps["variant"]> = {
        red: "red",
        orange: "orange",
        yellow: "yellow",
        olive: "lime",      // olive ≈ lime
        green: "green",
        cobalt: "blue",     // cobalt ≈ blue
        purple: "violet",   // purple ≈ violet
        pink: "pink",
        navy: "darkGray",   // navy ≈ darkGray
    };

    // If there are no tags, return a simple markdown message
    if (tags.length === 0) {
        return {
            type: "Markdown",
            content: "_No chat tags available._",
        };
    }

    // Build each DataListItem: avatar + name, with optional description below
    const listItems: IAutoView.IAutoViewDataListItemProps[] = tags.map((tag) => {
        // Determine avatar variant by mapping legacy color to new scale
        const avatarVariant = tag.colorVariant
            ? colorMap[tag.colorVariant] ?? "gray"
            : "gray";

        // Avatar for the tag
        const avatar: IAutoView.IAutoViewAvatarProps = {
            type: "Avatar",
            name: tag.name,
            variant: avatarVariant,
            size: 32,
        };

        // Text showing the tag name
        const nameText: IAutoView.IAutoViewTextProps = {
            type: "Text",
            content: tag.name,
            variant: "body1",
        };

        // If a description exists, render it as markdown in the value slot
        const valueComponent: IAutoView.IAutoViewMarkdownProps | undefined = tag.description
            ? {
                  type: "Markdown",
                  content: tag.description,
              }
            : undefined;

        return {
            type: "DataListItem",
            // Label is an array: [avatar, text]
            label: [avatar, nameText],
            // Value shows the description as markdown if present
            value: valueComponent,
        };
    });

    // Compose the DataList that contains all tag items
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: listItems,
    };

    // If there is a 'next' token, add a Load More button in a card footer
    if (input.next) {
        const loadMoreButton: IAutoView.IAutoViewButtonProps = {
            type: "Button",
            label: "Load More",
            variant: "contained",
            color: "primary",
        };

        // Wrap the list and button in a vertical card for better layout on mobile
        const cardContent: IAutoView.IAutoViewCardContentProps = {
            type: "CardContent",
            childrenProps: dataList,
        };
        const cardFooter: IAutoView.IAutoViewCardFooterProps = {
            type: "CardFooter",
            childrenProps: loadMoreButton,
        };

        return {
            type: "VerticalCard",
            childrenProps: [cardContent, cardFooter],
        };
    }

    // Otherwise just return the DataList directly
    return dataList;
}
