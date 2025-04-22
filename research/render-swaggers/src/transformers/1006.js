export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of minimal GitHub repositories into a visual, responsive list.
// Each repository becomes a ListItem with an avatar, link, description, and chips for stars/forks.
function visualizeData(input) {
    // Build a list item for each repository
    const items = input.map(repo => {
        var _a, _b;
        // Prepare chips for stars and forks
        const chips = [];
        // Star count chip with a star icon
        chips.push({
            type: "Chip",
            label: ((_b = (_a = repo.stargazers_count) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0"),
            variant: "outlined",
            size: "small",
            color: "yellow",
            startElement: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16,
            },
        });
        // Fork count chip with a code‑branch icon, if available
        if (typeof repo.forks_count === "number") {
            chips.push({
                type: "Chip",
                label: repo.forks_count.toString(),
                variant: "outlined",
                size: "small",
                color: "blue",
                startElement: {
                    type: "Icon",
                    id: "code-branch",
                    color: "blue",
                    size: 16,
                },
            });
        }
        // Construct the list item
        const listItem = {
            type: "ListItem",
            // Repository short name as title
            title: repo.name,
            // Link directly to the repository page
            href: repo.html_url,
            // Show owner's avatar on the left
            startElement: {
                type: "Avatar",
                src: repo.owner.avatar_url,
                name: repo.owner.login,
                size: 40,
            },
            // Show chips on the right
            endElement: chips,
        };
        // Optionally add description if present
        if (repo.description) {
            listItem.description = repo.description;
        }
        return listItem;
    });
    // Return a List component containing all repository items
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=1006.js.map