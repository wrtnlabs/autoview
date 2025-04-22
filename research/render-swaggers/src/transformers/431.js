export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No Repositories Found\nThere are no code security configuration repositories to display.",
        };
    }
    // Map repository status to a chip color
    const statusColorMap = {
        attached: "success",
        enforced: "success",
        attaching: "info",
        updating: "info",
        detached: "gray",
        removed: "error",
        removed_by_enterprise: "error",
        failed: "error",
    };
    // Build a List component with one ListItem per repository
    const listItems = input.map((item) => {
        var _a, _b;
        const repo = item.repository;
        const status = (_a = item.status) !== null && _a !== void 0 ? _a : "detached";
        // Primary status chip
        const statusChip = {
            type: "Chip",
            label: status.replace(/_/g, " "),
            color: statusColorMap[status] || "gray",
            variant: "outlined",
            size: "small",
        };
        // Optional privacy/fork chips
        const extraChips = [];
        if (repo["private"]) {
            extraChips.push({
                type: "Chip",
                label: "Private",
                color: "warning",
                variant: "filled",
                size: "small",
            });
        }
        if (repo.fork) {
            extraChips.push({
                type: "Chip",
                label: "Fork",
                color: "gray",
                variant: "outlined",
                size: "small",
            });
        }
        // External link icon for the repo URL
        const linkIcon = {
            type: "Icon",
            id: "arrow-up-right-from-square",
            color: "blue",
            size: 20,
        };
        // Assemble endElement array: status + optional + link icon
        const endElements = [
            statusChip,
            ...extraChips,
            linkIcon,
        ];
        // Owner avatar on the left
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            variant: "info",
            size: 32,
        };
        return {
            type: "ListItem",
            title: repo.full_name,
            description: (_b = repo.description) !== null && _b !== void 0 ? _b : "",
            startElement: avatar,
            endElement: endElements,
            // Make the entire list item clickable
            href: repo.html_url,
        };
    });
    // Return the List component
    const list = {
        type: "List",
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=431.js.map