export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Helper: map a string array to ChipProps with styling
    const makeChips = (items, variant, color) => items.map((item) => ({
        type: "Chip",
        label: item,
        variant,
        color,
        size: "small",
    }));
    // Prepare category chips (filled style) and tag chips (outlined style)
    const categoryChips = (_b = (_a = input.categories) === null || _a === void 0 ? void 0 : _a.map((cat) => ({
        type: "Chip",
        label: cat.name,
        variant: "filled",
        color: "primary",
        size: "small",
    }))) !== null && _b !== void 0 ? _b : [];
    const tagChips = makeChips(input.tags || [], "outlined", "info");
    // Determine sale status icon based on paused/suspended/opened/closed state
    let statusIcon = {
        type: "Icon",
        id: "circle-check",
        color: "green",
        size: 16,
    };
    if (input.suspended_at) {
        statusIcon = {
            type: "Icon",
            id: "ban",
            color: "red",
            size: 16,
        };
    }
    else if (input.paused_at) {
        statusIcon = {
            type: "Icon",
            id: "pause",
            color: "orange",
            size: 16,
        };
    }
    // Card header: title, section name, and status indicator
    const header = {
        type: "CardHeader",
        title: input.content.title,
        description: input.section.name,
        startElement: {
            // visually represent categories with a tag icon
            type: "Icon",
            id: "tags",
            color: "blue",
            size: 20,
        },
        endElement: statusIcon,
    };
    // Card content: render the markdown or text body responsively
    // Use Markdown component to leverage rich formatting and mermaid diagrams
    const contentChildren = [];
    if (input.content.body) {
        contentChildren.push({
            type: "Markdown",
            content: input.content.body,
        });
    }
    // Optionally, visualize attached thumbnails inline if any
    if (Array.isArray(input.content.thumbnails) && input.content.thumbnails.length > 0) {
        // show up to 3 thumbnails as images
        const thumbImages = input.content.thumbnails.slice(0, 3).map((file) => ({
            type: "Image",
            src: file.url,
            alt: file.name || "thumbnail",
        }));
        contentChildren.push(...thumbImages);
    }
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Card footer: show category and tag chip groups
    const footerChildren = [];
    if (categoryChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: categoryChips,
            maxItems: 3, // show first 3 categories, rest are aggregated
        });
    }
    if (tagChips.length > 0) {
        footerChildren.push({
            type: "ChipGroup",
            childrenProps: tagChips,
            maxItems: 5, // show first 5 tags
        });
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose a vertical card for responsive display on web and mobile
    return {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
}
//# sourceMappingURL=132.js.map