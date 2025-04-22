export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Extract groups array, default to empty if undefined
    const groups = (_a = input.groups) !== null && _a !== void 0 ? _a : [];
    // If there are no groups to display, show a friendly markdown message
    if (groups.length === 0) {
        return {
            type: "Markdown",
            content: "### No groups available."
        };
    }
    // Color mapping for group scopes
    const scopeColorMap = {
        all: "green",
        public: "blue",
        private: "gray",
    };
    // Build a list of ListItemProps for each group
    const listItems = groups.map((group) => {
        // Prepare scope chip
        const scopeChip = {
            type: "Chip",
            label: group.scope,
            color: scopeColorMap[group.scope] || "gray",
            size: "small",
        };
        // Prepare manager count chip, if managerIds exist
        const managerChip = group.managerIds && group.managerIds.length > 0
            ? {
                type: "Chip",
                label: `${group.managerIds.length} manager${group.managerIds.length > 1 ? "s" : ""}`,
                variant: "outlined",
                size: "small",
                color: "secondary",
            }
            : undefined;
        // Assemble end elements: scope first, then manager count if present
        const endElements = managerChip
            ? [scopeChip, managerChip]
            : scopeChip;
        // Use an avatar with initials derived from the group name
        const avatar = {
            type: "Avatar",
            name: group.name,
            variant: "blue",
            size: 40,
        };
        return {
            type: "ListItem",
            title: group.name,
            description: group.description,
            // Left side: avatar for visual identification
            startElement: avatar,
            // Right side: chips showing scope and manager count
            endElement: endElements,
            // If the group has an associated channel or id, link to it (optional)
            href: group.id ? `/groups/${group.id}` : undefined,
        };
    });
    // Return a responsive list component wrapping all items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=182.js.map