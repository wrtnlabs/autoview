export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map visibility strings to color scales
    const mapVisibilityColor = (visibility) => {
        switch (visibility) {
            case "private":
                return "error";
            case "selected":
                return "warning";
            case "all":
            default:
                return "success";
        }
    };
    // If there are no variables, show a simple markdown note
    if (input.total_count === 0) {
        return {
            type: "Markdown",
            content: "### No Actions Variables Found\n\nThere are no organization variables to display."
        };
    }
    // Build a list item for each variable
    const items = input.variables.map((v) => {
        // Chip for variable visibility
        const visibilityChip = {
            type: "Chip",
            label: v.visibility,
            variant: "outlined",
            color: mapVisibilityColor(v.visibility),
            size: "small"
        };
        // Optional chip for selected repositories link
        const repoChip = v.selected_repositories_url
            ? {
                type: "Chip",
                label: "Repos",
                startElement: {
                    type: "Icon",
                    id: "link",
                    size: 16,
                    color: "blue"
                },
                variant: "outlined",
                size: "small"
            }
            : undefined;
        // Group chips for metadata: created and updated timestamps (and repos if present)
        const metadataChips = [
            {
                type: "Chip",
                label: `Created: ${new Date(v.created_at).toLocaleString()}`,
                startElement: {
                    type: "Icon",
                    id: "calendar-alt",
                    size: 16,
                    color: "gray"
                },
                variant: "outlined",
                size: "small"
            },
            {
                type: "Chip",
                label: `Updated: ${new Date(v.updated_at).toLocaleString()}`,
                startElement: {
                    type: "Icon",
                    id: "edit",
                    size: 16,
                    color: "gray"
                },
                variant: "outlined",
                size: "small"
            }
        ];
        if (repoChip) {
            metadataChips.push(repoChip);
        }
        // Markdown block to show the variable value in a code block
        const valueMarkdown = {
            type: "Markdown",
            content: [
                "",
                v.value.replace(/```/g, "\\`\\`\\`"), // escape any backticks
                "```"
            ].join("\n")
        };
        return {
            type: "DataListItem",
            // Label: variable name and its visibility chip
            label: [
                {
                    type: "Text",
                    content: v.name
                },
                visibilityChip
            ],
            // Value: show the code block plus metadata chips
            value: [
                valueMarkdown,
                {
                    type: "ChipGroup",
                    childrenProps: metadataChips
                }
            ]
        };
    });
    // Compose a data list for all items
    const dataList = {
        type: "DataList",
        childrenProps: items
    };
    // Wrap the list in a vertical card showing the total count
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: `Organization Variables (${input.total_count})`,
                startElement: {
                    type: "Icon",
                    id: "database",
                    size: 20,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: dataList
            }
        ]
    };
}
//# sourceMappingURL=415.js.map