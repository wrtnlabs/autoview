export function transform($input) {
    return visualizeData($input);
}
function visualizeData(input) {
    // If there are no events, show a simple text message
    if (!input || input.length === 0) {
        return {
            type: "Text",
            content: "No events to display",
            variant: "body2",
            color: "gray",
        };
    }
    // Map each GitHub event into a ListItem for display
    const listItems = input.map((event) => {
        // Create an avatar from the actor's data
        const avatar = {
            type: "Avatar",
            src: event.actor.avatar_url,
            name: event.actor.display_login || event.actor.login,
            size: 40,
        };
        // Format the event timestamp for display
        // Fallback to empty string if created_at is null or invalid
        let timeLabel = "";
        try {
            if (event.created_at) {
                timeLabel = new Date(event.created_at).toLocaleString();
            }
        }
        catch (_a) {
            timeLabel = "";
        }
        const timestampText = {
            type: "Text",
            content: timeLabel,
            variant: "caption",
            color: "gray",
        };
        // Build a human-readable description for the event
        const evType = event.type || "Event";
        const repoName = event.repo ? event.repo.name : "";
        const description = `${evType} on ${repoName}`;
        // Optionally, provide a quick "View" button linking to the repository
        const viewButton = {
            type: "Button",
            label: "View",
            size: "small",
            variant: "text",
            href: event.repo.url,
        };
        // Assemble the list item; we use the avatar as a leading element and show timestamp & view button on the right
        return {
            type: "ListItem",
            title: event.actor.display_login || event.actor.login,
            description: description,
            startElement: avatar,
            // endElement can be an array of allowed components: Text and Button
            endElement: [timestampText, viewButton],
            // Link the item itself to the repo URL for quick access
            href: event.repo.url,
        };
    });
    // Wrap all items in a responsive List component
    const eventList = {
        type: "List",
        childrenProps: listItems,
    };
    return eventList;
}
//# sourceMappingURL=988.js.map