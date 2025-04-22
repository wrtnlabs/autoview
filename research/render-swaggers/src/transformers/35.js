export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each sale snapshot into a DataListItem with rich visual elements
    const items = input.data.map((record) => {
        var _a;
        const valueComponents = [];
        // 1. Price range as Markdown for bold styling and line breaks
        const low = record.price_range.lowest;
        const high = record.price_range.highest;
        const priceMarkdown = `**Price Range**\n` +
            `- Real: $${low.real.toFixed(2)} – $${high.real.toFixed(2)}\n` +
            `- Nominal: $${low.nominal.toFixed(2)} – $${high.nominal.toFixed(2)}`;
        valueComponents.push({
            type: "Markdown",
            content: priceMarkdown,
        });
        // 2. Snapshot ID and units count as small text
        valueComponents.push({
            type: "Text",
            variant: "caption",
            content: [`Snapshot ID: ${record.snapshot_id}`],
        });
        valueComponents.push({
            type: "Text",
            variant: "caption",
            content: [`Units: ${record.units.length}`],
        });
        // 3. Categories as a ChipGroup (outlined, primary)
        if (record.categories.length > 0) {
            const categoryChips = record.categories.map((cat) => ({
                type: "Chip",
                label: cat.name,
                variant: "outlined",
                color: "primary",
                size: "small",
            }));
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: categoryChips,
                maxItems: 5, // limit on small screens
            });
        }
        // 4. Tags as a ChipGroup (filled, secondary)
        if (record.tags.length > 0) {
            const tagChips = record.tags.map((tag) => ({
                type: "Chip",
                label: tag,
                variant: "filled",
                color: "secondary",
                size: "small",
            }));
            valueComponents.push({
                type: "ChipGroup",
                childrenProps: tagChips,
                maxItems: 10,
            });
        }
        // 5. Build the label section: thumbnail image, title, and a "Latest" chip if applicable
        const labelComponents = [];
        const thumbUrl = (_a = record.content.thumbnails[0]) === null || _a === void 0 ? void 0 : _a.url;
        if (thumbUrl) {
            labelComponents.push({
                type: "Image",
                src: thumbUrl,
                alt: record.content.title,
            });
        }
        // Title as a header text
        labelComponents.push({
            type: "Text",
            variant: "h6",
            content: [record.content.title],
        });
        // Latest indicator
        if (record.latest) {
            labelComponents.push({
                type: "Chip",
                label: "Latest",
                variant: "filled",
                color: "success",
                size: "small",
            });
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueComponents,
        };
    });
    // Wrap all items in a DataList for a scrollable, responsive list
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=35.js.map