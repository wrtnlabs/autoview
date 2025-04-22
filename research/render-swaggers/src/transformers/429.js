export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Helper to format ISO date strings into a human-readable form
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "N/A";
    // Map feature flags to a display-friendly list
    const featureFlags = [
        { label: "Advanced Security", value: input.advanced_security },
        { label: "Dependency Graph", value: input.dependency_graph },
        { label: "Auto-dependency Submit", value: input.dependency_graph_autosubmit_action },
        { label: "Dependabot Alerts", value: input.dependabot_alerts },
        { label: "Dependabot Updates", value: input.dependabot_security_updates },
        { label: "Code Scanning Setup", value: input.code_scanning_default_setup },
        { label: "Delegated Alert Dismissal", value: input.code_scanning_delegated_alert_dismissal },
        { label: "Secret Scanning", value: input.secret_scanning },
        { label: "Push Protection", value: input.secret_scanning_push_protection },
        { label: "Delegated Bypass", value: input.secret_scanning_delegated_bypass },
        { label: "Validity Checks", value: input.secret_scanning_validity_checks },
        { label: "Non‑Provider Patterns", value: input.secret_scanning_non_provider_patterns },
        { label: "Generic Secrets", value: input.secret_scanning_generic_secrets },
        { label: "Delegated Alert Dismissal (Secret)", value: input.secret_scanning_delegated_alert_dismissal },
        { label: "Private Vulnerability Reporting", value: input.private_vulnerability_reporting },
    ];
    // Build DataListItem for each flag (skip undefined or "not_set")
    const flagItems = featureFlags
        .filter(f => f.value !== undefined && f.value !== "not_set")
        .map(f => ({
        type: "DataListItem",
        // Using a simple text label
        label: {
            type: "Text",
            content: f.label,
            variant: "body2",
        },
        // Chip indicating enabled/disabled status
        value: {
            type: "Chip",
            label: f.value === "enabled" ? "Enabled" : f.value === "disabled" ? "Disabled" : f.value,
            variant: "filled",
            size: "small",
            // Color green for enabled, red for disabled, gray otherwise
            color: f.value === "enabled" ? "green"
                : f.value === "disabled" ? "red"
                    : "gray",
        },
    }));
    // Core information items (always displayed, even if undefined)
    const infoItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Target Type", variant: "body2" },
            value: {
                type: "Text",
                content: (_a = input.target_type) !== null && _a !== void 0 ? _a : "N/A",
                variant: "body2",
                color: "primary",
            },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Enforcement", variant: "body2" },
            value: {
                type: "Chip",
                label: input.enforcement === "enforced" ? "Enforced"
                    : input.enforcement === "unenforced" ? "Unenforced"
                        : "N/A",
                variant: "filled",
                size: "small",
                color: input.enforcement === "enforced" ? "green" : "red",
            },
        },
    ];
    // Optional link to the configuration
    const linkItem = input.html_url || input.url
        ? {
            type: "DataListItem",
            label: { type: "Text", content: "Configuration Link", variant: "body2" },
            value: {
                type: "Button",
                label: "View",
                variant: "outlined",
                size: "small",
                color: "primary",
                href: (_b = input.html_url) !== null && _b !== void 0 ? _b : input.url,
            },
        }
        : null;
    // Assemble all DataList items
    const dataListChildren = [
        ...infoItems,
        ...flagItems,
        ...(linkItem ? [linkItem] : []),
    ];
    // Build the full vertical card
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with an icon indicating enforcement status
            {
                type: "CardHeader",
                title: (_c = input.name) !== null && _c !== void 0 ? _c : "Unnamed Configuration",
                description: input.description,
                startElement: {
                    type: "Icon",
                    id: "shield-alt", // using a shield icon for security config
                    color: input.enforcement === "enforced" ? "green" : "red",
                    size: 24,
                },
            },
            // Content: a DataList of feature toggles and info
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListChildren,
                },
            },
            // Footer with timestamps
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Text",
                        content: `Created: ${formatDate(input.created_at)}`,
                        variant: "caption",
                        color: "gray",
                    },
                    {
                        type: "Text",
                        content: `Updated: ${formatDate(input.updated_at)}`,
                        variant: "caption",
                        color: "gray",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=429.js.map