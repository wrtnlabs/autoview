export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no invitations, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No pending repository invitations"
        };
    }
    // Helper to map permission levels to chip colors
    const permissionColorMap = {
        read: "gray",
        write: "blue",
        admin: "red",
        triage: "teal",
        maintain: "cyan"
    };
    // Build a list item for each invitation
    const listItems = input.map(inv => {
        var _a, _b;
        // Format the creation timestamp to a human‐readable string
        const createdDate = new Date(inv.created_at);
        const dateStr = createdDate.toLocaleString();
        // Invitee avatar, or fallback icon if the invitee is null
        const startElement = inv.invitee
            ? {
                type: "Avatar",
                src: inv.invitee.avatar_url,
                name: inv.invitee.login,
                size: 40
            }
            : {
                type: "Icon",
                id: "user-secret",
                size: 32,
                color: "gray"
            };
        // Display inviter login or placeholder
        const inviterName = (_b = (_a = inv.inviter) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown";
        // Chip showing the permission level, with a mapped color
        const endElement = {
            type: "Chip",
            label: inv.permissions,
            variant: "filled",
            color: permissionColorMap[inv.permissions] || "primary"
        };
        return {
            type: "ListItem",
            title: inv.repository.full_name,
            description: `Invited by ${inviterName} on ${dateStr}`,
            startElement,
            endElement,
            // Make the item clickable and navigable
            href: inv.html_url
        };
    });
    // Render the list of invitations
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=773.js.map