export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // Transform each GitHub issue event into a DataListItem
    const items = input.map((event) => {
        // Build avatar element if actor exists
        const avatar = event.actor
            ? {
                type: "Avatar",
                src: event.actor.avatar_url,
                name: event.actor.login,
                variant: "info",
                size: 24,
            }
            : undefined;
        // Text element for actor's login
        const actorText = {
            type: "Text",
            content: event.actor ? event.actor.login : "Unknown",
            variant: "body2",
        };
        // Text element for the event type
        const eventTypeText = {
            type: "Text",
            content: event.event,
            variant: "caption",
            color: "gray",
        };
        // Markdown element for the timestamp (bolded for emphasis)
        const timestamp = new Date(event.created_at).toLocaleString();
        const timestampMarkdown = {
            type: "Markdown",
            content: `**${timestamp}**`,
        };
        // Compose the label section: avatar + actor login + event type
        const labelComponents = [];
        if (avatar)
            labelComponents.push(avatar);
        labelComponents.push(actorText, eventTypeText);
        return {
            type: "DataListItem",
            label: labelComponents,
            value: timestampMarkdown,
        };
    });
    // Return the top-level DataList component
    return {
        type: "DataList",
        childrenProps: items,
    };
}
//# sourceMappingURL=780.js.map