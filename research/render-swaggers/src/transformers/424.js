export function transform($input) {
    return visualizeData($input);
}
// Transforms GitHub Code Scanning alerts into an AutoView List component for display
function visualizeData(input) {
    // Helper: map alert state to a Chip color
    const mapStateToColor = (state) => {
        switch (state) {
            case "open": return "info";
            case "fixed": return "success";
            case "dismissed": return "warning";
            default: return "gray";
        }
    };
    // Helper: map security severity to a Chip color
    const mapSeverityToColor = (sev) => {
        switch (sev) {
            case "low": return "success";
            case "medium": return "warning";
            case "high": return "error";
            case "critical": return "error";
            default: return "gray";
        }
    };
    // Build ListItem for each alert
    const listItems = input.map(alert => {
        var _a, _b, _c;
        const rule = alert.rule || {};
        const repo = alert.repository;
        const owner = repo.owner;
        // Title: rule name or fallback to rule id
        const titleText = (_b = (_a = rule.name) !== null && _a !== void 0 ? _a : rule.id) !== null && _b !== void 0 ? _b : `#${alert.number}`;
        // Description: creation date + repo full name
        const created = new Date(alert.created_at).toLocaleDateString();
        const descriptionText = `${created} · ${repo.full_name}`;
        // State chip
        const stateLabel = (_c = alert.state) !== null && _c !== void 0 ? _c : "unknown";
        const stateChip = {
            type: "Chip",
            label: stateLabel,
            color: mapStateToColor(alert.state),
            size: "small",
            variant: "filled",
        };
        // Severity chip (if available)
        const sev = rule.security_severity_level;
        const severityChip = sev
            ? {
                type: "Chip",
                label: sev,
                color: mapSeverityToColor(sev),
                size: "small",
                variant: "outlined",
            }
            : null;
        // Assemble endElement array
        const endElements = severityChip ? [stateChip, severityChip] : [stateChip];
        return {
            type: "ListItem",
            title: titleText,
            description: descriptionText,
            // Show repo owner's avatar for quick recognition
            startElement: {
                type: "Avatar",
                src: owner.avatar_url,
                name: owner.login,
                size: 32,
            },
            // Show state and severity as chips
            endElement: endElements,
            // Clicking the item navigates to the GitHub alert page
            href: alert.html_url,
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=424.js.map