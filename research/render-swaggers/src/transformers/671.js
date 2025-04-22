export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Map each status to a FontAwesome icon id and a semantic color
    const statusVisualMap = {
        pending: { id: "clock", color: "orange" },
        error: { id: "exclamation-circle", color: "red" },
        success: { id: "check-circle", color: "green" },
        outdated: { id: "history", color: "gray" },
    };
    // Lookup icon and color, fallback to a neutral "question-circle" if status is unexpected
    const { id: iconId, color: iconColor } = (_a = statusVisualMap[input.status]) !== null && _a !== void 0 ? _a : { id: "question-circle", color: "gray" };
    // Format the ISO timestamp to a human-friendly string; fallback to raw input on parse failure
    let formattedDate = input.started_at;
    try {
        const d = new Date(input.started_at);
        if (!isNaN(d.getTime())) {
            formattedDate = d.toLocaleString();
        }
    }
    catch (_b) {
        // swallow; leave formattedDate as raw ISO string
    }
    // Header: show status icon + humanized status + start time
    const cardHeader = {
        type: "CardHeader",
        title: input.status.charAt(0).toUpperCase() + input.status.slice(1),
        description: `Started at: ${formattedDate}`,
        startElement: {
            type: "Icon",
            id: iconId,
            color: iconColor,
            size: 24,
        },
    };
    // Content: render the description as Markdown, or show a placeholder Text if absent
    const contentChildren = [];
    if (input.description) {
        contentChildren.push({
            type: "Markdown",
            content: input.description,
        });
    }
    else {
        contentChildren.push({
            type: "Text",
            variant: "caption",
            color: "gray",
            content: "No description provided.",
        });
    }
    const cardContent = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Use a vertical card to stack header and content; it's responsive on narrow screens
    return {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
}
//# sourceMappingURL=671.js.map