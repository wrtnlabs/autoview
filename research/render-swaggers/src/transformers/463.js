export function transform($input) {
    return visualizeData($input);
}
// Transforms API time stats into a responsive, swipeable carousel of cards.
function visualizeData(input) {
    // If there's no data, show an informative markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No request data available to display."
        };
    }
    // Sort entries by timestamp ascending to present chronological order.
    const sorted = [...input].sort((a, b) => {
        var _a, _b;
        const ta = new Date((_a = a.timestamp) !== null && _a !== void 0 ? _a : "").getTime();
        const tb = new Date((_b = b.timestamp) !== null && _b !== void 0 ? _b : "").getTime();
        return ta - tb;
    });
    // Map each time‐stat entry into a VerticalCard component.
    const cards = sorted.map((item) => {
        var _a, _b, _c;
        const total = (_a = item.total_request_count) !== null && _a !== void 0 ? _a : 0;
        const rateLimited = (_b = item.rate_limited_request_count) !== null && _b !== void 0 ? _b : 0;
        // Safely compute rate limit percentage.
        const percent = total > 0 ? Math.round((rateLimited / total) * 100) : 0;
        // Format timestamp for display; fall back on placeholder if invalid.
        const date = new Date((_c = item.timestamp) !== null && _c !== void 0 ? _c : "");
        const formattedDate = isNaN(date.getTime())
            ? "Unknown date"
            : date.toLocaleString();
        // Choose a chip color based on severity of rate‐limiting.
        let percentColor = "success";
        if (percent > 50) {
            percentColor = "error";
        }
        else if (percent > 20) {
            percentColor = "warning";
        }
        return {
            type: "VerticalCard",
            childrenProps: [
                // CardHeader with a clock icon and the formatted timestamp.
                {
                    type: "CardHeader",
                    title: formattedDate,
                    startElement: {
                        type: "Icon",
                        id: "clock", // FontAwesome clock icon
                        size: 20,
                        color: "cyan"
                    }
                },
                // CardContent showing total, rate-limited, and percentage as chips.
                {
                    type: "CardContent",
                    childrenProps: [
                        {
                            type: "Chip",
                            label: `Total: ${total}`,
                            color: "primary",
                            size: "small"
                        },
                        {
                            type: "Chip",
                            label: `Rate‑Limited: ${rateLimited}`,
                            color: "error",
                            size: "small"
                        },
                        {
                            type: "Chip",
                            label: `Rate Limit: ${percent}%`,
                            color: percentColor,
                            size: "small"
                        }
                    ]
                }
            ]
        };
    });
    // Wrap all cards in a Carousel for horizontal swiping (mobile‐friendly).
    return {
        type: "Carousel",
        indicators: true,
        navControls: true,
        childrenProps: cards
    };
}
//# sourceMappingURL=463.js.map