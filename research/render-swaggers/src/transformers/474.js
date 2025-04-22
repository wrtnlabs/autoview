export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map schema colors (including 'purple') to Avatar/Chip variants
    const colorVariantMap = {
        gray: "gray",
        blue: "blue",
        green: "green",
        yellow: "yellow",
        orange: "orange",
        red: "red",
        pink: "pink",
        purple: "violet", // Avatar uses 'violet' not 'purple'
        null: "gray",
        undefined: "gray",
    };
    // Normalize and extract valid issue types (filter out null entries)
    const issues = (input || []).filter((item) => item !== null);
    // If there is no data to visualize, show a markdown message
    if (issues.length === 0) {
        return {
            type: "Markdown",
            content: "### No issue types available\nThere are no issue types to display at this time.",
        };
    }
    // Transform each issue type into a ListItemProps
    const listItems = issues.map((issue) => {
        var _a;
        // Compute display color variant
        const variant = colorVariantMap[String(issue.color)] || "gray";
        // Build an avatar showing the first letter of the name, colored by the issue type color
        const avatar = {
            type: "Avatar",
            name: issue.name.charAt(0).toUpperCase(),
            variant,
            size: 32,
        };
        // Build a chip displaying the numeric ID
        const idChip = {
            type: "Chip",
            label: String(issue.id),
            variant: "outlined",
            size: "small",
            // Use the same color mapping for consistency
            color: variant,
        };
        return {
            type: "ListItem",
            title: issue.name,
            description: (_a = issue.description) !== null && _a !== void 0 ? _a : "", // fallback to empty if null
            startElement: avatar,
            endElement: idChip,
        };
    });
    // Return a responsive list of issue types; ListItems are touch-friendly on mobile
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=474.js.map