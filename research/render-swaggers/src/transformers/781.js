export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper: format ISO date to locale string
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "";
    // Build header: show actor with avatar or fallback icon, and event type
    const actorName = (_b = (_a = input.actor) === null || _a === void 0 ? void 0 : _a.login) !== null && _b !== void 0 ? _b : "Unknown";
    const avatarElement = input.actor
        ? {
            type: "Avatar",
            src: input.actor.avatar_url,
            name: actorName,
            size: 40,
            variant: "primary",
        }
        : {
            type: "Icon",
            id: "user",
            color: "gray",
            size: 40,
        };
    const header = {
        type: "CardHeader",
        title: actorName,
        description: input.event,
        startElement: avatarElement,
    };
    // Build content components dynamically based on available data
    const contentChildren = [];
    // Show timestamp using markdown for better readability
    const timeText = formatDate(input.created_at);
    if (timeText) {
        contentChildren.push({
            type: "Markdown",
            content: `**Time:** ${timeText}`,
        });
    }
    // If an issue is attached, provide a button to view it
    if (input.issue) {
        // Safe-check for HTML URL
        const href = typeof input.issue.html_url === "string" ? input.issue.html_url : "";
        contentChildren.push({
            type: "Button",
            label: `Issue #${input.issue.number}`,
            variant: "outlined",
            color: "primary",
            size: "small",
            href,
        });
    }
    // If this event references a commit, provide a button to view the commit
    if (input.commit_id && input.commit_url) {
        contentChildren.push({
            type: "Button",
            label: "View Commit",
            variant: "outlined",
            color: "secondary",
            size: "small",
            href: input.commit_url,
        });
    }
    // If a label change occurred, show a chip with the label name
    if (input.label && input.label.name) {
        contentChildren.push({
            type: "Chip",
            label: input.label.name,
            variant: "filled",
            color: "info",
            size: "small",
        });
    }
    // Wrap content in CardContent
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Compose vertical card with header and content
    const card = {
        type: "VerticalCard",
        childrenProps: [header, cardContent],
    };
    return card;
}
//# sourceMappingURL=781.js.map