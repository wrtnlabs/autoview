export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Destructure response fields
    const { total_count, repositories = [] } = input;
    // If there are no repositories, show a friendly markdown message
    if (repositories.length === 0) {
        return {
            type: "Markdown",
            content: "**No repositories available.**"
        };
    }
    // Transform each repository into a ListItemProps
    const listItems = repositories.map(repo => {
        var _a;
        // Prepare the avatar for the repo owner
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 32,
            variant: "gray"
        };
        // Prepare a chip showing the star count
        const starChip = {
            type: "Chip",
            label: String(repo.stargazers_count),
            startElement: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            },
            size: "small",
            variant: "outlined",
            color: "yellow"
        };
        // Prepare a chip showing the fork count (using FontAwesome "code-branch" icon)
        const forkChip = {
            type: "Chip",
            label: String(repo.forks_count),
            startElement: {
                type: "Icon",
                id: "code-branch",
                color: "blue",
                size: 16
            },
            size: "small",
            variant: "outlined",
            color: "blue"
        };
        return {
            type: "ListItem",
            // Repository name as the title
            title: repo.name,
            // Fallback to an empty string if no description
            description: (_a = repo.description) !== null && _a !== void 0 ? _a : "",
            // Make the entire item link to the repository page
            href: repo.html_url,
            // Show the owner's avatar on the left
            startElement: ownerAvatar,
            // Show star and fork chips on the right
            endElement: [starChip, forkChip]
        };
    });
    // Add a subheader at the top of the list showing the total count
    const subheader = {
        type: "ListSubheader",
        stickToTop: true,
        childrenProps: {
            type: "Text",
            variant: "subtitle1",
            content: [`Total repositories: ${total_count}`]
        }
    };
    // Compose final List component
    return {
        type: "List",
        childrenProps: [subheader, ...listItems]
    };
}
//# sourceMappingURL=389.js.map