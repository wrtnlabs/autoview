export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Helper to safely format dates or return placeholder
    const formatDate = (iso) => iso ? new Date(iso).toLocaleString() : "-";
    // Mapping from boolean-like field values to chip colors
    const statusColor = (status) => {
        switch (status) {
            case "enabled":
                return "green";
            case "disabled":
                return "red";
            default:
                return "gray";
        }
    };
    // Define which feature flags to render as chips, and their labels
    const featureFields = [
        ["advanced_security", "Advanced Security"],
        ["dependency_graph", "Dependency Graph"],
        ["dependency_graph_autosubmit_action", "Dependency Autosubmit"],
        ["dependabot_alerts", "Dependabot Alerts"],
        ["dependabot_security_updates", "Dependabot Security Updates"],
        ["code_scanning_default_setup", "Code Scanning Setup"],
        ["code_scanning_delegated_alert_dismissal", "Scanning Dismissal"],
        ["secret_scanning", "Secret Scanning"],
        ["secret_scanning_push_protection", "Push Protection"],
        ["secret_scanning_delegated_bypass", "Bypass Delegation"],
        ["secret_scanning_validity_checks", "Validity Checks"],
        ["secret_scanning_non_provider_patterns", "Custom Patterns"],
        ["secret_scanning_generic_secrets", "Generic Secrets"],
        ["secret_scanning_delegated_alert_dismissal", "Secret Alert Dismissal"],
        ["private_vulnerability_reporting", "Private Vulnerabilities"],
    ];
    // Build chips for each feature flag present
    const featureChips = featureFields
        .filter(([key]) => typeof input[key] === "string")
        .map(([key, label]) => ({
        type: "Chip",
        label,
        variant: "filled",
        color: statusColor(input[key]),
        size: "small",
    }));
    // Build list of general properties
    const dataListItems = [];
    // ID
    if (input.id !== undefined) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "ID", variant: "subtitle2" },
            value: { type: "Text", content: input.id.toString(), variant: "body2" },
        });
    }
    // Target type
    if (input.target_type) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Scope", variant: "subtitle2" },
            value: { type: "Text", content: input.target_type, variant: "body2" },
        });
    }
    // URLs (link rendering via markdown)
    if (input.html_url) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Config URL", variant: "subtitle2" },
            value: {
                type: "Markdown",
                content: `[Open](${input.html_url})`,
            },
        });
    }
    // Created / Updated timestamps
    if (input.created_at) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Created", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDate(input.created_at),
                variant: "body2",
            },
        });
    }
    if (input.updated_at) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Updated", variant: "subtitle2" },
            value: {
                type: "Text",
                content: formatDate(input.updated_at),
                variant: "body2",
            },
        });
    }
    // Nested options: autosubmit runners
    if (((_a = input.dependency_graph_autosubmit_action_options) === null || _a === void 0 ? void 0 : _a.labeled_runners) !== undefined) {
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Labeled Runners", variant: "subtitle2" },
            value: {
                type: "Text",
                content: input.dependency_graph_autosubmit_action_options.labeled_runners
                    ? "Yes"
                    : "No",
                variant: "body2",
            },
        });
    }
    // Code scanning runner options
    const codeOpts = input.code_scanning_default_setup_options;
    if (codeOpts) {
        if (codeOpts.runner_type) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Runner Type", variant: "subtitle2" },
                value: { type: "Text", content: codeOpts.runner_type, variant: "body2" },
            });
        }
        if (codeOpts.runner_label) {
            dataListItems.push({
                type: "DataListItem",
                label: { type: "Text", content: "Runner Label", variant: "subtitle2" },
                value: { type: "Text", content: codeOpts.runner_label, variant: "body2" },
            });
        }
    }
    // Secret scanning bypass reviewers
    const bypassOpts = input.secret_scanning_delegated_bypass_options;
    if ((_b = bypassOpts === null || bypassOpts === void 0 ? void 0 : bypassOpts.reviewers) === null || _b === void 0 ? void 0 : _b.length) {
        const list = bypassOpts.reviewers
            .map((r) => `${r.reviewer_type}#${r.reviewer_id}`)
            .join(", ");
        dataListItems.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bypass Reviewers", variant: "subtitle2" },
            value: { type: "Text", content: list, variant: "body2" },
        });
    }
    // Assemble the UI as a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            // Header with icon, name and description
            {
                type: "CardHeader",
                title: (_c = input.name) !== null && _c !== void 0 ? _c : "Unnamed Configuration",
                description: input.description,
                startElement: {
                    type: "Icon",
                    id: "shield-alt",
                    color: "blue",
                    size: 24,
                },
            },
            // Main content: list of properties and feature chips
            {
                type: "CardContent",
                childrenProps: [
                    // Data list of key properties
                    {
                        type: "DataList",
                        childrenProps: dataListItems,
                    },
                    // Grouped chips showing each feature's status
                    {
                        type: "ChipGroup",
                        childrenProps: featureChips,
                    },
                ],
            },
            // Footer showing last update info in a footnote style
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    content: input.updated_at
                        ? `Last updated: ${formatDate(input.updated_at)}`
                        : "No update date",
                    variant: "footnote",
                },
            },
        ],
    };
}
//# sourceMappingURL=334.js.map