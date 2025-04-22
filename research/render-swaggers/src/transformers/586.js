export function transform($input) {
    return visualizeData($input);
}
// Transforms GitHub Actions default workflow permissions data into a visual component structure.
function visualizeData(input) {
    // Prepare a list of data items to display each field in a label/value format.
    const items = [];
    // 1. Default workflow permissions (read/write) displayed as a colored chip.
    const permLabel = {
        type: "Text",
        content: "Default Workflow Permissions",
        variant: "body1",
        color: "primary",
    };
    const permChip = {
        type: "Chip",
        // Uppercase for better visual emphasis
        label: input.default_workflow_permissions.toUpperCase(),
        variant: "filled",
        size: "small",
        // Read -> info (blue), Write -> error (red)
        color: input.default_workflow_permissions === "write" ? "error" : "info",
    };
    items.push({
        type: "DataListItem",
        label: [permLabel],
        value: permChip,
    });
    // 2. Whether pull request reviews can be approved: boolean displayed as an icon.
    const approveLabel = {
        type: "Text",
        content: "Can Approve PR Reviews",
        variant: "body1",
        color: "primary",
    };
    const approveIcon = {
        type: "Icon",
        // 'check' for true, 'times' for false
        id: input.can_approve_pull_request_reviews ? "check" : "times",
        size: 20,
        // Green for allowed, gray for disallowed
        color: input.can_approve_pull_request_reviews ? "green" : "gray",
    };
    items.push({
        type: "DataListItem",
        label: [approveLabel],
        value: approveIcon,
    });
    // Wrap all items in a DataList for responsive display.
    const dataList = {
        type: "DataList",
        childrenProps: items,
    };
    return dataList;
}
//# sourceMappingURL=586.js.map