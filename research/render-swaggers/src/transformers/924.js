export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f;
    // Helper to build a metric chip with an icon
    const buildMetricChip = (label, iconId, color) => ({
        type: "Chip",
        label: String(label),
        startElement: {
            type: "Icon",
            id: iconId,
            size: 16,
        },
        variant: "filled",
        color,
        size: "small",
    });
    // Format date strings to a human-friendly form, defaulting on failure
    const formatDate = (dt) => dt ? new Date(dt).toLocaleDateString() : "Unknown";
    // Card header with repo name, description, owner avatar and public/private chip
    const header = {
        type: "CardHeader",
        title: input.name,
        description: (_a = input.description) !== null && _a !== void 0 ? _a : "No description",
        // Show owner's avatar on the left of the header
        startElement: {
            type: "Avatar",
            src: (_c = (_b = input.owner) === null || _b === void 0 ? void 0 : _b.avatar_url) !== null && _c !== void 0 ? _c : "",
            name: (_d = input.owner) === null || _d === void 0 ? void 0 : _d.login,
            size: 40,
            variant: "primary",
        },
        // Show a small chip indicating public or private
        endElement: {
            type: "Chip",
            label: input.private ? "Private" : "Public",
            startElement: {
                type: "Icon",
                id: input.private ? "lock" : "unlock",
                size: 16,
            },
            variant: "filled",
            color: input.private ? "error" : "success",
            size: "small",
        },
    };
    // Build a data list of repository metrics and info
    const metricsListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Stars" },
            value: buildMetricChip(input.stargazers_count, "star", "yellow"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Forks" },
            value: buildMetricChip(input.forks_count, "code-branch", "cyan"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Watchers" },
            value: buildMetricChip(input.watchers_count, "eye", "teal"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Open Issues" },
            value: buildMetricChip(input.open_issues_count, "exclamation-circle", "error"),
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "License" },
            value: {
                type: "Text",
                content: (_f = (_e = input.license) === null || _e === void 0 ? void 0 : _e.name) !== null && _f !== void 0 ? _f : "No license",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Last Updated" },
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created On" },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
            },
        },
    ];
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: metricsListItems,
        },
    };
    // Card footer with a button linking to the GitHub page
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            variant: "contained",
            color: "primary",
            size: "medium",
            href: input.html_url,
        },
    };
    // Compose a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=924.js.map