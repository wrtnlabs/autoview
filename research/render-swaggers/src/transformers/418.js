export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, show a friendly markdown message
    if (!input.repositories || input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "**No repositories found for this organization.**"
        };
    }
    // Map each repository to a ListItem component
    const repoItems = input.repositories.map(repo => {
        var _a, _b, _c, _d;
        // Avatar for the repository owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            variant: "primary",
            size: 32
        };
        // Prepare star count chip
        const starsChip = {
            type: "Chip",
            label: String((_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0),
            startElement: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 12
            },
            color: "yellow",
            size: "small",
            variant: "outlined"
        };
        // Prepare forks count chip (use forks_count or forks)
        const forksCount = (_c = (_b = repo.forks_count) !== null && _b !== void 0 ? _b : repo.forks) !== null && _c !== void 0 ? _c : 0;
        const forksChip = {
            type: "Chip",
            label: String(forksCount),
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "gray",
                size: 12
            },
            color: "gray",
            size: "small",
            variant: "outlined"
        };
        // Compose the list item for this repository
        return {
            type: "ListItem",
            // Display the repo name prominently
            title: repo.name,
            // Fallback if description is null or empty
            description: (_d = repo.description) !== null && _d !== void 0 ? _d : "No description available",
            // Owner avatar on the left
            startElement: ownerAvatar,
            // Display star and fork metrics on the right
            endElement: [starsChip, forksChip]
        };
    });
    // Header subcomponent showing total count
    const header = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: [
            {
                type: "Text",
                variant: "h6",
                content: `Total Repositories: ${input.total_count}`
            }
        ]
    };
    // Final List component aggregating header and items
    const list = {
        type: "List",
        childrenProps: [header, ...repoItems]
    };
    return list;
}
//# sourceMappingURL=418.js.map