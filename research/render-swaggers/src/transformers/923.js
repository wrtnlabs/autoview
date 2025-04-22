export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If no repositories, show a friendly markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "## No repositories found\n\nThere are no repositories to display."
        };
    }
    // Sort repositories by descending stargazers count to highlight popular ones
    const sortedRepos = [...input].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    // Map each repository to a ListItem component
    const items = sortedRepos.map(repo => {
        // Fallback description if none provided
        const description = repo.description
            ? repo.description
            : "_No description available_";
        // Avatar for the repo owner
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 32,
            variant: "blue"
        };
        // Star badge showing stargazers count
        const starBadge = {
            type: "Badge",
            count: repo.stargazers_count || 0,
            maxCount: 999,
            color: "yellow",
            // Use a star icon inside the badge
            childrenProps: {
                type: "Icon",
                id: "star",
                color: "yellow",
                size: 16
            }
        };
        return {
            type: "ListItem",
            title: repo.full_name,
            description: description,
            // Clicking the item navigates to the repository URL
            href: repo.html_url,
            startElement: avatar,
            endElement: starBadge
        };
    });
    // Wrap all items into a responsive list
    const listComponent = {
        type: "List",
        childrenProps: items
    };
    return listComponent;
}
//# sourceMappingURL=923.js.map