export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No role assignments available**",
        };
    }
    /**
     * Map a permission object to a representative icon.
     * Priority: admin > maintain > push > triage > pull.
     */
    function selectPermissionIcon(permissions) {
        if (permissions.admin)
            return "shield-alt";
        if (permissions.maintain)
            return "wrench";
        if (permissions.push)
            return "arrow-up";
        if (permissions.triage)
            return "tasks";
        if (permissions.pull)
            return "download";
        return "user";
    }
    /**
     * Map assignment type to a chip color.
     */
    function assignmentColor(type) {
        switch (type) {
            case "direct":
                return "green";
            case "indirect":
                return "blue";
            case "mixed":
                return "violet";
            default:
                return "gray";
        }
    }
    // Build list items for each team-role assignment.
    const listItems = input.map((record) => {
        var _a, _b;
        const assignmentType = (_a = record.assignment) !== null && _a !== void 0 ? _a : "unknown";
        const chip = {
            type: "Chip",
            label: assignmentType,
            color: assignmentColor(record.assignment),
            size: "small",
            variant: "filled",
        };
        // Fallback for missing description.
        const descriptionText = (_b = record.description) !== null && _b !== void 0 ? _b : record.permission;
        // Pick an icon based on the detailed permissions.
        const permIconId = record.permissions !== undefined
            ? selectPermissionIcon(record.permissions)
            : "user";
        const permIcon = {
            type: "Icon",
            id: permIconId,
            color: "teal",
            size: 24,
        };
        // A link button to view the team assignment in GitHub.
        const viewButton = {
            type: "Button",
            variant: "text",
            color: "primary",
            size: "small",
            href: record.html_url,
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 12,
            },
            label: ["View"],
        };
        return {
            type: "ListItem",
            // Display the team name prominently.
            title: record.name,
            description: descriptionText,
            // Use a colored chip for direct/indirect/mixed assignment.
            startElement: chip,
            // Show the key permission icon and a button to navigate to GitHub.
            endElement: [permIcon, viewButton],
        };
    });
    // Return a responsive list UI.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=488.js.map