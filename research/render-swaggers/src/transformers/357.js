export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // We will render the list of repositories as a responsive list.
    // Each repository becomes a ListItem with:
    //  - Avatar of the owner as startElement
    //  - Repository name as title, linking to its GitHub URL
    //  - Description as subtitle (if any)
    //  - Badges showing stars and forks as endElement
    const listItems = input.repositories.map((repo) => {
        // Owner avatar
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 36,
            variant: "blue",
        };
        // Star badge: using FontAwesome "star" icon
        const starBadge = {
            type: "Badge",
            childrenProps: {
                type: "Icon",
                id: "star",
                size: 16,
                color: "yellow",
            },
            count: repo.stargazers_count,
            maxCount: 9999,
            color: "yellow",
            showZero: false,
        };
        // Fork badge: using FontAwesome "code-branch" icon
        const forkBadge = {
            type: "Badge",
            childrenProps: {
                type: "Icon",
                id: "code-branch",
                size: 16,
                color: "cyan",
            },
            count: repo.forks_count,
            maxCount: 9999,
            color: "cyan",
            showZero: false,
        };
        return {
            type: "ListItem",
            title: repo.name,
            description: repo.description || undefined,
            startElement: ownerAvatar,
            endElement: [starBadge, forkBadge],
            // Clicking the item navigates to the repository page
            href: repo.html_url,
        };
    });
    // Wrap all the items in a List component
    const repoList = {
        type: "List",
        childrenProps: listItems,
    };
    return repoList;
}
//# sourceMappingURL=357.js.map