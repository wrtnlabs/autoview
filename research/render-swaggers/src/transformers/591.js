export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Aggregate DataList items
    const items = [];
    // Token (display as markdown code block for copyability)
    items.push({
        type: "DataListItem",
        label: [
            { type: "Text", content: "Token", variant: "subtitle2" }
        ],
        value: {
            type: "Markdown",
            content: `\`\`\`\n${input.token}\n\`\`\``
        }
    });
    // Expiration date
    items.push({
        type: "DataListItem",
        label: [
            { type: "Text", content: "Expires At", variant: "subtitle2" }
        ],
        value: {
            type: "Text",
            content: new Date(input.expires_at).toLocaleString()
        }
    });
    // Repository selection if provided
    if (input.repository_selection) {
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Selection", variant: "subtitle2" }
            ],
            value: {
                type: "Chip",
                label: input.repository_selection === "all" ? "All Repositories" : "Selected Repositories",
                variant: "filled",
                color: input.repository_selection === "all" ? "success" : "warning"
            }
        });
    }
    // Permissions (list of keys as chips)
    if (input.permissions && Object.keys(input.permissions).length > 0) {
        const perms = Object.keys(input.permissions);
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Permissions", variant: "subtitle2" }
            ],
            value: {
                type: "ChipGroup",
                childrenProps: perms.map((p) => ({
                    type: "Chip",
                    label: p,
                    size: "small",
                    variant: "outlined",
                    color: "primary"
                }))
            }
        });
    }
    // Repositories list (nested DataList)
    if (Array.isArray(input.repositories) && input.repositories.length > 0) {
        const repoList = input.repositories.map((repo) => ({
            type: "DataListItem",
            // Owner avatar + repo name
            label: [
                {
                    type: "Avatar",
                    src: repo.owner.avatar_url,
                    name: repo.owner.login,
                    size: 24,
                    variant: "gray"
                },
                {
                    type: "Text",
                    content: repo.name,
                    variant: "body1",
                    color: "primary"
                }
            ],
            // Stargazers icon + count
            value: [
                {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 16
                },
                {
                    type: "Text",
                    content: String(repo.stargazers_count),
                    variant: "body2",
                    color: "secondary"
                }
            ]
        }));
        items.push({
            type: "DataListItem",
            label: [
                { type: "Text", content: "Repositories", variant: "subtitle2" }
            ],
            value: {
                type: "DataList",
                childrenProps: repoList
            }
        });
    }
    // Compose final vertical card
    const card = {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with a key icon
                type: "CardHeader",
                title: "Authentication Token",
                description: "Your API access token details",
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "blue",
                    size: 24
                }
            },
            {
                // Content includes the aggregated DataList
                type: "CardContent",
                childrenProps: {
                    type: "DataList",
                    childrenProps: items
                }
            }
        ]
    };
    return card;
}
//# sourceMappingURL=591.js.map