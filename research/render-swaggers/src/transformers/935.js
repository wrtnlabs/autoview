export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // When there are no repositories, show a simple markdown message
    if (!input.repositories || input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories found."
        };
    }
    // Map each repository to a ListItem component
    const repoItems = input.repositories.map(repo => {
        var _a, _b;
        const starCount = (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0;
        return {
            type: "ListItem",
            // Click on the list item will navigate to the repo's HTML URL
            href: repo.html_url,
            // Primary text is the repository name
            title: repo.name,
            // Secondary text is the description (if any)
            description: (_b = repo.description) !== null && _b !== void 0 ? _b : "",
            // Show owner's avatar on the left
            startElement: {
                type: "Avatar",
                src: repo.owner.avatar_url,
                name: repo.owner.login,
                size: 32,
                variant: "blue"
            },
            // Show star count badge on the right
            endElement: {
                type: "Badge",
                count: starCount,
                color: "yellow",
                // The badge wraps a star icon for visual emphasis
                childrenProps: {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 16
                }
            }
        };
    });
    // A subheader showing the total count of repositories
    const header = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "h6",
            content: `Repositories (${input.total_count})`
        }
    };
    // Compose the final List component with header + items
    return {
        type: "List",
        childrenProps: [header, ...repoItems]
    };
}
//# sourceMappingURL=935.js.map