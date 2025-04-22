export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    const config = input.configuration;
    // If there is no configuration, display a simple message
    if (!config) {
        return {
            type: "Text",
            content: "No configuration data available.",
            variant: "body1",
        };
    }
    // Helpers to map status strings to chip colors
    const statusColor = (status) => {
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
    const enforcementColor = (status) => {
        switch (status) {
            case "enforced":
                return "green";
            case "unenforced":
                return "orange";
            default:
                return "gray";
        }
    };
    const defaultForReposColor = (def) => {
        switch (def) {
            case "all":
                return "success";
            case "none":
                return "gray";
            case "private_and_internal":
                return "info";
            case "public":
                return "blue";
            default:
                return "gray";
        }
    };
    // Build a list of DataListItemProps representing each setting
    const items = [];
    // 1) default_for_new_repos
    items.push({
        type: "DataListItem",
        label: {
            type: "Text",
            content: "Default for New Repos",
            variant: "body2",
        },
        value: {
            type: "Chip",
            label: (_a = input.default_for_new_repos) !== null && _a !== void 0 ? _a : "not specified",
            color: defaultForReposColor(input.default_for_new_repos),
            variant: "filled",
        },
    });
    // 2) core boolean/enabled‑disabled statuses
    const booleanFields = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Dependency Graph Autosubmit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Dependabot Security Updates"],
        ["code_scanning_default_setup", "Code Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Delegated Alert Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Push Protection"],
        ["secret_scanning_delegated_bypass", "Delegated Bypass"],
        ["secret_scanning_validity_checks", "Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Non‐Provider Patterns"],
        ["secret_scanning_generic_secrets", "Copilot Scanning"],
        ["secret_scanning_delegated_alert_dismissal", "Secret Delegated Dismissal"],
        ["private_vulnerability_reporting", "Private Vulnerability Reporting"],
    ];
    booleanFields.forEach(([key, label]) => {
        const value = config[key];
        if (value !== undefined) {
            items.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: label,
                    variant: "body2",
                },
                value: {
                    type: "Chip",
                    label: value,
                    color: statusColor(value),
                    variant: "filled",
                },
            });
        }
    });
    // 3) enforcement status
    if (config.enforcement !== undefined) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Enforcement",
                variant: "body2",
            },
            value: {
                type: "Chip",
                label: config.enforcement,
                color: enforcementColor(config.enforcement),
                variant: "filled",
            },
        });
    }
    // 4) dependency_graph_autosubmit_action_options
    const depOpt = config.dependency_graph_autosubmit_action_options;
    if (depOpt && depOpt.labeled_runners !== undefined) {
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Use Labeled Runners (Autosubmit)",
                variant: "body2",
            },
            value: {
                type: "Icon",
                id: depOpt.labeled_runners ? "check" : "times",
                color: depOpt.labeled_runners ? "green" : "red",
                size: 16,
            },
        });
    }
    // 5) code_scanning_default_setup_options
    const scanOpt = config.code_scanning_default_setup_options;
    if (scanOpt) {
        if (scanOpt.runner_type !== undefined && scanOpt.runner_type !== null) {
            items.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Scanning Runner Type",
                    variant: "body2",
                },
                value: {
                    type: "Chip",
                    label: scanOpt.runner_type,
                    color: statusColor(scanOpt.runner_type),
                    variant: "filled",
                },
            });
        }
        if (scanOpt.runner_label) {
            items.push({
                type: "DataListItem",
                label: {
                    type: "Text",
                    content: "Runner Label",
                    variant: "body2",
                },
                value: {
                    type: "Text",
                    content: scanOpt.runner_label,
                    variant: "body2",
                },
            });
        }
    }
    // 6) secret_scanning_delegated_bypass_options.reviewers
    const bypassOpt = config.secret_scanning_delegated_bypass_options;
    if (bypassOpt && Array.isArray(bypassOpt.reviewers) && bypassOpt.reviewers.length > 0) {
        const chipList = bypassOpt.reviewers.map((r) => ({
            type: "Chip",
            label: `${r.reviewer_type} #${r.reviewer_id}`,
            color: "primary",
            variant: "outlined",
            size: "small",
        }));
        items.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Bypass Reviewers",
                variant: "body2",
            },
            value: {
                type: "ChipGroup",
                childrenProps: chipList,
            },
        });
    }
    // Finally assemble into a responsive VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: (_b = config.name) !== null && _b !== void 0 ? _b : "Code Security Configuration",
                description: config.description,
                startElement: {
                    type: "Icon",
                    id: "shield-alt",
                    color: "blue",
                    size: 24,
                },
            },
            {
                type: "CardContent",
                childrenProps: [
                    {
                        type: "DataList",
                        childrenProps: items,
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=336.js.map