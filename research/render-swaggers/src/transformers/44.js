export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Recursively renders a category node as a DataListItem.
     * Uses an icon to distinguish branches (folders) vs leaves (files),
     * and nests child categories inside the `value` field as another DataList.
     */
    function renderCategoryNode(node) {
        // Build the label: icon + name + code
        const labelComponents = [
            {
                type: "Icon",
                id: node.children && node.children.length > 0 ? "folder" : "file",
                color: "gray",
                size: 16,
            },
            {
                type: "Text",
                content: node.name,
                variant: "body1",
                color: "primary",
            },
            {
                type: "Text",
                content: `(${node.code})`,
                variant: "caption",
                color: "secondary",
            },
        ];
        const item = {
            type: "DataListItem",
            label: labelComponents,
        };
        // If there are children, nest them in a sub-DataList
        if (node.children && node.children.length > 0) {
            item.value = {
                type: "DataList",
                childrenProps: node.children.map(renderCategoryNode),
            };
        }
        return item;
    }
    // If no top-level categories, show a friendly markdown message
    if (!input.categories || input.categories.length === 0) {
        return {
            type: "Markdown",
            content: "**No categories available**",
        };
    }
    // Render the full category tree as a nested DataList
    return {
        type: "DataList",
        childrenProps: input.categories.map(renderCategoryNode),
    };
}
//# sourceMappingURL=44.js.map