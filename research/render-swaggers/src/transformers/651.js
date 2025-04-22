export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of `Schema.team` into an AutoView list of teams.
function visualizeData(input) {
    // If the input is empty or missing, show a friendly markdown notification.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams found\n\nThere are no teams available to display."
        };
    }
    // Map each team record to a ListItem component
    const listItems = input.map((team) => {
        var _a;
        // Use the team description if present, otherwise fall back to the slug
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : `Slug: ${team.slug}`;
        // Prepend a users icon to each list item
        const startElement = {
            type: "Icon",
            id: "users", // FontAwesome "users" icon
            size: 24, // 24px icon for clarity on mobile & desktop
            color: "blue" // Blue tint to draw attention
        };
        // Add a small "Visit" button linking to the team's page
        const endElement = {
            type: "Button",
            variant: "text",
            size: "small",
            color: "primary",
            label: "Visit",
            href: team.html_url // Link out to the team's GitHub page
        };
        return {
            type: "ListItem",
            title: team.name,
            description,
            startElement,
            endElement
        };
    });
    // Compose the final List component containing all the team entries
    const listProps = {
        type: "List",
        childrenProps: listItems
    };
    return listProps;
}
//# sourceMappingURL=651.js.map