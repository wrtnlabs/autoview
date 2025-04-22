export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle the empty case gracefully
    if (!input.runner_groups || input.runner_groups.length === 0) {
        return {
            type: "Markdown",
            // Use a heading to call out that no data is available
            content: "## No runner groups found\n\nIt looks like there are no runner groups configured for this organization."
        };
    }
    // Helper to map visibility string to a chip color
    const visibilityColor = (visibility) => {
        switch (visibility.toLowerCase()) {
            case "selected":
                return "warning";
            case "all":
            case "public":
                return "success";
            case "private":
            default:
                return "gray";
        }
    };
    // Transform each runner group into a ListItemProps
    const items = input.runner_groups.map((group) => {
        const chips = [];
        // Visibility chip
        chips.push({
            type: "Chip",
            label: group.visibility.charAt(0).toUpperCase() + group.visibility.slice(1),
            color: visibilityColor(group.visibility),
            variant: "filled",
            size: "small"
        });
        // Public repositories allowed?
        chips.push({
            type: "Chip",
            label: group.allows_public_repositories ? "Public repos" : "Private repos",
            color: group.allows_public_repositories ? "success" : "error",
            variant: "outlined",
            size: "small"
        });
        // Inherited?
        if (group.inherited) {
            chips.push({
                type: "Chip",
                label: "Inherited",
                color: "info",
                variant: "outlined",
                size: "small"
            });
        }
        // Default runner group?
        if (group.default) {
            chips.push({
                type: "Chip",
                label: "Default",
                color: "secondary",
                variant: "filled",
                size: "small"
            });
        }
        // Workflow restrictions
        if (group.restricted_to_workflows) {
            const count = Array.isArray(group.selected_workflows)
                ? group.selected_workflows.length
                : 0;
            chips.push({
                type: "Chip",
                label: `Workflows: ${count}`,
                color: "primary",
                variant: "outlined",
                size: "small"
            });
        }
        return {
            type: "ListItem",
            // Main title is the group name
            title: group.name,
            // Show the numeric ID as secondary info
            description: `ID: ${group.id}`,
            // If this is the default group, show a star icon at start
            startElement: group.default
                ? {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 20
                }
                : undefined,
            // Display the chips as endElements for quick status glance
            endElement: chips
        };
    });
    // Wrap the items in a List for a responsive, mobile-friendly layout
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=392.js.map