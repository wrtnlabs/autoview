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



function visualizeData(
    input: IAutoViewTransformerInputType,
): IAutoView.IAutoViewComponentProps {
    // If there are no names, show a friendly markdown message.
    if (!input.names || input.names.length === 0) {
        return {
            type: "Markdown",
            content: "### No topics available\nThere are currently no topics to display.",
        };
    }

    // Predefined palette for chips; will cycle through if there are more names than colors.
    const chipColors: IAutoView.IAutoViewChipProps["color"][] = [
        "primary",
        "secondary",
        "success",
        "warning",
        "info",
        "error",
        "teal",
        "cyan",
        "indigo",
        "pink",
    ];

    // Transform each topic name into a Chip component
    const chips: IAutoView.IAutoViewChipProps[] = input.names.map(
        (name, index) => ({
            type: "Chip",
            label: name,
            variant: "filled",
            size: "medium",
            // Cycle colors for visual variety
            color: chipColors[index % chipColors.length],
        }),
    );

    // Group all chips into a ChipGroup for responsive wrapping
    const chipGroup: IAutoView.IAutoViewChipGroupProps = {
        type: "ChipGroup",
        childrenProps: chips,
        // Show all chips by default; overflow handling can be added if needed
        maxItems: chips.length,
    };

    // Card header with an icon to label the section
    const cardHeader: IAutoView.IAutoViewCardHeaderProps = {
        type: "CardHeader",
        title: "Topics",
        description: `Showing ${input.names.length} topic${input.names.length > 1 ? "s" : ""}`,
        startElement: {
            type: "Icon",
            id: "tag",
            color: "blue",
            size: 24,
        },
    };

    // Card content wrapping the chip group
    const cardContent: IAutoView.IAutoViewCardContentProps = {
        type: "CardContent",
        childrenProps: chipGroup,
    };

    // Compose a vertical card with header and content for a concise UI.
    const card: IAutoView.IAutoViewVerticalCardProps = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };

    return card;
}
