export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no repositories are provided, show a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories to display\n\nThere are no repositories available at the moment."
        };
    }
    // Transform each repository into a list item with avatar, title, description, and badges for stars/forks.
    const listItems = input.map(repo => {
        var _a, _b;
        // Owner avatar on the left
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary"
        };
        // Badge showing star count
        const starBadge = {
            type: "Badge",
            count: (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0,
            maxCount: 999,
            showZero: true,
            color: "yellow",
            childrenProps: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            }
        };
        // Badge showing fork count
        const forkBadge = {
            type: "Badge",
            count: (_b = repo.forks_count) !== null && _b !== void 0 ? _b : 0,
            maxCount: 999,
            showZero: true,
            color: "gray",
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 16
            }
        };
        // Construct the list item
        const item = {
            type: "ListItem",
            startElement: avatar,
            title: repo.name,
            // Use markdown-style link inside description if description exists
            description: repo.description
                ? `${repo.description}`
                : undefined,
            // Make the entire item link to the repository page
            href: repo.html_url,
            // Display star and fork badges on the right
            endElement: [starBadge, forkBadge]
        };
        return item;
    });
    // Return a list component containing all repository items
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=485.js.map