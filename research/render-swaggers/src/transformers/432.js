export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no codespaces, show a friendly markdown message
    if (!input.codespaces || input.codespaces.length === 0) {
        return {
            type: "Markdown",
            content: "## No Codespaces Available\n\nThere are currently no codespaces to display."
        };
    }
    // Map codespace state to a visual chip color
    const mapStateToColor = (state) => {
        switch (state) {
            case "Available":
                return "success";
            case "Queued":
            case "Provisioning":
            case "Created":
                return "warning";
            case "Failed":
            case "Deleted":
                return "error";
            default:
                return "primary";
        }
    };
    // Format an ISO date‑time string as YYYY-MM-DD
    const formatDate = (iso) => iso.slice(0, 10);
    // Build a ListItem for each codespace
    const listItems = input.codespaces.map((cs) => {
        var _a;
        return ({
            type: "ListItem",
            // Title: use display_name if available, else fallback to auto-generated name
            title: (_a = cs.display_name) !== null && _a !== void 0 ? _a : cs.name,
            // Show the repository full name underneath
            description: cs.repository.full_name,
            // Avatar of the owner as the leading element
            startElement: {
                type: "Avatar",
                src: cs.owner.avatar_url,
                name: cs.owner.login,
                size: 32,
                variant: "primary"
            },
            // Show status and creation date as small chips on the right
            endElement: [
                {
                    type: "Chip",
                    label: cs.state,
                    color: mapStateToColor(cs.state),
                    size: "small",
                    variant: "outlined"
                },
                {
                    type: "Chip",
                    label: formatDate(cs.created_at),
                    size: "small",
                    variant: "outlined"
                }
            ],
            // Link directly to the codespace in the GitHub web UI
            href: cs.web_url
        });
    });
    // Render the entire collection as a responsive list
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=432.js.map