export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no repositories, show a friendly markdown message
    if (input.repositories.length === 0) {
        return {
            type: "Markdown",
            content: "## No Repositories Found\nThe organization has no repositories to display."
        };
    }
    // Map each repository to a ListItem component
    const listItems = input.repositories.map(repo => {
        var _a, _b, _c, _d;
        // Owner avatar (clickable item icon)
        const ownerAvatar = {
            type: "Avatar",
            src: repo.owner.avatar_url,
            name: repo.owner.login,
            size: 40,
            variant: "primary",
        };
        // Fallback description
        const descriptionText = (_a = repo.description) !== null && _a !== void 0 ? _a : "No description provided.";
        // Star count chip
        const starsChip = {
            type: "Chip",
            label: `${(_b = repo.stargazers_count) !== null && _b !== void 0 ? _b : 0} ★`,
            variant: "outlined",
            color: "yellow",
            size: "small",
        };
        // Fork count chip
        const forksChip = {
            type: "Chip",
            label: `${(_c = repo.forks_count) !== null && _c !== void 0 ? _c : 0} 🍴`,
            variant: "outlined",
            color: "green",
            size: "small",
        };
        // Topic chips (if any)
        const topicChips = ((_d = repo.topics) !== null && _d !== void 0 ? _d : []).map(topic => ({
            type: "Chip",
            label: topic,
            variant: "filled",
            color: "blue",
            size: "small",
        }));
        // "View" button linking to the GitHub repository
        const viewButton = {
            type: "Button",
            label: "View",
            variant: "text",
            color: "primary",
            size: "small",
            href: repo.html_url,
        };
        // Compose the ListItemProps
        return {
            type: "ListItem",
            title: repo.full_name,
            description: descriptionText,
            // on small screens the avatar helps quick identification
            startElement: ownerAvatar,
            // badges and actions on the right side
            endElement: [
                starsChip,
                forksChip,
                ...topicChips,
                viewButton
            ],
            // Make the entire item clickable
            href: repo.html_url,
        };
    });
    // Wrap all items in a responsive List component
    const list = {
        type: "List",
        childrenProps: listItems
    };
    return list;
}
//# sourceMappingURL=397.js.map