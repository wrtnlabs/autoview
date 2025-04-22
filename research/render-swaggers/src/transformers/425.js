export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no configuration, show a simple message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No code security configurations found.",
            variant: "body1",
        };
    }
    // Helper to map a status string to an appropriate chip color
    const statusColor = (status) => {
        switch (status) {
            case "enabled":
            case "enforced":
                return "green";
            case "disabled":
            case "not_set":
                return "gray";
            default:
                return "gray";
        }
    };
    // Map of configuration properties to human‑friendly labels
    const featureMap = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Autosubmit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Dependabot Security Updates"],
        ["code_scanning_default_setup", "Code Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Scanning Alert Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Push Protection"],
        ["secret_scanning_delegated_bypass", "Delegated Bypass"],
        ["secret_scanning_validity_checks", "Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Non‑provider Patterns"],
        ["secret_scanning_generic_secrets", "Generic Secrets"],
        ["secret_scanning_delegated_alert_dismissal", "Secret Alert Dismissal"],
        ["private_vulnerability_reporting", "Private Vulnerability Reporting"],
        ["enforcement", "Enforcement"],
    ];
    // Build a VerticalCard for each configuration
    const cards = input.map((item) => {
        var _a, _b, _c;
        // Collect status chips for each feature if present
        const chips = featureMap.reduce((acc, [key, label]) => {
            const value = item[key];
            if (value != null) {
                acc.push({
                    type: "Chip",
                    label: `${label}: ${value}`,
                    color: statusColor(value),
                    size: "small",
                    variant: "outlined",
                });
            }
            return acc;
        }, []);
        // Sort chips alphabetically by label for consistency
        chips.sort((a, b) => a.label.localeCompare(b.label));
        return {
            type: "VerticalCard",
            childrenProps: [
                // Header with name and scope
                {
                    type: "CardHeader",
                    title: (_a = item.name) !== null && _a !== void 0 ? _a : "Unnamed Configuration",
                    description: item.target_type
                        ? `Scope: ${item.target_type}`
                        : undefined,
                    startElement: {
                        type: "Icon",
                        id: "cogs",
                        size: 24,
                        color: "blue",
                    },
                },
                // Content: a responsive group of chips indicating each feature's status
                {
                    type: "CardContent",
                    childrenProps: {
                        type: "ChipGroup",
                        childrenProps: chips,
                        maxItems: 8, // limit per row on narrow screens
                    },
                },
                // Footer: creation and update timestamps rendered in markdown for readability
                {
                    type: "CardFooter",
                    childrenProps: {
                        type: "Markdown",
                        content: `**Created:** ${(_b = item.created_at) !== null && _b !== void 0 ? _b : "N/A"}  \n` +
                            `**Updated:** ${(_c = item.updated_at) !== null && _c !== void 0 ? _c : "N/A"}`,
                    },
                },
            ],
        };
    });
    // Wrap all cards in a carousel for a compact, swipeable UI
    return {
        type: "Carousel",
        childrenProps: cards,
        navControls: true,
        indicators: true,
        gutter: 16,
        infinite: false,
    };
}
//# sourceMappingURL=425.js.map