export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no variables are defined, show a friendly markdown message.
    if (!input.variables || input.variables.length === 0) {
        return {
            type: "Markdown",
            content: "### No environment variables found\n\nThere are no actions variables defined for this organization.",
        };
    }
    // Map each variable into a DataListItem with name, value chip, and timestamp chips.
    const listItems = input.variables.map(variable => {
        // Primary chip showing the variable's value.
        const valueChip = {
            type: "Chip",
            label: variable.value,
            variant: "filled",
            color: "teal",
            size: "small",
        };
        // Chips for creation and update timestamps, formatted for readability.
        const createdChip = {
            type: "Chip",
            label: `Created: ${new Date(variable.created_at).toLocaleDateString()}`,
            variant: "outlined",
            color: "gray",
            size: "small",
        };
        const updatedChip = {
            type: "Chip",
            label: `Updated: ${new Date(variable.updated_at).toLocaleDateString()}`,
            variant: "outlined",
            color: "gray",
            size: "small",
        };
        return {
            type: "DataListItem",
            // The label is the variable name.
            label: {
                type: "Text",
                variant: "body1",
                content: variable.name,
            },
            // The value area shows the value chip and timestamp chips.
            value: [valueChip, createdChip, updatedChip],
        };
    });
    // Compose the overall DataList.
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header with an icon and a dynamic title showing total count.
    const header = {
        type: "CardHeader",
        title: `Environment Variables (${input.total_count})`,
        startElement: {
            type: "Icon",
            id: "list", // FontAwesome icon name (without prefix)
            size: 24,
            color: "blue",
        },
    };
    // Card content wrapping the DataList.
    const content = {
        type: "CardContent",
        childrenProps: dataList,
    };
    // Assemble everything into a VerticalCard for responsive display.
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=582.js.map