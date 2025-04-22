export function transform($input) {
    return visualizeData($input);
}
// Transforms hierarchical category data into a nested DataList view.
// Each category is represented with a folder icon, its name, and a code chip.
// Sub-categories are rendered as nested DataLists; leaf nodes display their creation date.
function visualizeData(input) {
    // If there are no categories, display a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No categories available\nNo hierarchical categories to display at the moment."
        };
    }
    // Recursively build a DataListItem for each category node.
    function buildItem(category) {
        const children = category.children || [];
        // Label combines an icon, the category name, and a code chip.
        const labelComponents = [
            {
                type: "Icon",
                id: "folder", // FontAwesome folder icon
                size: 16,
                color: "blue"
            },
            {
                type: "Text",
                content: category.name,
                variant: "body1",
                color: "secondary"
            },
            {
                type: "Chip",
                label: category.code,
                size: "small",
                variant: "outlined"
            }
        ];
        // For non-leaf nodes, nest another DataList; otherwise show the creation date.
        let valueProp;
        if (children.length > 0) {
            const nestedItems = children.map(child => buildItem(child));
            valueProp = {
                type: "DataList",
                childrenProps: nestedItems
            };
        }
        else {
            // Format the creation timestamp into a readable date.
            const createdDate = new Date(category.created_at).toLocaleDateString();
            valueProp = [
                {
                    type: "Text",
                    content: `Created at: ${createdDate}`,
                    variant: "caption",
                    color: "gray"
                }
            ];
        }
        return {
            type: "DataListItem",
            label: labelComponents,
            value: valueProp
        };
    }
    // Build the top‐level DataList with all root categories.
    const rootItems = input.map(category => buildItem(category));
    return {
        type: "DataList",
        childrenProps: rootItems
    };
}
//# sourceMappingURL=108.js.map