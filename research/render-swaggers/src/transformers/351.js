export function transform($input) {
    return visualizeData($input);
}
// Transforms an array of gist_commit records into a responsive list UI
function visualizeData(input) {
    // If there are no commits, render a simple markdown message
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No commits available"
        };
    }
    // Build a list item for each commit
    const items = input.map(commit => {
        var _a, _b, _c, _d;
        const user = commit.user;
        // Prepare avatar; fall back to a placeholder name if user is null
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatar_url,
            name: (_b = (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : user === null || user === void 0 ? void 0 : user.login) !== null && _b !== void 0 ? _b : "Unknown",
            variant: "gray",
            size: 32
        };
        // Format the commit timestamp for display
        const dateLabel = new Date(commit.committed_at).toLocaleString();
        // Safely extract additions and deletions (default to 0)
        const additions = (_c = commit.change_status.additions) !== null && _c !== void 0 ? _c : 0;
        const deletions = (_d = commit.change_status.deletions) !== null && _d !== void 0 ? _d : 0;
        // Prepare up/down arrow icons to decorate the change counts
        const addIcon = {
            type: "Icon",
            id: "arrow-up",
            color: "green",
            size: 16
        };
        const delIcon = {
            type: "Icon",
            id: "arrow-down",
            color: "red",
            size: 16
        };
        // Use compact chips to show additions/deletions
        const addChip = {
            type: "Chip",
            label: additions.toString(),
            startElement: addIcon,
            color: "success",
            size: "small",
            variant: "filled"
        };
        const delChip = {
            type: "Chip",
            label: deletions.toString(),
            startElement: delIcon,
            color: "error",
            size: "small",
            variant: "filled"
        };
        // Assemble the list item; clicking the item navigates to the commit URL
        return {
            type: "ListItem",
            title: commit.version,
            description: dateLabel,
            href: commit.url,
            startElement: avatar,
            endElement: [addChip, delChip]
        };
    });
    // Wrap all items in a responsive list component
    return {
        type: "List",
        childrenProps: items
    };
}
//# sourceMappingURL=351.js.map