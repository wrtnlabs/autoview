export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure input fields
    const { id, node_id, name, html_url, created_at, updated_at, protection_rules, deployment_branch_policy, } = input;
    // Format dates into a human‐friendly string in the user's locale
    const formattedCreated = new Date(created_at).toLocaleString();
    const formattedUpdated = new Date(updated_at).toLocaleString();
    // Determine branch policy label based on settings (null or object)
    const policy = deployment_branch_policy;
    let branchPolicyLabel;
    if (policy === null || policy === undefined) {
        branchPolicyLabel = "All Branches";
    }
    else if (policy.protected_branches) {
        branchPolicyLabel = "Protected Branches Only";
    }
    else {
        branchPolicyLabel = "Custom Branch Policies";
    }
    // Count of protection rules
    const rulesCount = Array.isArray(protection_rules) ? protection_rules.length : 0;
    // Compose a DataList of key environment details
    const detailsList = [
        {
            type: "DataListItem",
            // ID
            label: { type: "Text", content: "Environment ID" },
            value: { type: "Text", content: `${id}` },
        },
        {
            type: "DataListItem",
            // Node ID
            label: { type: "Text", content: "Node ID" },
            value: { type: "Text", content: node_id },
        },
        {
            type: "DataListItem",
            // Created at
            label: { type: "Text", content: "Created At" },
            value: { type: "Text", content: formattedCreated },
        },
        {
            type: "DataListItem",
            // Updated at
            label: { type: "Text", content: "Last Updated" },
            value: { type: "Text", content: formattedUpdated },
        },
        {
            type: "DataListItem",
            // Link to GitHub environment page
            label: { type: "Text", content: "View on GitHub" },
            value: {
                type: "Button",
                variant: "text",
                color: "primary",
                label: "Open",
                href: html_url,
                startElement: { type: "Icon", id: "link", color: "blue", size: 12 },
            },
        },
        {
            type: "DataListItem",
            // Branch policy
            label: { type: "Text", content: "Branch Policy" },
            value: {
                type: "Chip",
                label: branchPolicyLabel,
                color: "teal",
                variant: "outlined",
                size: "small",
            },
        },
        {
            type: "DataListItem",
            // Protection rules count
            label: { type: "Text", content: "Protection Rules" },
            value: {
                type: "Badge",
                count: rulesCount,
                showZero: true,
                childrenProps: { type: "Icon", id: "shield-alt", color: "orange", size: 20 },
            },
        },
    ];
    // Build the vertical card to display all environment details
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                // Main title and icon
                title: name,
                description: `Node: ${node_id}`,
                startElement: { type: "Icon", id: "server", color: "blue", size: 32 },
            },
            {
                type: "CardContent",
                // Nesting a data list inside the card content
                childrenProps: {
                    type: "DataList",
                    childrenProps: detailsList,
                },
            },
        ],
    };
}
//# sourceMappingURL=731.js.map