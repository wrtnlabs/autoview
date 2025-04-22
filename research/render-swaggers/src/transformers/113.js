export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no categories to display, show a friendly markdown message.
    if (!input.categories || input.categories.length === 0) {
        return {
            type: "Markdown",
            content: "### No categories available"
        };
    }
    /**
     * Recursively builds a DataList component from a list of hierarchical categories.
     * Each category becomes a DataListItem; nested children produce a nested DataList in the value slot.
     */
    function buildList(categories) {
        return {
            type: "DataList",
            childrenProps: categories.map(buildItem)
        };
    }
    /**
     * Builds a single DataListItem for one category.
     * - Uses an icon for quick visual recognition.
     * - Shows the category code in a chip (lightweight, high-visibility badge).
     * - Shows the category name as body text.
     * - If this category has children, nest another DataList in the value slot.
     */
    function buildItem(cat) {
        // Label composed of Icon, Chip, and Text
        const labelComponents = [
            {
                type: "Icon",
                id: "folder",
                color: "teal",
                size: 16
            },
            {
                type: "Chip",
                label: cat.code,
                variant: "outlined",
                color: "blue",
                size: "small"
            },
            {
                type: "Text",
                content: cat.name,
                variant: "body1"
            }
        ];
        const item = {
            type: "DataListItem",
            label: labelComponents
        };
        // If this category has children, render them as a nested DataList under 'value'
        if (cat.children && cat.children.length > 0) {
            item.value = buildList(cat.children);
        }
        return item;
    }
    // Build and return the top‑level DataList for all root categories.
    return buildList(input.categories);
}
//# sourceMappingURL=113.js.map