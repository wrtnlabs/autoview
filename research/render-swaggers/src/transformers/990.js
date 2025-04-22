export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there's nothing to show, render a friendly markdown message.
    if (!input || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No events available\n\nThere are currently no events to display.",
        };
    }
    // Helper: pick an icon name based on the event payload
    const pickIconId = (evt) => {
        if (evt.payload.comment)
            return "comment";
        if (evt.payload.pages && evt.payload.pages.length > 0)
            return "file-alt";
        if (evt.payload.issue)
            return "exclamation-circle";
        // fallback to a generic activity icon
        return "github";
    };
    // Helper: build a human‐readable action description
    const buildDescription = (evt) => {
        var _a;
        const { action, issue, comment, pages } = evt.payload;
        if (action && issue) {
            return `**${action}** issue [#${issue.number}](${issue.html_url}): ${issue.title}`;
        }
        if (comment) {
            // comment.html_url may not exist; fall back to issue link if needed
            const url = comment.html_url || ((_a = evt.payload.issue) === null || _a === void 0 ? void 0 : _a.html_url) || evt.repo.url;
            return `commented on [#${comment.id}](${url})`;
        }
        if (pages && pages.length > 0) {
            const names = pages
                .map((p) => p.page_name || p.title || "unnamed")
                .filter((n) => !!n);
            return `updated page${names.length > 1 ? "s" : ""}: ${names.join(", ")}`;
        }
        // fallback to raw event type
        return evt.type || "performed an action";
    };
    // Map each event into a ListItemProps
    const items = input.map((evt) => {
        const actor = evt.actor;
        const repo = evt.repo;
        // Compose the list item
        const listItem = {
            type: "ListItem",
            // Title: actor login and repository name
            title: `${actor.login} on ${repo.name}`,
            // Render a markdown‐style description inside the list item
            description: buildDescription(evt),
            // Show the actor's avatar at the start
            startElement: {
                type: "Avatar",
                src: actor.avatar_url,
                name: actor.login,
                variant: "info",
                size: 32,
            },
            // Show an icon reflecting the event type at the end
            endElement: {
                type: "Icon",
                id: pickIconId(evt),
                color: "blue",
                size: 20,
            },
            // Clicking the item navigates to the repository page
            href: repo.url,
        };
        return listItem;
    });
    // Wrap all items in a responsive list
    const list = {
        type: "List",
        childrenProps: items,
    };
    return list;
}
//# sourceMappingURL=990.js.map