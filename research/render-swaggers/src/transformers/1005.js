export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a simple markdown notice
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No events to display",
        };
    }
    // Transform each GitHub event into a ListItemProps for a responsive list
    const listItems = input.map((evt) => {
        var _a, _b, _c, _d;
        // Avatar for the actor
        const avatar = {
            type: "Avatar",
            src: evt.actor.avatar_url,
            name: evt.actor.login,
            size: 32,
            variant: "info",
        };
        // Build a short description of the event: action, repo, issue number, timestamp
        const action = (_b = (_a = evt.payload.action) !== null && _a !== void 0 ? _a : evt.type) !== null && _b !== void 0 ? _b : "";
        const repoName = evt.repo.name;
        const issue = evt.payload.issue;
        const issuePart = issue ? `#${issue.number}` : "";
        // Format created_at as a human‐readable string if available
        const timeStr = evt.created_at
            ? new Date(evt.created_at).toLocaleString()
            : "";
        const descriptionParts = [
            action && `*${action}*`,
            repoName && `repository **${repoName}**`,
            issuePart,
            timeStr && `at ${timeStr}`,
        ].filter(Boolean);
        const description = descriptionParts.join(" ");
        // If there's a comment payload, show a badge with a comment icon
        let endElement;
        if (evt.payload.comment) {
            endElement = {
                type: "Badge",
                count: 1,
                showZero: false,
                childrenProps: {
                    type: "Icon",
                    id: "comment",
                    size: 20,
                    color: "gray",
                },
            };
        }
        // Compose the list item
        const listItem = {
            type: "ListItem",
            // Clicking the item navigates to the issue page if available
            href: issue === null || issue === void 0 ? void 0 : issue.html_url,
            startElement: avatar,
            title: (_d = (_c = issue === null || issue === void 0 ? void 0 : issue.title) !== null && _c !== void 0 ? _c : evt.type) !== null && _d !== void 0 ? _d : "Unknown event",
            description,
            endElement,
        };
        return listItem;
    });
    // Return a List component containing all events
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=1005.js.map