export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build the lineage (ancestor chain) from root to immediate parent
    const lineage = [];
    let cursor = input.parent;
    while (cursor) {
        lineage.push({ name: cursor.name, code: cursor.code });
        // Traverse upward
        cursor = cursor.parent;
    }
    // Reverse so that the top-most ancestor comes first
    lineage.reverse();
    // Compose a markdown representation of the parent hierarchy
    const parentSection = lineage.length > 0
        ? [
            "### Parent Hierarchy",
            ...lineage.map((item, idx) => `${"  ".repeat(idx)}- ${item.name} (${item.code})`),
        ].join("\n")
        : "### Parent Hierarchy\n- No parent category";
    // Construct the VerticalCard to display the category info
    const card = {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon, title, and code
            {
                type: "CardHeader",
                title: input.name,
                description: `Code: ${input.code}`,
                startElement: {
                    type: "Icon",
                    id: "tags", // using a tag icon to represent category
                    size: 24,
                    color: "blue",
                },
            },
            // Content: show parent hierarchy via markdown for better readability
            {
                type: "CardContent",
                childrenProps: {
                    type: "Markdown",
                    content: parentSection,
                },
            },
            // Footer: show creation timestamp in a subtle style
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    content: `Created at: ${input.created_at}`,
                    variant: "caption",
                    color: "gray",
                },
            },
        ],
    };
    return card;
}
//# sourceMappingURL=161.js.map