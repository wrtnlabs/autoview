export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No security configurations found.**\n\nPlease check back later or add a new configuration.",
        };
    }
    // Helper to map enablement statuses to chip colors
    const statusToColor = (status) => {
        switch (status) {
            case "enabled":
                return "green";
            case "disabled":
                return "red";
            case "not_set":
                return "gray";
            default:
                return "gray";
        }
    };
    // List of togglable boolean-like features with human-friendly labels
    const featureMap = [
        { key: "advanced_security", label: "Advanced Security" },
        { key: "dependency_graph", label: "Dependency Graph" },
        { key: "dependency_graph_autosubmit_action", label: "Auto dependency submission" },
        { key: "dependabot_alerts", label: "Dependabot Alerts" },
        { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
        { key: "code_scanning_default_setup", label: "Code Scanning Setup" },
        { key: "code_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
        { key: "secret_scanning", label: "Secret Scanning" },
        { key: "secret_scanning_push_protection", label: "Push Protection" },
        { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass" },
        { key: "secret_scanning_validity_checks", label: "Validity Checks" },
        { key: "secret_scanning_non_provider_patterns", label: "Non‐Provider Patterns" },
        { key: "secret_scanning_generic_secrets", label: "Generic Secrets" },
        { key: "secret_scanning_delegated_alert_dismissal", label: "Secret Alert Dismissal" },
        { key: "private_vulnerability_reporting", label: "Private Vulnerability Reporting" },
    ];
    // Build a carousel of vertical cards, one per configuration
    const cards = input.map((cfg) => {
        var _a, _b, _c, _d, _e;
        // Build an array of chips for each feature that exists on this config
        const chips = featureMap
            .filter(({ key }) => cfg[key] !== undefined)
            .map(({ key, label }) => ({
            type: "Chip",
            label: `${label}: ${cfg[key]}`,
            color: statusToColor(cfg[key]),
            size: "small",
            variant: "filled",
        }));
        // Card header: name and a summary line with target and enforcement
        const header = {
            type: "CardHeader",
            title: (_a = cfg.name) !== null && _a !== void 0 ? _a : "Unnamed Configuration",
            description: `Scope: ${(_b = cfg.target_type) !== null && _b !== void 0 ? _b : "N/A"}  •  Enforcement: ${(_c = cfg.enforcement) !== null && _c !== void 0 ? _c : "N/A"}`,
            startElement: {
                type: "Icon",
                id: "shield-alt", // Using FontAwesome shield icon
                color: "blue",
                size: 24,
            },
        };
        // Card content: grouping all feature chips
        const content = {
            type: "CardContent",
            childrenProps: {
                type: "ChipGroup",
                childrenProps: chips,
            },
        };
        // Card footer: show created and updated times in a data list
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "DataList",
                childrenProps: [
                    {
                        type: "DataListItem",
                        label: { type: "Text", content: "Created At", variant: "body2" },
                        value: { type: "Text", content: (_d = cfg.created_at) !== null && _d !== void 0 ? _d : "-", variant: "body2" },
                    },
                    {
                        type: "DataListItem",
                        label: { type: "Text", content: "Updated At", variant: "body2" },
                        value: { type: "Text", content: (_e = cfg.updated_at) !== null && _e !== void 0 ? _e : "-", variant: "body2" },
                    },
                ],
            },
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer],
        };
    });
    // Wrap the cards in a carousel for swipeable navigation on mobile
    return {
        type: "Carousel",
        autoPlay: false,
        infinite: false,
        navControls: true,
        indicators: true,
        gutter: 16,
        childrenProps: cards,
    };
}
//# sourceMappingURL=331.js.map