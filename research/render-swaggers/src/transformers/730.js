export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Utility to safely format ISO date strings
    const formatDate = (iso) => {
        const d = new Date(iso);
        return isNaN(d.getTime()) ? iso : d.toLocaleString();
    };
    // Build a list of key/value pairs for the environment metadata
    const dataListItems = [];
    // ID
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["ID"], variant: "subtitle2" }],
        value: [{ type: "Text", content: [String(input.id)], variant: "body2" }]
    });
    // Node ID
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["Node ID"], variant: "subtitle2" }],
        value: [{ type: "Text", content: [input.node_id], variant: "body2" }]
    });
    // URLs (API & HTML) as Markdown links for clickability
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["API URL"], variant: "subtitle2" }],
        value: [{
                type: "Markdown",
                content: `[View API](${input.url})`
            }]
    });
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["Web UI"], variant: "subtitle2" }],
        value: [{
                type: "Markdown",
                content: `[Open UI](${input.html_url})`
            }]
    });
    // Creation & Update timestamps
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["Created At"], variant: "subtitle2" }],
        value: [{ type: "Text", content: [formatDate(input.created_at)], variant: "body2" }]
    });
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["Updated At"], variant: "subtitle2" }],
        value: [{ type: "Text", content: [formatDate(input.updated_at)], variant: "body2" }]
    });
    // Protection rules count, visualized with a badge
    const rulesCount = (_b = (_a = input.protection_rules) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    dataListItems.push({
        type: "DataListItem",
        label: [{ type: "Text", content: ["Protection Rules"], variant: "subtitle2" }],
        value: [{
                type: "Badge",
                count: rulesCount,
                maxCount: 99,
                showZero: rulesCount === 0,
                childrenProps: {
                    type: "Icon",
                    id: "shield",
                    color: rulesCount > 0 ? "green" : "gray",
                    size: 20
                }
            }]
    });
    // Branch policy chips: show enabled/disabled states
    const chips = [];
    if (input.deployment_branch_policy) {
        const policy = input.deployment_branch_policy;
        chips.push({
            type: "Chip",
            label: `Protected Branches: ${policy.protected_branches ? "Yes" : "No"}`,
            color: policy.protected_branches ? "success" : "error",
            variant: "filled"
        });
        chips.push({
            type: "Chip",
            label: `Custom Policies: ${policy.custom_branch_policies ? "Yes" : "No"}`,
            color: policy.custom_branch_policies ? "success" : "error",
            variant: "filled"
        });
    }
    else {
        // null policy => all branches allowed
        chips.push({
            type: "Chip",
            label: "All Branches Allowed",
            color: "info",
            variant: "filled"
        });
    }
    // Assemble the final card with header, content list, and footer chips
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: input.name,
                description: `Environment Overview`,
                startElement: {
                    type: "Icon",
                    id: "cloud",
                    color: "blue",
                    size: 24
                }
            },
            {
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: dataListItems
                }
            },
            {
                type: "CardFooter",
                childrenProps: {
                    type: "ChipGroup",
                    childrenProps: chips,
                    maxItems: chips.length
                }
            }
        ]
    };
}
//# sourceMappingURL=730.js.map