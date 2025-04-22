export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's no repository data, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "*No repositories found.*",
        };
    }
    // Map each repository to a ListItemProps for a responsive list view
    const items = input.map((repo) => {
        var _a, _b;
        // Owner avatar for the start element
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary",
        };
        // Star count badge for the end element, defaulting to 0 if undefined
        const starBadge = {
            type: "Badge",
            count: (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0,
            maxCount: 9999,
            color: "yellow",
            showZero: true,
            childrenProps: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16,
            },
        };
        // Build the list item - clicking navigates to the repo URL
        const listItem = {
            type: "ListItem",
            title: repo.full_name,
            description: (_b = repo.description) !== null && _b !== void 0 ? _b : "No description provided.",
            href: repo.html_url,
            startElement: avatar,
            endElement: starBadge,
        };
        return listItem;
    });
    // Compose the overall List component
    const listComponent = {
        type: "List",
        childrenProps: items,
    };
    return listComponent;
}
//# sourceMappingURL=498.js.map