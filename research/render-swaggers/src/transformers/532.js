export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no teams, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No teams found\n\nThere are no teams to display at this time."
        };
    }
    // Map GitHub permission levels to UI color variants
    const permissionColorMap = {
        admin: "error", // red
        maintain: "warning", // yellow
        push: "success", // green
        triage: "info", // cyan
        pull: "gray" // gray
    };
    // Transform each team into a ListItem component
    const listItems = input.map(team => {
        var _a;
        // Determine avatar variant by hashing team name to a stable color fallback
        const avatarVariant = permissionColorMap[team.permission] || "primary";
        // Create a chip to display the team's permission
        const permissionChip = {
            type: "Chip",
            label: team.permission,
            variant: "outlined",
            color: permissionColorMap[team.permission] || "primary",
            size: "small"
        };
        // Arrow icon to indicate navigation
        const arrowIcon = {
            type: "Icon",
            id: "arrow-right",
            size: 16,
            color: "gray"
        };
        return {
            type: "ListItem",
            title: team.name,
            // Fallback when description is null
            description: (_a = team.description) !== null && _a !== void 0 ? _a : "No description provided",
            // Show team initial avatar for visual identity
            startElement: {
                type: "Avatar",
                name: team.name,
                variant: avatarVariant,
                size: 40
            },
            // On the right, show permission chip and a navigation icon
            endElement: [permissionChip, arrowIcon],
            // Clicking the item navigates to the team's GitHub page
            href: team.html_url
        };
    });
    // Return a responsive List component containing all teams
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=532.js.map