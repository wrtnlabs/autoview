export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no teams, render a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams available\nThere are no teams to display at this time.",
        };
    }
    // Map each team to a ListItem component
    const listItems = input.map((team) => {
        var _a;
        // Fallback to slug if description is null or empty
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : team.slug;
        return {
            type: "ListItem",
            title: team.name,
            description: description,
            // Use a user icon to represent a team
            startElement: {
                type: "Icon",
                id: "users",
                color: "blue",
                size: 24,
            },
            // Show a chevron icon on the right to indicate navigation
            endElement: {
                type: "Icon",
                id: "arrow-right",
                color: "gray",
                size: 16,
            },
            // Make the entire item clickable, linking to the team's GitHub page
            href: team.html_url,
        };
    });
    // Return a responsive List component wrapping those items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=925.js.map