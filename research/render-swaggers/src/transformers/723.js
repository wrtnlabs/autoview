export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Determine a color-coded chip for the snapshot result status
    const statusChip = {
        type: "Chip",
        label: input.result,
        // Map result to semantic color variants
        color: input.result === "SUCCESS"
            ? "success"
            : input.result === "ACCEPTED"
                ? "warning"
                : "error",
        variant: "filled",
        size: "medium",
    };
    // Format timestamp into a human‐friendly string
    const formattedDate = (() => {
        try {
            const date = new Date(input.created_at);
            return isNaN(date.getTime())
                ? input.created_at
                : date.toLocaleString();
        }
        catch (_a) {
            // If parsing fails, fall back to raw value
            return input.created_at;
        }
    })();
    // Build a data list for key fields: ID, created time, and result
    const detailsList = {
        type: "DataList",
        childrenProps: [
            {
                type: "DataListItem",
                label: { type: "Text", content: "ID" },
                value: { type: "Text", content: input.id.toString() },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Created At" },
                value: { type: "Text", content: formattedDate },
            },
            {
                type: "DataListItem",
                label: { type: "Text", content: "Result" },
                // Use the same chip for consistency in header and details
                value: statusChip,
            },
        ],
    };
    // Render the optional message as markdown for better readability
    const messageSection = {
        type: "Markdown",
        content: input.message && input.message.trim()
            ? `**Message**\n\n${input.message}`
            : "**Message**\n\n*(No details provided)*",
    };
    // Assemble card header with status chip, title, and subtitle
    const cardHeader = {
        type: "CardHeader",
        title: `Snapshot #${input.id}`,
        description: formattedDate,
        startElement: statusChip,
    };
    // Combine details list and message into card content
    const cardContent = {
        type: "CardContent",
        childrenProps: [detailsList, messageSection],
    };
    // Return a vertical card that encapsulates all snapshot information
    const verticalCard = {
        type: "VerticalCard",
        childrenProps: [cardHeader, cardContent],
    };
    return verticalCard;
}
//# sourceMappingURL=723.js.map