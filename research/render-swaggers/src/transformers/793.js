export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Helper: format an ISO date to a human-friendly string
    const formatDate = (iso) => {
        try {
            const d = new Date(iso);
            return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }
        catch (_a) {
            return iso;
        }
    };
    // Edge case: no issues to display
    if (input.length === 0) {
        return {
            type: "Markdown",
            content: "**No issues found**",
        };
    }
    // Map each issue to a list item
    const listItems = input.map((issue) => {
        const user = issue.user;
        // Avatar for issue author
        const avatar = {
            type: "Avatar",
            src: user === null || user === void 0 ? void 0 : user.avatar_url,
            name: user === null || user === void 0 ? void 0 : user.login,
            size: 40,
        };
        // Badge showing comment count, with comment icon as child
        const commentBadge = {
            type: "Badge",
            count: issue.comments,
            showZero: false,
            color: "gray",
            childrenProps: {
                type: "Icon",
                id: "comment",
                color: "gray",
                size: 16,
            },
        };
        // Chip indicating the state of the issue
        const stateChip = {
            type: "Chip",
            label: issue.state,
            size: "small",
            variant: "outlined",
            color: issue.state === "open" ? "green" : "red",
        };
        return {
            type: "ListItem",
            // Main title is the issue title
            title: issue.title,
            // Secondary text shows issue number and creation date
            description: `#${issue.number} opened on ${formatDate(issue.created_at)}`,
            // Avatar on the left
            startElement: avatar,
            // On the right, show comment badge and state chip
            endElement: [commentBadge, stateChip],
            // If the issue has an HTML URL, make the list item clickable
            href: issue.html_url,
        };
    });
    // Wrap all items into a responsive list
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=793.js.map