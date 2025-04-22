export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    /**
     * Helper to render tri-state flags (enabled/disabled/not_set) as colored icons.
     */
    function renderFlag(value) {
        if (value === "enabled") {
            return { type: "Icon", id: "check-circle", color: "green", size: 20 };
        }
        else if (value === "disabled") {
            return { type: "Icon", id: "times-circle", color: "red", size: 20 };
        }
        else {
            // not_set or undefined
            return { type: "Icon", id: "question-circle", color: "gray", size: 20 };
        }
    }
    /**
     * Helper to produce a small text chip for categorical fields
     */
    function renderChip(label, color = "gray") {
        return {
            type: "Chip",
            label,
            variant: "outlined",
            size: "small",
            color,
        };
    }
    /**
     * Helper to render a link button
     */
    function renderLinkButton(href, label = "Open") {
        return {
            type: "Button",
            variant: "text",
            size: "small",
            href,
            startElement: { type: "Icon", id: "link", size: 16, color: "blue" },
            label,
        };
    }
    /**
     * Build DataListItems from a label component and a value component
     */
    function makeItem(labelComp, valueComp) {
        return {
            type: "DataListItem",
            label: labelComp,
            value: valueComp,
        };
    }
    // CardHeader: shows name + description + type icon
    const header = {
        type: "CardHeader",
        title: (_a = input.name) !== null && _a !== void 0 ? _a : `#${input.id}`,
        description: input.description,
        startElement: {
            type: "Icon",
            // map target_type to an icon
            id: input.target_type === "global"
                ? "globe"
                : input.target_type === "organization"
                    ? "building"
                    : "shield-alt",
            color: input.target_type === "global"
                ? "teal"
                : input.target_type === "organization"
                    ? "indigo"
                    : "violet",
            size: 28,
        },
        endElement: renderChip((_b = input.target_type) !== null && _b !== void 0 ? _b : "not_set", "primary"),
    };
    // Collect items
    const items = [];
    // ID
    if (input.id !== undefined) {
        items.push(makeItem({ type: "Text", content: String("ID:"), variant: "subtitle2" }, { type: "Text", content: String(input.id), variant: "body1" }));
    }
    // Enforcement
    if (input.enforcement) {
        const colorMap = {
            enforced: "success",
            unenforced: "error",
        };
        items.push(makeItem({ type: "Text", content: "Enforcement:", variant: "subtitle2" }, renderChip(input.enforcement, colorMap[input.enforcement])));
    }
    // Tri-state flags
    const flags = [
        ["Advanced Security", "advanced_security"],
        ["Dependency Graph", "dependency_graph"],
        ["Auto-submit Dependencies", "dependency_graph_autosubmit_action"],
        ["Dependabot Alerts", "dependabot_alerts"],
        ["Dependabot Updates", "dependabot_security_updates"],
        ["Code Scanning Default", "code_scanning_default_setup"],
        ["Delegated Alert Dismissal", "code_scanning_delegated_alert_dismissal"],
        ["Secret Scanning", "secret_scanning"],
        ["Push Protection", "secret_scanning_push_protection"],
        ["Bypass Delegation", "secret_scanning_delegated_bypass"],
        ["Validity Checks", "secret_scanning_validity_checks"],
        ["Non-Provider Patterns", "secret_scanning_non_provider_patterns"],
        ["Generic Secrets", "secret_scanning_generic_secrets"],
        ["Delegated Alert Dismissal (Sec)", "secret_scanning_delegated_alert_dismissal"],
        ["Private Reporting", "private_vulnerability_reporting"],
    ];
    for (const [label, key] of flags) {
        const raw = input[key];
        if (raw !== undefined) {
            items.push(makeItem({ type: "Text", content: `${label}:`, variant: "subtitle2" }, renderFlag(raw)));
        }
    }
    // Code scanning default setup options
    if (input.code_scanning_default_setup_options) {
        const opt = input.code_scanning_default_setup_options;
        if (opt.runner_type !== null && opt.runner_type !== undefined) {
            items.push(makeItem({ type: "Text", content: "Runner Type:", variant: "subtitle2" }, renderChip(opt.runner_type)));
        }
        if (opt.runner_label) {
            items.push(makeItem({ type: "Text", content: "Runner Label:", variant: "subtitle2" }, { type: "Text", content: opt.runner_label, variant: "body2" }));
        }
    }
    // Secret scanning bypass reviewers
    if ((_c = input.secret_scanning_delegated_bypass_options) === null || _c === void 0 ? void 0 : _c.reviewers) {
        const list = input.secret_scanning_delegated_bypass_options.reviewers.map((r) => makeItem({ type: "Text", content: `${r.reviewer_type}:`, variant: "subtitle2" }, { type: "Text", content: String(r.reviewer_id), variant: "body2" }));
        items.push({
            type: "DataListItem",
            label: { type: "Text", content: "Bypass Reviewers:", variant: "subtitle2" },
            value: {
                type: "DataList",
                childrenProps: list,
            },
        });
    }
    // URLs
    if (input.url) {
        items.push(makeItem({ type: "Text", content: "Config URL:", variant: "subtitle2" }, renderLinkButton(input.url, "View")));
    }
    if (input.html_url) {
        items.push(makeItem({ type: "Text", content: "HTML URL:", variant: "subtitle2" }, renderLinkButton(input.html_url, "Open HTML")));
    }
    // Timestamps
    if (input.created_at) {
        items.push(makeItem({ type: "Text", content: "Created:", variant: "subtitle2" }, {
            type: "Text",
            content: new Date(input.created_at).toLocaleString(),
            variant: "caption",
        }));
    }
    if (input.updated_at) {
        items.push(makeItem({ type: "Text", content: "Updated:", variant: "subtitle2" }, {
            type: "Text",
            content: new Date(input.updated_at).toLocaleString(),
            variant: "caption",
        }));
    }
    // Main content: DataList of all items
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: items,
        },
    };
    // Wrap into VerticalCard for responsive stacking
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
    return card;
}
//# sourceMappingURL=426.js.map