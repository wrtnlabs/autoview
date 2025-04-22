export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each repository into a ListItem with avatar, title, description, and chips for metadata
    const listItems = input.map(repo => {
        var _a, _b, _c;
        // Avatar representing the repository owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 36,
            variant: "blue", // A subtle blue background for the avatar
        };
        // Star icon for the star-count chip
        const starIcon = {
            type: "Icon",
            id: "star",
            color: "yellow",
            size: 16,
        };
        // Fork icon for the fork-count chip
        const forkIcon = {
            type: "Icon",
            id: "code-branch",
            color: "cyan",
            size: 16,
        };
        // Build chips for stars, forks, and primary language (if any)
        const metadataChips = [];
        metadataChips.push({
            type: "Chip",
            label: String((_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0),
            size: "small",
            variant: "outlined",
            startElement: starIcon,
        });
        metadataChips.push({
            type: "Chip",
            label: String((_c = (_b = repo.forks_count) !== null && _b !== void 0 ? _b : repo.forks) !== null && _c !== void 0 ? _c : 0),
            size: "small",
            variant: "outlined",
            startElement: forkIcon,
        });
        if (repo.language) {
            metadataChips.push({
                type: "Chip",
                label: repo.language,
                size: "small",
                variant: "filled",
                color: "info",
            });
        }
        // Compose the list item; clicking navigates to the repo's GitHub page
        const listItem = Object.assign(Object.assign({ type: "ListItem", startElement: ownerAvatar, title: repo.full_name }, (repo.description != null ? { description: repo.description } : {})), { href: repo.html_url, endElement: metadataChips });
        return listItem;
    });
    // Wrap all items in a responsive vertical list
    const list = {
        type: "List",
        childrenProps: listItems,
    };
    return list;
}
//# sourceMappingURL=967.js.map