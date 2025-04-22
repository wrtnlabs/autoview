export function transform($input) {
    return visualizeData($input);
}
// Transforms GitHub Actions billing usage data into a visual AutoView component
function visualizeData(input) {
    var _a, _b, _c;
    // Extract breakdown values with safe fallbacks
    const ubuntu = (_a = input.minutes_used_breakdown.UBUNTU) !== null && _a !== void 0 ? _a : 0;
    const macos = (_b = input.minutes_used_breakdown.MACOS) !== null && _b !== void 0 ? _b : 0;
    const windows = (_c = input.minutes_used_breakdown.WINDOWS) !== null && _c !== void 0 ? _c : 0;
    // Build a mermaid pie chart to visualize the OS breakdown
    const chartMarkdown = `\`\`\`mermaid
pie title Minutes Used Breakdown by OS
    "Ubuntu": ${ubuntu}
    "macOS": ${macos}
    "Windows": ${windows}
\`\`\``;
    // Prepare a list of summary items
    const summaryItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "Total Minutes Used" },
            value: { type: "Text", content: String(input.total_minutes_used) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Paid Minutes Used" },
            value: { type: "Text", content: String(input.total_paid_minutes_used) },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Included Free Minutes" },
            value: { type: "Text", content: String(input.included_minutes) },
        },
    ];
    // Compose the full UI as a vertical card:
    // - Header with icon and title
    // - Content with a data list for key metrics
    // - Footer with a pie chart of OS breakdown
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "GitHub Actions Billing Usage",
                // Use a FontAwesome icon for branding
                startElement: {
                    type: "Icon",
                    id: "github",
                    size: 40,
                    color: "blue",
                },
            },
            {
                type: "CardContent",
                // Embed a DataList to display the summary items
                childrenProps: {
                    type: "DataList",
                    childrenProps: summaryItems,
                },
            },
            {
                type: "CardFooter",
                // Render the OS breakdown as a mermaid pie chart via Markdown
                childrenProps: {
                    type: "Markdown",
                    content: chartMarkdown,
                },
            },
        ],
    };
}
//# sourceMappingURL=1007.js.map