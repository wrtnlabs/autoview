import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Key Simple
     *
     * @title Key Simple
    */
    export type key_simple = {
        id: number & tags.Type<"int32">;
        key: string;
    };
}
type IAutoViewTransformerInputType = Schema.key_simple[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a markdown message instead of an empty list
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available",
        };
    }

    // Map each record to a DataListItem with a badge showing the id
    const items: IAutoView.IAutoViewDataListItemProps[] = input.map((record) => {
        // Use a badge to visually represent the `id` and an icon as the badge's child
        const badge: IAutoView.IAutoViewBadgeProps = {
            type: "Badge",
            count: record.id,
            maxCount: 999,      // Allow up to 3-digit IDs before showing "..."
            showZero: true,     // In case `id` is 0
            // A simple "hashtag" icon to convey that this is an identifier
            childrenProps: {
                type: "Icon",
                id: "hashtag",
                color: "blue",
                size: 20,
            },
        };

        // The list item itself: key as the title, badge in the startElement
        return {
            type: "DataListItem",
            title: record.key,
            startElement: badge,
        };
    });

    // Wrap all items into a DataList for a clean vertical layout
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items,
    };

    return dataList;
}
