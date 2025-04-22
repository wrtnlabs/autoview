export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no rulesets, display a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repository rulesets found."
        };
    }
    // Helper to map enforcement to a chip color
    const enforcementToColor = (enf) => {
        switch (enf) {
            case "active":
                return "success";
            case "evaluate":
                return "warning";
            case "disabled":
            default:
                return "gray";
        }
    };
    // Build a ListItem for each repository_ruleset
    const listItems = input.map((rs) => {
        var _a, _b, _c, _d;
        const rulesCount = Array.isArray(rs.rules) ? rs.rules.length : 0;
        const bypassCount = Array.isArray(rs.bypass_actors) ? rs.bypass_actors.length : 0;
        // Format the updated date for display; fall back gracefully if missing
        const updatedLabel = rs.updated_at
            ? `Updated: ${new Date(rs.updated_at).toLocaleDateString()}`
            : "";
        // Compose an endElement array: a Chip for enforcement + a Badge for rule count
        const endElements = [];
        // Chip showing enforcement level
        endElements.push({
            type: "Chip",
            label: (_a = rs.enforcement) !== null && _a !== void 0 ? _a : "unknown",
            color: enforcementToColor(rs.enforcement),
            size: "small",
            variant: "filled"
        });
        // Badge showing number of rules
        endElements.push({
            type: "Badge",
            count: rulesCount,
            maxCount: 999,
            showZero: true,
            color: "primary",
            childrenProps: {
                type: "Icon",
                id: "gavel", // FontAwesome icon for rules
                size: 16,
                color: "blue"
            }
        });
        return {
            type: "ListItem",
            title: rs.name,
            description: [
                // Concatenate metadata into description
                `Target: ${(_b = rs.target) !== null && _b !== void 0 ? _b : "N/A"}`,
                `Source: ${rs.source}`,
                `Bypass Actors: ${bypassCount}`,
                updatedLabel
            ]
                .filter((s) => s.length > 0)
                .join(" • "),
            // A settings icon to the left
            startElement: {
                type: "Icon",
                id: "cogs",
                size: 24,
                color: "teal"
            },
            // Enforcement chip + rule-count badge to the right
            endElement: endElements,
            // Optionally link to the ruleset's HTML if available
            href: (_d = (_c = rs._links) === null || _c === void 0 ? void 0 : _c.html) === null || _d === void 0 ? void 0 : _d.href
        };
    });
    // Return a responsive List component containing all rulesets
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=859.js.map