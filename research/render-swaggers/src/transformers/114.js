export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    /**
     * Recursively build DataListItemProps for a list of categories.
     * Each item shows the category name and, if present, its children in a nested list.
     */
    function buildCategoryItems(categories) {
        return categories.map((cat) => {
            // Base component for the category name
            const labelText = {
                type: "Text",
                variant: "body1",
                content: cat.name,
            };
            // If this category has children, render a nested DataList; otherwise show a folder icon
            let valueComponent = {
                type: "Icon",
                id: "folder",
                color: "gray",
                size: 16,
            };
            if (cat.children && cat.children.length > 0) {
                valueComponent = {
                    type: "DataList",
                    childrenProps: buildCategoryItems(cat.children),
                };
            }
            return {
                type: "DataListItem",
                // The label can be an array of presentation components; here just one Text
                label: [labelText],
                // For leaf nodes, show an icon; for others, nested list
                value: valueComponent,
            };
        });
    }
    // Build the channel header: avatar + title + code chip
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Created at ${new Date(input.created_at).toLocaleDateString()}`,
        startElement: {
            type: "Avatar",
            name: input.name[0].toUpperCase(),
            variant: "cyan",
            size: 32,
        },
        endElement: {
            type: "Chip",
            label: input.code,
            size: "small",
            variant: "outlined",
        },
    };
    // Build the content: either a DataList of categories or a markdown message
    const contentChildren = input.categories && input.categories.length > 0
        ? {
            type: "DataList",
            childrenProps: buildCategoryItems(input.categories),
        }
        : {
            type: "Markdown",
            content: "_No categories available._",
        };
    const content = {
        type: "CardContent",
        childrenProps: contentChildren,
    };
    // Compose a vertical card containing the header and the content
    return {
        type: "VerticalCard",
        childrenProps: [header, content],
    };
}
//# sourceMappingURL=114.js.map