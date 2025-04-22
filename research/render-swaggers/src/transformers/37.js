export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Helper to create a ChipGroup from string labels
    const createChips = (labels) => ({
        type: "ChipGroup",
        childrenProps: labels.map((label) => ({
            type: "Chip",
            label,
            size: "small",
            variant: "outlined",
        })),
    });
    // Compute price range string for a unit
    const formatPriceRange = (stocks) => {
        if (!stocks.length)
            return "No price info";
        const reals = stocks.map((s) => s.price.real);
        const min = Math.min(...reals);
        const max = Math.max(...reals);
        return min === max ? `$${min}` : `$${min} - $${max}`;
    };
    // Build a data list of units with their price ranges
    const unitList = {
        type: "DataList",
        childrenProps: input.units.map((unit) => ({
            type: "DataListItem",
            // Unit name as label
            label: { type: "Text", content: unit.name },
            // Price range as value
            value: { type: "Text", content: formatPriceRange(unit.stocks) },
        })),
    };
    // Main card header: show sale title, section and sale ID
    const header = {
        type: "CardHeader",
        title: input.content.title,
        description: `Section: ${input.section.name}`,
        // Use a tag icon to hint this is a sale listing
        startElement: { type: "Icon", id: "tag", color: "cyan", size: 24 },
        // Show sale ID on the right
        endElement: { type: "Text", content: `ID: ${input.id}` },
    };
    // Use first thumbnail as media if available
    const media = {
        type: "CardMedia",
        src: (_a = input.content.thumbnails[0]) === null || _a === void 0 ? void 0 : _a.url,
    };
    // Render the body with markdown (falls back gracefully if not markdown)
    const bodyMarkdown = {
        type: "Markdown",
        content: input.content.body,
    };
    // Footer: categories, tags, and unit list
    const footerChildren = [];
    // Only add categories section if present
    if (input.categories.length > 0) {
        const categoryLabels = input.categories.map((cat) => cat.name || String(cat.id));
        footerChildren.push(createChips(categoryLabels));
    }
    // Only add tags if present
    if (input.tags.length > 0) {
        footerChildren.push(createChips(input.tags));
    }
    // Add the unit list (even if empty)
    footerChildren.push(unitList);
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose a vertical card to display the sale details
    return {
        type: "VerticalCard",
        childrenProps: [header, media, { type: "CardContent", childrenProps: [bodyMarkdown] }, footer],
    };
}
//# sourceMappingURL=37.js.map