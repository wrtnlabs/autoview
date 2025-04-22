export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no data is provided or the array is empty, display a friendly message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "_No repositories found._",
        };
    }
    // Map each repository to a ListItem component.
    const items = input.map((repo) => {
        var _a, _b, _c, _d;
        // Safely extract counts, defaulting to 0 if undefined.
        const stars = (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0;
        const forks = (_c = (_b = repo.forks_count) !== null && _b !== void 0 ? _b : repo.forks) !== null && _c !== void 0 ? _c : 0;
        // Avatar of the repository owner.
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "blue",
        };
        // Chip showing star count.
        const starChip = {
            type: "Chip",
            label: stars.toString(),
            startElement: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "yellow",
        };
        // Chip showing fork count.
        const forkChip = {
            type: "Chip",
            label: forks.toString(),
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 16,
            },
            variant: "outlined",
            size: "small",
            color: "gray",
        };
        // Assemble the list item; clicking it navigates to the repo HTML URL.
        const listItem = {
            type: "ListItem",
            title: repo.full_name,
            description: (_d = repo.description) !== null && _d !== void 0 ? _d : "",
            startElement: avatar,
            endElement: [starChip, forkChip],
            href: repo.html_url,
        };
        return listItem;
    });
    // Return the List component containing all repositories.
    const list = {
        type: "List",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=899.js.map