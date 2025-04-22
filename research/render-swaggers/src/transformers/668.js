export function transform($input) {
    return visualizeData($input);
}
// Transforms code scanning alert items into an AutoView List of alerts
function visualizeData(input) {
    // If no alerts, show friendly message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No code scanning alerts found.",
        };
    }
    // Map each alert to a ListItem with icon, title, description, and a link button
    const alertItems = input.map((alert) => {
        var _a, _b, _c, _d, _e;
        // Determine icon based on alert state
        const icon = {
            type: "Icon",
            id: getStateIcon(alert.state),
            color: getStateColor(alert.state),
            size: 24,
        };
        // Button to view the alert on GitHub
        const viewButton = {
            type: "Button",
            variant: "text",
            size: "small",
            color: "primary",
            label: ["View"],
            startElement: { type: "Icon", id: "external-link-alt", color: "blue", size: 16 },
            href: alert.html_url, // Direct link to alert
        };
        return {
            type: "ListItem",
            // Title shows alert number and rule name (fallback if missing)
            title: `#${alert.number} ${(_b = (_a = alert.rule) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "Unnamed rule"}`,
            // Description shows severity or tool name
            description: ((_c = alert.rule) === null || _c === void 0 ? void 0 : _c.severity)
                ? `Severity: ${alert.rule.severity}`
                : `Tool: ${(_e = (_d = alert.tool) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "Unknown"}`,
            startElement: icon,
            endElement: viewButton,
        };
    });
    // Wrap all list items in a responsive List component
    return {
        type: "List",
        childrenProps: alertItems,
    };
}
// Helper: pick an icon name based on alert state
function getStateIcon(state) {
    switch (state) {
        case "open":
            return "exclamation-circle"; // indicates attention needed
        case "fixed":
            return "check-circle"; // indicates resolved
        case "dismissed":
            return "ban"; // indicates dismissed
        default:
            return "question-circle"; // unknown state
    }
}
// Helper: pick a color name based on alert state
function getStateColor(state) {
    switch (state) {
        case "open":
            return "yellow";
        case "fixed":
            return "green";
        case "dismissed":
            return "gray";
        default:
            return "gray";
    }
}
//# sourceMappingURL=668.js.map