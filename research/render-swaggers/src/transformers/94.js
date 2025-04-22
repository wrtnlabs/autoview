export function transform($input) {
    return visualizeData($input);
}
// Transforms a shopping sale question into a visual AutoView component.
// Uses a vertical card layout with header, content (markdown), and footer.
function visualizeData(input) {
    var _a, _b, _c, _d;
    // Determine the most recent snapshot (fallback to empty if none)
    const latestSnapshot = ((_a = input.snapshots) === null || _a === void 0 ? void 0 : _a.length)
        ? input.snapshots[input.snapshots.length - 1]
        : undefined;
    // Format the date for display (use snapshot date if available)
    const rawDate = (_b = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.created_at) !== null && _b !== void 0 ? _b : input.created_at;
    const formattedDate = (() => {
        try {
            return new Date(rawDate).toLocaleString();
        }
        catch (_a) {
            return rawDate;
        }
    })();
    // Avatar showing the customer's ID
    const customerAvatar = {
        type: "Avatar",
        name: input.customer.id,
        variant: "primary",
        size: 40
    };
    // Icon indicating secret/read status
    const statusIconId = input.secret
        ? "lock"
        : (input.read_by_seller ? "eye" : "eye-slash");
    const statusIcon = {
        type: "Icon",
        id: statusIconId,
        color: input.read_by_seller ? "teal" : "gray",
        size: 20
    };
    // Card header with title, date, and status
    const header = {
        type: "CardHeader",
        title: (_c = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.title) !== null && _c !== void 0 ? _c : "Untitled Question",
        description: formattedDate,
        startElement: customerAvatar,
        endElement: statusIcon
    };
    // Main content: render the question body as markdown
    const bodyMarkdown = {
        type: "Markdown",
        content: (_d = latestSnapshot === null || latestSnapshot === void 0 ? void 0 : latestSnapshot.body) !== null && _d !== void 0 ? _d : ""
    };
    const content = {
        type: "CardContent",
        childrenProps: bodyMarkdown
    };
    // Footer: show the seller's answer or a placeholder
    const answerComponent = input.answer
        ? {
            type: "Markdown",
            content: String(input.answer)
        }
        : {
            type: "Text",
            content: "No answer yet",
            variant: "body2",
            color: "tertiary"
        };
    const footer = {
        type: "CardFooter",
        childrenProps: answerComponent
    };
    // Assemble the vertical card
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer]
    };
}
//# sourceMappingURL=94.js.map