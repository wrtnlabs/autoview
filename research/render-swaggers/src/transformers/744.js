export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract variables array, defaulting to empty if undefined
    const variables = (_a = input.variables) !== null && _a !== void 0 ? _a : [];
    // If there are no variables, display a friendly message
    if (variables.length === 0) {
        return {
            type: "Text",
            content: "No variables found in this environment.",
            variant: "body1",
        };
    }
    // Map each variable into a DataListItem
    const items = variables.map((variable) => {
        // Convert ISO timestamps to a localized, human-readable format
        const createdAt = new Date(variable.created_at).toLocaleString();
        const updatedAt = new Date(variable.updated_at).toLocaleString();
        // Compose a Markdown block for the variable details.
        // Markdown gives us richer text formatting (bold, code spans, line breaks).
        const detailMarkdown = `
**Value:** \`${variable.value}\`

**Created At:** ${createdAt}  
**Updated At:** ${updatedAt}
    `.trim();
        return {
            type: "DataListItem",
            // Use a Text component for the label (the variable name)
            label: {
                type: "Text",
                content: variable.name,
                variant: "subtitle1",
            },
            // Use a Markdown component to render the details
            value: {
                type: "Markdown",
                content: detailMarkdown,
            },
        };
    });
    // Return a DataList containing all items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=744.js.map