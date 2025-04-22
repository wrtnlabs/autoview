export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories to display.\nIt seems there are no repositories available."
        };
    }
    // Map each repository into a ListItem with avatar, title, description, and stat chips
    const listItems = input.map((repo) => {
        var _a, _b, _c;
        // Repository owner avatar
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary"
        };
        // Star count chip with star icon
        const starCount = (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0;
        const starChip = {
            type: "Chip",
            label: `${starCount}`,
            startElement: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            },
            color: "yellow",
            size: "small",
            variant: "outlined"
        };
        // Fork count chip with code-branch icon
        const forkCount = (_b = repo.forks) !== null && _b !== void 0 ? _b : 0;
        const forkChip = {
            type: "Chip",
            label: `${forkCount}`,
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 16
            },
            color: "gray",
            size: "small",
            variant: "outlined"
        };
        // Build and return the ListItem props
        return {
            type: "ListItem",
            title: repo.name,
            // Some descriptions can be null; only include when set
            description: (_c = repo.description) !== null && _c !== void 0 ? _c : undefined,
            startElement: avatar,
            // Show star and fork counts on the right
            endElement: [starChip, forkChip],
            // Make the item clickable, linking to the GitHub repo
            href: repo.html_url
        };
    });
    // Compose the final List component
    const listProps = {
        type: "List",
        childrenProps: listItems
    };
    return listProps;
}
//# sourceMappingURL=553.js.map