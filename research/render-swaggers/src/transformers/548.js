export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper to format ISO date strings into a user‐friendly locale string.
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Transform each invitation into a DataListItem component
    const items = input.map((invitation) => {
        var _a, _b;
        // Compose the label as an avatar + the inviter's login name
        const labelComponents = [
            {
                type: "Avatar",
                src: invitation.inviter.avatar_url,
                name: invitation.inviter.login,
                size: 32,
                variant: "primary",
            },
            {
                type: "Text",
                content: invitation.inviter.login,
                variant: "subtitle1",
            },
        ];
        // Build a Markdown block for the details
        let md = "";
        md += `**Email:** ${(_a = invitation.email) !== null && _a !== void 0 ? _a : "N/A"}  \n`;
        md += `**Role:** ${invitation.role}  \n`;
        md += `**Invited At:** ${formatDate(invitation.created_at)}  \n`;
        // If invitation failed, append failure info
        if (invitation.failed_at) {
            md += `\n**Failed At:** ${formatDate(invitation.failed_at)}  \n`;
            md += `**Reason:** ${(_b = invitation.failed_reason) !== null && _b !== void 0 ? _b : "Unknown"}  \n`;
        }
        const valueComponent = {
            type: "Markdown",
            content: md,
        };
        return {
            type: "DataListItem",
            label: labelComponents,
            value: [valueComponent],
        };
    });
    // Return a DataList wrapping all invitation items.
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=548.js.map