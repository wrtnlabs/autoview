export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Select the latest snapshot or handle missing snapshots gracefully
    const snapshots = (_a = input.snapshots) !== null && _a !== void 0 ? _a : [];
    const lastSnapshot = snapshots.length > 0 ? snapshots[snapshots.length - 1] : null;
    // Card header with a question icon, title and creation timestamp
    const header = {
        type: "CardHeader",
        title: (_b = lastSnapshot === null || lastSnapshot === void 0 ? void 0 : lastSnapshot.title) !== null && _b !== void 0 ? _b : "No Title Available",
        description: lastSnapshot
            ? `Created at: ${new Date(lastSnapshot.created_at).toLocaleString()}`
            : "No snapshots available",
        startElement: {
            type: "Icon",
            id: "question-circle", // FontAwesome icon key without prefix
            color: "blue",
            size: 24,
        },
    };
    // Card content: prefer Markdown for readability; fallback to code block for non-markdown formats
    const contentBody = lastSnapshot
        ? {
            type: "Markdown",
            content: lastSnapshot.format === "md"
                ? lastSnapshot.body
                : `\`\`\`${lastSnapshot.format}\n${lastSnapshot.body}\n\`\`\``,
        }
        : {
            type: "Text",
            content: "No content available.",
        };
    const content = {
        type: "CardContent",
        childrenProps: contentBody,
    };
    // Footer chips to visualize flags: secret, read status, answered status
    const footerChips = [
        {
            type: "Chip",
            label: input.secret ? "Secret" : "Public",
            color: input.secret ? "error" : "success",
            variant: "filled",
            size: "small",
        },
        {
            type: "Chip",
            label: input.read_by_seller ? "Read by Seller" : "Unread by Seller",
            color: input.read_by_seller ? "success" : "warning",
            variant: "outlined",
            size: "small",
        },
        {
            type: "Chip",
            label: input.answer ? "Answered" : "Unanswered",
            color: input.answer ? "success" : "secondary",
            variant: "filled",
            size: "small",
        },
    ];
    const footer = {
        type: "CardFooter",
        childrenProps: footerChips,
    };
    // Assemble into a vertical card for a responsive, stacked layout
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=27.js.map