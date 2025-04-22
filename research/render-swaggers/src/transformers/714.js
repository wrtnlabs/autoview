export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no alerts, display a simple message
    if (input.length === 0) {
        return {
            type: 'Text',
            variant: 'body1',
            color: 'secondary',
            content: 'No Dependabot alerts found.',
        };
    }
    // Map severity → raw icon color (IconProps accepts only raw palette names)
    const severityIconColorMap = {
        low: 'blue',
        medium: 'yellow',
        high: 'orange',
        critical: 'red',
    };
    // Map severity → semantic chip color
    const severityChipColorMap = {
        low: 'info',
        medium: 'warning',
        high: 'error',
        critical: 'error',
    };
    // Map alert state → semantic chip color
    const stateChipColorMap = {
        open: 'primary',
        fixed: 'success',
        dismissed: 'gray',
        auto_dismissed: 'gray',
    };
    // Build one ListItem per alert for a compact, responsive list
    const listItems = input.map((alert) => {
        var _a, _b, _c, _d, _e;
        const sev = alert.security_advisory.severity;
        const st = alert.state;
        // Convert ISO date to a user‐friendly format
        const createdDate = new Date(alert.created_at).toLocaleDateString();
        // Make the state label human‐readable (e.g. "auto_dismissed" → "auto dismissed")
        const stateLabel = st.replace(/_/g, ' ');
        return {
            type: 'ListItem',
            // Main title is the advisory summary
            title: alert.security_advisory.summary,
            // Show package name and creation date in the description
            description: `Package: ${(_b = (_a = alert.dependency["package"]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'unknown'} • Created: ${createdDate}`,
            // Leading icon to indicate this is a vulnerability
            startElement: {
                type: 'Icon',
                id: 'bug',
                color: (_c = severityIconColorMap[sev]) !== null && _c !== void 0 ? _c : 'gray',
                size: 20,
            },
            // Trailing chips for severity and current state
            endElement: [
                {
                    type: 'Chip',
                    label: sev.toUpperCase(),
                    color: (_d = severityChipColorMap[sev]) !== null && _d !== void 0 ? _d : 'secondary',
                    variant: 'filled',
                    size: 'small',
                },
                {
                    type: 'Chip',
                    label: stateLabel,
                    color: (_e = stateChipColorMap[st]) !== null && _e !== void 0 ? _e : 'gray',
                    variant: 'outlined',
                    size: 'small',
                },
            ],
        };
    });
    // Wrap everything in a List for a responsive, scrollable view
    return {
        type: 'List',
        childrenProps: listItems,
    };
}
//# sourceMappingURL=714.js.map