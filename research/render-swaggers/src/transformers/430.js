export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // If there is no configuration, show a friendly markdown message
    if (!input.configuration) {
        return {
            type: "Markdown",
            content: "### No code security configuration data available.",
        };
    }
    const cfg = input.configuration;
    // Helper to create a status chip based on enabled/disabled/not_set
    function createStatusChip(status) {
        const isEnabled = status === "enabled" || status === "enforced";
        const isUnset = status === "not_set" || status === undefined;
        return {
            type: "Chip",
            label: status !== null && status !== void 0 ? status : "N/A",
            variant: isEnabled ? "filled" : "outlined",
            color: isEnabled
                ? "green"
                : isUnset
                    ? "gray"
                    : "secondary", // disabled or other
            size: "small",
        };
    }
    // Build a list of data list items for each relevant property
    const items = [];
    // Show the default_for_new_repos setting
    items.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Default for New Repositories",
            variant: "body1",
        },
        value: {
            type: "Text",
            content: (_a = input.default_for_new_repos) !== null && _a !== void 0 ? _a : "N/A",
            variant: "body1",
        },
    });
    // Map of config fields to their display labels
    const featureMap = [
        { key: "advanced_security", label: "Advanced Security" },
        { key: "dependency_graph", label: "Dependency Graph" },
        {
            key: "dependency_graph_autosubmit_action",
            label: "Dependency Graph Auto-Submit",
        },
        { key: "dependabot_alerts", label: "Dependabot Alerts" },
        {
            key: "dependabot_security_updates",
            label: "Dependabot Security Updates",
        },
        {
            key: "code_scanning_default_setup",
            label: "Code Scanning Default Setup",
        },
        {
            key: "code_scanning_delegated_alert_dismissal",
            label: "Code Scanning Delegated Alert Dismissal",
        },
        { key: "secret_scanning", label: "Secret Scanning" },
        {
            key: "secret_scanning_push_protection",
            label: "Secret Scanning Push Protection",
        },
        {
            key: "secret_scanning_delegated_bypass",
            label: "Secret Scanning Delegated Bypass",
        },
        {
            key: "secret_scanning_validity_checks",
            label: "Secret Scanning Validity Checks",
        },
        {
            key: "secret_scanning_non_provider_patterns",
            label: "Secret Scanning Non-Provider Patterns",
        },
        {
            key: "secret_scanning_generic_secrets",
            label: "Copilot Secret Scanning",
        },
        {
            key: "secret_scanning_delegated_alert_dismissal",
            label: "Secret Scanning Delegated Alert Dismissal",
        },
        {
            key: "private_vulnerability_reporting",
            label: "Private Vulnerability Reporting",
        },
        { key: "enforcement", label: "Enforcement Status" },
    ];
    // Add each feature as a DataListItem
    featureMap.forEach(({ key, label }) => {
        // Only include if the property exists
        const value = cfg[key];
        if (value !== undefined) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: label, variant: "body1" },
                value: createStatusChip(value),
            });
        }
    });
    // Handle nested options: dependency_graph_autosubmit_action_options
    if (cfg.dependency_graph_autosubmit_action_options &&
        typeof cfg.dependency_graph_autosubmit_action_options.labeled_runners ===
            "boolean") {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Auto-Submit Uses Labeled Runners",
                variant: "body1",
            },
            value: {
                type: "Chip",
                label: cfg.dependency_graph_autosubmit_action_options.labeled_runners
                    ? "Yes"
                    : "No",
                variant: "filled",
                color: cfg.dependency_graph_autosubmit_action_options.labeled_runners
                    ? "green"
                    : "gray",
                size: "small",
            },
        });
    }
    // Handle nested options: code_scanning_default_setup_options
    if (cfg.code_scanning_default_setup_options) {
        const opt = cfg.code_scanning_default_setup_options;
        if (opt.runner_type !== null && opt.runner_type !== undefined) {
            items.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Scanning Runner Type",
                    variant: "body1",
                },
                value: {
                    type: "Text",
                    content: opt.runner_type || "not_set",
                    variant: "body1",
                },
            });
        }
        if (opt.runner_label) {
            items.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Scanning Runner Label",
                    variant: "body1",
                },
                value: {
                    type: "Text",
                    content: opt.runner_label,
                    variant: "body1",
                },
            });
        }
    }
    // Handle secret_scanning_delegated_bypass_options reviewers
    if (cfg.secret_scanning_delegated_bypass_options &&
        Array.isArray(cfg.secret_scanning_delegated_bypass_options.reviewers)) {
        const reviewers = cfg.secret_scanning_delegated_bypass_options.reviewers.map((r) => `${r.reviewer_type}:${r.reviewer_id}`);
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Bypass Reviewers",
                variant: "body1",
            },
            value: {
                type: "Text",
                content: reviewers,
                variant: "body1",
            },
        });
    }
    // Compose the final VerticalCard with a header and the data list
    const header = {
        type: "CardHeader",
        title: (_b = cfg.name) !== null && _b !== void 0 ? _b : "Unnamed Configuration",
        description: cfg.description,
        startElement: {
            type: "Icon",
            id: "shield-alt",
            color: "blue",
            size: 24,
        },
    };
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "DataList",
                childrenProps: items,
            },
        ],
    };
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=430.js.map