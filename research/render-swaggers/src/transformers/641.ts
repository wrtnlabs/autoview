import type * as IAutoView from "@autoview/interface";
namespace Schema { }
type IAutoViewTransformerInputType = string[];
export function transform($input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    return visualizeData($input);
}



function visualizeData(input: IAutoViewTransformerInputType): IAutoView.IAutoViewComponentProps {
    // If there's no data, render a friendly markdown message rather than empty text
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No data available\n\nThere are no items to display."
        };
    }

    // A palette of colors to cycle through for visual distinction.
    // Feel free to adjust or extend this list as needed.
    const colorPalette: Array<
        | "primary"
        | "secondary"
        | "success"
        | "error"
        | "warning"
        | "info"
        | "red"
        | "orange"
        | "yellow"
        | "lime"
        | "green"
        | "teal"
        | "cyan"
        | "blue"
        | "indigo"
        | "violet"
        | "pink"
        | "gray"
        | "darkGray"
    > = [
        "primary",
        "secondary",
        "success",
        "error",
        "warning",
        "info",
        "teal",
        "cyan",
        "violet",
        "pink"
    ];

    // Transform each string into a colored chip
    const chips: IAutoView.IAutoViewChipProps[] = input.map((value, index) => {
        const color = colorPalette[index % colorPalette.length];
        return {
            type: "Chip",
            label: value,
            color,
            variant: "filled",
            size: "medium"
        };
    });

    // Use a ChipGroup so that on small screens, extra items collapse into a "+N" chip
    return {
        type: "ChipGroup",
        childrenProps: chips,
        // show up to 6 chips, collapse the rest into a "+N" indicator
        maxItems: 6
    };
}
