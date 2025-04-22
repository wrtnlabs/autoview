import type * as IAutoView from "@autoview/interface";
namespace Schema {
    /**
     * A topic aggregates entities that are related to a subject.
     *
     * @title Topic
    */
    export type topic = {
        names: string[];
    };
}
type IAutoViewTransformerInputType = Schema.topic;
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



// Transforms a list of topic names into a visually engaging UI using chips inside a card.
function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // Safely extract names array (compiler ensures `names` exists, but we guard anyway)
    const names = input.names ?? [];

    // If there are no topics, render a friendly markdown message
    if (names.length === 0) {
        return {
            type: "Markdown",
            content: "**No topics available.**"
        };
    }

    // Define a palette of non-variant colors for chips
    const colors: IAutoView.IAutoViewChipProps["color"][] = [
        "blue", "green", "orange", "yellow", "lime",
        "teal", "cyan", "indigo", "violet", "pink"
    ];

    // Map each topic name to a colored chip
    const chips: IAutoView.IAutoViewChipProps[] = names.map((name, index) => ({
        type: "Chip",
        label: name,
        color: colors[index % colors.length],  // cycle through palette
        variant: "filled",
        size: "medium"
    }));

    // Group all chips into a responsive chip group
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: chips
    };

    // Wrap everything in a vertical card to give context and header
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Topics"
            },
            {
                type: "CardContent",
                // Single presentation component is allowed here
                childrenProps: chipGroup
            }
        ]
    };
}
