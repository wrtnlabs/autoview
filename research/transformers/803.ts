import { tags } from "typia";
import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * Language
     *
     * @title Language
    */
    export type language = {
        [key: string]: number & tags.Type<"int32">;
    };
}
type IAutoViewTransformerInputType = Schema.language;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, show a friendly markdown message
    const keys = Object.keys(input);
    if (keys.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available\n\nThere are no language statistics to display.",
        };
    }

    // Prepare a sorted list of [language, count] pairs in descending order
    const entries = keys
        .map((lang) => [lang, input[lang]] as [string, number])
        .sort((a, b) => b[1] - a[1]);

    // Compose DataListItems for each language-count pair
    const dataListItems: IAutoView.IAutoViewDataListItemProps[] = entries.map(
        ([lang, count]) => ({
            type: "DataListItem",
            // Label is the language name
            label: {
                type: "Text",
                variant: "body1",
                content: lang,
            },
            // Value is the count rendered as Text
            value: {
                type: "Text",
                variant: "body1",
                content: count.toString(),
            },
        }),
    );

    // Wrap list items in a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: dataListItems,
    };

    // Build a vertical card to contain the header and content
    const totalCount = entries.reduce((acc, [, cnt]) => acc + cnt, 0);
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Language Usage",
        description: `Total count: ${totalCount}`,
        // Use a chart-bar icon to visually indicate statistics
        startElement: {
            type: "Icon",
            id: "chart-bar",
            size: 24,
            color: "blue",
        },
    };

    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList,
    };

    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
