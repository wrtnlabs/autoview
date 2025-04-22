export function transform($input) {
    return visualizeData($input);
}
// Transforms a code security configuration into a visual AutoView card.
function visualizeData(input) {
    var _a;
    // Helper to create Chips for tri-state statuses.
    const createStatusChip = (status) => {
        const s = status !== null && status !== void 0 ? status : "not_set";
        let color = "gray";
        let variant = "filled";
        if (s === "enabled") {
            color = "green";
        }
        else if (s === "disabled") {
            color = "red";
        }
        else {
            variant = "outlined";
        }
        return {
            type: "Chip",
            label: s.replace(/_/g, " "),
            color,
            variant,
        };
    };
    // Helper to create a yes/no chip.
    const createBooleanChip = (flag) => ({
        type: "Chip",
        label: flag ? "Yes" : "No",
        color: flag ? "green" : "red",
        variant: "filled",
    });
    // Format an ISO date to local string, fall back to raw or "N/A".
    const formatDate = (iso) => {
        if (!iso)
            return "N/A";
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };
    // Map the configuration scope to a representative icon.
    const getTargetIcon = (t) => {
        switch (t) {
            case "global":
                return "globe";
            case "organization":
                return "building";
            case "enterprise":
                return "briefcase";
            default:
                return "cog";
        }
    };
    // Aggregate each feature into a DataListItem.
    const items = [];
    // Core on/off/not_set features.
    const features = [
        ["Advanced Security", input.advanced_security],
        ["Dependency Graph", input.dependency_graph],
        ["Dependabot Alerts", input.dependabot_alerts],
        ["Dependabot Security Updates", input.dependabot_security_updates],
        ["Code Scanning Default Setup", input.code_scanning_default_setup],
        ["Code Scanning Delegated Alert Dismissal", input.code_scanning_delegated_alert_dismissal],
        ["Secret Scanning", input.secret_scanning],
        ["Secret Scanning Push Protection", input.secret_scanning_push_protection],
        ["Secret Scanning Delegated Bypass", input.secret_scanning_delegated_bypass],
        ["Secret Scanning Validity Checks", input.secret_scanning_validity_checks],
        ["Secret Scanning Non-Provider Patterns", input.secret_scanning_non_provider_patterns],
        ["Copilot Secret Scanning", input.secret_scanning_generic_secrets],
        ["Secret Scanning Delegated Alert Dismissal", input.secret_scanning_delegated_alert_dismissal],
        ["Private Vulnerability Reporting", input.private_vulnerability_reporting],
        ["Enforcement", input.enforcement],
    ];
    for (const [label, status] of features) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: label },
            value: createStatusChip(status),
        });
    }
    // Detail: dependency-graph auto-submit sub-option.
    if (input.dependency_graph_autosubmit_action !== undefined) {
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Auto-Submit Action" },
            value: createStatusChip(input.dependency_graph_autosubmit_action),
        });
        const opt = input.dependency_graph_autosubmit_action_options;
        if ((opt === null || opt === void 0 ? void 0 : opt.labeled_runners) !== undefined) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Use Labeled Runners" },
                value: createBooleanChip(opt.labeled_runners),
            });
        }
    }
    // Detail: code-scanning default setup runner options.
    const csOpt = input.code_scanning_default_setup_options;
    if (csOpt) {
        if (csOpt.runner_type) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Runner Type" },
                value: {
                    type: "Chip",
                    label: csOpt.runner_type,
                    color: "blue",
                    variant: "filled",
                },
            });
        }
        if (csOpt.runner_label) {
            items.push({
                type: "DataListItem",
                label: { type: "Text", content: "Runner Label" },
                value: { type: "Text", content: csOpt.runner_label },
            });
        }
    }
    // Detail: list out delegated bypass reviewers as markdown.
    const reviewers = (_a = input.secret_scanning_delegated_bypass_options) === null || _a === void 0 ? void 0 : _a.reviewers;
    if (reviewers === null || reviewers === void 0 ? void 0 : reviewers.length) {
        const mdList = reviewers
            .map((r) => `* **${r.reviewer_type}**: ${r.reviewer_id}`)
            .join("\n");
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bypass Reviewers" },
            value: { type: "Markdown", content: mdList },
        });
    }
    // Timestamps.
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Created At" },
        value: { type: "Text", content: formatDate(input.created_at) },
    });
    items.push({
        type: "DataListItem",
        label: { type: "Text", content: "Updated At" },
        value: { type: "Text", content: formatDate(input.updated_at) },
    });
    // Return a vertical card with header, content, and footer actions.
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: input.description,
                startElement: {
                    type: "Icon",
                    id: getTargetIcon(input.target_type),
                    size: 32,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items,
                },
            },
            {
                type: "CardFooter",
                childrenProps: [
                    {
                        type: "Button",
                        label: "API Config",
                        href: input.url,
                        variant: "outlined",
                        size: "small",
                    },
                    {
                        type: "Button",
                        label: "View UI",
                        href: input.html_url,
                        variant: "contained",
                        size: "small",
                    },
                ],
            },
        ],
    };
}
//# sourceMappingURL=428.js.map