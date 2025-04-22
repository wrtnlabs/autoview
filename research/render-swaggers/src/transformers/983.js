export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, display a friendly markdown message
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories found\n\nTry adjusting your search or check back later."
        };
    }
    // Map each repository into a ListItem with avatar, description, and badges
    const listItems = input.map((repo) => {
        var _a;
        // Badge for stars
        const starBadge = {
            type: "Badge",
            count: repo.stargazers_count,
            showZero: true,
            maxCount: 9999,
            childrenProps: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            }
        };
        // Badge for forks
        const forkBadge = {
            type: "Badge",
            count: repo.forks_count,
            showZero: true,
            maxCount: 9999,
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                color: "cyan",
                size: 16
            }
        };
        return {
            type: "ListItem",
            // Repository name as the main title
            title: repo.name,
            // Use fallback text if there's no description
            description: (_a = repo.description) !== null && _a !== void 0 ? _a : "No description provided",
            // Clicking the item navigates to the GitHub page
            href: repo.html_url,
            // Owner's avatar as the leading element
            startElement: {
                type: "Avatar",
                src: repo.owner.avatar_url,
                name: repo.owner.login,
                size: 32
            },
            // Display star and fork badges on the right side
            endElement: [starBadge, forkBadge]
        };
    });
    // Wrap the items in a responsive list
    const listProps = {
        type: "List",
        childrenProps: listItems
    };
    return listProps;
}
//# sourceMappingURL=983.js.map