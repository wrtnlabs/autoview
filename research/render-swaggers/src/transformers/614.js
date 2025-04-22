export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no variables, show a friendly markdown message
    if (!input.variables || input.variables.length === 0) {
        return {
            type: "Markdown",
            content: "### No variables found\nThere are no repository actions variables to display."
        };
    }
    // Convert each action variable into a DataListItem with icon, name, value, and timestamps
    const dataListItems = input.variables.map(variable => {
        // Convert ISO timestamps into locale-specific, human‐readable strings
        const createdAt = new Date(variable.created_at).toLocaleString();
        const updatedAt = new Date(variable.updated_at).toLocaleString();
        return {
            type: "DataListItem",
            // On the left, an icon plus the variable's name
            label: [
                { type: "Icon", id: "tag", size: 16, color: "teal" },
                { type: "Text", content: variable.name, variant: "subtitle2" }
            ],
            // On the right, show value and timestamps as stacked text
            value: [
                { type: "Text", content: `Value: ${variable.value}`, variant: "body2", color: "primary" },
                { type: "Text", content: `Created: ${createdAt}`, variant: "caption", color: "gray" },
                { type: "Text", content: `Updated: ${updatedAt}`, variant: "caption", color: "gray" }
            ]
        };
    });
    // Wrap all items in a DataList component
    const dataListProps = {
        type: "DataList",
        childrenProps: dataListItems
    };
    // Create a card header showing the total count
    const headerProps = {
        type: "CardHeader",
        startElement: { type: "Icon", id: "list", size: 32, color: "blue" },
        title: `Actions Variables (${input.total_count})`,
        description: "A summary of all repository actions variables"
    };
    // Embed the DataList in the card content
    const contentProps = {
        type: "CardContent",
        childrenProps: dataListProps
    };
    // Return a vertical card containing the header and the list,
    // which adapts nicely to both desktop and mobile form factors
    return {
        type: "VerticalCard",
        childrenProps: [headerProps, contentProps]
    };
}
//# sourceMappingURL=614.js.map