export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Handle case when there are no repositories
    if (!input.repositories || input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "## No repositories available"
        };
    }
    // Map each repository to a ListItemProps
    const listItems = input.repositories.map(repo => {
        var _a, _b, _c;
        // Owner avatar displayed as the start element
        const avatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40
        };
        // Prepare chips for stars, forks, and open issues
        // Each chip shows an icon plus the count
        const statsChips = [
            {
                type: "Chip",
                label: String((_a = repo.stargazers_count) !== null && _a !== void 0 ? _a : 0),
                startElement: {
                    type: "Icon",
                    id: "star",
                    color: "yellow",
                    size: 16
                },
                variant: "outlined",
                size: "small"
            },
            {
                type: "Chip",
                label: String((_b = repo.forks_count) !== null && _b !== void 0 ? _b : 0),
                startElement: {
                    type: "Icon",
                    id: "code-branch",
                    color: "cyan",
                    size: 16
                },
                variant: "outlined",
                size: "small"
            },
            {
                type: "Chip",
                label: String((_c = repo.open_issues_count) !== null && _c !== void 0 ? _c : 0),
                startElement: {
                    type: "Icon",
                    id: "exclamation-circle",
                    color: "red",
                    size: 16
                },
                variant: "outlined",
                size: "small"
            }
        ];
        return {
            type: "ListItem",
            // Repository full name as the title
            title: repo.full_name,
            // Optional textual description
            description: repo.description || undefined,
            // Avatar of the repository owner
            startElement: avatar,
            // Display stats chips on the right; chips are responsive on mobile
            endElement: statsChips,
            // Link the entire item to the repository page
            href: repo.html_url
        };
    });
    // Compose the final list
    return {
        type: "List",
        childrenProps: listItems
    };
}
//# sourceMappingURL=414.js.map