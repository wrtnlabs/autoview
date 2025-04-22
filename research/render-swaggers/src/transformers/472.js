export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Determine invitation status and corresponding UI color
    const isFailed = input.failed_at != null;
    const statusLabel = isFailed ? "Failed" : "Invited";
    const statusColor = (isFailed ? "error" : "info");
    // Header: show inviter's avatar, name/login, and status chip
    const header = {
        type: "CardHeader",
        title: input.inviter.login,
        // Use the inviter's real name if available
        description: (_a = input.inviter.name) !== null && _a !== void 0 ? _a : undefined,
        startElement: {
            type: "Avatar",
            src: input.inviter.avatar_url,
            name: (_b = input.inviter.name) !== null && _b !== void 0 ? _b : input.inviter.login,
            variant: "primary",
            size: 40,
        },
        endElement: {
            type: "Chip",
            label: statusLabel,
            color: statusColor,
            variant: "filled",
            size: "small",
        },
    };
    // Helper to create a DataListItem with a label and a value component
    function makeItem(labelText, value) {
        return {
            type: "DataListItem",
            label: [
                {
                    type: "Text",
                    content: labelText,
                    variant: "subtitle2",
                    color: "tertiary",
                },
            ],
            value: [value],
        };
    }
    // Build the array of details to display
    const details = [];
    // Email
    details.push(makeItem("Email", {
        type: "Text",
        content: (_c = input.email) !== null && _c !== void 0 ? _c : "N/A",
        variant: "body1",
    }));
    // Role
    details.push(makeItem("Role", {
        type: "Text",
        content: input.role,
        variant: "body1",
    }));
    // Created at (formatted for readability)
    details.push(makeItem("Created At", {
        type: "Text",
        content: new Date(input.created_at).toLocaleString(),
        variant: "body1",
    }));
    // Team count
    details.push(makeItem("Teams", {
        type: "Text",
        content: input.team_count.toString(),
        variant: "body1",
    }));
    // Node ID
    details.push(makeItem("Node ID", {
        type: "Text",
        content: input.node_id,
        variant: "body1",
    }));
    // Invitation source (optional)
    if (input.invitation_source) {
        details.push(makeItem("Source", {
            type: "Text",
            content: input.invitation_source,
            variant: "body1",
        }));
    }
    // Failure details (if present)
    if (isFailed) {
        details.push(makeItem("Failed At", {
            type: "Text",
            content: new Date(input.failed_at).toLocaleString(),
            variant: "body1",
        }));
        if (input.failed_reason) {
            // show failure reason in markdown to preserve formatting
            details.push(makeItem("Reason", {
                type: "Markdown",
                content: input.failed_reason,
            }));
        }
    }
    // Teams URL action button
    const viewTeamsButton = {
        type: "Button",
        label: "View Teams",
        href: input.invitation_teams_url,
        variant: "outlined",
        color: "primary",
        size: "medium",
    };
    // Wrap details into a DataList component
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: details,
        },
    };
    // Footer: action(s)
    const footer = {
        type: "CardFooter",
        childrenProps: viewTeamsButton,
    };
    // Final VerticalCard composition
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=472.js.map