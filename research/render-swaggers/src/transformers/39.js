export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no data, show a user-friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "_No categories available to display._",
        };
    }
    /**
     * Recursively builds a DataList from hierarchical category data.
     * Each item shows:
     * - A Text component for the category name
     * - A Chip component for the category code
     * - A nested DataList of children, or Markdown of creation time if leaf
     */
    function renderList(items) {
        return {
            type: "DataList",
            childrenProps: items.map((item) => {
                // Text for category name
                const nameText = {
                    type: "Text",
                    content: [item.name],
                    variant: "subtitle1",
                    color: "primary",
                };
                // Chip for category code
                const codeChip = {
                    type: "Chip",
                    label: item.code,
                    variant: "outlined",
                    size: "small",
                    color: "secondary",
                };
                // Decide what to render as the "value":
                // - nested list if children exist
                // - markdown timestamp otherwise
                const valueComponent = Array.isArray(item.children) && item.children.length > 0
                    ? renderList(item.children)
                    : {
                        type: "Markdown",
                        // italicize the timestamp for a subtle look
                        content: `*Created at:* ${item.created_at}`,
                    };
                return {
                    type: "DataListItem",
                    // Put the name and code side-by-side
                    label: [nameText, codeChip],
                    value: valueComponent,
                };
            }),
        };
    }
    // Build and return the top-level list
    return renderList(input);
}
//# sourceMappingURL=39.js.map