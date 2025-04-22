export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Map deployment state to user-friendly label and color
    const stateLabel = input.state
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    const stateColorMap = {
        pending: "warning",
        in_progress: "info",
        success: "success",
        failure: "error",
        error: "error",
        inactive: "gray",
        queued: "info",
    };
    const stateChip = {
        type: "Chip",
        label: stateLabel,
        color: (_a = stateColorMap[input.state]) !== null && _a !== void 0 ? _a : "primary",
        size: "small",
        variant: "filled",
    };
    // Build an avatar for the creator, if available
    const creator = input.creator;
    const avatarComponent = creator && creator.avatar_url
        ? {
            type: "Avatar",
            src: creator.avatar_url,
            name: creator.login,
            variant: "info",
            size: 40,
        }
        : undefined;
    // Helper to make a button link
    const makeLinkButton = (href, label = "Open") => ({
        type: "Button",
        label,
        href,
        variant: "text",
        color: "primary",
        size: "small",
    });
    // Format timestamps for readability
    const formatDate = (iso) => {
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };
    // Assemble data list items
    const items = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID" },
            value: { type: "Text", content: String(input.id) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: input.node_id },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: formatDate(input.created_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Updated At" },
            value: { type: "Text", content: formatDate(input.updated_at) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Repository" },
            value: makeLinkButton(input.repository_url, "View Repo"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Deployment" },
            value: makeLinkButton(input.deployment_url, "Open"),
        },
    ];
    // Optional fields: target_url, log_url, environment_url, performed_via_github_app
    if (input.target_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Target URL" },
            value: makeLinkButton(input.target_url),
        });
    }
    if (input.log_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Log URL" },
            value: makeLinkButton(input.log_url, "View Logs"),
        });
    }
    if (input.environment_url) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Environment URL" },
            value: makeLinkButton(input.environment_url, "Open Env"),
        });
    }
    if (input.performed_via_github_app) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Performed Via" },
            value: {
                type: "Chip",
                label: input.performed_via_github_app.name,
                size: "small",
                variant: "outlined",
                color: "secondary",
            },
        });
    }
    // Main card structure
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Show who created it and the description
                type: "CardHeader",
                title: (_b = creator === null || creator === void 0 ? void 0 : creator.login) !== null && _b !== void 0 ? _b : "Unknown Creator",
                description: input.description || undefined,
                startElement: avatarComponent,
                endElement: stateChip,
            },
            {
                // List all key/value pairs in a data list
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items,
                },
            },
        ],
    };
}
//# sourceMappingURL=727.js.map