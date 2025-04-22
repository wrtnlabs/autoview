export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Card header with title, description, and a security icon
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : `Configuration #${(_b = input.id) !== null && _b !== void 0 ? _b : "?"}`,
        description: input.description,
        startElement: {
            type: "Icon",
            id: "shield-alt", // security icon
            color: "blue",
            size: 40,
        },
    };
    // Build a simple data list for core metadata: ID, target type, enforcement
    const dataItems = [];
    if (input.id != null) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "ID",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: String(input.id),
                variant: "body2",
            },
        });
    }
    if (input.target_type) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Scope",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.target_type,
                variant: "body2",
            },
        });
    }
    if (input.enforcement) {
        dataItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: "Enforcement",
                variant: "subtitle2",
            },
            value: {
                type: "Text",
                content: input.enforcement,
                variant: "body2",
            },
        });
    }
    const dataList = {
        type: "DataList",
        childrenProps: dataItems,
    };
    // Map feature flags to colored chips
    const featureFields = [
        { key: "advanced_security", label: "Advanced Security" },
        { key: "dependency_graph", label: "Dependency Graph" },
        { key: "dependency_graph_autosubmit_action", label: "Dependency Graph Autosubmit" },
        { key: "dependabot_alerts", label: "Dependabot Alerts" },
        { key: "dependabot_security_updates", label: "Dependabot Security Updates" },
        { key: "code_scanning_default_setup", label: "Code Scanning Default Setup" },
        { key: "code_scanning_delegated_alert_dismissal", label: "Code Scanning Delegated Alert Dismissal" },
        { key: "secret_scanning", label: "Secret Scanning" },
        { key: "secret_scanning_push_protection", label: "Secret Scanning Push Protection" },
        { key: "secret_scanning_delegated_bypass", label: "Secret Scanning Delegated Bypass" },
        { key: "secret_scanning_validity_checks", label: "Secret Scanning Validity Checks" },
        { key: "secret_scanning_non_provider_patterns", label: "Secret Scanning Non-Provider Patterns" },
        { key: "secret_scanning_generic_secrets", label: "Copilot Secret Scanning" },
        { key: "secret_scanning_delegated_alert_dismissal", label: "Secret Scanning Delegated Alert Dismissal" },
        { key: "private_vulnerability_reporting", label: "Private Vulnerability Reporting" },
    ];
    const chips = featureFields
        .map(field => {
        const val = input[field.key];
        if (val == null)
            return null;
        // decide color by status
        let color = "gray";
        switch (val) {
            case "enabled":
            case "enforced":
                color = "success";
                break;
            case "disabled":
            case "unenforced":
                color = "error";
                break;
            case "not_set":
            default:
                color = "warning";
        }
        return {
            type: "Chip",
            label: `${field.label}: ${val}`,
            color,
            variant: "filled",
        };
    })
        .filter((c) => c !== null);
    const chipGroup = {
        type: "ChipGroup",
        childrenProps: chips,
    };
    // Footer with links to API and UI if present
    const footerButtons = [];
    if (input.url) {
        footerButtons.push({
            type: "Button",
            label: "API",
            href: input.url,
            variant: "text",
            color: "primary",
            startElement: {
                type: "Icon",
                id: "link",
                size: 12,
            },
        });
    }
    if (input.html_url) {
        footerButtons.push({
            type: "Button",
            label: "Open",
            href: input.html_url,
            variant: "text",
            color: "secondary",
            startElement: {
                type: "Icon",
                id: "external-link-alt",
                size: 12,
            },
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerButtons,
    };
    // Assemble a vertical card with header, content, and footer
    return {
        type: "VerticalCard",
        childrenProps: [
            header,
            {
                type: "CardContent",
                childrenProps: [dataList, chipGroup],
            },
            footer,
        ],
    };
}
//# sourceMappingURL=335.js.map