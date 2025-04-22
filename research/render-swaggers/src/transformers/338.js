export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of dependabot alerts into an AutoView List UI.
function visualizeData(input) {
    // Show a sticky header with the total count
    const header = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            color: "secondary",
            content: `Dependabot Alerts (${input.length})`
        }
    };
    // Map each alert to a ListItem with avatar, text, and a severity chip
    const items = input.map(alert => {
        var _a;
        const { owner } = alert.repository;
        // Avatar of repository owner
        const avatar = {
            type: "Avatar",
            src: owner.avatar_url,
            name: owner.login,
            size: 32,
            variant: "info"
        };
        // Color mapping by severity
        const sev = alert.security_advisory.severity;
        const colorMap = {
            critical: "error",
            high: "warning",
            medium: "info",
            low: "success"
        };
        const chip = {
            type: "Chip",
            label: sev.toUpperCase(),
            color: (_a = colorMap[sev]) !== null && _a !== void 0 ? _a : "primary",
            size: "small",
            variant: "filled"
        };
        return {
            type: "ListItem",
            // Link directly to the alert page
            href: alert.html_url,
            startElement: avatar,
            title: alert.repository.full_name,
            description: alert.security_advisory.summary,
            endElement: chip
        };
    });
    return {
        type: "List",
        // First the header, then one item per alert
        childrenProps: [header, ...items]
    };
}
//# sourceMappingURL=338.js.map