export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no configuration to show, display a friendly message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Text",
            content: "No code security configurations available.",
            variant: "body1",
        };
    }
    // Helper to map status strings to chip colors
    const getStatusColor = (status) => {
        switch (status) {
            case "enabled":
                return "green";
            case "disabled":
                return "red";
            default:
                return "gray";
        }
    };
    // Define which fields we want to visualize and their labels
    const featureFields = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Autosubmit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Security Updates"],
        ["code_scanning_default_setup", "Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Alert Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Push Protection"],
        ["secret_scanning_delegated_bypass", "Bypass"],
        ["secret_scanning_validity_checks", "Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Non-Provider Patterns"],
        ["secret_scanning_generic_secrets", "Generic Secrets"],
        ["private_vulnerability_reporting", "Vuln Reporting"],
    ];
    // Build a DataListItem for each entry in the input
    const items = input.map((entry, idx) => {
        var _a, _b;
        const cfg = entry.configuration;
        // 1) Header text: show configuration name & ID
        const header = {
            type: "Text",
            variant: "subtitle1",
            content: `${(_a = cfg === null || cfg === void 0 ? void 0 : cfg.name) !== null && _a !== void 0 ? _a : "Unnamed"} (ID: ${(_b = cfg === null || cfg === void 0 ? void 0 : cfg.id) !== null && _b !== void 0 ? _b : "–"})`,
        };
        // 2) If default_for_new_repos is set, show it as markdown
        const extras = [];
        if (entry.default_for_new_repos !== undefined) {
            extras.push({
                type: "Markdown",
                content: `**Default for new repos**: \`${JSON.stringify(entry.default_for_new_repos)}\``,
            });
        }
        // 3) Build chips for each feature flag/status
        const chips = [];
        featureFields.forEach(([field, label]) => {
            const status = cfg === null || cfg === void 0 ? void 0 : cfg[field];
            if (status !== undefined && status !== null) {
                chips.push({
                    type: "Chip",
                    label: `${label}: ${status}`,
                    color: getStatusColor(status),
                    variant: "outlined",
                    size: "small",
                });
            }
        });
        // 4) Group the chips for a compact visual layout
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        // 5) Assemble the "value" side: extras (markdown) + chip group
        const valueChildren = [
            ...extras,
            chipGroup,
        ];
        return {
            type: "DataListItem",
            label: [header],
            value: valueChildren,
        };
    });
    // Wrap everything in a DataList for a clean, responsive listing
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=333.js.map