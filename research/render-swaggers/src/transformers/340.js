export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a friendly message.
    if (!input || input.length === 0) {
        return {
            type: "Text",
            variant: "body1",
            content: "No events to display.",
        };
    }
    // Transform each GitHub event into a ListItem component.
    const listItems = input.map((evt) => {
        var _a;
        const actor = evt.actor;
        const repo = evt.repo;
        const payload = evt.payload;
        // Base properties for the list item.
        let title = actor.login;
        let description = `Repository: ${repo.name}`;
        let href = repo.url; // fallback to repo API URL
        let endElement = {
            type: "Icon",
            id: "arrow-right",
            size: 12,
            color: "gray",
        };
        // If the event has an issue action, use that for title/description.
        if (payload.action && payload.issue) {
            title = `${actor.login} ${payload.action} issue #${payload.issue.number}`;
            description = payload.issue.title;
            href = payload.issue.html_url;
        }
        // If it has a comment payload, show comment context.
        else if (payload.comment && payload.issue) {
            title = `${actor.login} commented on issue #${payload.issue.number}`;
            description = (_a = payload.comment.body) !== null && _a !== void 0 ? _a : "";
            href = payload.comment.html_url;
        }
        // Otherwise display event type and repo name.
        else if (evt.type) {
            title = `${actor.login} ${evt.type}`;
            // leave description as `Repository: ${repo.name}`
        }
        return {
            type: "ListItem",
            // Avatar of the actor on the left.
            startElement: {
                type: "Avatar",
                src: actor.avatar_url,
                name: actor.login,
                size: 40,
            },
            title,
            description,
            href,
            // A small arrow to indicate it's clickable.
            endElement,
        };
    });
    // Return a responsive List component for mobile and desktop.
    return {
        type: "List",
        childrenProps: listItems,
    };
}
//# sourceMappingURL=340.js.map