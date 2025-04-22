export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no teams, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No teams available\n\nThere are currently no teams to display."
        };
    }
    // Map each team to a ListItem with an icon and a "View" button linking to the team's page
    const listItems = input.map((team) => {
        // Compose the list item
        const item = Object.assign(Object.assign({ type: "ListItem", title: team.name }, (team.description
            ? { description: team.description }
            : {})), { 
            // Prepend a users icon for visual flair
            startElement: {
                type: "Icon",
                id: "users",
                size: 24,
                color: "blue"
            }, 
            // Append a button that navigates to the team's HTML URL
            endElement: {
                type: "Button",
                label: "View",
                href: team.html_url,
                variant: "outlined",
                size: "small",
                color: "primary"
            } });
        return item;
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=652.js.map