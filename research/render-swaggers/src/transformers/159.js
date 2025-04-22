export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Recursive helper to build a DataList for a given set of nodes
    function buildDataList(nodes) {
        return {
            type: "DataList",
            // Each category becomes a DataListItem, possibly with a nested DataList in its value
            childrenProps: nodes.map((node) => buildDataListItem(node)),
        };
    }
    // Recursive helper to build a DataListItem for a single node
    function buildDataListItem(node) {
        // Choose folder icon depending on whether the node has children
        const hasChildren = node.children && node.children.length > 0;
        const iconId = hasChildren ? "folder-open" : "folder";
        // Icon component for visual affordance
        const iconProps = {
            type: "Icon",
            id: iconId,
            size: 20,
            color: "blue",
        };
        // Text component to display the category name
        const textProps = {
            type: "Text",
            content: node.name,
            variant: "body1",
            color: "primary",
        };
        // DataListItem that wraps the icon + text; if there are children, nest another DataList
        const item = {
            type: "DataListItem",
            label: [iconProps, textProps],
        };
        if (hasChildren) {
            // Attach nested DataList under 'value'
            item.value = buildDataList(node.children);
        }
        return item;
    }
    // If no categories are provided, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "**No categories available**",
        };
    }
    // Build and return the hierarchical DataList
    return buildDataList(input);
}
//# sourceMappingURL=159.js.map