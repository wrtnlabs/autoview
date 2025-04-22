export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty or missing input gracefully
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            // Inform the user that there's no data to display
            content: "### No role assignments found"
        };
    }
    // Map assignment types to chip colors for quick visual recognition
    const assignmentColorMap = {
        direct: "success",
        indirect: "warning",
        mixed: "info",
        // Default color for unknown or missing assignment
        unknown: "gray"
    };
    // Build a list of ListItem components, one per user-role assignment
    const listItems = input.map((user) => {
        var _a, _b;
        const assignmentType = (_a = user.assignment) !== null && _a !== void 0 ? _a : "unknown";
        const chipColor = assignmentColorMap[assignmentType] || assignmentColorMap.unknown;
        // Compose the display name: prefer name, fallback to login
        const displayName = (_b = user.name) !== null && _b !== void 0 ? _b : user.login;
        // Description: show email if available
        const description = user.email
            ? `${user.email}`
            : "";
        return {
            type: "ListItem",
            title: displayName,
            description,
            // Clicking the item navigates to the user's GitHub profile
            href: user.html_url,
            // Left element: user avatar for quick visual identification
            startElement: {
                type: "Avatar",
                src: user.avatar_url,
                name: displayName,
                size: 40
            },
            // Right element: chip indicating assignment type
            endElement: {
                type: "Chip",
                label: assignmentType,
                color: chipColor,
                size: "small",
                variant: "filled"
            }
        };
    });
    // Optional: add a sticky subheader showing total count
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                content: `**Total Users:** ${listItems.length}`,
                variant: "subtitle1",
                color: "primary"
            }
        ]
    };
    // Return a List component containing the subheader and all items
    return {
        type: "List",
        childrenProps: [subheader, ...listItems]
    };
}
//# sourceMappingURL=489.js.map