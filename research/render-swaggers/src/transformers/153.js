export function transform($input) {
    return visualizeData($input);
}
// Transforms a shopping sale creation payload into an IAutoView component tree.
function visualizeData(input) {
    var _a;
    // Format date-times for display
    const openedAt = input.opened_at
        ? new Date(input.opened_at).toLocaleString()
        : "Ongoing";
    const closedAt = input.closed_at
        ? new Date(input.closed_at).toLocaleString()
        : "No end";
    // Build small chips for search tags
    const tagChips = input.tags.map((tag) => ({
        type: "Chip",
        label: tag,
        size: "small",
        variant: "outlined",
        color: "secondary",
    }));
    // Build small chips for category codes
    const categoryChips = input.category_codes.map((code) => ({
        type: "Chip",
        label: code,
        size: "small",
        variant: "outlined",
        color: "info",
    }));
    // Build a DataListItem for each sale unit, rendering details via markdown
    const unitItems = input.units.map((unit) => {
        // Compose a markdown summary for the unit
        let md = `### ${unit.name}\n`;
        md += `- **Primary:** ${unit.primary}\n`;
        md += `- **Required:** ${unit.required}\n`;
        md += `- **Options count:** ${unit.options.length}\n\n`;
        md += `**Stocks:**\n`;
        unit.stocks.forEach((stock) => {
            md += `- **${stock.name}**: $${stock.price.real} (nominal $${stock.price.nominal}), Qty: ${stock.quantity}\n`;
            if (stock.choices.length) {
                // List choices as [opt→cand]
                const choices = stock.choices
                    .map((c) => `\`[opt${c.option_index}→cand${c.candidate_index}]\``)
                    .join(" ");
                md += `  - Choices: ${choices}\n`;
            }
        });
        return {
            type: "DataListItem",
            // Simple label with the unit's name
            label: {
                type: "Text",
                content: `Unit: ${unit.name}`,
            },
            // Full details inside a markdown block
            value: {
                type: "Markdown",
                content: md,
            },
        };
    });
    // Wrap the units in a nested DataList
    const unitsList = {
        type: "DataList",
        childrenProps: unitItems,
    };
    // Determine a chip color for the initial status badge
    const statusColor = input.status === "paused"
        ? "warning"
        : input.status === "suspended"
            ? "error"
            : "primary";
    return {
        type: "VerticalCard",
        childrenProps: [
            // Card header: sale title, format badge, and status chip
            {
                type: "CardHeader",
                title: input.content.title,
                description: `Format: ${input.content.format.toUpperCase()}`,
                startElement: {
                    type: "Icon",
                    id: "tags", // FontAwesome "tags" icon for visual flair
                },
                endElement: {
                    type: "Chip",
                    label: (_a = input.status) !== null && _a !== void 0 ? _a : "none",
                    variant: "filled",
                    color: statusColor,
                },
            },
            // If there are thumbnails, show them in a simple carousel
            ...(input.content.thumbnails.length
                ? [
                    {
                        type: "Carousel",
                        autoPlay: false,
                        infinite: false,
                        gutter: 8,
                        navControls: true,
                        indicators: true,
                        childrenProps: input.content.thumbnails.map((thumb) => ({
                            // Each slide is a simple card with a media image
                            type: "VerticalCard",
                            childrenProps: {
                                type: "CardMedia",
                                src: thumb.url,
                            },
                        })),
                    },
                ]
                : []),
            // Main content: markdown body + metadata list + units list
            {
                type: "CardContent",
                childrenProps: [
                    // Body text rendered as markdown to support rich formatting
                    {
                        type: "Markdown",
                        content: input.content.body,
                    },
                    // Metadata and nested unit breakdown
                    {
                        type: "DataList",
                        childrenProps: [
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Section Code" },
                                value: { type: "Text", content: input.section_code },
                            },
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Opened At" },
                                value: { type: "Text", content: openedAt },
                            },
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Closed At" },
                                value: { type: "Text", content: closedAt },
                            },
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Search Tags" },
                                value: {
                                    type: "ChipGroup",
                                    childrenProps: tagChips,
                                },
                            },
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Categories" },
                                value: {
                                    type: "ChipGroup",
                                    childrenProps: categoryChips,
                                },
                            },
                            {
                                type: "DataListItem",
                                label: { type: "Text", content: "Units" },
                                value: unitsList,
                            },
                        ],
                    },
                ],
            },
            // Footer with a simple summary line
            {
                type: "CardFooter",
                childrenProps: {
                    type: "Text",
                    content: `Sale belongs to section: ${input.section_code}`,
                },
            },
        ],
    };
}
//# sourceMappingURL=153.js.map