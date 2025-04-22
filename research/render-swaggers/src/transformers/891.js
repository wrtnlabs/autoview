export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map GitHub team permission levels to UI Chip colors
    const permissionColorMap = {
        admin: "error",
        maintain: "secondary",
        push: "warning",
        triage: "info",
        pull: "gray",
    };
    // If there are no teams, render a friendly markdown notice
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No Teams Found\nThere are no teams to display at this time.",
        };
    }
    // Transform each team into a ListItem component
    const listItems = input.map((team) => {
        var _a, _b;
        // Ensure we have a description fallback
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : "No description";
        // Choose a chip color based on the team's permission level, defaulting to gray
        const chipColor = (_b = permissionColorMap[team.permission]) !== null && _b !== void 0 ? _b : "gray";
        // Build the chip to display the team's permission
        const permissionChip = {
            type: "Chip",
            label: team.permission,
            color: chipColor,
            size: "small",
            variant: "outlined",
        };
        // Build an icon to represent a team (using FontAwesome 'users' icon)
        const teamIcon = {
            type: "Icon",
            id: "users",
            color: "blue",
            size: 20,
        };
        // Compose the ListItem for this team
        const item = {
            type: "ListItem",
            title: team.name,
            description,
            startElement: teamIcon,
            // Show the permission chip on the right; wrapping in array in case more end elements are added later
            endElement: [permissionChip],
            // Make the entire item clickable, linking to the team's HTML URL
            href: team.html_url,
        };
        return item;
    });
    // Wrap all items into a responsive List component
    const list = {
        type: "List",
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=891.js.map