export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    var _a, _b;
    // Prepare DataListItem for each environment
    const items = ((_a = input.environments) !== null && _a !== void 0 ? _a : []).map(env => {
        var _a, _b;
        // Format ISO dates into human‐readable strings
        const created = new Date(env.created_at).toLocaleString();
        const updated = new Date(env.updated_at).toLocaleString();
        const protectionCount = (_b = (_a = env.protection_rules) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        // Describe branch policy or default text
        const branchPolicy = env.deployment_branch_policy
            ? `Protected branches: ${env.deployment_branch_policy.protected_branches}\nCustom policies: ${env.deployment_branch_policy.custom_branch_policies}`
            : "All branches allowed";
        // Compose a markdown block with environment details
        const detailsMarkdown = [
            `- **ID**: ${env.id}`,
            `- **Created**: ${created}`,
            `- **Updated**: ${updated}`,
            `- **Protection rules**: ${protectionCount}`,
            `- **Branch policy**: ${branchPolicy}`,
            `- [Open in browser](${env.html_url})`
        ].join("\n");
        return {
            type: "DataListItem",
            // Show environment name as the label
            label: [
                {
                    type: "Text",
                    variant: "subtitle1",
                    content: env.name
                }
            ],
            // Show detailed info as markdown, plus a button as fallback on small screens
            value: [
                {
                    type: "Markdown",
                    content: detailsMarkdown
                },
                {
                    type: "Button",
                    variant: "text",
                    size: "small",
                    href: env.html_url,
                    startElement: { type: "Icon", id: "external-link-alt", size: 16 },
                    label: "Open"
                }
            ]
        };
    });
    // Wrap all items in a DataList
    const list = {
        type: "DataList",
        childrenProps: items
    };
    // Render everything in a card with a header summarizing the total
    const total = (_b = input.total_count) !== null && _b !== void 0 ? _b : items.length;
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                type: "CardHeader",
                title: "Environments",
                description: `Total: ${total}`,
                startElement: {
                    type: "Icon",
                    id: "cubes",
                    size: 24,
                    color: "blue"
                }
            },
            {
                type: "CardContent",
                childrenProps: list
            }
        ]
    };
}
//# sourceMappingURL=729.js.map