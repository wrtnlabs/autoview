export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, display a friendly markdown message.
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories found\n\nTry adjusting your search or check back later.",
        };
    }
    // Map each repository to a ListItem with avatar, title, description, metrics, and link.
    const listItems = input.map((repo) => {
        var _a, _b, _c, _d, _e;
        // Safely coalesce numeric fields to zero if undefined
        const stars = (_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0;
        const forks = (_b = repo.forks_count) !== null && _b !== void 0 ? _b : 0;
        const watchers = (_c = repo.watchers_count) !== null && _c !== void 0 ? _c : 0;
        const issues = (_d = repo.open_issues_count) !== null && _d !== void 0 ? _d : 0;
        return {
            type: "ListItem",
            // Repository full name as the main title
            title: repo.full_name,
            // Optional description or empty string
            description: (_e = repo.description) !== null && _e !== void 0 ? _e : "",
            // Show the owner's avatar next to the title
            startElement: {
                type: "Avatar",
                src: repo.owner.avatar_url,
                name: repo.owner.login,
                variant: "blue",
                size: 32,
            },
            // Display key metrics with icons and text in the endElement area
            endElement: [
                { type: "Icon", id: "star", color: "yellow", size: 16 },
                { type: "Text", content: `${stars}` },
                { type: "Icon", id: "code-branch", color: "green", size: 16 },
                { type: "Text", content: `${forks}` },
                { type: "Icon", id: "eye", color: "cyan", size: 16 },
                { type: "Text", content: `${watchers}` },
                { type: "Icon", id: "exclamation-circle", color: "red", size: 16 },
                { type: "Text", content: `${issues}` },
            ],
            // Make the entire item clickable, linking to the GitHub page
            href: repo.html_url,
        };
    });
    // Return a responsive List component containing all repository items
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=1013.js.map