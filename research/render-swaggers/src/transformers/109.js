export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Recursively convert a list of hierarchical categories into DataListItemProps.
     * For each category:
     *  - Label shows a folder icon, the category name, and a chip with its code.
     *  - Value shows either its child categories (as a nested DataList) or a creation date text.
     */
    function buildDataListItems(categories) {
        return categories.map((cat) => {
            // Compose the label: an icon, the category name, and a small chip for the code.
            const label = [
                {
                    // Folder icon to represent a category
                    type: "Icon",
                    id: "folder",
                    size: 16,
                    color: "blue",
                },
                {
                    // Category name
                    type: "Text",
                    content: cat.name,
                    variant: "body1",
                },
                {
                    // Code as an outlined chip
                    type: "Chip",
                    label: cat.code,
                    variant: "outlined",
                    size: "small",
                    color: "info",
                },
            ];
            // If the category has children, build a nested DataList for them.
            if (Array.isArray(cat.children) && cat.children.length > 0) {
                const nestedList = {
                    type: "DataList",
                    // Recursively build items for children
                    childrenProps: buildDataListItems(cat.children),
                };
                return {
                    type: "DataListItem",
                    label,
                    // Show the nested list as the value area
                    value: nestedList,
                };
            }
            else {
                // Leaf node: show the creation date as a caption
                const createdText = {
                    type: "Text",
                    content: `Created at ${new Date(cat.created_at).toLocaleDateString()}`,
                    variant: "caption",
                    color: "gray",
                };
                return {
                    type: "DataListItem",
                    label,
                    // Value can be an array of Presentation components
                    value: [createdText],
                };
            }
        });
    }
    // Top-level DataList showing all root categories
    const rootList = {
        type: "DataList",
        childrenProps: buildDataListItems(input.children),
    };
    return rootList;
}
//# sourceMappingURL=109.js.map