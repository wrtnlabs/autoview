export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Recursively builds a DataList representation of a category node.
     * - Lists the basic properties (name, code, creation time).
     * - If children exist, nests another DataList under a "Children" item.
     */
    function buildDataList(category) {
        // Prepare the basic fields as DataListItem entries
        const items = [
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Name" }],
                value: [{ type: "Text", content: category.name }],
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Code" }],
                // Use a Chip for the category code to make it stand out
                value: [
                    {
                        type: "Chip",
                        label: category.code,
                        variant: "outlined",
                    },
                ],
            },
            {
                type: "DataListItem",
                label: [{ type: "Text", content: "Created At" }],
                // Render timestamp as markdown for consistent styling on small screens
                value: [
                    {
                        type: "Markdown",
                        content: `\`${category.created_at}\``,
                    },
                ],
            },
        ];
        // If this category has children, append a nested DataList under "Children"
        if (category.children && category.children.length > 0) {
            items.push({
                type: "DataListItem",
                label: [{ type: "Text", content: "Children" }],
                value: category.children.map((child) => buildDataList(child)),
            });
        }
        return {
            type: "DataList",
            childrenProps: items,
        };
    }
    // The root input may include a "parent" pointer; we visualize the tree starting
    // from the input node itself, ignoring the parent link to avoid cycles.
    return buildDataList(input);
}
//# sourceMappingURL=160.js.map