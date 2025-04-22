export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each repository into a ListItem component
    const items = input.map((repo) => {
        // Owner avatar shown as a start element
        const startElement = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            variant: "blue",
            size: 40,
        };
        // Build small chips for stars, forks, and watchers
        const statChips = [];
        if (typeof repo.stargazers_count === "number") {
            statChips.push({
                type: "Chip",
                label: String(repo.stargazers_count),
                startElement: { type: "Icon", id: "star", color: "yellow", size: 16 },
                color: "yellow",
                size: "small",
                variant: "outlined",
            });
        }
        if (typeof repo.forks_count === "number") {
            statChips.push({
                type: "Chip",
                label: String(repo.forks_count),
                startElement: { type: "Icon", id: "code-branch", color: "teal", size: 16 },
                color: "teal",
                size: "small",
                variant: "outlined",
            });
        }
        if (typeof repo.watchers_count === "number") {
            statChips.push({
                type: "Chip",
                label: String(repo.watchers_count),
                startElement: { type: "Icon", id: "eye", color: "cyan", size: 16 },
                color: "cyan",
                size: "small",
                variant: "outlined",
            });
        }
        // Compose the ListItem props. Conditionally include description and endElement.
        const listItem = Object.assign(Object.assign(Object.assign(Object.assign({ type: "ListItem", title: repo.name }, (repo.description ? { description: repo.description } : {})), { startElement }), (repo.html_url ? { href: repo.html_url } : {})), (statChips.length > 0 ? { endElement: statChips } : {}));
        return listItem;
    });
    // Render as a responsive list; it will wrap on small screens
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=984.js.map