export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Attempt to parse the creation date; fallback to raw string if invalid
    const parsedDate = new Date(input.created_at);
    const createdAtDisplay = isNaN(parsedDate.getTime())
        ? input.created_at
        : parsedDate.toLocaleString();
    // Header: shows the section name and code with a store icon
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
            type: "Icon",
            id: "store", // FontAwesome "store" icon
            color: "blue",
            size: 24
        }
    };
    // Content: a markdown block highlighting the creation time
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "Markdown",
            content: `**Created At:** ${createdAtDisplay}`
        }
    };
    // Footer: a primary button linking to a detail page for the section
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View Details",
            variant: "contained",
            color: "primary",
            href: `/sections/${encodeURIComponent(input.id)}`
        }
    };
    // Assemble into a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=116.js.map