export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no invitations, show a friendly message via Markdown
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No organization invitations found.\n\nAll caught up! 🎉",
        };
    }
    // Helper to format ISO date strings into a human-friendly form
    const formatDate = (iso) => {
        try {
            return new Date(iso).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
            });
        }
        catch (_a) {
            // Fallback to the raw string if parsing fails
            return iso;
        }
    };
    // Transform each invitation into a ListItem component
    const listItems = input.map((invitation) => {
        var _a, _b, _c;
        // Determine the display name: prefer login, then email, then inviter login
        const subject = (_c = (_b = (_a = invitation.login) !== null && _a !== void 0 ? _a : invitation.email) !== null && _b !== void 0 ? _b : invitation.inviter.login) !== null && _c !== void 0 ? _c : "Unknown";
        // Format the creation date
        const createdAt = formatDate(invitation.created_at);
        // Create a Chip to show the invitation role
        const roleChip = {
            type: "Chip",
            label: invitation.role,
            color: "primary",
            variant: "outlined",
            size: "small",
        };
        // Create a Chip to show the status: Pending or Failed
        const statusChip = {
            type: "Chip",
            label: invitation.failed_at ? "Failed" : "Pending",
            color: invitation.failed_at ? "error" : "info",
            variant: "filled",
            size: "small",
        };
        // Build the ListItem
        const item = {
            type: "ListItem",
            // Show inviter's avatar on the left
            startElement: {
                type: "Avatar",
                src: invitation.inviter.avatar_url,
                name: invitation.inviter.login,
                size: 40,
            },
            // Primary text: the invited person's login/email
            title: subject,
            // Secondary text: date and, if available, failure reason
            description: invitation.failed_reason
                ? `${createdAt} · ${invitation.failed_reason}`
                : createdAt,
            // On the right, show two Chips: role and status
            endElement: [roleChip, statusChip],
        };
        return item;
    });
    // Return a responsive List component containing all invitations
    const listProps = {
        type: "List",
        childrenProps: listItems,
    };
    return listProps;
}
//# sourceMappingURL=918.js.map