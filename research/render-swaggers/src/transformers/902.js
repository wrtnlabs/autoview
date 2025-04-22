export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: create a DataListItem for each label
    const listItems = input.items.map((item) => {
        // Left side: display name with a Chip, plus hex color text
        const labelComponents = [
            {
                type: "Chip",
                label: item.name,
                variant: "filled",
                // Highlight default labels
                color: item.default ? "primary" : "secondary",
                size: "small",
            },
            {
                type: "Text",
                // Show the raw hex code, colored accordingly
                content: item.color,
                color: item.color,
                variant: "body2",
            },
        ];
        // Right side: description (if any), score, and a link button
        const valueComponents = [];
        if (item.description) {
            // Render the description as Markdown for better formatting support
            valueComponents.push({
                type: "Markdown",
                content: item.description,
            });
        }
        // Always show the relevance score
        valueComponents.push({
            type: "Text",
            content: `Score: ${item.score.toFixed(2)}`,
            variant: "caption",
            color: "gray",
        });
        // Provide a button to navigate to the label URL
        valueComponents.push({
            type: "Button",
            label: "View",
            href: item.url,
            variant: "text",
            size: "small",
        });
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Build the DataList, or a placeholder text if empty
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header: show total count and an icon
    const header = {
        type: "CardHeader",
        title: `Labels (${input.total_count})`,
        description: input.incomplete_results
            ? "Results may be incomplete"
            : undefined,
        startElement: {
            type: "Icon",
            id: "tags",
            size: 24,
            color: "blue",
        },
    };
    // Card content wraps the list or a fallback message
    const contentChildren = [];
    if (input.items.length === 0) {
        contentChildren.push({
            type: "Markdown",
            content: "_No labels found._",
        });
    }
    else {
        contentChildren.push(dataList);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Assemble into a vertical card for a clean, responsive layout
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=902.js.map