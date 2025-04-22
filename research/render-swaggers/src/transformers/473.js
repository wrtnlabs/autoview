export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no teams, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available\n\nThere are currently no teams to display."
        };
    }
    // Map each team to a ListItem component
    const items = input.map(team => {
        var _a;
        // Use the first letter of the team name as avatar fallback
        const initials = team.name
            .split(/\s+/)
            .map(word => word[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
        // Build a description string, fallback if null
        const desc = (_a = team.description) !== null && _a !== void 0 ? _a : "_No description provided_";
        // Compose endElement as a button that links to the team's page
        const viewButton = {
            type: "Button",
            label: "View",
            variant: "outlined",
            size: "small",
            href: team.html_url,
            color: "primary"
        };
        return {
            type: "ListItem",
            title: team.name,
            // Render the description in Markdown for better styling
            description: desc,
            startElement: {
                type: "Avatar",
                name: team.name,
                // We don't have an image URL, so we show initials
                variant: "primary",
                size: 32
            },
            endElement: viewButton,
            href: team.html_url
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=473.js.map