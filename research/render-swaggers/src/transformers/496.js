export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of GitHub minimal_repository into a DataList of visually rich list items.
function visualizeData(input) {
    // If there's no data, inform the user via Markdown.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No repositories available.",
        };
    }
    // Build a DataListItem for each repository
    const items = input.map((repo) => {
        // Owner avatar
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary",
        };
        // Repository title as Markdown link (bold name → hyperlink)
        const titleLink = {
            type: "Markdown",
            content: `[**${repo.full_name}**](${repo.html_url})`,
        };
        // Optional description as Markdown for better readability
        const descriptionMd = repo.description
            ? {
                type: "Markdown",
                content: repo.description,
            }
            : undefined;
        // Label components: avatar, title, and optional description
        const labelComponents = [
            ownerAvatar,
            titleLink,
        ];
        if (descriptionMd) {
            labelComponents.push(descriptionMd);
        }
        // Helper to build a stat chip (stars, forks, watchers)
        const buildStatChip = (count, iconId, color) => ({
            type: "Chip",
            label: String(count !== null && count !== void 0 ? count : 0),
            startElement: {
                type: "Icon",
                id: iconId,
                color,
                size: 16,
            },
            variant: "outlined",
            color,
            size: "small",
        });
        // Assemble chips for stars, forks, and watchers
        const statChips = [
            buildStatChip(repo.stargazers_count, "star", "yellow"),
            buildStatChip(repo.forks_count, "code-branch", "gray"),
            buildStatChip(repo.watchers_count, "eye", "blue"),
        ];
        // Group stats into a responsive chip group
        const statsGroup = {
            type: "ChipGroup",
            childrenProps: statChips,
            maxItems: statChips.length,
        };
        // Return the DataListItem component
        return {
            type: "DataListItem",
            label: labelComponents,
            value: statsGroup,
        };
    });
    // Wrap all items in a DataList
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=496.js.map