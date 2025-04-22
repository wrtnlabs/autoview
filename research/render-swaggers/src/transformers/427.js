export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Map of feature status to chip color
    const statusColorMap = {
        enabled: "green",
        disabled: "red",
        not_set: "gray",
    };
    // List of boolean/string statuses to show as chips, with friendly labels
    const statusFields = [
        { key: "advanced_security", label: "Advanced Security" },
        { key: "dependency_graph", label: "Dependency Graph" },
        { key: "dependency_graph_autosubmit_action", label: "Auto Dependency Submit" },
        { key: "dependabot_alerts", label: "Dependabot Alerts" },
        { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
        { key: "code_scanning_default_setup", label: "Code Scanning Setup" },
        { key: "code_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
        { key: "secret_scanning", label: "Secret Scanning" },
        { key: "secret_scanning_push_protection", label: "Push Protection" },
        { key: "secret_scanning_delegated_bypass", label: "Delegated Bypass" },
        { key: "secret_scanning_validity_checks", label: "Validity Checks" },
        { key: "secret_scanning_non_provider_patterns", label: "Non‑Provider Patterns" },
        { key: "secret_scanning_generic_secrets", label: "Copilot Secret Scanning" },
        { key: "secret_scanning_delegated_alert_dismissal", label: "Delegated Alert Dismissal" },
        { key: "private_vulnerability_reporting", label: "Vulnerability Reporting" },
    ];
    // Transform each configuration entry into a DataListItem
    const items = input.map((entry) => {
        var _a;
        const cfg = entry.configuration;
        // Build an array of chips representing each feature status
        const chips = [];
        if (cfg) {
            // Show the target type as a highlighted chip
            if (cfg.target_type) {
                chips.push({
                    type: "Chip",
                    label: `Type: ${cfg.target_type}`,
                    color: "blue",
                    variant: "filled",
                });
            }
            statusFields.forEach(({ key, label }) => {
                var _a;
                const val = cfg[key];
                if (val != null) {
                    const color = (_a = statusColorMap[val]) !== null && _a !== void 0 ? _a : "gray";
                    chips.push({
                        type: "Chip",
                        label: `${label}: ${val}`,
                        color,
                        variant: "outlined",
                    });
                }
            });
        }
        // Build markdown sections for defaults and timestamps
        const mdLines = [];
        if (cfg === null || cfg === void 0 ? void 0 : cfg.description) {
            // Show description in bold header
            mdLines.push(`**${cfg.description}**`);
        }
        if (entry.default_for_new_repos != null) {
            mdLines.push(`- **Default for New Repos:** \`${JSON.stringify(entry.default_for_new_repos)}\``);
        }
        if (cfg === null || cfg === void 0 ? void 0 : cfg.created_at) {
            mdLines.push(`- **Created At:** ${cfg.created_at}`);
        }
        if (cfg === null || cfg === void 0 ? void 0 : cfg.updated_at) {
            mdLines.push(`- **Updated At:** ${cfg.updated_at}`);
        }
        return {
            type: "DataListItem",
            // Use a headline text for the name
            label: {
                type: "Text",
                content: (_a = cfg === null || cfg === void 0 ? void 0 : cfg.name) !== null && _a !== void 0 ? _a : "Unnamed Configuration",
                variant: "h6",
            },
            // Combine a chip group for statuses and markdown for details
            value: [
                {
                    type: "ChipGroup",
                    childrenProps: chips,
                },
                {
                    type: "Markdown",
                    content: mdLines.join("\n"),
                },
            ],
        };
    });
    // Return a DataList wrapping all items
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=427.js.map