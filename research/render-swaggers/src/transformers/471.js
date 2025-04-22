export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty list gracefully with a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No organization invitations available."
        };
    }
    // Map each invitation to a DataListItem component
    const childrenProps = input.map(invitation => {
        var _a, _b, _c;
        // Build the label: inviter's avatar and name/login
        const inviterName = (_a = invitation.inviter.name) !== null && _a !== void 0 ? _a : invitation.inviter.login;
        const labelComponents = [
            {
                type: "Avatar",
                src: invitation.inviter.avatar_url,
                name: inviterName,
                variant: "primary",
                size: 40
            },
            {
                type: "Text",
                // Display the inviter's name prominently
                variant: "body1",
                content: inviterName,
                color: "primary"
            }
        ];
        // Build the value: email, role chip, creation date, and failure indicator (if any)
        const valueComponents = [];
        // Email (if present, else display a dash)
        valueComponents.push({
            type: "Text",
            variant: "body2",
            content: (_b = invitation.email) !== null && _b !== void 0 ? _b : "—",
            color: invitation.email ? "tertiary" : "disabled"
        });
        // Role as a colored chip
        valueComponents.push({
            type: "Chip",
            label: invitation.role,
            variant: "outlined",
            color: "info",
            size: "small"
        });
        // Created date as human-readable text
        let createdLabel = invitation.created_at;
        try {
            const d = new Date(invitation.created_at);
            if (!isNaN(d.getTime())) {
                createdLabel = d.toLocaleDateString(undefined, {
                    year: "numeric", month: "short", day: "numeric"
                });
            }
        }
        catch (_d) {
            // Fall back to raw string on parse error
        }
        valueComponents.push({
            type: "Text",
            variant: "caption",
            content: createdLabel,
            color: "gray"
        });
        // If the invitation failed, add a warning icon with tooltip
        if (invitation.failed_at) {
            valueComponents.push({
                type: "Tooltip",
                message: (_c = invitation.failed_reason) !== null && _c !== void 0 ? _c : "Invitation failed",
                childrenProps: {
                    type: "Icon",
                    id: "exclamation-triangle",
                    color: "orange",
                    size: 16
                }
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents
        };
    });
    // Return the full data list
    return {
        type: "DataList",
        childrenProps
    };
}
//# sourceMappingURL=471.js.map