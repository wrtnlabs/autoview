export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a;
    // Build the card header with a folder icon and category name/code
    const header = {
        type: "CardHeader",
        title: input.name,
        description: `Code: ${input.code}`,
        startElement: {
            type: "Icon",
            id: "folder", // using a folder icon for category
            color: "blue",
            size: 24,
        },
    };
    // Prepare a list of key/value pairs for metadata display
    const dataListItems = [
        {
            type: "DataListItem",
            label: { type: "Text", content: "ID", variant: "subtitle2" },
            value: { type: "Text", content: input.id, variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Parent ID", variant: "subtitle2" },
            // Show 'None' when no parent
            value: { type: "Text", content: (_a = input.parent_id) !== null && _a !== void 0 ? _a : "None", variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Code", variant: "subtitle2" },
            value: { type: "Text", content: input.code, variant: "body2" },
        },
        {
            type: "DataListItem",
            label: { type: "Text", content: "Created At", variant: "subtitle2" },
            value: { type: "Text", content: input.created_at, variant: "body2" },
        },
    ];
    // Wrap the items in a DataList component for a clean layout
    const contentList = {
        type: "DataList",
        childrenProps: dataListItems,
    };
    const content = {
        type: "CardContent",
        // Single component is acceptable; using DataList for structured display
        childrenProps: contentList,
    };
    // Build chips for each child category (if any), or show a markdown notice
    let footerChildren;
    if (input.children && input.children.length > 0) {
        const chips = input.children.map((child) => ({
            type: "Chip",
            label: child.name,
            variant: "outlined",
            size: "small",
            // optional: color based on depth or static
        }));
        const chipGroup = {
            type: "ChipGroup",
            childrenProps: chips,
        };
        footerChildren = chipGroup;
    }
    else {
        // No subcategories: friendly markdown message
        footerChildren = {
            type: "Markdown",
            content: "_No subcategories available_",
        };
    }
    const footer = {
        type: "CardFooter",
        childrenProps: footerChildren,
    };
    // Compose the final vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [header, content, footer],
    };
    return card;
}
//# sourceMappingURL=38.js.map