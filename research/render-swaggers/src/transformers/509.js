export function transform($input) {
    return visualizeData($input);
}
// Transforms repository custom property values into an AutoView list with visual chips.
function visualizeData(input) {
    // If there's no repository data, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories found.\nPlease check back later or add some repositories."
        };
    }
    // Helper to normalize property values into strings.
    const formatValue = (value) => value === null ? "N/A" : Array.isArray(value) ? value.join(", ") : value;
    // Build a ListItem for each repository.
    const listItems = input.map(repo => {
        // For each custom property, create a chip showing "name: value"
        const propertyChips = repo.properties.map(prop => ({
            type: "Chip",
            label: `${prop.property_name}: ${formatValue(prop.value)}`,
            variant: "outlined",
            size: "small",
            color: "primary"
        }));
        return {
            type: "ListItem",
            // Show the full repository name as the main title
            title: repo.repository_full_name,
            // Show the numeric ID as a secondary description
            description: `ID: ${repo.repository_id}`,
            // Prepend a GitHub icon for visual context
            startElement: {
                type: "Icon",
                id: "github",
                color: "gray",
                size: 24
            },
            // Display all custom properties as chips on the right
            endElement: propertyChips
        };
    });
    // Wrap everything in a responsive list container.
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=509.js.map