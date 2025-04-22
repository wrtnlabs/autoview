export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to map team permissions to chip colors
    const mapPermissionToColor = (perm) => {
        switch (perm.toLowerCase()) {
            case "admin":
                return "red";
            case "maintain":
                return "orange";
            case "push":
                return "green";
            case "triage":
                return "teal";
            case "pull":
                return "cyan";
            default:
                return "gray";
        }
    };
    // If there are no teams, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No Teams Available\n\nThere are currently no teams to display.",
        };
    }
    // Transform each team into a ListItem component
    const items = input.map((team) => {
        var _a;
        // Fallback for missing description
        const description = (_a = team.description) !== null && _a !== void 0 ? _a : "No description provided";
        // Primary icon for each team
        const avatarIcon = {
            type: "Icon",
            id: "users", // FontAwesome "users" icon
            color: "blue",
            size: 24,
        };
        // Build chips for permissions and optional privacy
        const chips = [
            {
                type: "Chip",
                label: team.permission,
                color: mapPermissionToColor(team.permission),
                size: "small",
                variant: "outlined",
            },
        ];
        if (team.privacy) {
            chips.push({
                type: "Chip",
                label: team.privacy,
                color: "violet",
                size: "small",
                variant: "outlined",
            });
        }
        return {
            type: "ListItem",
            title: team.name,
            description,
            startElement: avatarIcon,
            // Display permission/privacy as right-aligned chips
            endElement: chips,
        };
    });
    // Return a List container wrapping all team items
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=555.js.map