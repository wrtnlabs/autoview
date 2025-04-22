export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input for easier access
    const { ref, node_id, url: refUrl, object } = input;
    // Shorten SHA for display
    const shaShort = object.sha.slice(0, 7);
    // Header: display the reference name and node_id with a branch icon
    const header = {
        type: "CardHeader",
        title: ref,
        description: `Node ID: ${node_id}`,
        startElement: {
            type: "Icon",
            id: "code-branch", // FontAwesome icon name for a branch
            color: "gray",
            size: 20
        }
    };
    // Content: show object type, short SHA, and a link button to the Git reference
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Chip",
                label: object.type,
                color: "teal",
                variant: "filled",
                startElement: {
                    type: "Icon",
                    id: "tag", // Using a generic tag icon for type
                    color: "teal",
                    size: 16
                }
            },
            {
                type: "Chip",
                label: shaShort,
                variant: "outlined"
            },
            {
                type: "Button",
                variant: "text",
                color: "blue",
                size: "small",
                label: "View Commit",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    color: "blue",
                    size: 16
                },
                href: object.url
            }
        ]
    };
    // Footer: provide a markdown link to view the full SHA on GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Markdown",
            content: `[View full commit](${object.url})`
        }
    };
    // Assemble a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=753.js.map