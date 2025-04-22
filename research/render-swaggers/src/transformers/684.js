export function transform($input) {
    return visualizeData($input);
}
// Transforms a code security configuration for a repository into an AutoView UI description.
function visualizeData(input) {
    var _a, _b, _c, _d;
    const config = input.configuration;
    // Fallback when there's no configuration object.
    if (!config) {
        return {
            type: "Text",
            content: "No configuration data available.",
        };
    }
    // Map repository-level status to a chip color.
    const statusColorMap = {
        attached: "primary",
        attaching: "info",
        detached: "warning",
        removed: "error",
        enforced: "success",
        failed: "error",
        updating: "info",
        removed_by_enterprise: "error",
    };
    const repoStatus = (_a = input.status) !== null && _a !== void 0 ? _a : "unknown";
    const statusChipColor = (_b = statusColorMap[repoStatus]) !== null && _b !== void 0 ? _b : "gray";
    // List of feature flags and how to label them in the UI.
    const featureDefs = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Dependency Graph Auto-submit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Dependabot Security Updates"],
        ["code_scanning_default_setup", "Code Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Scanning Delegated Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Secret Scanning Push Protection"],
        ["secret_scanning_delegated_bypass", "Secret Scanning Delegated Bypass"],
        ["secret_scanning_validity_checks", "Secret Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Non-Provider Patterns"],
        ["secret_scanning_generic_secrets", "Copilot Secret Scanning"],
        ["secret_scanning_delegated_alert_dismissal", "Secret Alert Dismissal"],
        ["private_vulnerability_reporting", "Private Vulnerability Reporting"],
    ];
    // Produce a chip for each feature, coloring it green if it's "enabled".
    const featureChips = featureDefs.map(([key, label]) => {
        const raw = config[key];
        // We treat only the string "enabled" as positive.
        const enabled = raw === "enabled";
        const displayValue = raw == null ? "not set" : String(raw);
        return {
            type: "Chip",
            label: `${label}: ${displayValue}`,
            color: enabled ? "success" : "gray",
            variant: enabled ? "filled" : "outlined",
        };
    });
    // Human-readable created/updated timestamps
    const createdLabel = config.created_at
        ? new Date(config.created_at).toLocaleString()
        : "N/A";
    const updatedLabel = config.updated_at
        ? new Date(config.updated_at).toLocaleString()
        : "N/A";
    // Compose the VerticalCard containing a header (name + scope + status),
    // a chip group for features, and footer with timestamps.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with the configuration name and its scope.
                type: "CardHeader",
                title: (_c = config.name) !== null && _c !== void 0 ? _c : "Unnamed Configuration",
                description: `Scope: ${(_d = config.target_type) !== null && _d !== void 0 ? _d : "not set"}`,
                startElement: {
                    // Visual cue icon (shield) for security config.
                    type: "Icon",
                    id: "shield-alt",
                    color: "indigo",
                    size: 32,
                },
                endElement: {
                    // Status of the repository attachment.
                    type: "Chip",
                    label: repoStatus,
                    color: statusChipColor,
                    variant: "filled",
                },
            },
            {
                // Body content showing all feature flags as chips.
                type: "CardContent",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: featureChips,
                    maxItems: 6, // Show first 6, group the rest.
                },
            },
            {
                // Footer with created and updated timestamps rendered in markdown for emphasis.
                type: "CardFooter",
                childrenProps: {
                    type: "Markdown",
                    content: `**Created:** ${createdLabel}\n\n` +
                        `**Updated:** ${updatedLabel}`,
                },
            },
        ],
    };
}
//# sourceMappingURL=684.js.map