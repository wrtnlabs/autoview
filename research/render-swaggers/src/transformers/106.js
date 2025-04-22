export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // 1. Prepare CardHeader with title and a note about the content format
    const header = {
        type: "CardHeader",
        title: input.content.title,
        // Show the body format (e.g., MD, HTML) as a subtitle
        description: `Format: ${input.content.format.toUpperCase()}`,
    };
    // 2. If there's at least one thumbnail, render it as CardMedia
    const firstThumbnailUrl = (_b = (_a = input.content.thumbnails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    const media = firstThumbnailUrl
        ? {
            type: "CardMedia",
            src: firstThumbnailUrl,
        }
        : undefined;
    // 3. Show the main body as markdown for rich text rendering
    const content = {
        type: "CardContent",
        childrenProps: [
            {
                type: "Markdown",
                content: input.content.body,
            },
        ],
    };
    // 4. Build a ChipGroup for categories (outlined style)
    const categoryGroup = {
        type: "ChipGroup",
        childrenProps: input.categories.map((cat) => ({
            type: "Chip",
            label: cat.name,
            variant: "outlined",
        })),
    };
    // 5. Build a ChipGroup for search tags (filled style)
    const tagGroup = {
        type: "ChipGroup",
        childrenProps: input.tags.map((t) => ({
            type: "Chip",
            label: t,
            variant: "filled",
        })),
    };
    // 6. For each unit, compute a price range and render it in a data list
    const unitList = {
        type: "DataList",
        childrenProps: input.units.map((unit) => {
            // Extract all final-stock real prices
            const prices = unit.stocks.map((s) => s.price.real);
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            const priceText = min === max
                ? `$${min.toFixed(2)}`
                : `$${min.toFixed(2)} - $${max.toFixed(2)}`;
            return {
                type: "DataListItem",
                // Label: unit name
                label: { type: "Text", content: unit.name },
                // Value: computed price range
                value: { type: "Text", content: priceText },
            };
        }),
    };
    // 7. Combine categories, tags, and the unit list into the CardFooter
    const footer = {
        type: "CardFooter",
        childrenProps: [categoryGroup, tagGroup, unitList],
    };
    // 8. Assemble the VerticalCard children, filtering out undefined media
    const children = [header, media, content, footer].filter((c) => Boolean(c));
    // 9. Return the top-level VerticalCard component props
    return {
        type: "VerticalCard",
        childrenProps: children,
    };
}
//# sourceMappingURL=106.js.map