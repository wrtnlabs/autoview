export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Utility to humanize a duration given in seconds
    function formatDuration(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        const parts = [];
        if (h)
            parts.push(`${h}h`);
        if (m)
            parts.push(`${m}m`);
        if (s || parts.length === 0)
            parts.push(`${s}s`);
        return parts.join(" ");
    }
    // If there's no pending deployment, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No pending deployments."
        };
    }
    // Map each pending deployment to a ListItemProps
    const items = input.map(deployment => {
        var _a, _b, _c;
        const env = deployment.environment || {};
        const name = (_a = env.name) !== null && _a !== void 0 ? _a : `Environment ${env.id}`;
        const apiUrl = (_b = env.url) !== null && _b !== void 0 ? _b : "";
        const htmlUrl = (_c = env.html_url) !== null && _c !== void 0 ? _c : "";
        // Format wait timer into human-readable string
        const waitLabel = formatDuration(deployment.wait_timer);
        // Chip indicating wait timer
        const waitChip = {
            type: "Chip",
            label: waitLabel,
            color: "info",
            size: "small",
            variant: "outlined"
        };
        // Chip indicating if current user can approve
        const approveChip = {
            type: "Chip",
            label: deployment.current_user_can_approve ? "Can Approve" : "Cannot Approve",
            color: deployment.current_user_can_approve ? "success" : "error",
            size: "small",
            variant: "filled"
        };
        // Button to navigate to the environment in the browser
        const visitButton = {
            type: "Button",
            label: "Visit",
            href: htmlUrl,
            variant: "text",
            color: "primary",
            size: "small",
            startElement: {
                type: "Icon",
                id: "external-link-alt", // FontAwesome icon
                color: "blue",
                size: 16
            }
        };
        // Assemble reviewer chips: show user/team icon + name
        const reviewerChips = (deployment.reviewers || []).map((rev, idx) => {
            const isUser = rev.type === "User";
            // Try to extract a display name from the reviewer object
            const name = (rev.reviewer && (rev.reviewer.login || rev.reviewer.name)) ||
                (isUser ? "User" : "Team") +
                    ` ${idx + 1}`; // fallback
            return {
                type: "Chip",
                label: String(name),
                color: isUser ? "teal" : "violet",
                size: "small",
                variant: "outlined",
                startElement: {
                    type: "Icon",
                    id: isUser ? "user" : "users",
                    color: isUser ? "teal" : "violet",
                    size: 16
                }
            };
        });
        // Compose the ListItemProps for this deployment
        const listItem = {
            type: "ListItem",
            title: name,
            description: apiUrl,
            startElement: {
                type: "Icon",
                id: "server",
                color: "blue",
                size: 24
            },
            endElement: [
                waitChip,
                approveChip,
                ...reviewerChips,
                visitButton
            ]
        };
        return listItem;
    });
    // Return a responsive list of deployments
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=606.js.map