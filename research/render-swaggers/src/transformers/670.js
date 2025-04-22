export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    // Helper to create a Text component
    const createText = (content, variant = "body2", color) => ({
        type: "Text",
        content,
        variant,
        color,
    });
    // Helper to create a small Chip
    const createChip = (label, color, variant = "filled") => ({
        type: "Chip",
        label,
        color,
        size: "small",
        variant,
    });
    // Map alert state to an icon
    const stateIconMap = {
        open: { type: "Icon", id: "exclamation-circle", color: "yellow", size: 20 },
        fixed: { type: "Icon", id: "check-circle", color: "green", size: 20 },
        dismissed: { type: "Icon", id: "ban", color: "gray", size: 20 },
        null: { type: "Icon", id: "question-circle", color: "gray", size: 20 },
    };
    // Format ISO timestamp to a shorter locale string
    const formatDate = (iso) => {
        try {
            const dt = new Date(iso);
            return dt.toLocaleString();
        }
        catch (_a) {
            return iso;
        }
    };
    // Build the header: title, rule name, and state icon
    const header = {
        type: "CardHeader",
        title: `Alert #${input.number}`,
        description: (_b = (_a = input.rule) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "",
        startElement: stateIconMap[(_c = input.state) !== null && _c !== void 0 ? _c : "null"],
    };
    // Accumulate list items for main properties
    const listItems = [];
    // Created at
    if (input.created_at) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Created At:", "subtitle2")],
            value: [createText(formatDate(input.created_at))],
        });
    }
    // Updated at
    if (input.updated_at) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Updated At:", "subtitle2")],
            value: [createText(formatDate(input.updated_at))],
        });
    }
    // State chip
    if (input.state !== undefined) {
        listItems.push({
            type: "DataListItem",
            label: [createText("State:", "subtitle2")],
            value: [createChip((_d = input.state) !== null && _d !== void 0 ? _d : "unknown")],
        });
    }
    // Rule severity
    if ((_e = input.rule) === null || _e === void 0 ? void 0 : _e.severity) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Severity:", "subtitle2")],
            value: [createChip(input.rule.severity, input.rule.severity)],
        });
    }
    // Security severity level
    if ((_f = input.rule) === null || _f === void 0 ? void 0 : _f.security_severity_level) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Security Level:", "subtitle2")],
            value: [
                createChip(input.rule.security_severity_level, 
                // map critical/high to error, medium to warning, low to info
                input.rule.security_severity_level === "critical" || input.rule.security_severity_level === "high"
                    ? "error"
                    : input.rule.security_severity_level === "medium"
                        ? "warning"
                        : "info"),
            ],
        });
    }
    // Tool
    if ((_g = input.tool) === null || _g === void 0 ? void 0 : _g.name) {
        const version = input.tool.version ? ` v${input.tool.version}` : "";
        listItems.push({
            type: "DataListItem",
            label: [createText("Tool:", "subtitle2")],
            value: [createText(input.tool.name + version)],
        });
    }
    // Location of most recent instance
    const loc = (_h = input.most_recent_instance) === null || _h === void 0 ? void 0 : _h.location;
    if (loc && loc.path) {
        const range = loc.start_line && loc.end_line
            ? `:${loc.start_line}-${loc.end_line}`
            : loc.start_line
                ? `:${loc.start_line}`
                : "";
        listItems.push({
            type: "DataListItem",
            label: [createText("Location:", "subtitle2")],
            value: [createText(`${loc.path}${range}`)],
        });
    }
    // Instance message
    const msg = (_k = (_j = input.most_recent_instance) === null || _j === void 0 ? void 0 : _j.message) === null || _k === void 0 ? void 0 : _k.text;
    if (msg) {
        listItems.push({
            type: "DataListItem",
            label: [createText("Message:", "subtitle2")],
            value: [
                {
                    type: "Markdown",
                    content: msg.replace(/^/gm, "> "), // quote style
                },
            ],
        });
    }
    // Dismiss info: who and when
    if (input.dismissed_by && input.dismissed_by !== null) {
        const user = input.dismissed_by;
        listItems.push({
            type: "DataListItem",
            label: [createText("Dismissed By:", "subtitle2")],
            value: [
                {
                    type: "Avatar",
                    src: user.avatar_url,
                    name: user.login,
                    size: 28,
                    variant: "gray",
                },
                createText(` ${user.login}`, "body2"),
                input.dismissed_at
                    ? createText(` on ${formatDate(input.dismissed_at)}`, "body2", "tertiary")
                    : undefined,
            ].filter(Boolean),
        });
    }
    // Create DataList content
    const content = {
        type: "CardContent",
        childrenProps: {
            type: "DataList",
            childrenProps: listItems,
        },
    };
    // Footer: link to GitHub alert
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
            startElement: { type: "Icon", id: "external-link-alt", size: 16, color: "blue" },
        },
    };
    // Assemble a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=670.js.map