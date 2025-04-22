import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Referrer Traffic
     *
     * @title Referrer Traffic
    */
    export type referrer_traffic = {
        referrer: string;
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.referrer_traffic[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, inform the user gracefully.
    if (input.length === 0) {
        return {
            type: "Text",
            content: "No referrer traffic data available.",
            variant: "body1",
            color: "gray",
        };
    }

    // Sort by count descending to highlight the most significant referrers,
    // and limit to top N items for readability on small screens.
    const MAX_ITEMS = 10;
    const sorted = [...input].sort((a, b) => b.count - a.count);
    const topItems = sorted.slice(0, MAX_ITEMS);

    // Map each referrer record into a DataListItem with visual chips for count and uniques.
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = topItems.map((record) => ({
        type: "DataListItem",
        // Left side: the referrer's domain or URL.
        label: {
            type: "Text",
            content: record.referrer,
            variant: "body1",
        },
        // Right side: two chips with icons to show count and unique visitors.
        value: [
            {
                type: "Chip",
                label: record.count.toString(),
                color: "info",
                variant: "filled",
                startElement: {
                    type: "Icon",
                    id: "chart-bar",
                    color: "blue",
                    size: 12,
                },
            },
            {
                type: "Chip",
                label: record.uniques.toString(),
                color: "success",
                variant: "filled",
                startElement: {
                    type: "Icon",
                    id: "user",
                    color: "teal",
                    size: 12,
                },
            },
        ],
    }));

    // Wrap the list in a DataList component.
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // A card header to title the dataset.
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Referrer Traffic",
        description: `Showing top ${dataListItems.length} of ${input.length} referrers`,
    };

    // Card content holds the DataList.
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    // Compose everything into a vertical card for a clean, responsive layout.
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };

    return card;
}
