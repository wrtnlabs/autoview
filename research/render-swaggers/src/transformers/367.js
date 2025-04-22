export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a friendly markdown message
    if (!Array.isArray(input) || input.length === 0) {
        return {
            type: "Markdown",
            content: "### No events available",
        };
    }
    // Sort events by creation date descending (newest first)
    const sortedEvents = input
        .slice()
        .sort((a, b) => {
        const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
        const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
        return tb - ta;
    });
    // Map each event to a ListItemProps
    const items = sortedEvents.map((evt) => {
        // Format the timestamp or fall back to a placeholder
        const timeLabel = evt.created_at
            ? new Date(evt.created_at).toLocaleString()
            : "Unknown time";
        // Build a descriptive title for the event
        // If evt.type is null, use a generic label
        const titleText = evt.type
            ? `${evt.actor.login} · ${evt.type}`
            : `${evt.actor.login} · Event`;
        return {
            type: "ListItem",
            title: titleText,
            description: timeLabel,
            // Show the actor's avatar on the left
            startElement: {
                type: "Avatar",
                src: evt.actor.avatar_url,
                name: evt.actor.login,
                size: 32,
            },
            // A button on the right linking to the repository of the event
            endElement: {
                type: "Button",
                variant: "text",
                size: "small",
                href: evt.repo.url,
                startElement: {
                    type: "Icon",
                    id: "link",
                    color: "blue",
                    size: 16,
                },
                label: "Repo",
            },
        };
    });
    // Wrap all items in a responsive List component
    return {
        type: "List",
        childrenProps: items,
    };
}
//# sourceMappingURL=367.js.map