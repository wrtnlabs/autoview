export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no codespaces, show a friendly markdown message
    if (!input.codespaces || input.codespaces.length === 0) {
        return {
            type: "Markdown",
            content: `**No Codespaces Found**  
You don't have any active codespaces at the moment.`
        };
    }
    // Map each codespace state to a chip color for visual distinction
    const stateToColor = {
        Available: "success",
        Provisioning: "primary",
        Queued: "info",
        Created: "info",
        Starting: "info",
        Awaiting: "info",
        Unavailable: "warning",
        Shutdown: "gray",
        Deleted: "darkGray",
        Failed: "error",
        Archived: "secondary",
        Moved: "secondary",
        Exporting: "secondary",
        Updating: "secondary",
        Rebuilding: "secondary",
        Unknown: "secondary"
    };
    // Helper to create a ListItem for each codespace
    function makeListItem(cs) {
        var _a, _b;
        const owner = cs.owner;
        // Determine chip color by state, default to 'primary' if unknown
        const chipColor = (_a = stateToColor[cs.state]) !== null && _a !== void 0 ? _a : "primary";
        return {
            type: "ListItem",
            title: cs.name,
            description: (_b = cs.display_name) !== null && _b !== void 0 ? _b : undefined,
            // Show the owner's avatar as the leading element
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                size: 28,
                variant: "info"
            },
            // Show state chip and a button to open the codespace
            endElement: [
                {
                    type: "Chip",
                    label: cs.state,
                    color: chipColor,
                    size: "small",
                    variant: "filled"
                },
                {
                    type: "Button",
                    label: "Open",
                    variant: "outlined",
                    size: "small",
                    href: cs.web_url
                }
            ]
        };
    }
    // Compose the List with all codespaces
    return {
        type: "List",
        childrenProps: input.codespaces.map(makeListItem)
    };
}
//# sourceMappingURL=929.js.map