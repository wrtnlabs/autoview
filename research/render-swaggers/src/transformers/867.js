export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle empty list: show friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No secret scanning alerts found\nThere are no alerts to display."
        };
    }
    // Map each alert to a ListItemProps
    const items = input.map((alert) => {
        var _a, _b;
        // Determine state icon and color
        const isResolved = alert.state === "resolved";
        const stateIcon = {
            type: "Icon",
            id: isResolved ? "check-circle" : "exclamation-triangle",
            color: isResolved ? "green" : "red",
            size: 24
        };
        // Build a primary title: display name or type + number
        const title = `${(_b = (_a = alert.secret_type_display_name) !== null && _a !== void 0 ? _a : alert.secret_type) !== null && _b !== void 0 ? _b : "Secret"} #${alert.number}`;
        // Format created and (if any) resolved dates
        const createdDate = alert.created_at
            ? new Date(alert.created_at).toLocaleDateString()
            : "Unknown";
        const resolvedDate = isResolved && alert.resolved_at
            ? new Date(alert.resolved_at).toLocaleDateString()
            : null;
        // Description with dot separator for readability on small screens
        const descriptionParts = [`Created: ${createdDate}`];
        if (isResolved && resolvedDate) {
            descriptionParts.push(`Resolved: ${resolvedDate}`);
        }
        const description = descriptionParts.join(" • ");
        // If resolved, add a chip to show resolution reason
        const endElements = [];
        if (isResolved && alert.resolution) {
            // Color-code the resolution: false_positive=gray, wont_fix=orange, revoked=red, used_in_tests=blue
            const resolutionColorMap = {
                false_positive: "gray",
                wont_fix: "orange",
                revoked: "red",
                used_in_tests: "blue"
            };
            endElements.push({
                type: "Chip",
                label: alert.resolution.replace(/_/g, " "),
                color: resolutionColorMap[alert.resolution] || "gray",
                size: "small",
                variant: "outlined"
            });
        }
        // Add a "View" button linking to the GitHub alert page
        if (alert.html_url) {
            endElements.push({
                type: "Button",
                variant: "text",
                color: "primary",
                size: "small",
                label: "View",
                startElement: {
                    type: "Icon",
                    id: "external-link-alt",
                    size: 16,
                    color: "blue"
                },
                href: alert.html_url
            });
        }
        return {
            type: "ListItem",
            title,
            description,
            startElement: stateIcon,
            // If we have any endElements, supply them; else undefined
            endElement: endElements.length === 1 ? endElements[0] : endElements
        };
    });
    // Compose a responsive list of alerts
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=867.js.map