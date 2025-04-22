export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper: map codespace state to a user-friendly color for the Chip component.
    function mapStateToColor(state) {
        switch (state) {
            case "Available": return "success";
            case "Queued": return "secondary";
            case "Provisioning":
            case "Starting":
            case "Updating":
            case "Exporting":
            case "Rebuilding": return "info";
            case "Awaiting": return "warning";
            case "Unavailable":
            case "Failed":
            case "Shutdown": return "error";
            case "Deleted":
            case "Archived":
            case "Moved": return "gray";
            case "Unknown": return "darkGray";
            default: return "primary";
        }
    }
    const codespaces = (_a = input.codespaces) !== null && _a !== void 0 ? _a : [];
    // If there's no data, show a simple markdown message.
    if (codespaces.length === 0) {
        return {
            type: "Markdown",
            content: "### No codespaces found\n\nIt looks like there are no codespaces to display."
        };
    }
    // Build a list of ListItem components, one per codespace.
    const items = codespaces.map((cs) => {
        var _a;
        // Fallback title: display_name or name
        const title = (_a = cs.display_name) !== null && _a !== void 0 ? _a : cs.name;
        // Repository full name for the subtitle
        const repoName = cs.repository.full_name;
        // Chip to show current state
        const stateChip = {
            type: "Chip",
            label: cs.state,
            color: mapStateToColor(cs.state),
            variant: "filled"
        };
        // Chip to show location
        const locationChip = {
            type: "Chip",
            label: cs.location,
            variant: "outlined"
        };
        // Avatar for the owner
        const ownerAvatar = {
            type: "Avatar",
            src: cs.owner.avatar_url,
            name: cs.owner.login,
            variant: "primary",
            size: 40
        };
        return {
            type: "ListItem",
            title,
            description: repoName,
            href: cs.web_url, // Allow users to click through to the codespace
            startElement: ownerAvatar, // Owner avatar on the left
            // On the right show state and location chips
            endElement: [stateChip, locationChip]
        };
    });
    // Wrap all items in a responsive list
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=478.js.map