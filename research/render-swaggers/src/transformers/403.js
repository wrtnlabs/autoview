export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // 1. Render the token as a code block using Markdown for better readability
    const tokenSection = {
        type: "Markdown",
        content: [
            "### Token",
            "",
            input.token,
            "```"
        ].join("\n")
    };
    // 2. Show the expiration date as a simple text line
    const expirationText = {
        type: "Text",
        variant: "body1",
        content: `Expires at: ${input.expires_at}`
    };
    // 3. Display whether all or selected repositories are in scope
    const selectionChip = {
        type: "Chip",
        label: input.repository_selection === "all" ? "All Repositories" : "Selected Repositories",
        color: "primary",
        variant: "filled",
        size: "small"
    };
    // 4. Build a list of repositories if any
    let repoSection;
    if (Array.isArray(input.repositories) && input.repositories.length > 0) {
        // Map each repo to a DataListItem
        const items = input.repositories.map(repo => {
            var _a;
            const owner = repo.owner;
            return {
                type: "DataListItem",
                title: repo.full_name,
                description: (_a = repo.description) !== null && _a !== void 0 ? _a : "",
                startElement: {
                    type: "Avatar",
                    src: owner.avatar_url,
                    name: owner.login,
                    variant: "secondary",
                    size: 32
                },
                endElement: {
                    type: "Button",
                    label: "View",
                    variant: "outlined",
                    size: "small",
                    color: "primary",
                    href: repo.html_url
                }
            };
        });
        repoSection = {
            type: "DataList",
            childrenProps: items
        };
    }
    else {
        // No repositories → show a friendly message
        repoSection = {
            type: "Text",
            variant: "body2",
            content: "No repositories available for this token."
        };
    }
    // 5. Assemble everything into a VerticalCard
    return {
        type: "VerticalCard",
        childrenProps: [
            {
                // Header with an icon
                type: "CardHeader",
                title: "Authentication Token",
                startElement: {
                    type: "Icon",
                    id: "key",
                    color: "teal",
                    size: 24
                }
            },
            {
                // Content: token, expiration, selection and repo list
                type: "CardContent",
                childrenProps: [
                    tokenSection,
                    expirationText,
                    selectionChip,
                    repoSection
                ]
            }
        ]
    };
}
//# sourceMappingURL=403.js.map