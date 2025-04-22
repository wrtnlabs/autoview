export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Build a list subheader to give context
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            // Use a heading style for the subheader
            variant: "h5",
            content: "Repositories"
        }
    };
    // Map each repository to a ListItemProps
    const listItems = input.map((repo) => {
        var _a;
        // Build a set of chips for stargazers, forks, and watchers
        const statsChips = [];
        if (typeof repo.stargazers_count === "number") {
            statsChips.push({
                type: "Chip",
                label: `${repo.stargazers_count}`,
                startElement: {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 12
                },
                color: "yellow",
                size: "small",
                variant: "outlined"
            });
        }
        if (typeof repo.forks_count === "number") {
            statsChips.push({
                type: "Chip",
                label: `${repo.forks_count}`,
                startElement: {
                    type: "Icon",
                    // Use a branch-like icon for forks
                    id: "code-branch",
                    color: "green",
                    size: 12
                },
                color: "green",
                size: "small",
                variant: "outlined"
            });
        }
        if (typeof repo.watchers_count === "number") {
            statsChips.push({
                type: "Chip",
                label: `${repo.watchers_count}`,
                startElement: {
                    type: "Icon",
                    id: "eye",
                    color: "blue",
                    size: 12
                },
                color: "blue",
                size: "small",
                variant: "outlined"
            });
        }
        // Compose the ListItemProps for this repository
        const listItem = {
            type: "ListItem",
            title: repo.name,
            // Use description only if provided
            description: (_a = repo.description) !== null && _a !== void 0 ? _a : undefined,
            // Show owner's avatar on the left
            startElement: {
                type: "Avatar",
                src: repo.owner.avatar_url,
                name: repo.owner.login,
                // Reasonable avatar size for listing
                size: 32,
                variant: "blue"
            },
            // Link the item to the repository page
            href: repo.html_url,
            // Show stat chips on the right
            endElement: statsChips.length > 0 ? statsChips : undefined
        };
        return listItem;
    });
    // Return a responsive list component containing all repositories
    return {
        type: "List",
        childrenProps: [subheader, ...listItems]
    };
}
//# sourceMappingURL=511.js.map