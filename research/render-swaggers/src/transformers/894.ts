import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Clone Traffic
     *
     * @title Clone Traffic
    */
    export type clone_traffic = {
        count: number & tags.Type<"int32">;
        uniques: number & tags.Type<"int32">;
        clones: Schema.traffic[];
    };
    /**
     * @title Traffic
    */
    export type traffic = {
        timestamp: string & tags.Format<"date-time">;
        uniques: number & tags.Type<"int32">;
        count: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.clone_traffic;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // 1. Sort clone traffic entries by timestamp (ascending) for chronological display
    const sortedClones = [...input.clones].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    // 2. Transform each entry into a DataListItemProps
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = sortedClones.map((entry) => {
        // Format timestamp into a locale-sensitive string
        const formattedTime = new Date(entry.timestamp).toLocaleString();

        return {
            type: "DataListItem",
            // Left column: timestamp
            label: {
                type: "Text",
                content: formattedTime,
                variant: "body2",
                color: "primary",
            },
            // Right column: a group of chips showing clones vs. uniques
            value: {
                type: "ChipGroup",
                childrenProps: [
                    {
                        type: "Chip",
                        label: `Clones: ${entry.count}`,
                        color: "teal",
                        size: "small",
                        variant: "filled",
                    },
                    {
                        type: "Chip",
                        label: `Uniques: ${entry.uniques}`,
                        color: "blue",
                        size: "small",
                        variant: "outlined",
                    },
                ],
            },
        };
    });

    // 3. If there are no entries, show a friendly markdown message instead of an empty list
    const contentChild: IAutoView.IAutoViewPresentationComponentProps =
        dataListItems.length > 0
            ? {
                  type: "DataList",
                  childrenProps: dataListItems,
              }
            : {
                  type: "Markdown",
                  content: "#### No clone traffic data available",
              };

    // 4. Build the card header with an icon and summary
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Clone Traffic",
        description: `Total: ${input.count} clones, ${input.uniques} uniques`,
        startElement: {
            type: "Icon",
            id: "chart-line",
            size: 28,
            color: "indigo",
        },
    };

    // 5. Wrap the list (or fallback markdown) in CardContent
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: contentChild,
    };

    // 6. Return a vertical card containing the header and content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
