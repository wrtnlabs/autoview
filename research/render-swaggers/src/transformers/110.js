export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to flatten the parent chain into an array of { name, code }
    const flattenParents = (node) => {
        const chain = [];
        let current = node;
        while (current) {
            // Protect against unexpected shapes
            if (typeof current.name === "string" && typeof current.code === "string") {
                chain.push({ name: current.name, code: current.code });
            }
            // Move to next parent
            current = current.parent;
        }
        // We want root-first order
        return chain.reverse();
    };
    const parentChain = input.parent ? flattenParents(input.parent) : [];
    // Build a DataList of parent categories, or a Markdown note if none exist
    let contentChildren;
    if (parentChain.length > 0) {
        const items = parentChain.map(item => {
            // Label: parent name
            const labelText = {
                type: "Text",
                content: item.name,
                variant: "body1",
            };
            // Value: parent code
            const valueText = {
                type: "Text",
                content: item.code,
                variant: "body2",
                color: "gray",
            };
            return {
                type: "DataListItem",
                label: [labelText],
                value: [valueText],
            };
        });
        contentChildren = {
            type: "DataList",
            childrenProps: items,
        };
    }
    else {
        // No parent: show a friendly markdown message
        contentChildren = {
            type: "Markdown",
            content: "*No parent category*",
        };
    }
    // Card header with icon, category name, and code
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
            type: "Icon",
            id: "folder",
            color: "blue",
            size: 24,
        },
    };
    // Card content wrapping our DataList or Markdown
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Card footer with creation timestamp
    const footerText = {
        type: "Text",
        content: `Created At: ${new Date(input.created_at).toLocaleString()}`,
        variant: "caption",
        color: "tertiary",
    };
    const footer = {
        type: "CardFooter",
        childrenProps: [footerText],
    };
    // Assemble a vertical card containing the header, content, and footer
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=110.js.map