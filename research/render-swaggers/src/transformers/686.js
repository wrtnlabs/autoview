export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no codespaces, show a friendly message
    if (!input.codespaces || input.codespaces.length === 0) {
        return {
            type: "Markdown",
            content: "### No Codespaces Found\n\nYou don't have any GitHub Codespaces available."
        };
    }
    // Map a codespace state to a Chip color
    const getStateColor = (state) => {
        switch (state) {
            case "Available":
                return "success";
            case "Provisioning":
            case "Queued":
            case "Starting":
            case "Awaiting":
            case "Created":
            case "Updating":
            case "Rebuilding":
                return "warning";
            case "Failed":
            case "Unavailable":
            case "Shutdown":
            case "Archived":
            case "Deleted":
                return "error";
            default:
                return "info";
        }
    };
    // Build a list item for each codespace
    const items = input.codespaces.map((cs) => {
        // Primary avatar of the codespace owner
        const avatar = {
            type: "Avatar",
            src: cs.owner.avatar_url,
            name: cs.owner.login,
            size: 40,
            variant: "primary"
        };
        // If there is a pending operation, decorate the avatar with a red badge
        const startElement = cs.pending_operation
            ? {
                type: "Badge",
                dot: true,
                color: "error",
                childrenProps: avatar
            }
            : avatar;
        // A chip showing the codespace state
        const stateChip = {
            type: "Chip",
            label: cs.state,
            color: getStateColor(cs.state),
            variant: "filled",
            size: "small"
        };
        // Optionally show when it was last used
        const lastUsed = cs.last_used_at
            ? {
                type: "Text",
                content: `Last used: ${new Date(cs.last_used_at).toLocaleString()}`,
                variant: "caption",
                color: "gray"
            }
            : null;
        // Compose end elements: state chip and optional last-used text
        const endElements = [stateChip];
        if (lastUsed)
            endElements.push(lastUsed);
        return {
            type: "ListItem",
            title: cs.display_name || cs.name,
            description: cs.repository.full_name,
            startElement,
            endElement: endElements,
            href: cs.web_url
        };
    });
    // Return a responsive list of codespaces
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=686.js.map