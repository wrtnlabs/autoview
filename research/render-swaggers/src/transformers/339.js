export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no alerts, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No secret scanning alerts found.",
        };
    }
    // Helper to safely parse a timestamp or return epoch 0
    const parseTime = (iso) => iso ? new Date(iso).getTime() : 0;
    // Sort alerts by creation date descending (newest first)
    const sortedAlerts = [...input].sort((a, b) => parseTime(b.created_at) - parseTime(a.created_at));
    // Map each alert to a ListItem component
    const items = sortedAlerts.map((alert) => {
        var _a, _b, _c;
        // Build the title: include alert number and optional display name
        const num = (_a = alert.number) !== null && _a !== void 0 ? _a : 0;
        const title = `Alert #${num}${alert.secret_type_display_name
            ? `: ${alert.secret_type_display_name}`
            : ""}`;
        // Determine state icon and its color
        const state = (_b = alert.state) !== null && _b !== void 0 ? _b : "open";
        const iconId = state === "resolved" ? "check-circle" : "exclamation-triangle";
        const iconColor = state === "resolved" ? "green" : "orange";
        const startIcon = {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 20,
        };
        // Prepare chips for state and resolution
        const stateChip = {
            type: "Chip",
            label: state,
            color: state === "resolved" ? "success" : "warning",
            variant: "outlined",
            size: "small",
        };
        const resolutionChip = alert.resolution
            ? {
                type: "Chip",
                label: alert.resolution,
                color: "info",
                variant: "filled",
                size: "small",
            }
            : undefined;
        const endElements = resolutionChip
            ? [stateChip, resolutionChip]
            : [stateChip];
        // Build a concise description of timestamps
        const createdAt = alert.created_at
            ? new Date(alert.created_at).toLocaleString()
            : "N/A";
        const updatedAt = alert.updated_at && alert.updated_at !== null
            ? new Date(alert.updated_at).toLocaleString()
            : createdAt;
        const description = `Created: ${createdAt} • Updated: ${updatedAt}`;
        return {
            type: "ListItem",
            title,
            description,
            startElement: startIcon,
            endElement: endElements,
            // Link directly to the GitHub alert if available
            href: (_c = alert.html_url) !== null && _c !== void 0 ? _c : undefined,
        };
    });
    // Wrap all items in a responsive list component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=339.js.map