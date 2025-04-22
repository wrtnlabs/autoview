export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b, _c;
    // Map alert state to chip colors for quick visual cue
    const stateColorMap = {
        open: "warning",
        dismissed: "gray",
        fixed: "success",
        unknown: "info",
    };
    const stateLabel = (_a = input.state) !== null && _a !== void 0 ? _a : "unknown";
    const stateChip = {
        type: "Chip",
        label: stateLabel.charAt(0).toUpperCase() + stateLabel.slice(1),
        color: (_b = stateColorMap[stateLabel]) !== null && _b !== void 0 ? _b : "info",
        variant: "filled",
        size: "small",
    };
    // If there's a user who dismissed the alert, show their avatar
    const avatar = input.dismissed_by
        ? {
            type: "Avatar",
            src: input.dismissed_by.avatar_url,
            name: input.dismissed_by.login,
            size: 40,
            variant: "primary",
        }
        : undefined;
    // Helper to push rows into our data list
    const listItems = [];
    const pushItem = (label, value) => {
        listItems.push({
            type: "DataListItem",
            label: {
                type: "Text",
                content: label,
                variant: "body2",
                color: "gray",
            },
            value: {
                type: "Text",
                content: value,
                variant: "body1",
            },
        });
    };
    pushItem("Created At", input.created_at);
    if (input.updated_at)
        pushItem("Updated At", input.updated_at);
    if (input.rule.security_severity_level) {
        pushItem("Security Severity", input.rule.security_severity_level);
    }
    if (input.rule.severity) {
        pushItem("Rule Severity", input.rule.severity);
    }
    if (input.tool.name) {
        const toolInfo = input.tool.version
            ? `${input.tool.name} v${input.tool.version}`
            : input.tool.name;
        pushItem("Analysis Tool", toolInfo);
    }
    if (input.html_url) {
        pushItem("Alert URL", input.html_url);
    }
    // Show location (path + line range) if available
    const loc = input.most_recent_instance.location;
    if (loc && (loc.path || loc.start_line != null)) {
        const parts = [];
        if (loc.path)
            parts.push(loc.path);
        if (loc.start_line != null) {
            const endLine = loc.end_line != null ? `-${loc.end_line}` : "";
            parts.push(`lines ${loc.start_line}${endLine}`);
        }
        pushItem("Location", parts.join(" "));
    }
    // Assemble the data list
    const dataList = {
        type: "DataList",
        childrenProps: listItems,
    };
    // Card header with title, description, avatar and state chip
    const header = {
        type: "CardHeader",
        title: `Alert #${input.number}`,
        description: (_c = input.rule.name) !== null && _c !== void 0 ? _c : "",
        startElement: avatar,
        endElement: stateChip,
    };
    // Main card content containing the details list
    const content = {
        type: "CardContent",
        childrenProps: [dataList],
    };
    // Footer with a link button to view the alert on GitHub
    const footer = {
        type: "CardFooter",
        childrenProps: {
            type: "Button",
            label: "View on GitHub",
            href: input.html_url,
            variant: "outlined",
            color: "primary",
        },
    };
    // Wrap everything in a vertical card for responsive display
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=669.js.map