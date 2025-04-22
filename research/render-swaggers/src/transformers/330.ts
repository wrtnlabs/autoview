import type * as IAutoView from "@autoview/interface";
namespace Schema {
    export namespace IApiEmojis {
        export type GetResponse = {
            [key: string]: string;
        };
    }
}
type IAutoViewTransformerInputType = Schema.IApiEmojis.GetResponse;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Extract and sort emoji keys for consistent ordering
    const names = Object.keys(input).sort();

    // Handle case of no emojis
    if (names.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No emojis available."
        };
    }

    // Build DataListItem for each emoji: label shows the name, value shows the image
    const items: IAutoView.IAutoViewDataListItemProps[] = names.map((name) => ({
        type: "DataListItem",
        // Display the emoji name as text
        label: {
            type: "Text",
            variant: "body2",
            content: name
        },
        // Render the emoji image
        value: {
            type: "Image",
            src: input[name],
            alt: name
        }
    }));

    // Wrap items in a DataList
    const dataList: IAutoView.IAutoViewDataListProps = {
        type: "DataList",
        childrenProps: items
    };

    // Card header with title and count
    const header: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Emoji Gallery",
        description: `${names.length} items`
    };

    // Card content holding the DataList
    const content: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: dataList
    };

    // Compose a vertical card with header and content for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content]
    };
}
