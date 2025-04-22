export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no rulesets, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repository rulesets found."
        };
    }
    // Helper: human-readable date formatting.
    function formatDate(dateTime) {
        if (!dateTime)
            return "N/A";
        const d = new Date(dateTime);
        // Use locale-sensitive formatting; falls back gracefully if invalid.
        return d.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }
    // Map rule enforcement to chip color.
    function enforcementColor(level) {
        switch (level) {
            case "active":
                return "green";
            case "evaluate":
                return "orange";
            case "disabled":
            default:
                return "gray";
        }
    }
    // Map target to an icon id.
    function targetIconId(target) {
        switch (target) {
            case "branch":
                return "code-branch";
            case "tag":
                return "tag";
            case "push":
                return "upload";
            case "repository":
                return "book";
            default:
                return "question-circle";
        }
    }
    // Compose a VerticalCard for each ruleset.
    const cards = input.map((ruleset) => {
        // Badge for bypass actors count, if any.
        const bypassCount = Array.isArray(ruleset.bypass_actors) ? ruleset.bypass_actors.length : 0;
        const bypassBadge = bypassCount > 0
            ? {
                type: "Badge",
                count: bypassCount,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "users",
                    color: "teal",
                    size: 20
                }
            }
            : undefined;
        // Build CardHeader
        const header = {
            type: "CardHeader",
            title: ruleset.name,
            description: `ID: ${ruleset.id}` + (ruleset.target ? ` • Target: ${ruleset.target}` : ""),
            startElement: {
                type: "Icon",
                id: targetIconId(ruleset.target),
                color: "blue",
                size: 28
            }
        };
        // Build CardContent with chips and badge
        const contentChildren = [];
        // Enforcement chip
        contentChildren.push({
            type: "Chip",
            label: ruleset.enforcement,
            color: enforcementColor(ruleset.enforcement),
            variant: "filled"
        });
        // Source type chip
        if (ruleset.source_type) {
            contentChildren.push({
                type: "Chip",
                label: ruleset.source_type,
                color: "violet",
                variant: "outlined"
            });
        }
        // Number of rules chip
        const rulesCount = Array.isArray(ruleset.rules) ? ruleset.rules.length : 0;
        contentChildren.push({
            type: "Chip",
            label: `${rulesCount} rule${rulesCount === 1 ? "" : "s"}`,
            color: "cyan",
            variant: "outlined"
        });
        // Bypass actors badge, if present
        if (bypassBadge) {
            contentChildren.push(bypassBadge);
        }
        const content = {
            type: "CardContent",
            childrenProps: contentChildren
        };
        // Build CardFooter with creation/update timestamps
        const footerText = `Created: ${formatDate(ruleset.created_at)}  •  Updated: ${formatDate(ruleset.updated_at)}`;
        const footer = {
            type: "CardFooter",
            childrenProps: {
                type: "Text",
                content: footerText,
                variant: "caption",
                color: "gray"
            }
        };
        return {
            type: "VerticalCard",
            childrenProps: [header, content, footer]
        };
    });
    // Wrap all cards in a responsive carousel.
    const carousel = {
        type: "Carousel",
        // Show the cards in a horizontal scrollable view.
        childrenProps: cards,
        navControls: true,
        indicators: true,
        infinite: false,
        gutter: 16,
        autoPlay: false
    };
    return carousel;
}
//# sourceMappingURL=513.js.map